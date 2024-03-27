// forget.js

const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model
const secretKey = "NodeJS"
const jwt = require('jsonwebtoken');

router.get('/forget', function (req, res) {
  // Render the forget password form
  res.render('forget',{ message: req.flash('message') });
});

router.post('/forget', async function (req, res) {
  
  const { email, password } = req.body;
 
  try {
    // Check if the email is already registered
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      // Email is not registered, set a flash message
      return res.status(400).send({message:"Email is not registered yet.."});
    }

    // Update the password with the new one (not recommended without proper hashing)
    existingUser.password = password;
    await existingUser.save();
   
    return res.send("Password reset successfully");

  } catch (error) {
    
    return res.status(400).send(error);
  }
});

router.post('/editProfile', async (req, res) => {
  try {
      const userToken = req.headers['authorization'];

      if (!userToken) {
          return res.status(401).json({ error: 'Token is missing' });
      }

      const tokenParts = userToken.split(' ');
      const token = tokenParts[1];

      jwt.verify(token, secretKey, async (err, decoded) => {
          if (err) {
              console.error('Error decoding token:', err);
              return res.status(401).json({ error: 'Unauthorized' });
          } else {
              const userID = decoded.user._id;

              const existingUser = await User.findOne({ _id : userID });

              // Extract data from request body
              const { name, email } = req.body;

              existingUser.name = name;
              existingUser.email = email;

              // Save the new date to the database
              await existingUser.save();

              // Send success response
              return res.send('Edited successfully');
          }
      });
  } catch (error) {
      console.error(error);
      // Send error response
      return res.status(500).send('Error adding date');
  }
});

module.exports = router;
