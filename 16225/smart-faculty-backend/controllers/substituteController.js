// controllers/substituteController.js

const Substitute = require('../models/Substitute');
const { getTodayDate } = require('../utils/getToday');

// 📆 GET today's substitutes by batch (for Students)
exports.getTodaySubstitutes = async (req, res) => {
  const { batch } = req.query;
  const date = getTodayDate();

  try {
    const data = await Substitute.find({ date, batch });
    res.json(data);
  } catch (err) {
    console.error('Error fetching substitutes:', err);
    res.status(500).json({ message: 'Error fetching substitutes' });
  }
};

// 🧠 POST assign new substitute (for Admin)
exports.assignSubstitute = async (req, res) => {
  const { className, batch, subject, originalFaculty, substituteFaculty } = req.body;
  const date = getTodayDate();

  try {
    const exists = await Substitute.findOne({ date, className, batch, subject });
    if (exists) {
      return res.status(400).json({ message: 'Substitute already assigned for this subject today' });
    }

    const newSub = new Substitute({
      date,
      className,
      batch,
      subject,
      originalFaculty,
      substituteFaculty,
    });

    await newSub.save();
    res.status(200).json({ message: 'Substitute assigned successfully' });
  } catch (err) {
    console.error('Error assigning substitute:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ NEW: GET today's substitute for a specific faculty (for Faculty Dashboard)
exports.getSubstituteForFacultyToday = async (req, res) => {
  const { facultyId } = req.params;
  const date = getTodayDate();

  try {
    const assignment = await Substitute.findOne({
      date,
      substituteFaculty: facultyId,
    });

    if (!assignment) {
      return res.status(404).json({ message: 'No substitute assigned today' });
    }

    res.status(200).json(assignment);
  } catch (err) {
    console.error('Error fetching faculty substitute:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
