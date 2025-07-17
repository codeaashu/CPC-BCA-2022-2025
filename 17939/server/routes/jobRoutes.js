import express from 'express'
import { createJob, getJobById, getJobs } from '../controllers/jobController.js';

const router = express.Router()

// Route to get all jobs data
router.get('/', getJobs)

// Route to get a single job by ID
router.get('/:id', getJobById)

router.post('/add', createJob)

export default router;