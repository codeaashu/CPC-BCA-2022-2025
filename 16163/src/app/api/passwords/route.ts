import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const passwords = await prisma.passwordEntry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(passwords);
  } catch (error) {
    console.error("Error fetching passwords:", error);
    return NextResponse.json(
      { error: "Failed to fetch passwords" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, username, password, website, notes } = body;

    // First, check if a user exists, if not create one
    let user = await prisma.user.findFirst();

    if (!user) {
      // Create a default user if none exists
      user = await prisma.user.create({
        data: {
          email: "default@example.com",
          password: "defaultpassword", // In a real app, this should be hashed
          name: "Default User",
        },
      });
    }

    const passwordEntry = await prisma.passwordEntry.create({
      data: {
        title,
        username,
        password,
        website,
        notes,
        userId: user.id,
      },
    });

    return NextResponse.json(passwordEntry);
  } catch (error) {
    console.error("Error creating password entry:", error);
    return NextResponse.json(
      { error: "Failed to create password entry" },
      { status: 500 }
    );
  }
}
