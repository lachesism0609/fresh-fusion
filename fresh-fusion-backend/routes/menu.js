// routes/menu.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem'); 

// Get all menu
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); 
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
});

// Post new menu
router.post('/createMenu', async (req, res) => {
  try {
    const { name, category, price, description, imageURL, dietaryFlags } = req.body; 

    
    const newMenuItem = new MenuItem({
      name,
      category,
      price,
      description,
      imageURL,
      dietaryFlags,
    });

   
    const savedMenuItem = await newMenuItem.save();

    res.status(201).json(savedMenuItem); 
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error }); // Error handle
  }
});

module.exports = router;


