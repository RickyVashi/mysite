const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/register', function(req, res) {
    res.render('register', { message: req.flash('message') });
});

router.post('/register', async function(req, res) {
    console.log("I am here");
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            return res.status(400).send({ message: 'Missing email or password or name' });
        }

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Email is already in use, set a flash message
            return res.status(400).send({ message: 'Email is alredy use by someone' });
        }

        // Create a new user in MongoDB
        const newUser = new User({ name, email, password });
        await newUser.save();

        return res.send(`${name} , Your Registation is successfull`);;
    } catch (error) {

        return res.status(400).send({ error });
    }
});

module.exports = router;
