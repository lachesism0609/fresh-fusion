// routes/menu.js
const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem'); 
const { authenticateJWT, isAdmin } = require('../middleware/authMiddleware');

// Get all menu
router.get('/', async (req, res) => {
  try {
    const menuItems = await MenuItem.find(); 
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching menu items', error });
  }
});

// Post new menu (requires admin authentication)
router.post('/createMenu', authenticateJWT, isAdmin, async (req, res) => {
  try {
    const { title, category, price, description, imageURL, dietaryFlags } = req.body; 
    
    const newMenuItem = new MenuItem({
      title,
      category,
      price,
      description,
      imageURL,
      dietaryFlags,
    });

    const savedMenuItem = await newMenuItem.save();
    res.status(201).json(savedMenuItem); 
  } catch (error) {
    res.status(400).json({ message: 'Error creating menu item', error });
  }
});

// Update the menu (only Admin allowed)
router.put('/updateMenu/:id', authenticateJWT, isAdmin, async (req, res) => {
  const { title, category, price, description, imageURL, dietaryFlags } = req.body;

  if (!title || !category || !price || !description || !imageURL) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const menuItem = await MenuItem.findById(req.params.id);
    
    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    menuItem.title = title;
    menuItem.category = category;
    menuItem.price = price;
    menuItem.description = description;
    menuItem.imageURL = imageURL;
    menuItem.dietaryFlags = dietaryFlags;

    await menuItem.save();
    res.status(200).json({ message: 'Menu updated successfully', data: menuItem });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete the menu (only Admin allowed)
router.delete('/deleteMenu/:id', authenticateJWT, isAdmin, async (req, res, next) => { 
  try {
    const menuItem = await MenuItem.findById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ error: 'Menu item not found' });
    }

    await menuItem.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    next(error); 
  }
});

module.exports = router;



