const mongoose = require('mongoose');
const { FINE_PER_DAY } = require('../config/database');

const bookIssueSchema = new mongoose.Schema({
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
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  issuedDate: {
    type: Date,
    default: Date.now
  },
  dueDate: {
    type: Date,
    required: true
  },
  returnDate: {
    type: Date
  },
  returnedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'issued', 'returned', 'overdue'],
    default: 'pending'
  },
  fine: {
    type: Number,
    default: 0
  },
  finePaid: {
    type: Boolean,
    default: false
  },
  finePaidDate: {
    type: Date
  },
  fineAmount: {
    type: Number,
    default: 0
  },
  notes: {
    type: String,
    trim: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Calculate fine if book is overdue or returned late
bookIssueSchema.methods.calculateFine = function() {
  const now = new Date();
  let daysLate = 0;
  
  if (this.returnDate) {
    // Book has been returned - calculate fine based on return date
    if (this.returnDate > this.dueDate) {
      daysLate = Math.ceil((this.returnDate - this.dueDate) / (1000 * 60 * 60 * 24));
    }
  } else if (this.status === 'issued' || this.status === 'overdue') {
    // Book is still out - calculate fine based on current date
    if (now > this.dueDate) {
      daysLate = Math.ceil((now - this.dueDate) / (1000 * 60 * 60 * 24));
    }
  }
  
  this.fineAmount = daysLate * FINE_PER_DAY;
  return this.fineAmount;
};

// Check if book is overdue and update status
bookIssueSchema.methods.checkOverdue = function() {
  if (this.status === 'issued' && new Date() > this.dueDate) {
    this.status = 'overdue';
    this.calculateFine();
    return true;
  }
  return false;
};

// Get days overdue
bookIssueSchema.methods.getDaysOverdue = function() {
  if (this.status === 'issued' || this.status === 'overdue') {
    const now = new Date();
    if (now > this.dueDate) {
      return Math.ceil((now - this.dueDate) / (1000 * 60 * 60 * 24));
    }
  }
  return 0;
};

// Mark fine as paid
bookIssueSchema.methods.markFinePaid = function() {
  this.finePaid = true;
  this.finePaidDate = new Date();
  this.paymentStatus = 'paid';
  return this;
};

// Pre-save middleware to automatically calculate fine
bookIssueSchema.pre('save', function(next) {
  if (this.isModified('status') || this.isModified('returnDate')) {
    this.calculateFine();
  }
  next();
});

module.exports = mongoose.model('BookIssue', bookIssueSchema); 