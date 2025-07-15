const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firebaseUID: String, // for Firebase users
  email: { type: String, required: true, unique: true },
  provider: { type: String, default: 'jwt' }, // 'google' | 'facebook' | 'jwt'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
