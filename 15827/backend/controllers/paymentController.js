const Payment = require('../models/Payment');
const BookIssue = require('../models/BookIssue');
const Book = require('../models/Book');
const ActivityLog = require('../models/ActivityLog');

// @desc    Create payment for book request
// @route   POST /api/payments/create
// @access  Private
const createPayment = async (req, res) => {
  try {
    const { bookIssueId, paymentMethod, amount } = req.body;

    // Find the book issue
    const bookIssue = await BookIssue.findById(bookIssueId)
      .populate('book', 'title author')
      .populate('user', 'name email');

    if (!bookIssue) {
      return res.status(404).json({ message: 'Book issue request not found' });
    }

    if (bookIssue.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to pay for this request' });
    }

    if (bookIssue.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Payment already completed for this request' });
    }

    // Create payment record
    const payment = await Payment.create({
      user: req.user._id,
      bookIssue: bookIssueId,
      amount: amount || 5.00, // Default $5 for book request
      paymentMethod,
      status: 'pending'
    });

    // Log payment creation
    await ActivityLog.create({
      user: req.user._id,
      action: 'create_payment',
      details: `Created payment for book: ${bookIssue.book.title}`
    });

    res.status(201).json({
      message: 'Payment created successfully',
      payment,
      bookIssue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Process payment (simulate payment gateway)
// @route   POST /api/payments/process/:paymentId
// @access  Private
const processPayment = async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { cardNumber, expiryDate, cvv } = req.body;

    const payment = await Payment.findById(paymentId)
      .populate('bookIssue')
      .populate('user', 'name email');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to process this payment' });
    }

    if (payment.status === 'completed') {
      return res.status(400).json({ message: 'Payment already completed' });
    }

    // Simulate payment processing
    // In a real application, you would integrate with Stripe, PayPal, etc.
    const isPaymentSuccessful = simulatePaymentProcessing(cardNumber, expiryDate, cvv);

    if (isPaymentSuccessful) {
      // Update payment status
      payment.status = 'completed';
      await payment.save();

      // Update book issue payment status
      const bookIssue = await BookIssue.findById(payment.bookIssue);
      bookIssue.paymentStatus = 'paid';
      await bookIssue.save();

      // Log successful payment
      await ActivityLog.create({
        user: req.user._id,
        action: 'payment_successful',
        details: `Payment successful for book: ${bookIssue.book}`
      });

      res.json({
        message: 'Payment processed successfully',
        payment,
        bookIssue
      });
    } else {
      payment.status = 'failed';
      await payment.save();

      res.status(400).json({
        message: 'Payment failed. Please try again.',
        payment
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get payment details
// @route   GET /api/payments/:paymentId
// @access  Private
const getPaymentDetails = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId)
      .populate('bookIssue')
      .populate('user', 'name email');

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    if (payment.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this payment' });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's payment history
// @route   GET /api/payments/history
// @access  Private
const getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate('bookIssue')
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all payments (Admin only)
// @route   GET /api/payments
// @access  Private/Admin
const getAllPayments = async (req, res) => {
  try {
    const { status, user } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (user) {
      query.user = user;
    }

    const payments = await Payment.find(query)
      .populate('user', 'name email')
      .populate('bookIssue')
      .sort({ createdAt: -1 });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mark payment as paid for UPI or Cash
// @route   POST /api/payments/mark-paid
// @access  Private
const markPaid = async (req, res) => {
  try {
    const { bookIssueId, paymentMethod } = req.body;
    if (!['upi', 'cash'].includes(paymentMethod)) {
      return res.status(400).json({ message: 'Invalid payment method' });
    }
    // Find the payment for this book issue and user
    const payment = await Payment.findOne({ bookIssue: bookIssueId, user: req.user._id });
    if (!payment) {
      return res.status(404).json({ message: 'Payment record not found' });
    }
    if (payment.status === 'completed') {
      return res.status(400).json({ message: 'Payment already completed' });
    }
    payment.status = 'completed';
    payment.paymentMethod = paymentMethod;
    await payment.save();
    // Update book issue payment status
    const bookIssue = await BookIssue.findById(bookIssueId);
    bookIssue.paymentStatus = 'paid';
    await bookIssue.save();
    res.json({ message: 'Payment marked as completed', payment, bookIssue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pay for borrowing a book (with slip upload)
// @route   POST /api/payments/borrow
// @access  Private
const payForBorrow = async (req, res) => {
  try {
    const { bookId, transactionId } = req.body;
    if (!bookId || !transactionId || !req.file) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    
    // Check if book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found.' });
    }
    
    // Check if book is available
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'Book is not available for borrowing.' });
    }
    
    // Find or create book issue
    let bookIssue = await BookIssue.findOne({ 
      book: bookId, 
      user: req.user._id, 
      status: { $in: ['pending', 'issued'] }
    });
    
    if (!bookIssue) {
      // Create new book issue request
      bookIssue = await BookIssue.create({
        book: bookId,
        user: req.user._id,
        issuedBy: req.user._id,
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
        status: 'pending',
        paymentStatus: 'pending'
      });
    } else if (bookIssue.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Payment already completed for this request.' });
    }
    
    // Create payment record
    const payment = await Payment.create({
      user: req.user._id,
      bookIssue: bookIssue._id,
      amount: 49,
      paymentMethod: 'upi',
      status: 'pending',
      transactionId,
      paymentSlip: req.file.path,
      type: 'borrow'
    });
    
    // Log payment creation
    await ActivityLog.create({
      user: req.user._id,
      action: 'submit_payment',
      details: `Payment submitted for book: ${book.title} (Transaction ID: ${transactionId})`
    });
    
    res.status(201).json({ 
      message: 'Payment submitted successfully! Your request is pending admin verification.', 
      payment,
      bookIssue
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pay fine (with slip upload)
// @route   POST /api/payments/fine
// @access  Private
const payForFine = async (req, res) => {
  try {
    const { fineId, fineTransactionId } = req.body;
    if (!fineId || !fineTransactionId || !req.file) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    // Find the book issue (fine)
    const bookIssue = await BookIssue.findById(fineId);
    if (!bookIssue) {
      return res.status(404).json({ message: 'Fine (book issue) not found.' });
    }
    // Create payment record
    const payment = await Payment.create({
      user: req.user._id,
      bookIssue: bookIssue._id,
      fineId: bookIssue._id,
      amount: bookIssue.currentFine || 0,
      paymentMethod: 'upi',
      status: 'pending',
      transactionId: fineTransactionId,
      paymentSlip: req.file.path,
      type: 'fine'
    });
    // Mark fine as payment pending
    bookIssue.fineStatus = 'pending';
    await bookIssue.save();
    res.status(201).json({ message: 'Fine payment submitted. Pending admin verification.', payment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all pending payments (Admin only)
// @route   GET /api/payments?status=pending
// @access  Private/Admin
const getPendingPayments = async (req, res) => {
  console.log('paymentController.js loaded');
  try {
    const payments = await Payment.find({ status: 'pending' })
      .populate('user', 'name email')
      .populate('bookIssue');
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify a payment (Admin only)
// @route   PUT /api/payments/:id/verify
// @access  Private/Admin
const verifyPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate('bookIssue')
      .populate('user', 'name email')
      .populate('bookIssue.book', 'title availableCopies');
      
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    
    if (payment.status === 'verified') {
      return res.status(400).json({ message: 'Payment already verified' });
    }
    
    // Verify the payment
    payment.status = 'verified';
    await payment.save();
    
    // Update related BookIssue
    if (payment.bookIssue) {
      payment.bookIssue.paymentStatus = 'paid';
      await payment.bookIssue.save();
      
      // Check if book is still available and approve the request
      const book = await Book.findById(payment.bookIssue.book._id);
      if (book && book.availableCopies > 0) {
        // Update book availability
        book.availableCopies -= 1;
        await book.save();
        
        // Approve the book issue
        payment.bookIssue.status = 'issued';
        payment.bookIssue.issuedBy = req.user._id;
        await payment.bookIssue.save();
        
        // Log the approval
        await ActivityLog.create({
          user: req.user._id,
          action: 'verify_payment_and_approve',
          details: `Payment verified and book approved for user: ${payment.user.name} - Book: ${payment.bookIssue.book.title}`
        });
        
        res.json({ 
          message: 'Payment verified and book request approved successfully!', 
          payment,
          bookIssue: payment.bookIssue
        });
      } else {
        // Book is no longer available
        await ActivityLog.create({
          user: req.user._id,
          action: 'verify_payment_but_book_unavailable',
          details: `Payment verified but book unavailable: ${payment.bookIssue.book.title}`
        });
        
        res.json({ 
          message: 'Payment verified but book is no longer available. Please contact the user.', 
          payment,
          bookIssue: payment.bookIssue
        });
      }
    } else {
      res.json({ 
        message: 'Payment verified successfully!', 
        payment 
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Simulate payment processing
function simulatePaymentProcessing(cardNumber, expiryDate, cvv) {
  // Simple validation
  if (!cardNumber || !expiryDate || !cvv) {
    return false;
  }

  // Simulate 90% success rate
  return Math.random() > 0.1;
}

module.exports = {
  createPayment,
  processPayment,
  getPaymentDetails,
  getPaymentHistory,
  getAllPayments,
  markPaid,
  payForBorrow,
  payForFine,
  getPendingPayments,
  verifyPayment
}; 