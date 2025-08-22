import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { name, email, category, message } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or any SMTP provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
    //  console.log("Trying to send email");
      from: email,
      to: process.env.CONTACT_RECEIVER, // your email
      subject: `New Book an Expert request: ${category}`,
      text: `
        Name: ${name}
        Email: ${email}
        Category: ${category}
        Message: ${message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
