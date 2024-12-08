const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Create new order
router.post('/', auth, orderController.createOrder);

// Get user's orders
router.get('/my-orders', auth, orderController.getUserOrders);

// Update order status (admin only)
router.put('/:id', [auth, admin], orderController.updateOrderStatus);

// Get all orders (admin only)
router.get('/', [auth, admin], orderController.getAllOrders);

module.exports = router;
