const express = require('express');
const router = express.Router();
const user = require('../models/user');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

// Endpoint for creating a new user
router.post('/createUser',
    [
        // Validation for name, email, and password
        body('name','Enter a valid name').isLength({ min: 3 }),
        body('email','Enter a valid email').isEmail(),
        body('password','Enter a valid password').isLength({ min: 8 }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        try {
            // Check if a user with the same email exists
            let User = await user.findOne({ email: req.body.email });
            if (User) {
                return res.status(400).json({ error: "User with the same email already exists" });
            }
            
            // Generate a salt and hash the user's password
            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password.toString(), salt);
            
            // Create a new user document
            User = await user.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass,
            });

            // Generate an authentication token
            const data = {
                User: {
                    id: User.id
                }
            };
            const authToken = jwt.sign(data, process.env.JWT_SECRET);
            
            // Respond with the authentication token
            res.json({ authToken });
        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Internal error has occurred" });
        }
    });

// Endpoint for user login
router.post('/login',
    [
        // Validation for email and password
        body('email', "Enter a valid email").isEmail(),
        body('password', "Password cannot be blank").exists(),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            // Find a user by email
            const User = await user.findOne({ email });
            if (!User) {
                return res.status(400).json({ error: "Try to login with correct credentials" });
            }

            // Compare the provided password with the hashed password in the database
            const passwordCompare = await bcrypt.compare(password, User.password);

            if (!passwordCompare) {
                return res.status(400).json({ error: "Try to login with correct credentials" });
            }

            // Generate an authentication token
            const data = {
                User: {
                    id: User.id
                }
            };
            const authToken = jwt.sign(data, process.env.JWT_SECRET);

            // Respond with the authentication token
            res.json({ authToken });

        } catch (error) {
            console.error(error.message);
            res.status(500).json({ error: "Internal error has occurred" });
        }
    });

// Endpoint for getting user details (requires authentication)
router.post('/getUser', fetchUser, async (req, res) => {
    try {
        // Get the user's ID from the authenticated request
        UserId = req.User.id;

        // Find the user by ID, excluding the password field
        const User = await user.findById(UserId).select('-password');

        // Respond with the user details
        res.json({ User });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Internal error has occurred" });
    }
});

module.exports = router;
