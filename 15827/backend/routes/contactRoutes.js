const express = require('express');
const router = express.Router();
const { 
  submitContact, 
  getAllContacts, 
  getContactById, 
  updateContact, 
  deleteContact, 
  getContactStats 
} = require('../controllers/contactController');
const { protect, admin } = require('../middlewares/auth');
const adminAuth = require('../middlewares/adminAuth');

// Public routes
router.post('/', submitContact);

// Protected routes (Admin only)
router.get('/', adminAuth, getAllContacts);
router.get('/stats', adminAuth, getContactStats);
router.get('/:id', adminAuth, getContactById);
router.put('/:id', adminAuth, updateContact);
router.delete('/:id', adminAuth, deleteContact);

module.exports = router; 