const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');

// Existing routes
router.post('/', showController.createShow);
router.get('/movie/:movieId', showController.getShowsByMovie);

// 🔥 Add this new route
router.get('/:id', showController.getShowById);

module.exports = router;
