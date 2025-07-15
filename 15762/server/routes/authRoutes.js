const express = require('express');
const router = express.Router();
const { registerUser, loginUser, sendResetOTP,
    verifyOTP,
    resetPassword,
    getCurrentUser,
    updateCurrentUser } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/send-reset-otp', sendResetOTP);
router.post('/verify-otp', verifyOTP);
router.post('/reset-password', resetPassword);
router.get('/me', protect, getCurrentUser);
router.put('/me', protect, updateCurrentUser);

module.exports = router;
