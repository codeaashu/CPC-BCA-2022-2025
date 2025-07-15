///routes/substituteRoutes.js
const express = require('express'); 
const router = express.Router();

const {
  getTodaySubstitutes,
  assignSubstitute,
  getSubstituteForFacultyToday, // ✅ Import faculty-specific substitute route
} = require('../controllers/substituteController');

// GET today's substitutes for student (by batch)
router.get('/today', getTodaySubstitutes);

// GET today's substitutes for a specific faculty
router.get('/today/faculty/:facultyId', getSubstituteForFacultyToday); // ✅ Needed for FacultyDashboard

// POST assign new substitute (admin)
router.post('/', assignSubstitute);

module.exports = router;
