import connectDB from "@/config/db";
import Address from "@/models/Address";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request) {
  try {
    await connectDB();

    
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Token missing" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: Invalid or expired token" },
        { status: 401 }
      );
    }

    const userId = decoded.userId;

    
    const orders = await Order.find({ userId })
      .populate({
        path: "products.product", 
      })
      .populate("address")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Fetch orders error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}
