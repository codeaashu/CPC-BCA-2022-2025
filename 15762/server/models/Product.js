
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    category: String,
    pricePerDay: Number,
    images: [String],
    availableFrom: Date,
    approved: { type: Boolean, default: false },
    availableTo: Date,
    termsAccepted: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
