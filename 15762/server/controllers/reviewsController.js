const Review = require('../models/Reviews');

exports.getReviews = async (req, res) => {
    const reviews = await Review.find({ productId: req.params.id }).sort({ createdAt: -1 });
    res.json(reviews);
}