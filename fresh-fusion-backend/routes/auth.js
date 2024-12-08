//routes/auth.js
require('dotenv').config();

const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { login } = require('../controllers/authController');
const bcrypt = require('bcryptjs');

const router = express.Router();



router.post('/register', async (req, res) => {
  const { name, email, password} = req.body;

  if (!name || !email || !password ) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    //  check for duplicate email addresses
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    res.status(500).json({ error: 'Server error' });
  }
});

// Login 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // 比较密码
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
  
      // 生成 JWT token
      const token = jwt.sign({ userId: user._id ,username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  
      res.status(200).json({ msg:'user created', token });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  });

module.exports = router;