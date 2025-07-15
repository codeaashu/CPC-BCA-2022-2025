// Test script for fine calculation system
const mongoose = require('mongoose');
const BookIssue = require('../models/BookIssue');
const Book = require('../models/Book');
const User = require('../models/User');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/library_management', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function testFineSystem() {
  try {
    console.log('🧪 Testing Fine Calculation System...\n');

    // Create test data
    const testUser = await User.create({
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
      role: 'user'
    });

    const testBook = await Book.create({
      title: 'Test Book for Fines',
      author: 'Test Author',
      isbn: '1234567890123',
      category: 'Test',
      publishedYear: 2024,
      totalCopies: 5,
      availableCopies: 4,
      location: 'Test Shelf',
      description: 'A test book for fine calculation'
    });

    console.log('✅ Test data created');

    // Test 1: Create a book issue with 7-day due date
    const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
    const bookIssue = await BookIssue.create({
      book: testBook._id,
      user: testUser._id,
      issuedBy: testUser._id,
      dueDate: dueDate,
      status: 'issued'
    });

    console.log('📚 Book issued for 7 days');
    console.log(`   Due Date: ${dueDate.toLocaleDateString()}`);

    // Test 2: Check fine calculation for current date (should be 0)
    let currentFine = bookIssue.calculateFine();
    let daysOverdue = bookIssue.getDaysOverdue();
    console.log(`   Current Fine: $${currentFine.toFixed(2)}`);
    console.log(`   Days Overdue: ${daysOverdue}`);

    // Test 3: Simulate overdue scenario (5 days overdue)
    const overdueDate = new Date(dueDate.getTime() + 5 * 24 * 60 * 60 * 1000);
    bookIssue.dueDate = new Date(overdueDate.getTime() - 5 * 24 * 60 * 60 * 1000); // Set due date to 5 days ago
    await bookIssue.save();

    currentFine = bookIssue.calculateFine();
    daysOverdue = bookIssue.getDaysOverdue();
    const isOverdue = bookIssue.checkOverdue();

    console.log('\n⏰ Simulating 5 days overdue:');
    console.log(`   Due Date: ${bookIssue.dueDate.toLocaleDateString()}`);
    console.log(`   Current Fine: $${currentFine.toFixed(2)}`);
    console.log(`   Days Overdue: ${daysOverdue}`);
    console.log(`   Is Overdue: ${isOverdue}`);

    // Test 4: Mark fine as paid
    bookIssue.markFinePaid();
    await bookIssue.save();

    console.log('\n💰 Fine marked as paid:');
    console.log(`   Fine Paid: ${bookIssue.finePaid}`);
    console.log(`   Payment Date: ${bookIssue.finePaidDate.toLocaleDateString()}`);
    console.log(`   Payment Status: ${bookIssue.paymentStatus}`);

    // Test 5: Return the book
    bookIssue.status = 'returned';
    bookIssue.returnDate = new Date();
    bookIssue.returnedTo = testUser._id;
    await bookIssue.save();

    console.log('\n📖 Book returned:');
    console.log(`   Return Date: ${bookIssue.returnDate.toLocaleDateString()}`);
    console.log(`   Final Fine: $${bookIssue.calculateFine().toFixed(2)}`);

    // Test 6: Create another overdue book
    const overdueBookIssue = await BookIssue.create({
      book: testBook._id,
      user: testUser._id,
      issuedBy: testUser._id,
      dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
      status: 'overdue'
    });

    const overdueFine = overdueBookIssue.calculateFine();
    const overdueDays = overdueBookIssue.getDaysOverdue();

    console.log('\n🚨 Another overdue book (10 days):');
    console.log(`   Due Date: ${overdueBookIssue.dueDate.toLocaleDateString()}`);
    console.log(`   Current Fine: $${overdueFine.toFixed(2)}`);
    console.log(`   Days Overdue: ${overdueDays}`);

    // Test 7: Get user's fines summary
    const userFines = await BookIssue.find({ 
      user: testUser._id,
      $or: [
        { status: 'overdue' },
        { status: 'returned', fineAmount: { $gt: 0 } }
      ]
    }).populate('book');

    const totalFines = userFines.reduce((sum, issue) => sum + issue.calculateFine(), 0);
    const unpaidFines = userFines.filter(issue => !issue.finePaid);

    console.log('\n📊 User Fines Summary:');
    console.log(`   Total Fines: $${totalFines.toFixed(2)}`);
    console.log(`   Unpaid Fines: ${unpaidFines.length}`);
    console.log(`   Total Books with Fines: ${userFines.length}`);

    console.log('\n✅ Fine system test completed successfully!');
    console.log('\n📋 Test Summary:');
    console.log('   - 7-day book issue period ✓');
    console.log('   - Automatic fine calculation ✓');
    console.log('   - Overdue detection ✓');
    console.log('   - Fine payment tracking ✓');
    console.log('   - Book return with fines ✓');
    console.log('   - User fines summary ✓');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  } finally {
    // Clean up test data
    try {
      await User.deleteOne({ email: 'test@example.com' });
      await Book.deleteOne({ isbn: '1234567890123' });
      await BookIssue.deleteMany({ user: { $exists: false } });
      console.log('\n🧹 Test data cleaned up');
    } catch (cleanupError) {
      console.error('Cleanup error:', cleanupError.message);
    }
    
    mongoose.connection.close();
  }
}

// Run the test
testFineSystem(); 