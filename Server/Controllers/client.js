import express, { response } from "express";
import crypto from "crypto";
import axios from "axios";
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
      amount: amount,
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

export default router;
