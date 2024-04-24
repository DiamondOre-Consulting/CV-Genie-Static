import express from "express";
import cors from "cors";
import dotnev from "dotenv";
import mongoose from "mongoose";

const app = express();
dotnev.config();

app.use(express.json());
app.use(cors());

const PORT = 5112;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

import AdminController from "./Controllers/admin.js";

app.use('/api/admin', AdminController);

app.get('/', (req, res) => {
    res.send("Hello CV-Genie!!!");
});

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${5112}`);
});