const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    mobile: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['customer', 'lender', 'admin'],
        default: 'customer'
    },
    resetOTP: String,
    otpExpires: Date
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
