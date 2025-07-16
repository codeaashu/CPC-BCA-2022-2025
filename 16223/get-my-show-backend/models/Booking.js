const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
  seatsBooked: [{ type: Number, required: true }],
  amountPaid: { type: Number, required: true },
  paymentStatus: { type: String, default: 'completed' },
  paymentId: { type: String }, // optional for demo mode
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
