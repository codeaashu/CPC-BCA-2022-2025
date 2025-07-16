const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  image: String,
  shows: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Show' }]
});

module.exports = mongoose.model('Theatre', theatreSchema);
