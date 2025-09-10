import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // ✅ auto secure for 465
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_FROM}>`,
      to: process.env.CONTACT_RECEIVER,
      subject: `New Contact Form Message from ${name}`,
      text: `You got a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      replyTo: email, // ✅ allows you to reply directly
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("❌ Email send error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
