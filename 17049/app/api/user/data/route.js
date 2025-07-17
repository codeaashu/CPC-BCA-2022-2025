import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/verifyToken"; // ✅ correct path

export async function GET(request) {
  try {
    await connectDB();

    const decoded = verifyToken(request);
    const userId = decoded?.userId;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Invalid or missing user ID" },
        { status: 401 }
      );
    }

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ /api/user/data error:", error.message);
    return NextResponse.json(
      { success: false, message: error.message || "Unauthorized" },
      { status: 401 }
    );
  }
}
