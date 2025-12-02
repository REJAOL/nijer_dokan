
const { createOrder, getAllOrders, getOrderById } = require('../controllers/Order.js');
const express = require('express');
const router = express.Router();


router.post('/create', createOrder);
router.get('/', getAllOrders);
router.get('/:id', getOrderById);

module.exports = router;