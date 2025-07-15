//controllers/facultyAttendanceController.js
const Attendance = require('../models/Attendance');
const { getTodayDate } = require('../utils/getToday');

// ✅ Submit faculty self-attendance (Present/Absent with optional remarks and classesTaken)
exports.submitFacultyAttendance = async (req, res) => {
  const { facultyId, status, classesTaken, remarks } = req.body;
  const date = getTodayDate();

  try {
    // Prevent duplicate marking
    const alreadyMarked = await Attendance.findOne({ facultyId, date });
    if (alreadyMarked) {
      return res.status(400).json({ message: 'Attendance already marked for today' });
    }

    const newAttendance = new Attendance({
      date,
      facultyId,
      status,
      classesTaken,
      remarks,
    });

    await newAttendance.save();
    res.status(200).json({ message: 'Attendance submitted successfully' });
  } catch (err) {
    console.error('Error submitting attendance:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get faculty attendance history
exports.getFacultyAttendanceHistory = async (req, res) => {
  const { facultyId } = req.params;

  try {
    const history = await Attendance.find({ facultyId }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error('Error fetching attendance history:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
