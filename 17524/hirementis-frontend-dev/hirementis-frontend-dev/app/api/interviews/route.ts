// ...existing code...
import { db } from "@/firebase/admin";
import { NextResponse } from "next/server";
import { auth } from "@/firebase/client";

export async function POST(req: Request) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }
  const { id, userId } = await req.json();

  if (!id) {
    return NextResponse.json(
      { success: false, error: "Missing id" },
      { status: 400 }
    );
  }
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    const interviewRef = db
      .collection("users")
      .doc(userId)
      .collection("interviews")
      .doc(id);

    const interviewSnap = await interviewRef.get();

    if (!interviewSnap.exists) {
      return NextResponse.json(
        { success: false, error: "Interview not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: interviewSnap.data() },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error fetching interview:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
