import Job from "../models/Job.js";

// ✅ Add New Job
export const createJob = async (req, res) => {
    try {
        const {
            title,
            description,
            location,
            category,
            level,
            salary,
        } = req.body;

        if (!title || !description || !location || !category || !level || !salary) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        const newJob = new Job({
            title,
            description,
            location,
            category,
            level,
            salary,
            companyId: req.company._id,
        });

        await newJob.save();

        res.status(201).json({
            success: true,
            message: "Job created successfully",
            job: newJob
        });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get All Jobs
export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ visible: true })
            .populate({
                path: 'companyId',
                select: 'name email image' // exclude password, show only necessary fields
            });

        res.json({ success: true, jobs });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ Get Single Job By ID
export const getJobById = async (req, res) => {
    try {
        const { id } = req.params;

        const job = await Job.findById(id)
            .populate({
                path: 'companyId',
                select: 'name email image' // consistent with above
            });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: 'Job not found'
            });
        }

        res.json({ success: true, job });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
