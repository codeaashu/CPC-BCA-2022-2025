const express = require('express');
const router = express.Router();
const {
  sendVerificationOTP,
  verifyAccountOTP,
  sendPasswordResetOTP,
  verifyPasswordResetOTP,
  resendOTP
} = require('../controllers/otpController');

// Send OTP for account verification
router.post('/send-verification', sendVerificationOTP);

// Verify OTP and create account
router.post('/verify-account', verifyAccountOTP);

// Send OTP for password reset
router.post('/send-reset', sendPasswordResetOTP);

// Verify OTP and reset password
router.post('/verify-reset', verifyPasswordResetOTP);

// Resend OTP
router.post('/resend', resendOTP);

module.exports = router; 