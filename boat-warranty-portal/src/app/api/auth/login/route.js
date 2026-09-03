import { NextResponse } from "next/server";
import { generateToken, isAdmin } from "@/lib/auth";

export async function POST(request) {
  const body = await request.json();
  const email = body.email?.trim().toLowerCase();
  const password = body.password;

  if (!email || !password || !isAdmin(email, password)) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const token = generateToken(email);
  return NextResponse.json({ token, user: { email, role: "admin" } });
}
