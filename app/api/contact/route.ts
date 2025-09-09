import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const smtpOptions = {
      host: process.env.NCSMTP_HOST || "server248.web-hosting.com",
      auth: {
        user: process.env.NCSMTP_USER,
        pass: process.env.NCSMTP_PASS,
      },
      authMethod: "LOGIN" as const,
      tls: {
        rejectUnauthorized: false,
      },
    };

    let transporter;
    let portUsed = 587;

    try {
      // Try port 587 (STARTTLS)
      transporter = nodemailer.createTransport({
        ...smtpOptions,
        port: 587,
        secure: false,
      });

      await transporter.verify();
      console.log("✅ Connected using port 587");
      portUsed = 587;
    } catch (err) {
      console.warn("⚠️ Port 587 failed, retrying with 465...", err);

      // Fallback to port 465 (SSL)
      transporter = nodemailer.createTransport({
        ...smtpOptions,
        port: 465,
        secure: true,
      });

      await transporter.verify();
      console.log("✅ Connected using port 465");
      portUsed = 465;
    }

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

    return NextResponse.json({ success: true, portUsed });
  } catch (error) {
    console.error('❌ Email send error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
