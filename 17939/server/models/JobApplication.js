import mongoose from "mongoose";

const JobApplicationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  status: {
    type: String,
    default: 'Pending'
  },
  date: {
    type: Date,
    default: Date.now, // ⏰ Stores the timestamp automatically
    required: true
  }
});

const JobApplication = mongoose.model('JobApplication', JobApplicationSchema);

export default JobApplication;
