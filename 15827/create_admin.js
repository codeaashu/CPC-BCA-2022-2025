const mongoose = require('./backend/node_modules/mongoose');
const User = require('./backend/models/User');
require('./backend/node_modules/dotenv').config();

async function createAdminUser() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/library_management');
    console.log('Connected to database');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@library.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      console.log('Email: admin@library.com');
      console.log('Password: admin123');
      return;
    }

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@library.com',
      password: 'admin123',
      role: 'admin'
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@library.com');
    console.log('Password: admin123');
    console.log('User ID:', adminUser._id);

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    await mongoose.disconnect();
  }
}

createAdminUser(); 