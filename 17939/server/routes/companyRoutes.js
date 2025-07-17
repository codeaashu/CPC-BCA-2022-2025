import express from 'express';
import {
  ChangeJobApplicationsStatus,
  changeVisiblity,
  getCompanyData,
  getCompanyJobApplicants,
  getCompanyPostedJobs,
  loginCompany,
  postJob,
  registerCompany
} from '../controllers/companyController.js';

import { getRecruiterAnalytics } from '../controllers/analyticsController.js'; // ✅ NEW
import upload from '../config/multer.js';
import { protectCompany } from '../middleware/authMiddleware.js';

const router = express.Router();

// Register a company
router.post('/register', upload.single('image'), registerCompany);

// Company login
router.post('/login', loginCompany);

// Get company data
router.get('/company', protectCompany, getCompanyData);

// Post a job
router.post('/post-job', protectCompany, postJob);

// Get Applicants Data of Company
router.get('/applicants', protectCompany, getCompanyJobApplicants);

// Get Company Job List
router.get('/list-jobs', protectCompany, getCompanyPostedJobs);

// Change Applications Status 
router.post('/change-status', protectCompany, ChangeJobApplicationsStatus);

// Change Applications Visibility 
router.post('/change-visiblity', protectCompany, changeVisiblity);

// ✅ New Recruiter Analytics Route
router.get('/analytics', protectCompany, getRecruiterAnalytics);

export default router;
