const Book = require('../models/Book');
const BookIssue = require('../models/BookIssue');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const ActivityLog = require('../models/ActivityLog');
const Payment = require('../models/Payment');

// @desc    Request to borrow a book
// @route   POST /api/borrow/request
// @access  Private
const requestBook = async (req, res) => {
  try {
    const { bookId, dueDate } = req.body;
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.availableCopies <= 0) {
      // Book not available, create reservation
      const existingReservation = await Reservation.findOne({ book: bookId, user: req.user._id, status: { $in: ['pending', 'notified'] } });
      if (existingReservation) {
        return res.status(400).json({ message: 'You have already reserved this book.' });
      }
      const reservation = await Reservation.create({ book: bookId, user: req.user._id });
      return res.status(201).json({ message: 'Book is not available. Reservation created.', reservation });
    }

    // Check for unpaid fines
    const unpaidFines = await BookIssue.findOne({ user: req.user._id, finePaid: false, fineAmount: { $gt: 0 } });
    if (unpaidFines) {
      return res.status(403).json({ message: 'You have unpaid fines. Please pay your fines before borrowing new books.' });
    }

    // Check for pending/unverified payments for this or other books
    const pendingPayments = await Payment.findOne({ user: req.user._id, status: { $in: ['pending'] } });
    if (pendingPayments) {
      return res.status(403).json({ message: 'You have a pending payment under verification. Please wait for admin approval.' });
    }

    // Check if user already has this book
    const existingIssue = await BookIssue.findOne({
      user: req.user._id,
      book: bookId,
      status: { $in: ['pending', 'issued'] }
    });

    if (existingIssue) {
      return res.status(400).json({ message: 'You already have a request or have borrowed this book' });
    }

    // Set default due date to 5 days from now
    const defaultDueDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
    const finalDueDate = dueDate ? new Date(dueDate) : defaultDueDate;

    // Create book issue request with pending payment status
    const bookIssue = await BookIssue.create({
      book: bookId,
      user: req.user._id,
      issuedBy: req.user._id,
      dueDate: finalDueDate,
      status: 'pending',
      paymentStatus: 'pending'
    });
    
    // Log book request
    await ActivityLog.create({
      user: req.user._id,
      action: 'request_book',
      details: `Requested book: ${book.title} (Payment required)`
    });
    
    res.status(201).json({
      message: 'Book request created. Payment required to proceed.',
      bookIssue,
      requiresPayment: true,
      paymentAmount: 49.00
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Approve book issue (Admin only)
// @route   PUT /api/borrow/approve/:id
// @access  Private/Admin
const approveBookIssue = async (req, res) => {
  try {
    const bookIssue = await BookIssue.findById(req.params.id);
    
    if (!bookIssue) {
      return res.status(404).json({ message: 'Book issue request not found' });
    }

    if (bookIssue.status !== 'pending') {
      return res.status(400).json({ message: 'Book issue request is not pending' });
    }

    // Check if payment has been made
    if (bookIssue.paymentStatus !== 'paid') {
      return res.status(400).json({ message: 'Payment must be completed before approving book issue' });
    }

    // Check if book is still available
    const book = await Book.findById(bookIssue.book);
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'Book is no longer available' });
    }

    // Update book availability
    book.availableCopies -= 1;
    await book.save();

    // Update book issue status
    bookIssue.status = 'issued';
    bookIssue.issuedBy = req.user._id;
    await bookIssue.save();
    
    // Log book approval
    await ActivityLog.create({
      user: req.user._id,
      action: 'approve_book',
      details: `Approved book issue for user: ${bookIssue.user}`
    });
    
    res.json(bookIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Return book
// @route   PUT /api/borrow/return/:id
// @access  Private/Admin
const returnBook = async (req, res) => {
  try {
    const bookIssue = await BookIssue.findById(req.params.id);
    
    if (!bookIssue) {
      return res.status(404).json({ message: 'Book issue not found' });
    }

    if (bookIssue.status !== 'issued' && bookIssue.status !== 'overdue') {
      return res.status(400).json({ message: 'Book is not currently issued' });
    }

    // Calculate fine if overdue
    const fineAmount = bookIssue.calculateFine();

    // Update book availability
    const book = await Book.findById(bookIssue.book);
    book.availableCopies += 1;
    await book.save();

    // Update book issue
    bookIssue.status = 'returned';
    bookIssue.returnDate = new Date();
    bookIssue.returnedTo = req.user._id;
    await bookIssue.save();
    
    // Log book return
    await ActivityLog.create({
      user: req.user._id,
      action: 'return_book',
      details: `Returned book: ${book.title}${fineAmount > 0 ? ` with fine: $${fineAmount}` : ''}`
    });
    
    await notifyNextReservation(book._id);
    res.json(bookIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all book issues
// @route   GET /api/borrow
// @access  Private/Admin
const getAllBookIssues = async (req, res) => {
  try {
    const { status, user } = req.query;
    let query = {};

    if (status) {
      query.status = status;
    }

    if (user) {
      query.user = user;
    }

    const bookIssues = await BookIssue.find(query)
      .populate('book', 'title author isbn')
      .populate('user', 'name email')
      .populate('issuedBy', 'name')
      .populate('returnedTo', 'name')
      .sort({ issuedDate: -1 });

    // Calculate current fines for overdue books
    const updatedBookIssues = bookIssues.map(issue => {
      if (issue.status === 'issued' || issue.status === 'overdue') {
        issue.calculateFine();
        issue.checkOverdue();
      }
      return issue;
    });

    res.json(updatedBookIssues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's borrowed books
// @route   GET /api/borrow/my-books
// @access  Private
const getMyBooks = async (req, res) => {
  try {
    const bookIssues = await BookIssue.find({ 
      user: req.user._id,
      status: { $in: ['issued', 'overdue'] }
    })
      .populate('book', 'title author isbn')
      .sort({ issuedDate: -1 });

    // Calculate current fines and check overdue status
    const updatedBookIssues = bookIssues.map(issue => {
      issue.calculateFine();
      issue.checkOverdue();
      return issue;
    });

    res.json(updatedBookIssues);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get overdue books
// @route   GET /api/borrow/overdue
// @access  Private/Admin
const getOverdueBooks = async (req, res) => {
  try {
    const overdueBooks = await BookIssue.find({
      status: { $in: ['issued', 'overdue'] },
      dueDate: { $lt: new Date() }
    })
      .populate('book', 'title author isbn')
      .populate('user', 'name email')
      .sort({ dueDate: 1 });

    // Calculate current fines
    const updatedOverdueBooks = overdueBooks.map(issue => {
      issue.calculateFine();
      issue.checkOverdue();
      return issue;
    });

    res.json(updatedOverdueBooks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's fines
// @route   GET /api/borrow/my-fines
// @access  Private
const getMyFines = async (req, res) => {
  try {
    const bookIssues = await BookIssue.find({ 
      user: req.user._id,
      $or: [
        { status: 'overdue' },
        { status: 'returned', fineAmount: { $gt: 0 } }
      ]
    })
      .populate('book', 'title author isbn')
      .sort({ dueDate: -1 });

    // Calculate current fines
    const finesWithCalculations = bookIssues.map(issue => {
      const fineAmount = issue.calculateFine();
      const daysOverdue = issue.getDaysOverdue();
      
      return {
        ...issue.toObject(),
        currentFine: fineAmount,
        daysOverdue: daysOverdue,
        isOverdue: issue.status === 'overdue'
      };
    });

    const totalFines = finesWithCalculations.reduce((sum, issue) => sum + issue.currentFine, 0);
    const unpaidFines = finesWithCalculations.filter(issue => !issue.finePaid);

    res.json({
      fines: finesWithCalculations,
      totalFines: totalFines,
      unpaidFines: unpaidFines.length,
      summary: {
        totalFines: totalFines,
        unpaidFines: unpaidFines.length,
        overdueBooks: finesWithCalculations.filter(issue => issue.isOverdue).length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Admin requests a book for a user
// @route   POST /api/borrow/admin-request
// @access  Private/Admin
const adminRequestBook = async (req, res) => {
  try {
    const { userId, bookId, dueDate } = req.body;

    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if book exists and is available
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: 'Book is not available for borrowing' });
    }

    // Check if user already has this book
    const existingIssue = await BookIssue.findOne({
      user: userId,
      book: bookId,
      status: { $in: ['pending', 'issued'] }
    });
    if (existingIssue) {
      return res.status(400).json({ message: 'User already has a request or has borrowed this book' });
    }

    // Set default due date to 7 days from now
    const defaultDueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const finalDueDate = dueDate ? new Date(dueDate) : defaultDueDate;

    // Create book issue request
    const bookIssue = await BookIssue.create({
      book: bookId,
      user: userId,
      issuedBy: req.user._id,
      dueDate: finalDueDate,
      status: 'pending'
    });

    res.status(201).json(bookIssue);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pay fine for a book issue
// @route   PUT /api/borrow/pay-fine/:id
// @access  Private
const payFine = async (req, res) => {
  try {
    const bookIssue = await BookIssue.findById(req.params.id);
    if (!bookIssue) {
      return res.status(404).json({ message: 'Book issue not found' });
    }

    // Calculate current fine
    const currentFine = bookIssue.calculateFine();
    
    if (currentFine <= 0) {
      return res.status(400).json({ message: 'No fine to pay for this issue.' });
    }
    
    if (bookIssue.finePaid) {
      return res.status(400).json({ message: 'Fine has already been paid for this issue.' });
    }

    // Mark fine as paid
    bookIssue.markFinePaid();
    await bookIssue.save();

    // Log fine payment
    await ActivityLog.create({
      user: req.user._id,
      action: 'pay_fine',
      details: `Paid fine of $${currentFine} for book: ${bookIssue.book}`
    });

    res.json({ 
      message: 'Fine paid successfully.', 
      bookIssue,
      paidAmount: currentFine
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get fine details for a book issue
// @route   GET /api/borrow/fine-details/:id
// @access  Private
const getFineDetails = async (req, res) => {
  try {
    const bookIssue = await BookIssue.findById(req.params.id)
      .populate('book', 'title author isbn')
      .populate('user', 'name email');
      
    if (!bookIssue) {
      return res.status(404).json({ message: 'Book issue not found' });
    }

    // Calculate current fine and days overdue
    const currentFine = bookIssue.calculateFine();
    const daysOverdue = bookIssue.getDaysOverdue();
    const isOverdue = bookIssue.checkOverdue();

    res.json({
      bookIssue,
      fineDetails: {
        currentFine: currentFine,
        daysOverdue: daysOverdue,
        isOverdue: isOverdue,
        dueDate: bookIssue.dueDate,
        finePerDay: process.env.FINE_PER_DAY || 1,
        finePaid: bookIssue.finePaid,
        finePaidDate: bookIssue.finePaidDate
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Pay for a book request
// @route   PUT /api/borrow/pay-request/:id
// @access  Private
const payForBookRequest = async (req, res) => {
  try {
    const bookIssue = await BookIssue.findById(req.params.id);
    if (!bookIssue) {
      return res.status(404).json({ message: 'Book issue request not found' });
    }
    if (bookIssue.paymentStatus === 'paid') {
      return res.status(400).json({ message: 'Payment already completed for this request.' });
    }
    // Here you would integrate with a real payment gateway
    // For now, we just mark as paid
    bookIssue.paymentStatus = 'paid';
    await bookIssue.save();
    res.json({ message: 'Payment successful. You can now wait for admin approval.', bookIssue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Notify next reservation when a book is returned
async function notifyNextReservation(bookId) {
  const nextReservation = await Reservation.findOne({ book: bookId, status: 'pending' }).sort({ createdAt: 1 }).populate('user');
  if (nextReservation) {
    nextReservation.status = 'notified';
    nextReservation.notifiedAt = new Date();
    await nextReservation.save();
    // TODO: Send notification (email or in-app) to nextReservation.user
    // Example: sendEmail(nextReservation.user.email, 'Book Available', 'The book you reserved is now available.');
  }
}

module.exports = {
  requestBook,
  approveBookIssue,
  returnBook,
  getAllBookIssues,
  getMyBooks,
  getOverdueBooks,
  getMyFines,
  adminRequestBook,
  payFine,
  getFineDetails,
  payForBookRequest
}; 