import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import connectDB from "@/config/db";
import User from "@/models/User";

// POST: Seller Signup
export async function POST(req) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    // 🔍 Basic Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    // 🧪 Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists with this email." },
        { status: 409 }
      );
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🧾 Create new seller
    const newUser = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "seller", // Mark user as seller
    });

    // 🔑 Generate JWT token
    const token = jwt.sign(
      {
        userId: newUser._id,
        email: newUser.email,
        role: "buyer",
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // ✅ Respond with token & redirectTo
    return NextResponse.json(
      {
        success: true,
        message: "Buyer account created successfully.",
        token,
        redirectTo: "/", 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Seller Signup Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
