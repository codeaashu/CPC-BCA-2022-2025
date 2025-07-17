import connectDB from "@/config/db";
import Address from "@/models/Address";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    // 🔐 Extract token from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    // 🔎 Verify JWT and extract user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // ✅ Connect to DB
    await connectDB();

    // 🧾 Find all addresses linked to the user
    const addresses = await Address.find({ user: userId });

    return NextResponse.json({ success: true, addresses }, { status: 200 });

  } catch (error) {
    console.error("Get address error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch addresses" },
      { status: 500 }
    );
  }
}
