import Job from '../models/Job.js';
import JobApplication from '../models/JobApplication.js';
import User from '../models/User.js';
import { v2 as cloudinary } from 'cloudinary';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import sendEmail from '../utils/sendEmail.js';

// ✅ 1. Register New User
export const registerUser = async (req, res) => {
  try {
    const {
      name, email, password, phone, workStatus,
      qualification, specialization, college, city, skills
    } = req.body;

    if (!name || !email || !password || !phone || !workStatus) {
      return res.status(400).json({ success: false, message: "Required fields missing." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = null;
    let resumeUrl = null;

    if (req.files?.image?.[0]) {
      const uploadRes = await cloudinary.uploader.upload(req.files.image[0].path, {
        resource_type: 'image',
        folder: 'user_images'
      });
      imageUrl = uploadRes.secure_url;
    }

    if (req.files?.resume?.[0]) {
      const uploadRes = await cloudinary.uploader.upload(req.files.resume[0].path, {
        resource_type: 'auto',
        folder: 'user_resumes'
      });
      resumeUrl = uploadRes.secure_url;
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      workStatus,
      qualification,
      specialization,
      college,
      city,
      skills: JSON.parse(skills || '[]'),
      resume: resumeUrl,
      image: imageUrl
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    console.error("❌ Register Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 2. Login User
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
};

// ✅ 3. Get Authenticated User Data
export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.auth.userId).select('-password');
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 4. Apply For Job (Authenticated)
export const applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    const userId = req.auth.userId;

    const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });
    if (isAlreadyApplied) {
      return res.status(400).json({ success: false, message: 'Already applied to this job.' });
    }

    const jobData = await Job.findById(jobId);
    if (!jobData) return res.status(404).json({ success: false, message: 'Job not found.' });

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now()
    });

    res.json({ success: true, message: 'Applied successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 5. Get Jobs Applied By User
export const getUserJobApplications = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const applications = await JobApplication.find({ userId })
      .populate('companyId', 'name email image')
      .populate('jobId', 'title description location category level salary');

    if (!applications || applications.length === 0) {
      return res.status(404).json({ success: false, message: 'No applications found.' });
    }

    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 6. Update Resume (Authenticated)
export const updateUserResume = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const resumeFile = req.file;

    if (!resumeFile) {
      return res.status(400).json({ success: false, message: 'No resume file uploaded.' });
    }

    const uploadResult = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "auto"
    });

    const user = await User.findById(userId);
    user.resume = uploadResult.secure_url;
    await user.save();

    res.json({ success: true, message: 'Resume updated successfully.', resume: uploadResult.secure_url });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 7. Public Job Application (Unauthenticated)
export const submitApplication = async (req, res) => {
  try {
    const { name, email, phone, address, jobId, portfolio, skills } = req.body;
    const resumeFile = req.file || (req.files?.resume?.[0]);

    if (!name || !email || !phone || !address || !jobId || !resumeFile) {
      return res.status(400).json({ success: false, message: 'All required fields must be filled.' });
    }

    const uploadResult = await cloudinary.uploader.upload(resumeFile.path, {
      resource_type: "auto",
      folder: "job_applications"
    });

    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found." });
    }

    const newApp = await JobApplication.create({
      name,
      email,
      phone,
      address,
      jobId,
      resumeUrl: uploadResult.secure_url,
      portfolio: portfolio || "",
      skills: skills ? skills.split(',').map((s) => s.trim()) : [],
      companyId: job.companyId,
      date: new Date(),
    });

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully.',
      application: newApp
    });
  } catch (error) {
    console.error("❌ Submit Application Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ 8. Forgot Password using Brevo SMTP
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required.' });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found.' });

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenHash = crypto.createHash('sha256').update(resetToken).digest('hex');

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const html = `
      <h2>Hi ${user.name},</h2>
      <p>You requested a password reset. Click the link below:</p>
      <a href="${resetLink}" style="padding: 10px 20px; background: #4f46e5; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
      <p>This link will expire in 15 minutes.</p>
    `;

    await sendEmail(user.email, 'Reset Your CareerConnect Password', html);

    res.json({ success: true, message: 'Reset link sent to email.' });
  }catch (error) {
  console.error('Forgot Password Error:', error);
  res.status(500).json({ message: 'Failed to send reset email.', error: error.message });
}

};

// ✅ 9. Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token.' });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ success: true, message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Reset Password Error:', error);
    res.status(500).json({ message: 'Password reset failed.' });
  }
};
