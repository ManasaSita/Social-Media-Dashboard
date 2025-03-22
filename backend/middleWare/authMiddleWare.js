const express = require("express");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// Middleware for validating and processing signup requests
const signupMiddleware = [
    body("userName").trim().notEmpty().withMessage("Username is required."),
    body("email").isEmail().withMessage("Invalid email format."),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters."),
    
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                message: "Validation failed",
                errors: errors.array() 
            });
        }
        
        try {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
            next();
        } catch (err) {
            res.status(500).json({ success: false, message: "Server error." });
        }
    }
];

// Middleware for validating login requests
const loginMiddleware = [
    body("email").isEmail().withMessage("Invalid email format."),
    body("password").notEmpty().withMessage("Password is required."),
    
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        next();
    }
];

module.exports = { signupMiddleware, loginMiddleware };