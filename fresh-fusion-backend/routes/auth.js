require('dotenv').config();

const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authenticateJWT } = require('../middleware/authMiddleware');

// router.post('/register', async (req, res) => {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).json({ error: 'All fields are required' });
//     }
    
//     try {
//       // Check for duplicate email addresses
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ error: 'Email already exists' });
//       }
    
//       const user = new User({ username, email, password }); // Use username, email instead of name, email
//       await user.save();
//       res.status(201).json({ message: 'User registered successfully' });
//     } catch (error) {
//       if (error.code === 11000) {
//         return res.status(400).json({ error: 'Email already exists' });
//       }
//       res.status(500).json({ error: 'Server error', details: error.message });
//     }
// });

router.post('/register', async (req, res) => {
  const { name, email, username, password } = req.body;

  try {
    // Validate input
    if (!name || !email || !username || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
  
    const userRole = role && role === 'admin' ? 'admin' : 'user';
  
    try {
    
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
  

    // Check existing user
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    if (existingUser) {
      return res.status(400).json({ 
        error: 'Email or username already exists' 
      });
    }

    const user = new User({ name, email, username, password });
    await user.save();

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ 
      $or: [{ email: username }, { username }] 
    });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/profile', authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

  router.post('/admin-route', authenticateJWT, isAdmin, (req, res) => {
    res.status(200).send('Admin access granted');
  });

// Delete user (admin only)
router.delete('/deleteUser/:id', authenticateJWT, isAdmin, deleteUser);


module.exports = router;