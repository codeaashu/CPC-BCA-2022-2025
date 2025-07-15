const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalDays: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled', 'cancellation_requested'],
        default: 'pending'
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'refunded'],
        default: 'pending'
    },
    pickupLocation: {
        type: String
    },
    returnLocation: {
        type: String
    },
    adminNotes: {
        type: String
    },
    customerNotes: {
        type: String
    },
    // New fields for manual payment booking
    address: {
        type: String
    },
    phone: {
        type: String
    },
    transactionId: {
        type: String
    },
    paymentScreenshot: {
        type: String // URL to uploaded screenshot (Cloudinary)
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
