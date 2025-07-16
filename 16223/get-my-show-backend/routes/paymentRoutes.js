// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createOrder } = require('../controllers/paymentController');

router.post('/order', createOrder);

module.exports = router;
