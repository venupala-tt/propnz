import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Create transporter using Namecheap SMTP (custom hostname)
    const transporter = nodemailer.createTransport({
      host: process.env.NCSMTP_HOST, // server248.web-hosting.com
      port: 465, // or 587 if TLS
      secure: true, // true for port 465 (SSL)
      auth: {
        user: process.env.NCSMTP_USER, // full email address
        pass: process.env.NCSMTP_PASS, // mailbox password
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
