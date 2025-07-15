const express = require('express');
const router = express.Router();
const { submitFeedback, getReviews, getAllFeedback } = require('../controllers/feedbackController');

router.post('/', submitFeedback);
router.get('/reviews', getReviews);
router.get('/all', getAllFeedback);

module.exports = router; 