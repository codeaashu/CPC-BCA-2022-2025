// lib/authMiddleware.js

import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/verifyToken"; // ✅ correct path

/**
 * ✅ Middleware to protect buyer/seller routes
 * @param {NextRequest} req
 * @param {Array} allowedRoles - e.g. ["seller"], ["buyer"], or both
 */
export function authMiddleware(req, allowedRoles = ["buyer", "seller"]) {
  try {
    const user = verifyToken(req); // Extracts { userId, email, role }

    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json(
        { success: false, message: "❌ Access denied: insufficient permissions" },
        { status: 403 }
      );
    }

    req.user = user; // Optional: attach user to req

    return user; // ✅ Proceed with user info
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }
}
