const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /api/user/save
router.post('/save', async (req, res) => {
  try {
    const { email, firebaseUID, provider = 'jwt' } = req.body;

    if (!email) return res.status(400).json({ error: 'Email is required' });

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({ email, firebaseUID, provider });
      await user.save();
    }

    res.status(200).json({ message: 'User saved', user });
  } catch (err) {
    console.error('User save error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
