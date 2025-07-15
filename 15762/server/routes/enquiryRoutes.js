const express = require('express');
const router = express.Router();
const {
    createEnquiry,
    getAllEnquiries,
    getEnquiryById,
    updateEnquiry,
    markAsRead,
    deleteEnquiry,
    getEnquiryStats
} = require('../controllers/enquiryController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.post('/', createEnquiry);

// Admin routes (protected)
router.get('/', protect, admin, getAllEnquiries);
router.get('/stats', protect, admin, getEnquiryStats);
router.get('/:id', protect, admin, getEnquiryById);
router.put('/:id', protect, admin, updateEnquiry);
router.patch('/:id/read', protect, admin, markAsRead);
router.delete('/:id', protect, admin, deleteEnquiry);

module.exports = router; 