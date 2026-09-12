import { NextResponse } from "next/server";
import {
  comparePassword,
  generateToken,
  isAdmin,
} from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();
  const email = body.email?.trim().toLowerCase();
  const password = body.password;

  if (!email || !password) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const adminLogin = isAdmin(email, password);

  let userLogin = false;

  if (!adminLogin) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    userLogin =
      Boolean(user) &&
      (await comparePassword(password, user.passwordHash));
  }

  if (!adminLogin && !userLogin) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  const token = generateToken(email);

  return NextResponse.json({
    token,
    user: {
      email,
      role: adminLogin ? "admin" : "user",
    },
  });
}