import jwt from "jsonwebtoken";
import Company from "../models/Company.js";
import User from "../models/User.js";
import { verifyToken } from "@clerk/backend"; 

// ---------------- COMPANY PROTECTOR ---------------- //
export const protectCompany = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({ success: false, message: "Not authorized, Login Again" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.company = await Company.findById(decoded.id).select("-password");

    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// ---------------- USER PROTECTOR (CLERK) ---------------- //
export const protectUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.json({ success: false, message: "No token, login again" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // 100% Correct Clerk verification
    const decoded = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
    });

    req.auth = { userId: decoded.sub }; // Clerk user ID

    next();
  } catch (error) {
    console.error("CLERK ERROR:", error);
    return res.json({ success: false, message: "Invalid Clerk token" });
  }
};
