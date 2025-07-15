const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { userId, password, role } = req.body;

  try {
    console.log('🔍 Login attempt:', { userId, role });

    const user = await User.findOne({ userId, role });

    if (!user) {
      console.log('❌ User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('❌ Incorrect password');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, userId: user.userId, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    console.log('✅ Login successful');
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        userId: user.userId,
        role: user.role,
        class: user.class || '',
        batch: user.batch || ''
      }
    });
  } catch (err) {
    console.error('💥 Server error during login:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
