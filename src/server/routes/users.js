const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = "NodeJS";
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: 'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use `true` for port 465, `false` for all other ports
  auth: {
    user: "rickyvashi.co20d1@scet.ac.in",
    pass: "mevq xwak tyjm lsxw",
  },
});

const sendMail = async (transporter, mailOptions) => {
    try {
        await transporter.sendMail(mailOptions);
        console.log("Mail Sent Successfully");
    } catch (error) {
        console.log("Error sending email:", error);
    }
};

const crypto = require('crypto'); // Import crypto to generate the verification code


router.post('/verify', async (req, res) => 
{
    const { email , otp } = req.body;

    try {
        // Find the user in the database based on the provided email
        const user = await User.findOne({ email });

        if (user.otp !== otp) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ user }, secretKey, { expiresIn: 3000 });
        
        const obj = {
            "token" : token,
            "user" : user,
            "email" : email,
        }
        res.send(obj);
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
});

router.get('/users', async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await User.find();

        // If there are no users, respond with 404 Not Found
        if (!users || users.length === 0) {
            return res.status(404).send({ message: 'No users found' });
        }
        
        // Respond with the list of users
        res.send(users);
    } catch (error) {
        // Handle errors
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});


router.post('/submit', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).send({ message: 'Missing email or password' });
        }

        // Find the user in the database based on the provided email
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }

        // Generate a random 6-digit verification code
        const verificationCode = crypto.randomInt(100000, 999999);

        // Save the verification code to the user's record
        user.otp = verificationCode;
        await user.save();

        // Email options
        const mailOptions = {
            from: {
                name: 'Ricky Vashi',
                address: 'rickyvashi.co20d1@scet.ac.in',
            },
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${verificationCode}`,
            html: `<b>Your OTP code is ${verificationCode}</b>`,
        };

        // Send the OTP email
        // await sendMail(transporter, mailOptions);

        // Generate JWT token
        const token = jwt.sign({ user }, secretKey, { expiresIn: 3000 });

        const obj = {
            token: token,
            user: user,
            email: email,
        };

        res.send(obj);
    } catch (error) {
        console.error("Error in /submit route:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.post('/user', async (req, res) => {
    const { email} = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.send({ message: 'True' });
        }
        res.send({ message: 'False' })
    } catch (error) {
       res.status(500).send("Internal Server Error");
    }
});


module.exports = router;
