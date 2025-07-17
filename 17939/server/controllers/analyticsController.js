// controllers/analyticsController.js
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import mongoose from "mongoose";

// ✅ Utility to get last 6 month labels (e.g., ["Feb", "Mar", "Apr", ...])
const getLast6MonthsLabels = () => {
  const labels = [];
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    labels.push(d.toLocaleString("default", { month: "short" }));
  }
  return labels;
};

export const getRecruiterAnalytics = async (req, res) => {
  try {
    // ✅ Use companyId from params (secure via protectCompany middleware)
    const companyId = req.params.companyId || req.company?._id;
    if (!companyId) {
      return res.status(401).json({ error: "Unauthorized: No company ID" });
    }

    const objectId = new mongoose.Types.ObjectId(companyId);

    // ✅ Find all jobs posted by this recruiter
    const jobs = await Job.find({ companyId: objectId });
    const jobIds = jobs.map(job => job._id);

    // ✅ Total jobs
    const totalJobs = jobs.length;

    // ✅ Active jobs
    const activeJobs = jobs.filter(job => job.visible).length;

    // ✅ Total applications received (across all recruiter's jobs)
    const totalApplications = await JobApplication.countDocuments({
      jobId: { $in: jobIds }
    });

    // ✅ Applications by category (Pie Chart)
    const appsByCategory = await JobApplication.aggregate([
      {
        $match: {
          jobId: { $in: jobIds }
        }
      },
      {
        $lookup: {
          from: "jobs", // Make sure your MongoDB collection is named "jobs"
          localField: "jobId",
          foreignField: "_id",
          as: "jobDetails"
        }
      },
      { $unwind: "$jobDetails" },
      {
        $group: {
          _id: "$jobDetails.category",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          category: "$_id",
          count: 1,
          _id: 0
        }
      }
    ]);

    // ✅ Jobs posted in last 6 months (Line Chart)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);

    const jobsByMonth = await Job.aggregate([
      {
        $match: {
          companyId: objectId,
          createdAt: { $gte: sixMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      }
    ]);

    // ✅ Format jobsByMonth into label-count
    const monthLabels = getLast6MonthsLabels();
    const monthCounts = Array(6).fill(0);

    jobsByMonth.forEach(item => {
      const monthIndex = item._id.month - 1;
      const label = new Date(item._id.year, monthIndex, 1).toLocaleString("default", { month: "short" });
      const idx = monthLabels.indexOf(label);
      if (idx !== -1) {
        monthCounts[idx] = item.count;
      }
    });

    // ✅ Final response
    res.status(200).json({
      totalJobs,
      activeJobs,
      totalApplications,
      appsByCategory,
      jobsLastSixMonths: {
        labels: monthLabels,
        data: monthCounts
      }
    });
  } catch (error) {
    console.error("📉 Recruiter Analytics Error:", error.message);
    res.status(500).json({ error: "Failed to load recruiter analytics." });
  }
};
