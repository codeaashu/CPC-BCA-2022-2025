const express = require('express');
const { registerUser, loginUser, resetPassword, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.get('/profile', protect, getUserProfile);

module.exports = router; 