import nodemailer from "nodemailer";
import {
  ALLOWED_PHOTO_MIME_TYPES,
  CONTACT_EMAIL,
  EMAIL_REGEX,
  HONEYPOT_FIELD_NAME,
  MAX_CONTACT_PHOTOS,
  MAX_PHOTO_BYTES_SERVER,
  MAX_TOTAL_PHOTO_BYTES_SERVER,
} from "@/lib/constants";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

type ContactFields = {
  name: string;
  phone: string;
  email: string;
  budget: string;
  message: string;
  plants: string;
};

function getStringField(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" ? value : null;
}

function extractFields(formData: FormData): ContactFields | null {
  const name = getStringField(formData, "name");
  const phone = getStringField(formData, "phone");
  const email = getStringField(formData, "email");
  const budget = getStringField(formData, "budget");
  const message = getStringField(formData, "message");
  const plants = getStringField(formData, "plants") ?? "";

  if (
    !name?.trim() ||
    !email?.trim() ||
    !message?.trim() ||
    phone === null ||
    budget === null
  ) {
    return null;
  }

  return { name, phone, email, budget, message, plants };
}

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);

  if (!formData) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  // Bots that auto-fill every field trip the honeypot. Report success without
  // sending anything, so the bot has no signal to adapt against.
  if (getStringField(formData, HONEYPOT_FIELD_NAME)?.trim()) {
    return Response.json({ ok: true });
  }

  if (isRateLimited(getClientIp(request))) {
    return Response.json(
      { error: "Too many requests. Please try again later, or call or email us directly." },
      { status: 429 }
    );
  }

  const fields = extractFields(formData);
  if (!fields) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }
  const { name, phone, email, budget, message, plants } = fields;

  if (!EMAIL_REGEX.test(email.trim())) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const photoEntries = formData
    .getAll("photos")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (photoEntries.length > MAX_CONTACT_PHOTOS) {
    return Response.json({ error: "Too many photos attached." }, { status: 400 });
  }

  let totalPhotoBytes = 0;
  for (const photo of photoEntries) {
    if (!ALLOWED_PHOTO_MIME_TYPES.includes(photo.type as (typeof ALLOWED_PHOTO_MIME_TYPES)[number])) {
      return Response.json({ error: "Unsupported photo format." }, { status: 400 });
    }
    if (photo.size > MAX_PHOTO_BYTES_SERVER) {
      return Response.json(
        { error: "One of your photos is too large. Please remove it and try again." },
        { status: 400 }
      );
    }
    totalPhotoBytes += photo.size;
  }
  if (totalPhotoBytes > MAX_TOTAL_PHOTO_BYTES_SERVER) {
    return Response.json(
      { error: "Your photos are too large combined. Please remove one and try again." },
      { status: 400 }
    );
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.error("Contact form: GMAIL_USER / GMAIL_APP_PASSWORD not configured.");
    return Response.json(
      { error: "Email is not configured yet. Please call or email us directly." },
      { status: 500 }
    );
  }

  const attachments = await Promise.all(
    photoEntries.map(async (photo, index) => ({
      filename: photo.name || `photo-${index + 1}.jpg`,
      content: Buffer.from(await photo.arrayBuffer()),
      contentType: photo.type || "image/jpeg",
    }))
  );

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
        `Photos attached: ${attachments.length}`,
        ...(plants.trim() ? [`Plants of interest: ${plants.trim()}`] : []),
        "",
        "Project description:",
        message,
      ].join("\n"),
      attachments,
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
