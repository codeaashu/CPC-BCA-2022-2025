// models/Attendance.js
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  date: String,
  facultyId: String, // ✅ Match this key name
  status: { type: String, enum: ['Present', 'Absent'] },
  classesTaken: String,
  remarks: String,
});

module.exports = mongoose.model('Attendance', attendanceSchema);
