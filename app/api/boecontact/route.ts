import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import mongoose, { Schema, models } from "mongoose";

// Define schema
const ContactSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    category: { type: String, required: true },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Avoid model recompilation in dev
const Contact = models.Contact || mongoose.model("Contact", ContactSchema);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, category, message } = body;

    if (!name || !email || !category || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    await connectDB();

    const newContact = new Contact({ name, email, category, message });
    await newContact.save();

    return NextResponse.json(
      { message: "Contact saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Contact API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
