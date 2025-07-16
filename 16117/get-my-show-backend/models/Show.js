const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
  theatre: { type: mongoose.Schema.Types.ObjectId, ref: 'Theatre', required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  seats: {
    total: { type: Number, default: 50 },
    booked: { type: [Number], default: [] }
  },
  pricePerSeat: { type: Number, required: true }
});

module.exports = mongoose.model('Show', showSchema);
