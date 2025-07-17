import express from 'express';
import upload from '../middleware/upload.js';
import resumeUpload from '../middleware/resumeUpload.js';
import { protectUser } from '../middleware/authMiddleware.js';

import {
  registerUser,
  loginUser,
  getUserData,
  applyForJob,
  getUserJobApplications,
  updateUserResume,
  submitApplication,
  forgotPassword,
  resetPassword
} from '../controllers/userController.js';

const router = express.Router();

// ✅ Register user with image + resume upload
router.post(
  '/register',
  upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'resume', maxCount: 1 }
  ]),
  registerUser
);

// ✅ Login
router.post('/login', loginUser);

// ✅ Get authenticated user data
router.get('/user', protectUser, getUserData);

// ✅ Apply for job (requires auth)
router.post('/apply', protectUser, applyForJob);

// ✅ Get all jobs the user has applied to
router.get('/applications', protectUser, getUserJobApplications);

// ✅ Update user resume (requires auth)
router.post('/update-resume', protectUser, resumeUpload.single('resume'), updateUserResume);

// ✅ Manual application by public users (without auth)
router.post('/manual-apply', resumeUpload.single('resume'), submitApplication);

// ✅ Forgot password - send reset link
router.post('/forgot-password', forgotPassword);

// ✅ Reset password using token
router.post('/reset-password/:token', resetPassword);

export default router;
