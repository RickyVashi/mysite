const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const secretKey = "NodeJS";


router.get('/users', async (req, res) => {
    try {
        console.log("Hello");
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

        const token = jwt.sign({ user }, secretKey, { expiresIn: 3000 });
        
        const obj = {
            "token" : token,
            "user" : user,
            "email" : email
        }
        res.send(obj)
    } catch (error) {
       res.status(500).send("Internal Server Error");
    }
});

module.exports = router;
