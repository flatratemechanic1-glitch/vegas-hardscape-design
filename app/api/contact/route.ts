import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/lib/constants";

type ContactPayload = {
  name: string;
  phone: string;
  email: string;
  budget: string;
  message: string;
};

function isValidPayload(body: unknown): body is ContactPayload {
  if (!body || typeof body !== "object") return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 0 &&
    typeof b.email === "string" &&
    b.email.trim().length > 0 &&
    typeof b.message === "string" &&
    b.message.trim().length > 0 &&
    typeof b.phone === "string" &&
    typeof b.budget === "string"
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isValidPayload(body)) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  const { name, phone, email, budget, message } = body;

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.error("Contact form: GMAIL_USER / GMAIL_APP_PASSWORD not configured.");
    return Response.json(
      { error: "Email is not configured yet. Please call or email us directly." },
      { status: 500 }
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: gmailUser, pass: gmailAppPassword },
  });

  try {
    await transporter.sendMail({
      from: `"Vegas Hardscape Design Website" <${gmailUser}>`,
      to: process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL,
      replyTo: email,
      subject: `New project inquiry from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone || "Not provided"}`,
        `Email: ${email}`,
        `Budget: ${budget || "Not provided"}`,
        "",
        "Project description:",
        message,
      ].join("\n"),
    });
  } catch (error) {
    console.error("Contact form: failed to send email.", error);
    return Response.json(
      { error: "Something went wrong sending your message. Please call or email us directly." },
      { status: 502 }
    );
  }

  return Response.json({ ok: true });
}
