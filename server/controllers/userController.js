import User from "../models/User.js";
import Job from "../models/Job.js";
import JobApplication from "../models/JobApplication.js";
import Application from "../models/JobApplication.js";
import { v2 as cloudinary } from "cloudinary";

// =============================
// ✅ GET USER DATA
// =============================
export const getUserData = async (req, res) => {
  try {
    const userId = req.auth.userId; // Clerk user id

    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // ✅ FIX 2: Use JobApplication instead of Application
    const applications = await JobApplication.find({ userId });

    res.json({
      success: true,
      user,
      applications,
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// =============================
// ✅ GET USER APPLICATIONS
// =============================
export const getUserJobApplications = async (req, res) => {
  const userId = req.auth.userId;

  try {
    const applications = await JobApplication.find({ userId })
      .populate("companyId", "name email image")
      .populate("jobId", "title description location category level salary")
      .exec();

    res.json({ success: true, applications });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// =============================
// ✅ APPLY FOR JOB
// =============================
export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.findOne({ jobId, userId });

    if (isAlreadyApplied) {
      return res.json({ success: true, message: "Already Applied" });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({ success: false, message: "Job not found" });
    }

    await JobApplication.create({
      companyId: jobData.companyId,
      userId,
      jobId,
      date: Date.now(),
    });

    res.json({ success: true, message: "Applied Successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// =============================
// ✅ UPDATE RESUME
// =============================
export const updateUserResume = async (req, res) => {
  const userId = req.auth.userId;
  const resumeFile = req.file;

  try {
    const userData = await User.findById(userId);

    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    if (resumeFile) {
      const uploadRes = await cloudinary.uploader.upload(resumeFile.path);
      userData.resume = uploadRes.secure_url;
    }

    await userData.save();
    res.json({ success: true, message: "Resume Updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
