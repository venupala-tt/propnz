import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const title = formData.get("title") as string;
    const price = formData.get("price") as string;
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const name = formData.get("name") as string;
    const phone = formData.get("phone") as string;
    const email = formData.get("email") as string;
    const userType = formData.get("userType") as string;
    const additionalInfo = formData.get("additionalInfo") as string;

    const images = formData.getAll("images") as File[];

    if (!name || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required contact information." },
        { status: 400 }
      );
    }

    // Convert File objects to buffers for attachments
    const attachments = await Promise.all(
      images.map(async (file) => ({
        filename: file.name,
        content: Buffer.from(await file.arrayBuffer()),
      }))
    );

    // Configure transporter (example uses Gmail – replace with your SMTP)
    const transporter = nodemailer.createTransport({
   host: process.env.EMAIL_SERVER_HOST,
      port: Number(process.env.EMAIL_SERVER_PORT),
      secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // ✅ auto secure for 465
      auth: {
       user: "info@propmatics.com",
        pass: "Thiru@987$_ap",
      },
    });

    const htmlBody = `
      <h2>🏡 New Property Submission</h2>
      <p><b>Submitted by:</b> ${name}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Role:</b> ${userType || "Not specified"}</p>
      <hr/>
      <p><b>Title:</b> ${title}</p>
      <p><b>Price:</b> ${price}</p>
      <p><b>Location:</b> ${location}</p>
      <p><b>Description:</b><br/>${description || "No description provided."}</p>
      <p><b>Additional Information:</b><br/>${additionalInfo || "None"}</p>
      <hr/>
      <p>This property submission was sent via the website form.</p>
    `;

    await transporter.sendMail({
  //    from: `"PropMatics Property Form" <${process.env.SMTP_USER}>`,
      from: "info@propmatics.com",
      to: "info@propmatics.com",
      subject: `New Property Posted by ${name}`,
      html: htmlBody,
      attachments,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Property submission error:", err);
    return NextResponse.json({ error: err.message || "Failed to send email" }, { status: 500 });
  }
}
