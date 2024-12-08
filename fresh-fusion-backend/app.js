<<<<<<< Updated upstream
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./utils/config');
const menuRoutes = require('./routes/menu');
const orderRoutes = require('./routes/orders');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to SushiLover - MongoDB');
});

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;
=======
//app.js
const express = require('express');
const menu = require('./routes/menu');
const mongoose = require('mongoose');
const config = require('./utils/config'); // 导入配置

const app = express();

// middleware
app.use(express.static('./public'));
app.use(express.json());

// menu router
app.use('/api/menu', menu);

// 导出 app
module.exports = app;

>>>>>>> Stashed changes
