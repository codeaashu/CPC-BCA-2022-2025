import connectDB from '@/config/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();

    // ✅ Get JWT from header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { success: false, message: 'Login required to update cart' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    const { cartData } = await request.json();

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    user.cartItems = cartData;
    await user.save();

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart update error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
