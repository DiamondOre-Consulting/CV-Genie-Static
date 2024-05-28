import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import express from "express";
import fileUpload from "express-fileupload";
import nodemailer from "nodemailer";
import User from "../Models/User.js";

const router = express.Router();



const sendEmail = async (formData) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "harshkr2709@gmail.com",
                pass: "frtohlwnukisvrzh",
            },
        });

        const mailOptions = {
            from: "Cv-Genie.in <harshkr2709@gmail.com>",
            to: "admin@cvgenie.in",
            subject: `New Message Form ${formData.name}`,
            text: `You have a new contact form submission:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nMessage: ${formData.message}\nResume URL: ${formData.pdf || 'Not provided'}`,
            html: `
                <p>You have a new contact form submission:</p>
                <p><strong>Name:</strong> ${formData.name}</p>
                <p><strong>Email:</strong> ${formData.email}</p>
                <p><strong>Phone:</strong> ${formData.phone}</p>
                <p><strong>Message:</strong> ${formData.message}</p>
                <p><strong>Resume URL:</strong> ${formData.pdf ? `<a href="${formData.pdf}">View Resume</a>` : 'Not provided'}</p>
            `,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

const credentialsResumes = {
    accessKeyId: "Nek5TbPKqYpfu2AX",
    secretAccessKey: "vB2MR4HVKF2afFIBZrbRcnqYNGHCDf3RbMi0DU7C",
};

const s3ClientResumes = new S3Client({
    endpoint: "https://s3.tebi.io",
    credentials: credentialsResumes,
    region: "global",
});

router.use(fileUpload());

router.post("/upload-resume", async (req, res) => {
    try {
        const file = req.files && req.files.myFileResume;

        if (!file) {
            return res.status(400).send("No file uploaded");
        }

        const uniqueIdentifier = uuidv4();
        const fileExtension = file.name.split(".").pop();
        const uniqueFileName = `${uniqueIdentifier}.${fileExtension}`;
        const fileBuffer = file.data;

        await s3ClientResumes.send(
            new PutObjectCommand({
                Bucket: "cvgenie",
                Key: uniqueFileName,
                Body: fileBuffer,
            })
        );

        const getObjectCommand = new GetObjectCommand({
            Bucket: "cvgenie",
            Key: uniqueFileName,
        });

        const signedUrl = await getSignedUrl(s3ClientResumes, getObjectCommand);

        const parsedUrl = new URL(signedUrl);
        const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.pathname}`;

        res.status(200).json(baseUrl);
        console.log("File uploaded. URL:", baseUrl);
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).send("Error uploading file");
    }
});

router.post('/contact-form', async (req, res) => {
    try {
        const { name, email, phone, message, pdf } = req.body;

        if (!name || !email || !phone || !message) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const user = new User({
            name,
            email,
            phone,
            message,
            pdf,
        });

        await user.save();

        await sendEmail({ name, email, phone, message, pdf });

        res.status(200).json({ message: 'Form Submitted successfully', user });
    } catch (error) {
        console.log("Error in submitting form", error);
        res.status(500).send("Error Submitting Form");
    }
});

export default router;
