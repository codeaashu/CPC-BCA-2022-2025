import connectDB from "@/config/db";
import User from "@/models/User";
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    console.log("Auth userId:", userId);

    if (!userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    console.log("Connected to DB");

    const existingUser = await User.findOne({ clerkId: userId });
    if (existingUser) {
      console.log("User already exists");
      return NextResponse.json({ success: true, message: "User already exists" });
    }

    const user = await clerkClient.getUser(userId); // ✅ correct usage
    console.log("Fetched from Clerk:", user);

    const newUser = await User.create({
      clerkId: userId,
      name: `${user.firstName} ${user.lastName}`,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
    });

    console.log("User created in DB:", newUser);

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Register API error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
