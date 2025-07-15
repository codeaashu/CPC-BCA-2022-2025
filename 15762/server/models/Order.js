
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        rentDays: Number
    }],
    totalAmount: Number,
    status: {
        type: String,
        default: 'Pending',
        enum: ['Pending', 'Confirmed', 'Cancelled']
    },
    paymentId: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
