// models/MenuItem.js
const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }, // optional
  dietaryFlags: [String], // optional, e.g., ['vegan', 'gluten-free']
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
