//adminRoutes.js
const express = require('express');
const router = express.Router();

const {
  getDashboardSummary,
  addStudent,
  addFaculty,
} = require('../controllers/adminController');

const {
  addRoutine
} = require('../controllers/routineController'); // ✅ Routine from correct file

// Admin dashboard summary
router.get('/dashboard', getDashboardSummary);

// Add new student
router.post('/add-student', addStudent);

// Add new faculty
router.post('/add-faculty', addFaculty);

// Add class routine
router.post('/add-routine', addRoutine);

module.exports = router;

