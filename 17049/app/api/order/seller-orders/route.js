import connectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Address from "@/models/Address";

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const sellerId = decoded.userId;

    const isSeller = await authSeller(sellerId);
    if (!isSeller) {
      return NextResponse.json(
        { success: false, message: "Not authorized as seller" },
        { status: 403 }
      );
    }

    const sellerObjectId = new mongoose.Types.ObjectId(sellerId);

    
    const orders = await Order.find({})
      .populate("address")
      .populate("items.product");

    
    const sellerOrders = orders
      .map(order => {
        
        const filteredItems = order.items.filter(
          item => item.product && item.product.sellerId?.toString() === sellerId
        );

        if (filteredItems.length === 0) return null;

        return {
          ...order.toObject(),
          items: filteredItems,
        };
      })
      .filter(order => order !== null);

    return NextResponse.json({ success: true, orders: sellerOrders });
  } catch (error) {
    console.error("❌ Seller order fetch error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch orders" },
      { status: 500 }
    );
  }
}
