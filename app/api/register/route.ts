import { NextResponse } from "next/server";
import db from "/app/lib/mongodb";
import User from "/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();
  await db;

  const existing = await User.findOne({ email });
  if (existing) {
    return NextResponse.json({ error: "Email already exists" }, { status: 400 });
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });

  return NextResponse.json({ message: "User registered", user });
}
