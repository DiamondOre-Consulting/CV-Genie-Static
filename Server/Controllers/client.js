import express, { response } from "express";
import crypto from "crypto";
import axios from "axios";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import mammoth from 'mammoth';
import puppeteer from 'puppeteer';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import Client from "../Models/Clients.js";

const router = express.Router();

function generateTransactionId() {
  const timeStamp = Date.now();
  const randNum = Math.floor(Math.random() * 1000000);
  const merchantPrefix = "T";
  const transactionID = `${merchantPrefix}${timeStamp}${randNum}`;
  return transactionID;
}

router.post("/my-profile", async (req, res) => {
  try {
    const { email } = req.body;

    const myProfile = await Client.findOne({ email });
    if (!myProfile) {
      return res
        .status(404)
        .json({ message: "No records found with this email id!!!" });
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
      amount: amount*100,
      redirectUrl: "https://cv-genie-static-backend.onrender.com/api/client/status",
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
        "X-VERIFY": checksum
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
        return res.status(200).send(response.data.data.instrumentResponse.redirectInfo.url)
    })
    .catch(function (error) {
      console.error(error);
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
    });
  }
});

router.post('/status', async (req, res) => {
    console.log(res.body);

    const merchantTransactionId = res.req.body.transactionId
    const merchantId = res.req.body.merchantId
    const keyIndex = 1;
    const key = "2ce3994f-5cdb-4a87-b0a1-2a779d2c90fd";
    const string = `/pg/v1/status/${merchantId}/${merchantTransactionId}` + key;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    console.log(merchantTransactionId, merchantId, sha256, checksum);

    const URL = `https://api.phonepe.com/apis/hermes/pg/v1/status/${merchantId}/${merchantTransactionId}`

    const options = {
        method: 'GET',
        url: URL,
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            'X-VERIFY': checksum,
            'X-MERCHANT-ID': merchantId,

        }
    }

    axios
    .request(options)
        .then(async (response) => {
            console.log(response);
        })
    .catch(function (error) {
      console.error(error);
    });
})

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

router.post('/free-resume', async (req, res) => {
  try {
    const {
      full_name,
      address,
      phone,
      email,
      linkedinUrl,
      summary,
      tech_skills,
      soft_skills,
      experience,
      graduation,
      twelfth,
      tenth,
    } = req.body;

    const templatePath = path.resolve(__dirname, 'Template_Resume.docx');
    const content = fs.readFileSync(templatePath, 'binary');
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip);

    doc.render({
      full_name,
      address,
      phone,
      email,
      linkedinUrl,
      summary,
      tech_skills: [tech_skills],
      soft_skills: [soft_skills],
      designation: experience.designation,
      start_month: experience.start_month,
      start_year: experience.start_year,
      end_month: experience.end_month,
      end_year: experience.end_year,
      company: experience.company,
      company_city: experience.company_city,
      work_description: experience.work_description,
      degree_name: graduation.degree_name,
      degree_field: graduation.degree_field,
      graduation_year: graduation.graduation_year,
      university_name: graduation.university_name,
      university_city: graduation.university_city,
      twelfth_field: twelfth.twelfth_field,
      twelfth_year: twelfth.twelfth_year,
      twelfth_school_name: twelfth.twelfth_school_name,
      twelfth_school_city: twelfth.twelfth_school_city,
      twelfth_board_name: twelfth.twelfth_board_name,
      tenth_field: tenth.tenth_field,
      tenth_year: tenth.tenth_year,
      tenth_school_name: tenth.tenth_school_name,
      tenth_school_city: tenth.tenth_school_city,
      tenth_board_name: tenth.tenth_board_name,
    });

    const buffer = doc.getZip().generate({ type: 'nodebuffer', compression: 'DEFLATE' });
    const outputPath = path.resolve(__dirname, `${full_name}_free_resume.docx`);
    fs.writeFileSync(outputPath, buffer);

    // Convert DOCX to HTML
    const html = await mammoth.convertToHtml({ path: outputPath });

    // Convert HTML to PDF using Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html.value);
    const pdfBuffer = await page.pdf();
    await browser.close();

    // Define the output path for the PDF
    const pdfOutputPath = path.resolve(__dirname, `${full_name}_free_resume.pdf`);
    fs.writeFileSync(pdfOutputPath, pdfBuffer);

    // Upload the generated PDF to S3
    const uploadData = await s3ClientFreeResumes.send(
      new PutObjectCommand({
        Bucket: 'freeresumesbuild',
        Key: `${full_name}_free_resume.pdf`,
        Body: fs.readFileSync(pdfOutputPath),
      })
    );

    const getObjectCommand = new GetObjectCommand({
      Bucket: 'freeresumesbuild',
      Key: `${full_name}_free_resume.pdf`,
    });

    const signedUrl = await getSignedUrl(s3ClientFreeResumes, getObjectCommand);
    const parsedUrl = new URL(signedUrl);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.pathname}`;
    if (!baseUrl) {
      return res.status(404).json({ message: 'File not saved' });
    }

    const newFreeResume = new ResumeTemp({
      full_name,
      address,
      phone,
      email,
      linkedinUrl,
      summary,
      tech_skills,
      soft_skills,
      experience: {
        designation: experience.designation,
        start_month: experience.start_month,
        start_year: experience.start_year,
        end_month: experience.end_month,
        end_year: experience.end_year,
        company: experience.company,
        company_city: experience.company_city,
        work_description: experience.work_description,
      },
      graduation: {
        degree_name: graduation.degree_name,
        degree_field: graduation.degree_field,
        graduation_year: graduation.graduation_year,
        university_name: graduation.university_name,
        university_city: graduation.university_city,
      },
      twelfth: {
        twelfth_field: twelfth.twelfth_field,
        twelfth_year: twelfth.twelfth_year,
        twelfth_school_name: twelfth.twelfth_school_name,
        twelfth_school_city: twelfth.twelfth_school_city,
        twelfth_board_name: twelfth.twelfth_board_name,
      },
      tenth: {
        tenth_field: tenth.tenth_field,
        tenth_year: tenth.tenth_year,
        tenth_school_name: tenth.tenth_school_name,
        tenth_school_city: tenth.tenth_school_city,
        tenth_board_name: tenth.tenth_board_name,
      },
      resumeLink: baseUrl,
    });

    await newFreeResume.save();

    res.status(200).send(baseUrl);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong!!!' });
  }
});

export default router;
