import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Create transporter using Namecheap SMTP (custom hostname)
   const transporter = nodemailer.createTransport({
  host: process.env.NCSMTP_HOST, // server248.web-hosting.com
  port: 587,                     // TLS
  secure: false,                 // false for port 587
  auth: {
    user: process.env.NCSMTP_USER, // full email
    pass: process.env.NCSMTP_PASS, // mailbox password
  },
  tls: {
    rejectUnauthorized: false, // helps if certificate mismatch
  },
});


    // Send email
    await transporter.sendMail({
      from: process.env.NCSMTP_USER,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: message,
      html: `<p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Message:</strong> ${message}</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
