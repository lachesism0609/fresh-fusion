const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');
const config = require('../utils/config');

const menuItems = [
  {
    title: "Salmon Nigiri",
    category: "Nigiri",
    price: 8.99,
    description: "Fresh salmon on hand-pressed rice",
    imageUrl: "https://example.com/salmon-nigiri.jpg",
    dietaryFlags: ["pescatarian"],
    stock: 50,
    ingredients: ["salmon", "rice", "wasabi"],
    popularity: 5,
    isSpecial: true
  },
  {
    title: "California Roll",
    category: "Maki",
    price: 7.99,
    description: "Crab meat, avocado, and cucumber roll",
    imageUrl: "https://example.com/california-roll.jpg",
    dietaryFlags: ["pescatarian"],
    stock: 40,
    ingredients: ["crab meat", "avocado", "cucumber", "rice", "nori"],
    popularity: 4,
    isSpecial: false
  },
  {
    title: "Vegetable Tempura",
    category: "Appetizers",
    price: 6.99,
    description: "Assorted vegetables in crispy tempura batter",
    imageUrl: "https://example.com/veg-tempura.jpg",
    dietaryFlags: ["vegetarian"],
    stock: 30,
    ingredients: ["sweet potato", "broccoli", "carrot", "tempura batter"],
    popularity: 3,
    isSpecial: false
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(config.MONGODB_URI);
    
    // Clear existing data
    await MenuItem.deleteMany({});
    
    // Insert menu items
    await MenuItem.insertMany(menuItems);
    
    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();