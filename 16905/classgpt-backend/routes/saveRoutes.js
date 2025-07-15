// routes/saveRoutes.js
const express = require('express');
const router = express.Router();
const StudyResult = require('../models/StudyResult');

// ✅ POST: Save a study result
router.post('/', async (req, res) => {
  try {
    const result = new StudyResult(req.body);
    await result.save();
    res.status(201).json({ message: 'Saved successfully', result });
  } catch (err) {
    console.error('❌ DB Save Failed:', err);
    res.status(500).json({ error: 'Failed to save result to database' });
  }
});

// ✅ DELETE: Delete a study result by ID
// DELETE /api/save/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await StudyResult.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Record not found' });
    }
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    console.error('❌ Deletion error:', err);
    res.status(500).json({ error: 'Deletion failed' });
  }
});


module.exports = router;
