const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'notified', 'fulfilled', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  notifiedAt: {
    type: Date
  },
  fulfilledAt: {
    type: Date
  },
  cancelledAt: {
    type: Date
  }
});

module.exports = mongoose.model('Reservation', reservationSchema); 