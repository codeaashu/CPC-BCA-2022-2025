// models/Routine.js
const mongoose = require('mongoose');

const routineSchema = new mongoose.Schema({
  class: String,
  batch: String,
  day: String,
  subject: String,
  faculty: String,
  time: String,
  semester: String,
});

module.exports = mongoose.model('Routine', routineSchema);
