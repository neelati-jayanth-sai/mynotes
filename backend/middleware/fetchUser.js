// Import necessary modules
require('dotenv').config(); // Load environment variables
const jwt = require('jsonwebtoken'); // JSON Web Token library

// Middleware function to fetch and verify user data from JWT token
const fetchUser = (req, res, next) => {
    // Retrieve the authentication token from the 'auth-token' header
    const token = req.header('auth-token');
    
    // Check if the token is missing
    if (!token) {
        // Respond with a 401 (Unauthorized) status and an error message
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }

    try {
        // Verify the authenticity of the token using the JWT secret key
        const data = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach the user data from the token to the 'req' object
        req.User = data.User;
        
        // Move on to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, respond with a 401 status and an error message
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
};

// Export the 'fetchUser' middleware for use in other parts of the application
module.exports = fetchUser;
