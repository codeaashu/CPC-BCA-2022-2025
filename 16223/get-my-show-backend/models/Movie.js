const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  description: { type: String },
  releaseDate: { type: Date },
  rating: { type: Number },
  poster: { type: String }, // image URL
});

module.exports = mongoose.model('Movie', movieSchema);
