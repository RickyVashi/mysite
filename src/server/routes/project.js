const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const secretKey = "NodeJS"
const jwt = require('jsonwebtoken');

router.use(express.json());

router.get('/projects', async (req, res) => {
    const role = req.headers['teacher-flag'] === 'true';
    console.log(role);
    const userToken = req.headers['authorization'];

    if (userToken) {
        const tokenParts = userToken.split(' ');
        const token = tokenParts[1];

        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                console.error('Error decoding token:', err);
                return res.status(401).json({ error: 'Unauthorized' });
            } else {
                const userData = decoded.user;
                
                try {
                    let projects;
                    if(!role){
                        projects = await Project.find({ userName: userData.name });
                    }
                    else{
                        projects = await Project.find();
                    }
                    
                    if (!projects || projects.length === 0) {
                        return res.status(402).json({ error: 'No projects available for this user' });
                    } else {
                        console.log("Here");
                        return res.json(projects);
                    }
                } catch (error) {
                    console.error('Error retrieving projects:', error);
                    return res.status(500).json({ error: 'Internal server error' });
                }
            }
        });
    } else {
        return res.status(401).json({ error: 'Token is missing' });
    }
});

router.post('/addproject', async (req, res) => {
    try {
        // Extract data from request body
        const { title, description, image, from_date, to_date } = req.body;
        const user = req.headers['authorization'];

        // Extract the token from the Authorization header
        const tokenParts = user.split(' ');
        const token = tokenParts[1];

        let userName;
        jwt.verify(token, secretKey, (err, decoded) => {
            if (err) {
                // Token is invalid or expired
                console.error('Error decoding token:', err);
                // Handle unauthorized access (e.g., send a 401 response)
                return res.status(401).json({ error: 'Unauthorized' });
            } else {
                // Token is valid, and decoded contains the payload
                console.log(decoded);
                userName = decoded.user.name; // Decoded JWT payload
                console.log(userName);
            }
        })

        if (!title || !description || !image || !from_date || !to_date) {
            return res.status(402).send('Missing project details');
        }

        // Create a new project instance
        const newProject = new Project({
            userName,
            title,
            description,
            image,
            from_date,
            to_date
        });

        console.log(newProject);
        // Save the new project to the database
        await newProject.save();

        // Send success response
        return res.send("Project added successfully");

    } catch (error) {
        console.error('Error adding project:', error);
        // Send error response
        return res.status(500).send("Error adding project");
    }
});

module.exports = router;
