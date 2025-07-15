const Feedback = require('../models/Feedback');
const ActivityLog = require('../models/ActivityLog');

// @desc    Submit feedback or suggestion
// @route   POST /api/feedback
// @access  Public
exports.submitFeedback = async (req, res) => {
  try {
    const { feedback, name, email, type } = req.body;
    if (!feedback || !feedback.trim()) {
      return res.status(400).json({ message: 'Feedback is required.' });
    }
    const fb = await Feedback.create({
      feedback: feedback.trim(),
      name: name ? name.trim() : undefined,
      email: email ? email.trim() : undefined,
      type: type || 'feedback'
    });
    // Log feedback submission (if user is authenticated)
    if (req.user && req.user._id) {
      await ActivityLog.create({
        user: req.user._id,
        action: 'submit_feedback',
        details: `Submitted feedback: ${fb._id}`
      });
    }
    res.status(201).json({ message: 'Feedback submitted successfully.', feedback: fb });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get latest reviews
// @route   GET /api/feedback/reviews
// @access  Public
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Feedback.find({ type: 'review' }).sort({ createdAt: -1 }).limit(10);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback/all
// @access  Public
exports.getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 