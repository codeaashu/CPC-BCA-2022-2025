const express = require('express');
const router = express.Router();
const { bookTicket, getUserBookings } = require('../controllers/bookingController');

router.post('/', bookTicket);
router.get('/:userId', getUserBookings);

module.exports = router;
