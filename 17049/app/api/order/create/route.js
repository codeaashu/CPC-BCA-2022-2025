import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import jwt from "jsonwebtoken";
import Product from "@/models/Product";
import User from "@/models/User";
import Order from "@/models/Order"; 
import { inngest } from "@/config/inngest";

export async function POST(request) {
  try {
    await connectDB();

    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, message: "Login required to place order" },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userId = decoded.userId;
    const { address, items } = await request.json();

    if (!address || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { success: false, message: "Invalid address or cart items" },
        { status: 400 }
      );
    }

    
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json(
          { success: false, message: `Product not found: ${item.product}` },
          { status: 404 }
        );
      }
      totalAmount += product.offerPrice * item.quantity;
    }

    totalAmount += Math.floor(totalAmount * 0.02); 

    
    const newOrder = await Order.create({
      user: userId,
      products: items,
      totalAmount,
      address,
      date: new Date(),
    });

   
    await inngest.send({
      name: "order/created",
      data: {
        orderId: newOrder._id,
        userId,
        totalAmount,
        address,
        items,
        date: newOrder.date,
      },
    });

    
    const user = await User.findById(userId);
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
    });
  } catch (error) {
    console.error("Order placement error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Order failed" },
      { status: 500 }
    );
  }
}
