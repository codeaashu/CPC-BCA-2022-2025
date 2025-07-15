const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const hashedAdminPassword = await bcrypt.hash('admin123', 10);
    const hashedStudentPassword = await bcrypt.hash('123456', 10);
    const hashedFacultyPassword = await bcrypt.hash('123456', 10);

    const users = [
      {
        userId: 'S001',
        name: 'Ravi Kumar',
        password: hashedStudentPassword,
        role: 'student',
        class: 'BCA',
        batch: 'AKU Batch 1',
      },
      {
        userId: 'S002',
        name: 'Priya Singh',
        password: hashedStudentPassword,
        role: 'student',
        class: 'BCA',
        batch: 'AKU Batch 2',
      },
      {
        userId: 'F001',
        name: 'Prof. Sharma',
        password: hashedFacultyPassword,
        role: 'faculty',
        class: 'BCA',
        batch: 'AKU Batch 1',
      },
      {
        userId: 'F002',
        name: 'Prof. Iqbal',
        password: hashedFacultyPassword,
        role: 'faculty',
        class: 'BCA',
        batch: 'AKU Batch 2',
      },
      {
        userId: 'admin01',
        name: 'Admin User',
        password: hashedAdminPassword,
        role: 'admin',
        class: '',
        batch: '',
      },
    ];

    await User.insertMany(users);
    console.log('✅ Seeded 2 Students, 2 Faculties, 1 Admin!');
    process.exit();
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  }
};

seedUsers();
