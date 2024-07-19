import express from "express";
import fileUpload from 'express-fileupload';
import cors from "cors";
import dotnev from "dotenv";
import mongoose from "mongoose";
import bodyParser from 'body-parser';

const app = express();
dotnev.config();

app.use(express.json());
app.use(fileUpload());
app.use(cors());
app.use(bodyParser.json());

const PORT = 7002;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

import AdminController from "./Controllers/admin.js";
import ClientController from "./Controllers/client.js"; 
import User from "./Controllers/User.js";

app.use('/api/admin', AdminController);
app.use('/api/client', ClientController);
app.use('/api/users', User)

app.get('/', (req, res) => {
    res.send("Hello CV-Genie!!!");
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
});