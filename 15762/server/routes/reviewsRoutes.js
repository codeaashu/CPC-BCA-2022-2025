const express = require('express');
const router = express.Router();

router.post('/:id/reviews', async (req, res) => {
    const { name, email, message } = req.body;

    const review = new Review({
        productId: req.params.id,
        name,
        email,
        message,
        createdAt: new Date()
    });

    await review.save();
    res.status(201).json({ message: 'Review submitted' });
});

router.get('/:id/reviews', getReviews);

module.exports = router;