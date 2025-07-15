const OTP = require('../models/OTP');
const User = require('../models/User');
const { sendEmail } = require('../config/email');
const jwt = require('jsonwebtoken');

// @desc    Send OTP for account verification
// @route   POST /api/otp/send-verification
// @access  Public
const sendVerificationOTP = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ message: 'Email and name are required' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    // Generate OTP
    const otp = OTP.generateOTP();

    // Save OTP to database
    await OTP.create({
      email: email.toLowerCase(),
      otp: otp,
      type: 'account_verification'
    });

    // Send email
    const emailResult = await sendEmail(email, 'accountVerification', {
      otp: otp,
      userName: name
    });

    if (!emailResult.success) {
      return res.status(500).json({ message: 'Failed to send verification email' });
    }

    res.status(200).json({ 
      message: 'Verification code sent to your email',
      email: email
    });

  } catch (error) {
    console.error('Send verification OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify OTP for account creation
// @route   POST /api/otp/verify-account
// @access  Public
const verifyAccountOTP = async (req, res) => {
  try {
    const { email, otp, name, password } = req.body;

    if (!email || !otp || !name || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find valid OTP
    const otpRecord = await OTP.findValidOTP(email, 'account_verification');
    
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired verification code' });
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid verification code' });
    }

    // Mark OTP as used
    await otpRecord.markAsUsed();

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      isEmailVerified: true,
      emailVerifiedAt: new Date()
    });

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    );

    res.status(201).json({
      message: 'Account created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isEmailVerified: user.isEmailVerified
      },
      token
    });

  } catch (error) {
    console.error('Verify account OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Send OTP for password reset
// @route   POST /api/otp/send-reset
// @access  Public
const sendPasswordResetOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = OTP.generateOTP();

    // Save OTP to database
    await OTP.create({
      email: email.toLowerCase(),
      otp: otp,
      type: 'password_reset'
    });

    // Send email
    const emailResult = await sendEmail(email, 'passwordReset', {
      otp: otp,
      userName: user.name
    });

    if (!emailResult.success) {
      return res.status(500).json({ message: 'Failed to send reset email' });
    }

    res.status(200).json({ 
      message: 'Password reset code sent to your email',
      email: email
    });

  } catch (error) {
    console.error('Send password reset OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Verify OTP and reset password
// @route   POST /api/otp/verify-reset
// @access  Public
const verifyPasswordResetOTP = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find valid OTP
    const otpRecord = await OTP.findValidOTP(email, 'password_reset');
    
    if (!otpRecord) {
      return res.status(400).json({ message: 'Invalid or expired reset code' });
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ message: 'Invalid reset code' });
    }

    // Find user
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Mark OTP as used
    await otpRecord.markAsUsed();

    // Update password
    user.password = newPassword;
    await user.save();

    res.status(200).json({ 
      message: 'Password reset successfully'
    });

  } catch (error) {
    console.error('Verify password reset OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Resend OTP
// @route   POST /api/otp/resend
// @access  Public
const resendOTP = async (req, res) => {
  try {
    const { email, type, name } = req.body;

    if (!email || !type) {
      return res.status(400).json({ message: 'Email and type are required' });
    }

    // Delete existing OTPs for this email and type
    await OTP.deleteMany({ 
      email: email.toLowerCase(), 
      type: type 
    });

    // Generate new OTP
    const otp = OTP.generateOTP();

    // Save new OTP
    await OTP.create({
      email: email.toLowerCase(),
      otp: otp,
      type: type
    });

    // Send email
    let emailResult;
    if (type === 'account_verification') {
      emailResult = await sendEmail(email, 'accountVerification', {
        otp: otp,
        userName: name || 'User'
      });
    } else if (type === 'password_reset') {
      const user = await User.findOne({ email: email.toLowerCase() });
      emailResult = await sendEmail(email, 'passwordReset', {
        otp: otp,
        userName: user ? user.name : 'User'
      });
    }

    if (!emailResult.success) {
      return res.status(500).json({ message: 'Failed to send email' });
    }

    res.status(200).json({ 
      message: 'New verification code sent to your email',
      email: email
    });

  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  sendVerificationOTP,
  verifyAccountOTP,
  sendPasswordResetOTP,
  verifyPasswordResetOTP,
  resendOTP
}; 