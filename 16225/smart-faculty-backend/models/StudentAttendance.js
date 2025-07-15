//MODELS StudentAttendance
// models/StudentAttendance.js
const mongoose = require('mongoose');

const studentAttendanceSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true, // Unique student identifier
  },
  date: {
    type: String, // Format: "DD-MM-YYYY"
    required: true,
  },
  batch: {
    type: String,
    required: true, // e.g., "AKU Batch 1"
  },
  className: {
    type: String,
    required: true, // e.g., "BCA"
  },
  subject: {
    type: String,
    required: true,
  },
  facultyTaught: {
    type: String,
    required: true,
  },
  studentsPresent: {
    type: Number,
    required: true,
    min: [0, 'Present count cannot be negative'],
  },
  totalStudents: {
    type: Number,
    required: true,
    min: [1, 'Total students must be at least 1'],
  },
  studentsAbsent: {
    type: Number,
    required: true,
    min: [0, 'Absent count cannot be negative'],
  },
  classHeld: {
    type: String,
    enum: ['Yes', 'No'],
    required: true,
  }
});

module.exports = mongoose.model('StudentAttendance', studentAttendanceSchema);
