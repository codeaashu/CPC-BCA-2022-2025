const express = require('express');
const { 
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
} = require('../controllers/borrowController');
const { protect, admin } = require('../middlewares/auth');
const router = express.Router();

// Public routes (require authentication)
router.post('/request', protect, requestBook);
router.get('/my-books', protect, getMyBooks);
router.get('/my-fines', protect, getMyFines);
router.get('/fine-details/:id', protect, getFineDetails);

// Admin only routes
router.get('/', protect, admin, getAllBookIssues);
router.get('/overdue', protect, admin, getOverdueBooks);
router.put('/approve/:id', protect, admin, approveBookIssue);
router.put('/return/:id', protect, admin, returnBook);
router.post('/admin-request', protect, admin, adminRequestBook);
router.put('/pay-fine/:id', protect, payFine);
router.put('/pay-request/:id', protect, payForBookRequest);

module.exports = router; 