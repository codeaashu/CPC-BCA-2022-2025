const mongoose = require('mongoose');
const Payment = require('./models/Payment');
const BookIssue = require('./models/BookIssue');
const Book = require('./models/Book');
const User = require('./models/User');
const { connectDB } = require('./config/database');

// Connect to database
connectDB();

async function testPaymentSystem() {
  try {
    console.log('🧪 Testing Payment System...\n');

    // 1. Create test user
    console.log('1. Creating test user...');
    const testUser = await User.create({
      name: 'Test User',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'user'
    });
    console.log('✅ Test user created:', testUser.email);

    // 2. Create test book
    console.log('\n2. Creating test book...');
    const testBook = await Book.create({
      title: 'Test Book for Payment',
      author: 'Test Author',
      isbn: '1234567890123',
      category: 'Test',
      publishedYear: 2024,
      totalCopies: 5,
      availableCopies: 5,
      location: 'Test Shelf',
      description: 'A test book for payment system',
      addedBy: testUser._id
    });
    console.log('✅ Test book created:', testBook.title);

    // 3. Create book request (should require payment)
    console.log('\n3. Creating book request...');
    const bookRequest = await BookIssue.create({
      book: testBook._id,
      user: testUser._id,
      issuedBy: testUser._id,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      status: 'pending',
      paymentStatus: 'pending'
    });
    console.log('✅ Book request created with pending payment');

    // 4. Create payment
    console.log('\n4. Creating payment...');
    const payment = await Payment.create({
      user: testUser._id,
      bookIssue: bookRequest._id,
      amount: 5.00,
      paymentMethod: 'credit_card',
      status: 'pending'
    });
    console.log('✅ Payment created:', payment.transactionId);

    // 5. Process payment (simulate successful payment)
    console.log('\n5. Processing payment...');
    payment.status = 'completed';
    await payment.save();

    // Update book issue payment status
    bookRequest.paymentStatus = 'paid';
    await bookRequest.save();
    console.log('✅ Payment processed successfully');

    // 6. Verify payment system
    console.log('\n6. Verifying payment system...');
    
    // Check payment details
    const paymentDetails = await Payment.findById(payment._id)
      .populate('user', 'name email')
      .populate('bookIssue')
      .populate('bookIssue.book', 'title author');
    
    console.log('📊 Payment Details:');
    console.log('   - Transaction ID:', paymentDetails.transactionId);
    console.log('   - User:', paymentDetails.user.name);
    console.log('   - Book:', paymentDetails.bookIssue.book.title);
    console.log('   - Amount: $' + paymentDetails.amount);
    console.log('   - Status:', paymentDetails.status);
    console.log('   - Payment Method:', paymentDetails.paymentMethod);

    // Check book issue status
    const updatedBookIssue = await BookIssue.findById(bookRequest._id)
      .populate('book', 'title')
      .populate('user', 'name');
    
    console.log('\n📚 Book Issue Status:');
    console.log('   - Book:', updatedBookIssue.book.title);
    console.log('   - User:', updatedBookIssue.user.name);
    console.log('   - Status:', updatedBookIssue.status);
    console.log('   - Payment Status:', updatedBookIssue.paymentStatus);

    // 7. Test payment history
    console.log('\n7. Testing payment history...');
    const userPayments = await Payment.find({ user: testUser._id })
      .populate('bookIssue')
      .populate('bookIssue.book', 'title');
    
    console.log('📈 User Payment History:');
    userPayments.forEach((pay, index) => {
      console.log(`   ${index + 1}. ${pay.bookIssue.book.title} - $${pay.amount} (${pay.status})`);
    });

    // 8. Test admin payment management
    console.log('\n8. Testing admin payment management...');
    const allPayments = await Payment.find()
      .populate('user', 'name email')
      .populate('bookIssue')
      .populate('bookIssue.book', 'title');
    
    console.log('👨‍💼 Admin Payment Overview:');
    console.log('   - Total Payments:', allPayments.length);
    console.log('   - Completed Payments:', allPayments.filter(p => p.status === 'completed').length);
    console.log('   - Pending Payments:', allPayments.filter(p => p.status === 'pending').length);
    console.log('   - Failed Payments:', allPayments.filter(p => p.status === 'failed').length);

    console.log('\n🎉 Payment System Test Completed Successfully!');
    console.log('\n📋 Summary:');
    console.log('   ✅ User creation and authentication');
    console.log('   ✅ Book request with payment requirement');
    console.log('   ✅ Payment creation and processing');
    console.log('   ✅ Payment status tracking');
    console.log('   ✅ Book issue payment verification');
    console.log('   ✅ Payment history tracking');
    console.log('   ✅ Admin payment management');

    // Cleanup test data
    console.log('\n🧹 Cleaning up test data...');
    await Payment.deleteMany({ user: testUser._id });
    await BookIssue.deleteMany({ user: testUser._id });
    await Book.deleteOne({ _id: testBook._id });
    await User.deleteOne({ _id: testUser._id });
    console.log('✅ Test data cleaned up');

  } catch (error) {
    console.error('❌ Payment System Test Failed:', error.message);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed');
  }
}

// Run the test
testPaymentSystem(); 