import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import { S3Client } from "@aws-sdk/client-s3";
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Admin from "../Models/Admin.js";
import AdminAuthenticateToken from "../Middlewares/AdminAuthenticateToken.js";
import Clients from "../Models/Clients.js";
import Portfolio from "../Models/Portfolio.js";

dotenv.config();

const secretKey = process.env.ADMIN_JWT_SECRET;

const router = express.Router();

// Generate a random number for unique username
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
};

router.post("/signup", async (req, res) => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      return res.status(403).json({ message: "Please fill all the fields!!!" });
    }

    const randomNum = generateOTP();

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      userName: name + `-${randomNum}`,
      password: hashedPassword,
    });

    await newAdmin.save();

    res.status(200).json({ message: "User created successfully!!!", newAdmin });
  } catch (error) {
    console.log("Something went wrong!!! ");
    res.status(500).json(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(403).json({ message: "Please fill all the fields!!!" });
    }

    const user = await Admin.findOne({ userName });
    if (!user) {
      return res.status(401).json({ message: "Invalid username!!!" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid password!!!" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        name: user.name,
        username: user.userName,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ token });
  } catch (error) {
    console.log("Something went wrong!!! ");
    res.status(500).json(error);
  }
});

router.post("/register", AdminAuthenticateToken, async (req, res) => {
  try {
    const { name, email, phone, amount } = req.body;

    if (!name || !email || !phone || !amount) {
      return res.status(403).json({ message: "Please fill all the fields!!!" });
    }

    const newClient = new Clients({
      name,
      email,
      phone,
      amount,
    });

    await newClient.save();

    res
      .status(200)
      .json({ message: "New Client has been registered!!!", newClient });
  } catch (error) {
    console.log("Something went wrong!!! ");
    res.status(500).json(error);
  }
});

router.get("/all-clients", AdminAuthenticateToken, async (req, res) => {
  try {
    const allClients = await Clients.find({});

    if (!allClients) {
      return res.status(404).json({ message: "No clients to show" });
    }

    res.status(200).json(allClients);
  } catch (error) {
    console.log("Something went wrong!!! ");
    res.status(500).json(error);
  }
});

router.put("/client/:id", AdminAuthenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { paid } = req.body;

    const singleClient = await Clients.findOneAndUpdate(
      { _id: id },
      {
        $set: { paid: paid },
      }
    );

    if (!singleClient) {
      return res.status(403).json({ message: "Client not found" });
    }

    res.status(200).json({ message: `${singleClient.name} has paid` });
  } catch (error) {
    console.log("Something went wrong!!! ");
    res.status(500).json(error);
  }
});

const credentials = {
  accessKeyId: "IGMGlez1Zm5uraQ2",
  secretAccessKey: "ppuH3CSIYRgXDrSVwa4tvy9DcxTwX1uzhfYZsw4C",
};

const credentialsDoc = {
  accessKeyId: "rqFnMoQJ34H5SVIM",
  secretAccessKey: "biQ6zGeBurmyC2cQiVtlAW4QyJKNq0wfaZCpLnHx",
};

const credentialsProduct = {
  accessKeyId: "ZWLc5XbESdSUlJMF",
  secretAccessKey: "pyyg7xRqpixT0Q2ceZ9dD5lXLRqrPtJxF0jOL5wi",
}

const s3Client = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: credentials,
  region: "global",
});

const s3ClientDocs = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: credentialsDoc,
  region: "global",
});

const s3ClientProducts = new S3Client({
  endpoint: "https://s3.tebi.io",
  credentials: credentialsProduct,
  region: "global"
})

// UPLOAD PROFILE PIC
router.post("/upload-profile-pic", async (req, res) => {
  try {
    const file = req.files && req.files.myFileImage; // Change 'myFile' to match the key name in Postman

    if (!file) {
      return res.status(400).send("No file uploaded");
    }

    // Generate a unique identifier
    const uniqueIdentifier = uuidv4();

    // Get the file extension from the original file name
    const fileExtension = file.name.split(".").pop();

    // Create a unique filename by appending the unique identifier to the original filename
    const uniqueFileName = `${uniqueIdentifier}.${fileExtension}`;

    // Convert file to base64
    const base64Data = file.data.toString("base64");

    // Create a buffer from the base64 data
    const fileBuffer = Buffer.from(base64Data, "base64");

    const uploadData = await s3Client.send(
      new PutObjectCommand({
        Bucket: "profilepics",
        Key: uniqueFileName, // Use the unique filename for the S3 object key
        Body: fileBuffer, // Provide the file buffer as the Body
      })
    );

    // Generate a public URL for the uploaded file
    const getObjectCommand = new GetObjectCommand({
      Bucket: "profilepics",
      Key: uniqueFileName,
    });

    const signedUrl = await getSignedUrl(s3Client, getObjectCommand); // Generate URL valid for 1 hour

    // Parse the signed URL to extract the base URL
    const parsedUrl = new URL(signedUrl);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.pathname}`;

    // Send the URL as a response
    res.status(200).json(baseUrl);

    // Log the URL in the console
    console.log("File uploaded. URL:", baseUrl);
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).send("Error uploading file");
  }
});

// UPLOAD PRODUCT IMAGES
router.post("/upload-product-image", async (req, res) => {
  try {
    const file = req.files && req.files.myProductImage; // Change 'myFile' to match the key name in Postman

    if (!file) {
      return res.status(400).send("No file uploaded");
    }

    // Generate a unique identifier
    const uniqueIdentifier = uuidv4();

    // Get the file extension from the original file name
    const fileExtension = file.name.split(".").pop();

    // Create a unique filename by appending the unique identifier to the original filename
    const uniqueFileName = `${uniqueIdentifier}.${fileExtension}`;

    // Convert file to base64
    const base64Data = file.data.toString("base64");

    // Create a buffer from the base64 data
    const fileBuffer = Buffer.from(base64Data, "base64");

    const uploadData = await s3ClientProducts.send(
      new PutObjectCommand({
        Bucket: "productsimages",
        Key: uniqueFileName, // Use the unique filename for the S3 object key
        Body: fileBuffer, // Provide the file buffer as the Body
      })
    );

    // Generate a public URL for the uploaded file
    const getObjectCommand = new GetObjectCommand({
      Bucket: "productsimages",
      Key: uniqueFileName,
    });

    const signedUrl = await getSignedUrl(s3Client, getObjectCommand); // Generate URL valid for 1 hour

    // Parse the signed URL to extract the base URL
    const parsedUrl = new URL(signedUrl);
    const baseUrl = `${parsedUrl.protocol}//${parsedUrl.hostname}${parsedUrl.pathname}`;

    // Send the URL as a response
    res.status(200).json(baseUrl);

    // Log the URL in the console
    console.log("File uploaded. URL:", baseUrl);
  } catch (error) {
    console.error("Error uploading file:", error);
    return res.status(500).send("Error uploading file");
  }
});


// CREATE PORTFOLIO
router.post("/create-portfolio", AdminAuthenticateToken, async (req, res) => {
  try {
    const file = req.files && req.files.myDocument; 

    if (!file) {
      return res.status(400).send("No file uploaded");
    }

    const uniqueIdentifier = uuidv4();

    const fileExtension = file.name.split(".").pop();

    const uniqueFileName = `${uniqueIdentifier}.${fileExtension}`;

    const base64Data = file.data.toString("base64");

    const fileBuffer = Buffer.from(base64Data, "base64");

    const uploadDataDoc = await s3ClientDocs.send(
      new PutObjectCommand({
        Bucket: "portfoliodocs",
        Key: uniqueFileName, // Use the unique filename for the S3 object key
        Body: fileBuffer, // Provide the file buffer as the Body
      })
    );

    const getObjectCommandDoc = new GetObjectCommand({
      Bucket: "portfoliodocs",
      Key: uniqueFileName,
    });

    const signedUrlDoc = await getSignedUrl(s3ClientDocs, getObjectCommandDoc);

    // Parse the signed URL to extract the base URL
    const parsedUrlDoc = new URL(signedUrlDoc);
    const baseUrlDoc = `${parsedUrlDoc.protocol}//${parsedUrlDoc.hostname}${parsedUrlDoc.pathname}`;

    const {
      name,
      uniqueUserName,
      email,
      phone,
      tagline,
      aboutMe,
      heading,
      description,
      products,
      address,
      facebook,
      twitter,
      linkedin,
      instagram,
      bgColor,
      primaryTextColor,
      secondaryTextColor,
      buttonColor
    } = req.body;

    const findExist = await Portfolio.findOne({ email });
    if (findExist) {
      return res
        .status(402)
        .json({ message: "Portfolio already exists with this email id!!!" });
    }

    const newPortfolio = new Portfolio({
      name,
      uniqueUserName,
      email,
      phone,
      tagline,
      profileImage,
      aboutMe,
      document: baseUrlDoc,
      services: {
        heading,
        description
      },
      products: products,
      contact: {
        address: address
      },
      socialMedias: {
        facebook,
        twitter,
        instagram,
        linkedin
      },
      bgColor,
      primaryTextColor,
      secondaryTextColor,
      buttonColor
    });

    await newPortfolio.save();
  } catch (error) {
    console.log("Something went wrong!!! ", error);
    res.status(500).json(error);
  }
});

export default router;
