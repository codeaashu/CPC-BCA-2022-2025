const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bookIssue: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookIssue',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'USD'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'paypal', 'stripe', 'upi', 'cash'],
    required: true
  },
  paymentSlip: {
    type: String, // file path
  },
  transactionId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'failed'],
    default: 'pending'
  },
  type: {
    type: String,
    enum: ['borrow', 'fine'],
    required: true
  },
  fineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BookIssue', // for fine payments, reference the BookIssue
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: 'Book request payment'
  },
  metadata: {
    type: Map,
    of: String
  }
}, {
  timestamps: true
});

// Generate transaction ID
paymentSchema.pre('save', function(next) {
  if (!this.transactionId) {
    this.transactionId = 'TXN_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
  }
  next();
});

module.exports = mongoose.model('Payment', paymentSchema); 