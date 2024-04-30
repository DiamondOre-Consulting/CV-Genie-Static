import express from "express";
import crypto from "crypto";
import axios from "axios";
import Client from "../Models/Clients.js";

const router = express.Router();

function generateTransactionId() {
    const timeStamp = Date.now();
    const randNum = Math.floor(Math.random()*1000000);
    const merchantPrefix = 'T';
    const transactionID = `${merchantPrefix}${timeStamp}${randNum}`;
    return transactionID;
}

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

router.post("/payment", async (req, res) => {
    try {
        const {name, number, amount} = req.body;
        const data = {
            merchantId: "MERCHANTUAT",
            merchantTransactionId: generateTransactionId(),
            merchantUserId: "MUID123",
            name: name,
            amount: amount,
            redirectUrl: "http://localhost:7001/api/client/phonepe/status",
            redirectMode: "POST",
            // callbackUrl: "https://webhook.site/callback-url",
            mobileNumber: number,
            paymentInstrument: {
              type: "PAY_PAGE"
            }
          };
          const payload = JSON.stringify(data);
          const payloadMain = Buffer.from(payload).toString('base64');
          const 
    };
})

export default router;
