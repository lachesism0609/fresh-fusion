//app.js
const config = require('./utils/config')
const express = require('express')
const menu = require('./routes/menu')
const mongoose = require('mongoose')

const app = express()

// middleware
app.use(express.static('./public'))
app.use(express.json())

// album router
app.use('/api/menu', menu)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to SushiLover - MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

module.exports = app
