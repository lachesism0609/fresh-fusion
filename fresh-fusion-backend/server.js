const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const config = require('./utils/config');
const menuRoutes = require('./routes/menu');
const port = config.PORT || 5000;

const orderRoutes = require('./routes/orders');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(config.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected to SushiLover - MongoDB');
});

app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

