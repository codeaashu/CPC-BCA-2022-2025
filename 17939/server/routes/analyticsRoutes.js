// routes/analyticsRoutes.js

import express from "express";
import { getRecruiterAnalytics } from "../controllers/analyticsController.js";
import { protectCompany } from "../middleware/authMiddleware.js"; // ✅ Correct import path

const router = express.Router();

/**
 * @route   GET /api/analytics/recruiter
 * @desc    Get recruiter analytics data (total jobs, applications, charts)
 * @access  Private (Company only)
 */
router.get("/recruiter", protectCompany, getRecruiterAnalytics);

export default router;
