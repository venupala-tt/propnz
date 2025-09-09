import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Create Nodemailer transporter for Namecheap SMTP
    const transporter = nodemailer.createTransport({
      host: "server248.web-hosting.com", // Namecheap Private Email SMTP
      port: 465,                     // Use 465 for SSL or 587 for TLS
      secure: true,                  // true for 465, false for 587
      auth: {
        user: process.env.NCSMTP_USER, // your full email, e.g. info@propmatics.com
        pass: process.env.NCSMTP_PASS, // your email password
      },
    });

    // Send the email
    await transporter.sendMail({
      from: process.env.NCSMTP_USER,
      to: process.env.NCSMTP_USER, // send to yourself
      replyTo: email,            // person who filled the form
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
