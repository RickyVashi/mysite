const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/register', function(req, res) {
    res.render('register', { message: req.flash('message') });
});

router.post('/register', async function(req, res) {
    const { name, email, password } = req.body;

    try {
        if (!name || !email || !password) {
            req.flash('message', 'Missing registration details');
            return res.redirect('/register');
        }

        // Check if the email is already in use
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Email is already in use, set a flash message
            req.flash('message', 'Email is already in use.');
            return res.redirect('/register');
        }

        // Create a new user in MongoDB
        const newUser = new User({ name, email, password });
        await newUser.save();

        req.flash('message', 'Register SuccessFully');

        // Registration successful, you might want to redirect to a login page
        return res.redirect('/'); // Change '/login' to the actual login route

    } catch (error) {
        console.error('Error during registration:', error);
        // Handle other errors (e.g., render an error page)
        req.flash('message', 'An error occurred during registration.');
        return res.redirect('/register');
    }
});

module.exports = router;
