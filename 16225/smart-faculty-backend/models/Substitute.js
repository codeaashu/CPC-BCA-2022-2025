// model/Substitute.js
const mongoose = require('mongoose');

const substituteSchema = new mongoose.Schema({
  date: String,                 // e.g., 03-07-2025
  className: String,           // e.g., BCA
  batch: String,               // e.g., AKU Batch 1
  subject: String,             // e.g., Mathematics
  originalFaculty: String,     // e.g., F001
  substituteFaculty: String    // e.g., F002
});

module.exports = mongoose.model('Substitute', substituteSchema);
