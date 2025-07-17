import connectDB from "@/config/db";
import Address from "@/models/Address";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    await connectDB();

    // 🔐 Extract token from Authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // ✅ Parse incoming address data (flat object, not nested under "address")
    const body = await request.json();

    // ✅ Create address linked to the user
    const newAddress = await Address.create({
      ...body,
      user: userId,
    });

    return NextResponse.json({
      success: true,
      message: "Address added successfully",
      newAddress,
    });

  } catch (error) {
    console.error("Address creation error:", error);
    return NextResponse.json({
      success: false,
      message: error.message || "Failed to add address",
    }, { status: 500 });
  }
}
