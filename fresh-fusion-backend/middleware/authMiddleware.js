//middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // 

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    req.userId = decoded.userId; // User ID added to req
    req.role = decoded.role; // role added to req
    next(); // if success, next
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

// Admin role
const isAdmin = (req, res, next) => {
  if (req.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied, admin only' });
  }
  next();
};

module.exports = { authenticateJWT, isAdmin };
