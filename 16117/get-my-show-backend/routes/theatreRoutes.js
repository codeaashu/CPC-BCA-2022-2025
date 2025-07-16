const express = require('express');
const router = express.Router();
const {
  addTheatre,
  getAllTheatres,
  getTheatresByMovie,
} = require('../controllers/theatreController');

// ➕ Add a new theatre
router.post('/add', addTheatre);

// 📥 Get all theatres (for /theatre route in Navbar)
router.get('/', getAllTheatres);

// 🎬 FIXED: Get theatres by movie ID
router.get('/movie/:movieId', getTheatresByMovie);

module.exports = router;
