import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "brcypt"
import Admin from "../Models/Admin.js";
import AdminAuthenticateToken from "../Middlewares/AdminAuthenticateToken.js";
import Clients from "../Models/Clients.js";

dotenv.config();

const secretKey = process.env.ADMIN_JWT_SECRET;

const router = express.Router();

// Generate a random number for unique username
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  };

router.post("/signup", async (req, res) => {
    try {
        const {name, password} = req.body;

        if(!name || !password) {
            return res.status(403).json({message: "Please fill all the fields!!!"})
        }

        const randomNum = generateOTP();

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = new Admin({
            name,
            userName: name+`-${randomNum}`,
            password: hashedPassword
        })

        await newAdmin.save();

        res.status(200).json({message: "User created successfully!!!", newAdmin});
        
    } catch(error) {
        console.log("Something went wrong!!! ");
        res.status(500).json(error);
    }
});

router.post("/login", async (req, res) => {
    try {
        const {userName, password} = req.body;

        if(!userName || !password) {
            return res.status(403).json({message: "Please fill all the fields!!!"})
        }

        const user = await Admin.findOne({userName});
        if(!user) {
           return res.status(401).json({message: "Invalid username!!!"});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch) {
            return res.status(401).json({message: "Invalid password!!!"});
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
         
    } catch(error) {
        console.log("Something went wrong!!! ");
        res.status(500).json(error);
    }
});

router.post('/register', AdminAuthenticateToken, async (req, res) => {
    try {
        const {name, email, phone, amount} = req.body;

        if(!name || !email || !phone || !amount) {
            return res.status(403).json({message: "Please fill all the fields!!!"})
        }

        const newClient = new Clients({
            name,
            email,
            phone,
            amount
        });

        await newClient.save();

        res.status(200).json({message: "New Client has been registered!!!", newClient});

    } catch(error) {
        console.log("Something went wrong!!! ");
        res.status(500).json(error);
    }
})

router.get("/all-clients", AdminAuthenticateToken, async (req, res) => {
    try {
        const allClients = await Clients.find({});

        if(!allClients) {
            return res.status(404).json({message: "No clients to show"});
        }

        res.status(200).json(allClients);
    } catch(error) {
        console.log("Something went wrong!!! ");
        res.status(500).json(error);
    }
});

router.put("/client/:id", AdminAuthenticateToken, async (req, res) => {
    try {
        const {id} = req.params;
      const {paid} = req.body;

      const singleClient = await Clients.findOneAndUpdate(
        {_id: id},
        {
            $set: {paid: paid}
        }
      ) 
      
      if(!singleClient) {
        return res.status(403).json({message: "Client not found"});
      }

      res.status(200).json({message: `${singleClient.name} has paid`});
    } catch(error) {
        console.log("Something went wrong!!! ");
        res.status(500).json(error);
    }
})

export default router;