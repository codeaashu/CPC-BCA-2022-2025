//adminController.js
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Routine = require('../models/Routine');
const Attendance = require('../models/Attendance'); // Faculty attendance
const StudentAttendance = require('../models/StudentAttendance');
const Substitute = require('../models/Substitute');
const { getTodayDate } = require('../utils/getToday');

// ✅ Add Student
exports.addStudent = async (req, res) => {
  try {
    const { name, userId, password, studentClass, batch } = req.body;

    const exists = await User.findOne({ userId });
    if (exists) return res.status(400).json({ message: 'User ID already exists' });

    const hashedPassword = await bcrypt.hash(password, 10); // 🔐 Hash the password

    const student = new User({
      name,
      userId,
      password: hashedPassword,
      role: 'student',
      class: studentClass,
      batch,
    });

    await student.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (err) {
    console.error('Add student error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Add Faculty
exports.addFaculty = async (req, res) => {
  try {
    const { name, userId, password, facultyClass, batch } = req.body;

    const exists = await User.findOne({ userId });
    if (exists) return res.status(400).json({ message: 'User ID already exists' });

    const hashedPassword = await bcrypt.hash(password, 10); // 🔐 Hash the password

    const faculty = new User({
      name,
      userId,
      password: hashedPassword,
      role: 'faculty',
      class: facultyClass,
      batch,
    });

    await faculty.save();
    res.status(201).json({ message: 'Faculty added successfully' });
  } catch (err) {
    console.error('Add faculty error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Add Routine
exports.addRoutine = async (req, res) => {
  try {
    const { class: className, batch, day, subject, faculty, time, semester } = req.body;

    const routine = new Routine({
      class: className,
      batch,
      day,
      subject,
      faculty,
      time,
      semester,
    });

    await routine.save();
    res.status(201).json({ message: 'Routine added successfully' });
  } catch (err) {
    console.error('Add routine error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ✅ Get Dashboard Summary
exports.getDashboardSummary = async (req, res) => {
  const date = getTodayDate();

  try {
    const facultyPresent = await Attendance.countDocuments({ date, status: 'Present' });
    const facultyAbsent = await Attendance.countDocuments({ date, status: 'Absent' });

    const studentRecords = await StudentAttendance.find({ date });
    const totalClassesHeld = studentRecords.length;
    const totalStudentsPresent = studentRecords.reduce((sum, record) => sum + (record.studentsPresent || 0), 0);
    const totalStudentsAbsent = studentRecords.reduce((sum, record) => sum + (record.studentsAbsent || 0), 0);

    const substituteCount = await Substitute.countDocuments({ date });

    res.json({
      date,
      facultyPresent,
      facultyAbsent,
      totalStudentsPresent,
      totalStudentsAbsent,
      totalClassesHeld,
      substituteCount,
      studentDetails: studentRecords,
    });
  } catch (err) {
    console.error('Error fetching dashboard summary:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
