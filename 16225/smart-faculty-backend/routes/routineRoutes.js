//routes/routineRoutes.js
const express = require('express');
const router = express.Router();
const {
  addRoutine,
  getTodayRoutine
} = require('../controllers/routineController');

// @route   POST /api/routine
// @desc    Add a new routine
router.post('/', addRoutine);

// @route   GET /api/routine/today?batch=AKU Batch 1
// @desc    Get today's routine by batch
router.get('/today', getTodayRoutine);

module.exports = router;
