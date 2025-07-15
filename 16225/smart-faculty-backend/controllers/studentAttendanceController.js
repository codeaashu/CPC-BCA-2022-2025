//controllers/studentAttendanceController.js
const StudentAttendance = require('../models/StudentAttendance');
const { getTodayDate } = require('../utils/getToday');

// ✅ POST: Submit Student Attendance
exports.submitStudentAttendance = async (req, res) => {
  const {
    studentId,
    batch,
    className,
    subject,
    facultyTaught,
    studentsPresent,
    totalStudents,
    classHeld
  } = req.body;

  const date = getTodayDate();

  if (
    !studentId || !batch || !className || !subject ||
    !facultyTaught || !studentsPresent || !totalStudents || !classHeld
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check for duplicate entry
    const alreadyExists = await StudentAttendance.findOne({
      date,
      batch,
      className,
      subject,
      studentId
    });

    if (alreadyExists) {
      return res.status(400).json({ message: 'Attendance already submitted today for this subject' });
    }

    const present = parseInt(studentsPresent);
    const total = parseInt(totalStudents);
    const studentsAbsent = total - present;

    const newEntry = new StudentAttendance({
      date,
      studentId,
      batch,
      className,
      subject,
      facultyTaught,
      studentsPresent: present,
      totalStudents: total,
      studentsAbsent,
      classHeld
    });

    await newEntry.save();
    res.status(200).json({ message: 'Student attendance submitted successfully' });
  } catch (err) {
    console.error('Student attendance error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ GET: Fetch Student Attendance History
exports.getStudentAttendanceHistory = async (req, res) => {
  const { studentId } = req.query;

  if (!studentId) {
    return res.status(400).json({ message: 'studentId is required' });
  }

  try {
    const history = await StudentAttendance.find({ studentId }).sort({ date: -1 });
    res.status(200).json(history);
  } catch (err) {
    console.error('Error fetching history:', err);
    res.status(500).json({ message: 'Server error while fetching history' });
  }
};
