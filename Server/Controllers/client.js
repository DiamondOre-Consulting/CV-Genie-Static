import express, { response } from "express";
import axios from "axios";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import mammoth from "mammoth";
import puppeteer from "puppeteer";
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import PDFDocument from "pdfkit";
import { createReport } from "docx-templates";
import Client from "../Models/Clients.js";
import  crypto from "crypto";

import ejs from "ejs";
import pdf from "html-pdf"

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateTransactionId() {
  const timeStamp = Date.now();
  const randNum = Math.floor(Math.random() * 1000000);
  const merchantPrefix = "T";
  const transactionID = `${merchantPrefix}${timeStamp}${randNum}`;
  return transactionID;
}

router.post("/my-profile", async (req, res) => {
  try {
    const { phone } = req.body;

    const myProfile = await Client.findOne({ phone });
    if (!myProfile) {
      return res
        .status(404)
        .json({ message: "No records found with this phone number!!!" });
    }

    res.status(200).json(myProfile);
  } catch (error) {
    console.log("Something went wrong!!! ");
    res.status(500).json(error);
  }
});

router.post("/payment", async (req, res) => {
  try {
    const { name, number, amount } = req.body;
    console.log(name, number, amount);
    const data = {
      merchantId: "M224FNY56Q0NM",
      merchantTransactionId: generateTransactionId(),
      merchantUserId: "MUID123",
      name: name,
      amount: amount * 100,
      redirectUrl:
        "https://cv-genie-static-backend.onrender.com/api/client/status",
      redirectMode: "POST",
      // callbackUrl: "https://webhook.site/callback-url",
      mobileNumber: number,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString("base64");
    const key = "2ce3994f-5cdb-4a87-b0a1-2a779d2c90fd";
    const keyIndex = 1;
    const string = payloadMain + "/pg/v1/pay" + key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    console.log(sha256, checksum);

    const options = {
      method: "POST",
      url: "https://api.phonepe.com/apis/hermes/pg/v1/pay",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payloadMain,
      },
    };

    console.log(options);

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        return res
          .status(200)
          .send(response.data.data.instrumentResponse.redirectInfo.url);
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

router.post("/status", async (req, res) => {
  console.log(res.body);

  const merchantTransactionId = res.req.body.transactionId;
  const merchantId = res.req.body.merchantId;
  const keyIndex = 1;
  const key = "2ce3994f-5cdb-4a87-b0a1-2a779d2c90fd";
  const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + key;
  const sha256 = crypto.createHash("sha256").update(string).digest("hex");
  const checksum = sha256 + "###" + keyIndex;

  console.log(merchantTransactionId, merchantId, sha256, checksum);

  const URL = `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`;

  const options = {
    method: "GET",
    url: URL,
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      "X-VERIFY": checksum,
      "X-MERCHANT-ID": merchantId,
    },
  };

  axios
    .request(options)
    .then(async (response) => {
      console.log(response);
    })
    .catch(function (error) {
      console.error(error);
    });
});

// TEBI CREDS
const credentialsFreeResumes = {
  accessKeyId: "KPvWPJ8OJZwpVGZm",
  secretAccessKey: "3jVWD2tpmuoHlrn6UHLIwbFozdoxXneSKL8bYJ0d",
};

const s3ClientFreeResumes = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: credentialsFreeResumes,
  region: "global",
});

// Read the template (assuming it's already in your project folder)
const templatePath = path.resolve(__dirname, "SampleCV.docx");
const template = fs.readFileSync(templatePath, "binary");
// const template = fs.readFileSync('.../Server/Controllers/Template_Resume.docx');

// Sample user input (replace with actual data)
const sampleUserData = {
  name: "John Doe",
  email: "john@example.com",
  // Add other fields as needed
};

// Generate the filled Docx document
async function generateDocx(userData) {
  try {
    const report = await createReport({
      template,
      data: userData,
    });
    return report;
  } catch (error) {
    console.error("Error generating Docx:", error);
    throw error; // Rethrow the error
  }
}

// Generate the PDF from the filled Docx
// function generatePdf(docxContent) {
// const pdfStream = new PDFDocument();
// pdfStream.text('Hello, world!'); // Replace with actual content from docxContent
// return pdfStream;
// }
async function generateAndSavePdf(docxContent) {
  try {
    const pdfStream = new PDFDocument();
    pdfStream.text("Hello, world!"); // Replace with actual content from docxContent

    // Save the PDF to a file (e.g., output.pdf)
    const outputPath = "./output.pdf";
    pdfStream.pipe(fs.createWriteStream(outputPath));

    return outputPath;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error; // Rethrow the error
  }
}

router.post("/free-resume", async (req, res) => {
  try {
    const { name, email } = req.body;

    const templatePath = path.resolve(__dirname, "SampleCV.docx");
    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip);

    doc.render({
      name,
      email,
    });

    const buffer = doc
      .getZip()
      .generate({ type: "nodebuffer", compression: "DEFLATE" });
    const outputPath = path.resolve(__dirname, `${name}_free_resume.docx`);
    fs.writeFileSync(outputPath, buffer);

    // Convert DOCX to HTML
    const html = await mammoth.convertToHtml({ path: outputPath });

    // Convert HTML to PDF using Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html.value);
    const pdfBuffer = await page.pdf();
    console.log(pdfBuffer);
    await browser.close();

    // Define the output path for the PDF
    const pdfOutputPath = path.resolve(
      __dirname,
      `${full_name}_free_resume.pdf`
    );
    fs.writeFileSync(pdfOutputPath, pdfBuffer);

    // Upload the generated PDF to S3
    const uploadData = await s3ClientFreeResumes.send(
      new PutObjectCommand({
        Bucket: "freeresumesbuild",
        Key: `${full_name}_free_resume.pdf`,
        Body: fs.readFileSync(pdfOutputPath),
      })
    );

    const getObjectCommand = new GetObjectCommand({
      Bucket: "freeresumesbuild",
      Key: `${full_name}_free_resume.pdf`,
    });

    const signedUrl = await getSignedUrl(s3ClientFreeResumes, getObjectCommand);
    const parsedUrl = new URL(signedUrl);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.pathname}`;
    if (!baseUrl) {
      return res.status(404).json({ message: "File not saved" });
    }

    // const newFreeResume = new ResumeTemp({
    //   full_name,
    //   address,
    //   phone,
    //   email,
    //   linkedinUrl,
    //   summary,
    //   tech_skills,
    //   soft_skills,
    //   experience: {
    //     designation: experience.designation,
    //     start_month: experience.start_month,
    //     start_year: experience.start_year,
    //     end_month: experience.end_month,
    //     end_year: experience.end_year,
    //     company: experience.company,
    //     company_city: experience.company_city,
    //     work_description: experience.work_description,
    //   },
    //   graduation: {
    //     degree_name: graduation.degree_name,
    //     degree_field: graduation.degree_field,
    //     graduation_year: graduation.graduation_year,
    //     university_name: graduation.university_name,
    //     university_city: graduation.university_city,
    //   },
    //   twelfth: {
    //     twelfth_field: twelfth.twelfth_field,
    //     twelfth_year: twelfth.twelfth_year,
    //     twelfth_school_name: twelfth.twelfth_school_name,
    //     twelfth_school_city: twelfth.twelfth_school_city,
    //     twelfth_board_name: twelfth.twelfth_board_name,
    //   },
    //   tenth: {
    //     tenth_field: tenth.tenth_field,
    //     tenth_year: tenth.tenth_year,
    //     tenth_school_name: tenth.tenth_school_name,
    //     tenth_school_city: tenth.tenth_school_city,
    //     tenth_board_name: tenth.tenth_board_name,
    //   },
    //   resumeLink: baseUrl,
    // });

    // await newFreeResume.save();

    res.status(200).send(html);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong!!!" });
  }
});

// router.post("/generate-pdf", async (req, res) => {
//   try {
//     // Assuming req.body contains user input
//     const userData = req.body;
//     console.log(userData);

//     // Generate the filled Docx
//     const filledDocx = await createReport({
//       template,
//       name: userData.name,
//       email: userData.email
//     });
//     console.log(filledDocx);

//     // Generate the PDF
//     const pdfStream = new PDFDocument();
//     pdfStream.text(filledDocx); // Replace with actual content from filledDocx
//     // console.log(pdfStream.text(filledDocx));

//     // Save the PDF to a file (e.g., output.pdf)
//     const outputPath = './output.pdf';
//     const pdfOutputPath = path.resolve(__dirname, `free_resume.pdf`);
//     // console.log(fs.createWriteStream(pdfOutputPath));
//     pdfStream.pipe(fs.createWriteStream(pdfOutputPath));
//     pdfStream.end();

//     // Send the response
//     res.status(200).send(`PDF saved at: ${pdfOutputPath}`);
//   } catch (error) {
//     console.error("Error generating PDF:", error);
//     res.status(500).send("Error generating PDF");
//   }
// });

// router.post("/generate-pdf", async (req, res) => {
//   try {
//     // Assuming req.body contains user input (HTML content)
//     const userHtml = req.body.html; // Replace with actual user input
//     console.log(userHtml);

//     const browser = await puppeteer.launch({ timeout: 60000 });
//     const page = await browser.newPage();

//     // Set the HTML content
//     await page.setContent(userHtml, { waitUntil: 'networkidle0' });

//     // Generate the PDF
//     const pdfBuffer = await page.pdf({
//       format: 'A4',
//     });

//     // Save the PDF to a file (e.g., output.pdf)
//     const outputPath = './output.pdf';
//     fs.writeFileSync(outputPath, pdfBuffer);

//     console.log('Conversion complete. PDF file generated successfully.');
//     await browser.close();

//     res.status(200).send(`PDF saved at: ${outputPath}`);
//   } catch (error) {
//     console.error('Error generating PDF:', error);
//     res.status(500).send('Error generating PDF');
//   }
// })

// router.post("/generate-pdf", async (req, res) => {
//   try {
//     // const { html } = req.body; // Assuming the HTML content is sent as { "html": "<your_html_here>" }
//     // console.log(html);

//     // Create a browser instance
//     const browser = await puppeteer.launch({ headless: true, slowMo: 50, timeout: 60000 });

//     // Create a new page
//     const page = await browser.newPage();

//     // Set the HTML content
//     const templatePath = path.resolve(__dirname, "sample.ejs");
//     const html = fs.readFileSync(templatePath, "utf-8");
//     console.log('HTML content:', html);
//     // const newThing = page
//     //   ? await page.setContent(html, { waitUntil: "domcontentloaded" })
//     //   : "";
//     // console.log(newThing);

//     // await page.setContent("hjkhkjh");
//         // Set the content of the page
//         await page.setContent(html, { waitUntil: 'domcontentloaded', timeout: 60000 });

//         console.log('Page content set successfully.');
//     // Generate the PDF
//     const pdf = await page.pdf({
//       margin: { top: "100px", right: "50px", bottom: "100px", left: "50px" },
//       format: "A4",
//     });

//     // Close the browser instance
//     await browser.close();

//     // Set response headers and send the PDF
//     res.set({
//       "Content-Type": "application/pdf",
//       "Content-Disposition": "attachment; filename=generated.pdf",
//     });

//     res.status(200).send(pdf);
//   } catch (error) {
//     console.error("Error generating PDF:", error.message);
//     res.status(500).send("Error generating PDF");
//   }
// });

let students = [
  {name: "Joy",
   email: "joy@example.com",
   city: "New York",
   country: "USA"},
  {name: "John",
   email: "John@example.com",
   city: "San Francisco",
   country: "USA"},
  {name: "Clark",
   email: "Clark@example.com",
   city: "Seattle",
   country: "USA"},
  {name: "Watson",
   email: "Watson@example.com",
   city: "Boston",
   country: "USA"},
  {name: "Tony",
   email: "Tony@example.com",
   city: "Los Angels",
   country: "USA"
}];

router.get("/generate-pdf", (req, res) => {
  ejs.renderFile(path.join(__dirname, "sample.ejs"), {students: students}, (err, data) => {
  if (err) {
        res.send(err);
  } else {
      let options = {
          "height": "11.25in",
          "width": "8.5in",
          "header": {
              "height": "20mm"
          },
          "footer": {
              "height": "20mm",
          },
      };
      pdf.create(data, options).toFile("report.pdf", function (err, data) {
          if (err) {
              res.send(err);
          } else {
              res.send("File created successfully");
          }
      });
  }
});
})

export default router;
