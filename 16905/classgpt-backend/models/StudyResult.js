//modals/StudyResult.js
const mongoose = require('mongoose');

const studyResultSchema = new mongoose.Schema({
  userId: String, // optional
  title: String,
  summary: String,
  mcqs: [String],
  flashcards: [{ q: String, a: String }],
  voiceBase64: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('StudyResult', studyResultSchema);
