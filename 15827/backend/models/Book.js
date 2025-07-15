const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    trim: true
  },
  publishedYear: {
    type: Number,
    required: [true, 'Published year is required']
  },
  totalCopies: {
    type: Number,
    required: [true, 'Total copies is required'],
    min: [1, 'Total copies must be at least 1']
  },
  availableCopies: {
    type: Number,
    required: [true, 'Available copies is required'],
    min: [0, 'Available copies cannot be negative']
  },
  location: {
    type: String,
    trim: true
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  minStock: {
    type: Number,
    default: 1,
    min: [0, 'Minimum stock cannot be negative']
  }
});

// Update the updatedAt field before saving
bookSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create text index for search functionality
bookSchema.index({ title: 'text', author: 'text', description: 'text' });

module.exports = mongoose.model('Book', bookSchema); 