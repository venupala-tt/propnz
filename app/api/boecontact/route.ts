import { NextResponse } from "next/server";
import { connectDB } from "../../../lib/mongodb";
import mongoose, { Schema, models } from "mongoose";
import nodemailer from "nodemailer";

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

const Contact = models.Contact || mongoose.model("Contact", ContactSchema);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, category, message } = body;

    if (!name || !email || !category || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    await connectDB();

    // Save to MongoDB
    const newContact = new Contact({ name, email, category, message });
    await newContact.save();

    // ✅ Setup Nodemailer Transport
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: true,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    // ✅ Send Email Notification
    await transporter.sendMail({
      from: `"Propmatics" <${process.env.EMAIL_FROM}>`,
      to: process.env.EMAIL_FROM, // send to your email
      subject: "📩 New Expert Booking Request",
      html: `
        <h3>New Booking Request</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Category:</strong> ${category}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    return NextResponse.json(
      { message: "Contact saved & email sent successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Contact API error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
