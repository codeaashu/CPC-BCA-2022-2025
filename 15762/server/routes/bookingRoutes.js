const express = require('express');
const router = express.Router();
const {
    createBooking,
    getAllBookings,
    getActiveRentals,
    getBookingById,
    updateBookingStatus,
    cancelBooking,
    getBookingStats,
    getUserBookings,
    requestCancellation
} = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Public routes (require authentication)
router.post('/', protect, upload.single('paymentScreenshot'), createBooking);
router.get('/user', protect, getUserBookings);

// New: Get unavailable date ranges for a product
router.get('/product/:productId/unavailable', async (req, res) => {
    try {
        const bookings = await require('../models/Booking').find({
            product: req.params.productId,
            status: { $in: ['pending', 'confirmed', 'active'] }
        }, 'startDate endDate');
        const unavailable = bookings.map(b => ({ startDate: b.startDate, endDate: b.endDate }));
        res.json({ unavailable });
    } catch (err) {
        res.status(500).json({ msg: 'Failed to fetch unavailable dates' });
    }
});

// Admin routes (protected)
router.get('/', protect, admin, getAllBookings);
router.get('/active', protect, admin, getActiveRentals);
router.get('/stats', protect, admin, getBookingStats);
router.get('/:id', protect, admin, getBookingById);
router.put('/:id/status', protect, admin, updateBookingStatus);
router.delete('/:id', protect, admin, cancelBooking);

// User route for requesting cancellation
router.put('/:id/request-cancellation', protect, requestCancellation);

module.exports = router;