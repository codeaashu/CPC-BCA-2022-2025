// lib/verifyToken.js

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("❌ JWT_SECRET is not defined in environment variables");
}

/**
 * ✅ Verifies the Bearer token from request headers.
 * @param {Request} req
 * @returns {Object} decoded { userId, email, role }
 */
export const verifyToken = (req) => {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("❌ Authorization token missing or malformed");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded?.userId) {
      throw new Error("❌ Invalid token payload: userId missing");
    }

    return decoded;
  } catch (error) {
    throw new Error("❌ Invalid or expired token: " + error.message);
  }
};
