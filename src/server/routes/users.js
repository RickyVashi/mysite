const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = "NodeJS";

router.post('/submit', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            req.flash('message', 'Missing email or password');
            return res.redirect('/');
        }

        // Find the user in the database based on the provided email
        const user = await User.findOne({ email });

        if (!user || user.password !== password) {
            req.flash('message', 'Invalid email or password');
            return res.redirect('/');
        }

        const token = jwt.sign({ user }, secretKey, { expiresIn: 3000 });
        
        const obj = {
            "token" : token,
            "user" : user
        }
        res.send(obj)
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
