const express = require('express');
const router = express.Router();
const DateModel = require('../models/Date'); // Import the DateModel
const moment = require('moment');
const secretKey = "NodeJS"
const jwt = require('jsonwebtoken');    


router.use(express.json());
router.get('/dates', async (req, res) => {
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
                const userName = decoded.user.name;

                // Query documents from the DateModel for the specific user
                const dates = await DateModel.find({ userName });

                if (!dates || dates.length === 0) {
                    return res.status(402).json({ error: 'No data available for this user' });
                } else {
                    return res.json(dates);
                }
            }
        });
    } catch (error) {
        console.error('Error retrieving dates:', error);
        // Send error response
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/add', async (req, res) => {
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
                const userName = decoded.user.name;

                // Extract data from request body
                const { date, present } = req.body;
                console.log(present);

                // Create a new date instance associated with the user
                const newDate = new DateModel({
                    userName,
                    date,
                    present
                });

                console.log(newDate);
                // Save the new date to the database
                await newDate.save();

                // Send success response
                return res.send('Date added successfully');
            }
        });
    } catch (error) {
        console.error('Error adding date:', error);
        // Send error response
        return res.status(500).send('Error adding date');
    }
});


router.get('/count', async (req, res) => {
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
                const userName = decoded.user.name;

                const presentTrueCount = await DateModel.countDocuments({ userName, present: true });
                const presentFalseCount = await DateModel.countDocuments({ userName, present: false });

                return res.json({ presentTrueCount, presentFalseCount });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
});

router.get('/count/:month', async (req, res) => {
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
                const userName = decoded.user.name;

                const monthNumber = req.params.month.padStart(2, '0');
                const startDate = `2024-${monthNumber}-01`;
                const endDate = moment(startDate, 'YYYY-MM-DD').endOf('month').toISOString().substring(0, 10);

                const presentTrueCount = await DateModel.countDocuments({ userName, present: true, date: { $gte: startDate, $lte: endDate } });
                const presentFalseCount = await DateModel.countDocuments({ userName, present: false, date: { $gte: startDate, $lte: endDate } });

                return res.json({ presentTrueCount, presentFalseCount });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
