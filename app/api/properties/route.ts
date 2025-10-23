import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const images = formData.getAll("images") as File[];

    const attachments = await Promise.all(
      images.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    const transporter = nodemailer.createTransport({
      host: "process.env.EMAIL_SERVER_HOST",
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: false,
      auth: {
       user: "info@propmatics.com",
        pass: "Thiru@987$_ap",
      },
    });

    await transporter.sendMail({
      from: `"Propmatics" <${process.env.EMAIL_USER}>`,
      to: "info@propmatics.com",
      subject: `New Property Submission: ${title}`,
      html: `
        <h3>New Property Submission Details</h3>
        <p><strong>Title:</strong> ${title}</p>
        <p><strong>Price:</strong> ${price}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Description:</strong> ${description}</p>
      `,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
