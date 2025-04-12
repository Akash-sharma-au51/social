const express = require('express')
const jwt = require('jsonwebtoken');
const User = require('../models/userModal');

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({
                message: "No token provided",
                success: false
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find user by id
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }

        // Attach user to request object
        req.user = user;
        req.token = token;
        
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                message: "Token expired",
                success: false
            });
        }
        return res.status(500).json({
            message: "Authentication failed",
            success: false,
            error: error.message
        });
    }
};

module.exports = auth;
