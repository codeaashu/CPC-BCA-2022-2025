const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const crypto = require('crypto');
const nodemailer = require('nodemailer');


exports.registerUser = async (req, res) => {
  try {
    const { name, password, mobile } = req.body;
    const email = req.body.email.toLowerCase();
    const userExists = await User.findOne({ email });

    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashedPassword, mobile });

    res.status(201).json({ msg: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// exports.sendResetOTP = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'User not found' });

//     const otp = generateOTP();
//     user.resetOTP = otp;
//     user.otpExpires = Date.now() + 10 * 60 * 1000; // expires in 10 min
//     await user.save();

//     await sendEmail(user.email, 'Your OTP for Password Reset', `Your OTP is: ${otp}`);

//     res.json({ msg: 'OTP sent to your email' });
//   } catch (err) {
//     res.status(500).json({ msg: 'Server error' });
//   }
// };

exports.sendResetOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Convert to string
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min validity

    // Save to DB
    user.resetOTP = otp;
    user.otpExpires = otpExpiry;
    await user.save();

    // Send OTP via Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"BorrowBuddy" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: 'OTP for Password Reset',
      html: `<h3>Your OTP is: <strong>${otp}</strong></h3><p>It is valid for 10 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: 'OTP sent successfully to your email' });
  } catch (err) {
    console.error('Send OTP Error:', err);
    res.status(500).json({ msg: 'Server error while sending OTP' });
  }
};

exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    console.log('Verifying OTP:', { email: email.toLowerCase(), otp, otpType: typeof otp });

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log('User not found for email:', email.toLowerCase());
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    console.log('User found:', {
      userEmail: user.email,
      storedOTP: user.resetOTP,
      storedOTPType: typeof user.resetOTP,
      otpExpires: user.otpExpires,
      currentTime: new Date(),
      isExpired: user.otpExpires < new Date()
    });

    // Convert both OTPs to strings for comparison
    const storedOTP = user.resetOTP ? user.resetOTP.toString() : null;
    const inputOTP = otp ? otp.toString() : null;

    if (!user.resetOTP || storedOTP !== inputOTP || user.otpExpires < new Date()) {
      console.log('OTP verification failed:', {
        hasStoredOTP: !!user.resetOTP,
        storedOTP,
        inputOTP,
        otpMatch: storedOTP === inputOTP,
        isExpired: user.otpExpires < new Date()
      });
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    console.log('OTP verified successfully');
    res.json({ msg: 'OTP verified successfully' });
  } catch (err) {
    console.error('Verify OTP Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    // Convert both OTPs to strings for comparison
    const storedOTP = user.resetOTP ? user.resetOTP.toString() : null;
    const inputOTP = otp ? otp.toString() : null;

    if (!user.resetOTP || storedOTP !== inputOTP || user.otpExpires < new Date()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOTP = null;
    user.otpExpires = null;
    await user.save();

    res.json({ msg: 'Password reset successfully' });
  } catch (err) {
    console.error('Reset Password Error:', err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get current user info
exports.getCurrentUser = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: 'Not authorized' });
    // Return user info (excluding password)
    const { _id, name, email, mobile, address, role } = req.user;
    res.json({ id: _id, name, email, mobile, address, role });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateCurrentUser = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ msg: 'Not authorized' });
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email.toLowerCase();
    if (req.body.mobile) updates.mobile = req.body.mobile;
    if (req.body.address) updates.address = req.body.address;
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true });
    if (!user) return res.status(404).json({ msg: 'User not found' });
    const { _id, name, email, mobile, address, role } = user;
    res.json({ id: _id, name, email, mobile, address, role });
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update profile' });
  }
};
