const express = require('express');
const { getBooks, getBook, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { protect, admin } = require('../middlewares/auth');
const router = express.Router();

// Public routes
router.get('/', getBooks);
router.get('/:id', getBook);

// Protected routes (Admin only)
router.post('/', protect, admin, createBook);
router.put('/:id', protect, admin, updateBook);
router.delete('/:id', protect, admin, deleteBook);

module.exports = router; 