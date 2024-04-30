import express from "express";
import Client from "../Models/Clients.js";

const router = express.Router();

router.post("/my-profile", async (req, res) => {
    try {
        const {email} = req.body;

        const myProfile = await Client.findOne({email});
        if(!myProfile) {
            return res.status(404).json({message: "No records found with this email id!!!"})
        }

        res.status(200).json(myProfile);
    } catch(error) {
        console.log("Something went wrong!!! ");
        res.status(500).json(error);
    }
});

export default router;
