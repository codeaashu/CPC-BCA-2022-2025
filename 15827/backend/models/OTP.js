const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true,
    length: 6
  },
  type: {
    type: String,
    enum: ['account_verification', 'password_reset'],
    required: true
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    required: true,
    default: function() {
      // OTP expires in 10 minutes
      return new Date(Date.now() + 10 * 60 * 1000);
    }
  }
}, {
  timestamps: true
});

// Index for faster queries
otpSchema.index({ email: 1, type: 1 });
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Generate OTP
otpSchema.statics.generateOTP = function() {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Check if OTP is valid
otpSchema.methods.isValid = function() {
  return !this.isUsed && new Date() < this.expiresAt;
};

// Mark OTP as used
otpSchema.methods.markAsUsed = function() {
  this.isUsed = true;
  return this.save();
};

// Find valid OTP
otpSchema.statics.findValidOTP = function(email, type) {
  return this.findOne({
    email: email.toLowerCase(),
    type: type,
    isUsed: false,
    expiresAt: { $gt: new Date() }
  }).sort({ createdAt: -1 });
};

// Clean expired OTPs
otpSchema.statics.cleanExpiredOTPs = async function() {
  return this.deleteMany({
    expiresAt: { $lt: new Date() }
  });
};

module.exports = mongoose.model('OTP', otpSchema); 