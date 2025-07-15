const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const {
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
} = require('../controllers/paymentController');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads/payment_slips');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer config for payment slip uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images and PDFs
  if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Only image and PDF files are allowed!'), false);
  }
};

const upload = multer({ 
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Error handling for multer
const uploadMiddleware = (req, res, next) => {
  upload.single('paymentSlip')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
      }
      return res.status(400).json({ message: 'File upload error: ' + err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};

const uploadFineMiddleware = (req, res, next) => {
  upload.single('finePaymentSlip')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ message: 'File too large. Maximum size is 5MB.' });
      }
      return res.status(400).json({ message: 'File upload error: ' + err.message });
    } else if (err) {
      return res.status(400).json({ message: err.message });
    }
    next();
  });
};


// Create payment for book request
router.post('/create', protect, createPayment);

// Pay for borrowing a book (with slip upload)
router.post('/borrow', protect, uploadMiddleware, payForBorrow);

// Pay fine (with slip upload)
router.post('/fine', protect, uploadFineMiddleware, payForFine);

// Get user's payment history
router.get('/history', protect, getPaymentHistory);

// Get payment details
router.get('/:paymentId', protect, getPaymentDetails);

// // Process payment
// router.post('/process/:paymentId', protect, processPayment);

// Admin: Get all payments
router.get('/', adminAuth, getAllPayments);
// Admin: Get pending payments only
router.get('/pending', adminAuth, getPendingPayments);
// Admin: Verify a payment
router.put('/:id/verify', adminAuth, verifyPayment);

module.exports = router; 