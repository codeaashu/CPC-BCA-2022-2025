const Routine = require('../models/Routine');
const { getTodayDay } = require('../utils/getToday');

// GET /api/routine/today?batch=...
exports.getTodayRoutine = async (req, res) => {
  const { batch } = req.query;
  const today = getTodayDay(); // e.g., "Monday"

  try {
    const routines = await Routine.find({ batch, day: today });
    res.json(routines);
  } catch (err) {
    console.error('Error fetching routine:', err);
    res.status(500).json({ message: 'Error fetching routine' });
  }
};

// POST /api/admin/add-routine
exports.addRoutine = async (req, res) => {
  try {
    const newRoutine = new Routine(req.body);
    await newRoutine.save();
    res.status(201).json({ message: 'Routine added successfully' });
  } catch (err) {
    console.error('Error adding routine:', err);
    res.status(500).json({ message: 'Error adding routine' });
  }
};
