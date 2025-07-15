const express = require('express');
const { getUsers, getUser, createUser, updateUser, deleteUser, getUserProfile } = require('../controllers/userController');
const { protect, admin } = require('../middlewares/auth');
const router = express.Router();

// Admin only routes
router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUser);
router.post('/', protect, admin, createUser);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

// User profile route (accessible by the user themselves or admin)
router.get('/profile/:id', protect, getUserProfile);

module.exports = router; 