//attendanceRoutes.js
const express = require('express');
const router = express.Router();

const {
  submitFacultyAttendance,
  getFacultyAttendanceHistory
} = require('../controllers/facultyAttendanceController');

const {
  submitStudentAttendance,
  getStudentAttendanceHistory
} = require('../controllers/studentAttendanceController');

// Faculty attendance
router.post('/faculty', submitFacultyAttendance);
router.get('/faculty/:facultyID', getFacultyAttendanceHistory); // ✅ For Faculty Dashboard

// Student attendance
router.post('/student', submitStudentAttendance);
router.get('/student', getStudentAttendanceHistory); // ✅ Supports: /api/attendance/student?studentId=S001

module.exports = router;

