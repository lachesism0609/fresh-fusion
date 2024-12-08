
const app = require('./app');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const config = require('./utils/config'); // config

const port = process.env.PORT || 5000;

const orderRoutes = require('./routes/orders');
const menuRoutes = require('./routes/menu');
const authRoutes = require('./routes/auth');


app.use(cors());
app.use(express.json());

//  MongoDB
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to SushiLover - MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error.message);
  });

// routes
app.use('/api/orders', orderRoutes);
app.use('/api/menu', menuRoutes);
app.use('/auth',authRoutes);


// Server Listen
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
