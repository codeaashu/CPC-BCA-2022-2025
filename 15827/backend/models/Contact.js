const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    enum: ['general', 'technical', 'billing', 'feedback', 'other'],
    default: 'general'
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    minlength: [10, 'Message must be at least 10 characters long'],
    maxlength: [1000, 'Message cannot exceed 1000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'in_progress', 'resolved', 'closed'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  adminNotes: {
    type: String,
    trim: true,
    maxlength: [500, 'Admin notes cannot exceed 500 characters']
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resolvedAt: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Update the updatedAt field before saving
contactSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for formatted subject display
contactSchema.virtual('subjectDisplay').get(function() {
  const subjectMap = {
    'general': 'General Inquiry',
    'technical': 'Technical Support',
    'billing': 'Billing Question',
    'feedback': 'Feedback',
    'other': 'Other'
  };
  return subjectMap[this.subject] || this.subject;
});

// Virtual for priority color
contactSchema.virtual('priorityColor').get(function() {
  const colorMap = {
    'low': '#10b981',
    'medium': '#f59e0b',
    'high': '#ef4444',
    'urgent': '#dc2626'
  };
  return colorMap[this.priority] || '#6b7280';
});

// Virtual for status color
contactSchema.virtual('statusColor').get(function() {
  const colorMap = {
    'new': '#3b82f6',
    'in_progress': '#f59e0b',
    'resolved': '#10b981',
    'closed': '#6b7280'
  };
  return colorMap[this.status] || '#6b7280';
});

module.exports = mongoose.model('Contact', contactSchema); 