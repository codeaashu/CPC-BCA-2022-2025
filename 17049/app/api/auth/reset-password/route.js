import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { token, password } = await req.json();
    const decoded = jwt.verify(token, process.env.JWT_RESET_SECRET);

    await connectDB();
    const user = await User.findById(decoded.userId);
    if (!user) return NextResponse.json({ success: false, message: "Invalid user" });

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, message: "Invalid or expired token" });
  }
}
