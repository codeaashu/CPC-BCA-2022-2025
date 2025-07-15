const StudyResult = require('../models/StudyResult');

exports.saveResultHandler = async (req, res) => {
  try {
    const { title, summary, mcqs, flashcards, voiceBase64 } = req.body;

    if (!summary || !mcqs?.length) {
      return res.status(400).json({ error: 'Summary or MCQs missing' });
    }

    const newResult = new StudyResult({
      title,
      summary,
      mcqs,
      flashcards,
      voiceBase64,
    });

    const saved = await newResult.save();
    res.status(201).json({ message: '✅ Saved successfully', id: saved._id });
  } catch (err) {
    console.error('❌ Save failed:', err.message);
    res.status(500).json({ error: 'Save failed' });
  }
};
