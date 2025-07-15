const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'], // ✅ lowercase roles
    required: true,
  },
  className: { // ✅ renamed from 'class'
    type: String,
  },
  batch: {
    type: String,
  },
});

module.exports = mongoose.model('User', userSchema);
