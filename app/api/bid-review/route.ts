import nodemailer from "nodemailer";
import { stripe } from "@/lib/stripe";
import {
  BID_REVIEW_ALLOWED_MIME_TYPES,
  BID_REVIEW_GUARANTEE_DISPLAY,
  BID_REVIEW_TURNAROUND_DISPLAY,
  CONTACT_EMAIL,
  EMAIL_REGEX,
  HONEYPOT_FIELD_NAME,
  MAX_BID_FILE_BYTES,
} from "@/lib/constants";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getStringField(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" ? value : null;
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

  const name = getStringField(formData, "name");
  const email = getStringField(formData, "email");
  const phone = getStringField(formData, "phone") ?? "";
  const notes = getStringField(formData, "notes") ?? "";
  const sessionId = getStringField(formData, "session_id");

  if (!name?.trim() || !email?.trim() || !sessionId?.trim()) {
    return Response.json({ error: "Missing required fields." }, { status: 400 });
  }

  if (!EMAIL_REGEX.test(email.trim())) {
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  // Never trust the client on payment — re-verify the Checkout Session
  // server-side even though it was already checked when the upload page
  // rendered, since a request here could be forged independently of that page.
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId.trim());
    if (session.payment_status !== "paid") {
      return Response.json(
        { error: "We couldn't verify your payment. Please contact us directly." },
        { status: 402 }
      );
    }
  } catch (error) {
    console.error("Bid review: failed to verify Stripe session.", error);
    return Response.json(
      { error: "We couldn't verify your payment. Please contact us directly." },
      { status: 402 }
    );
  }

  const bidFile = formData.get("bid_file");
  if (!(bidFile instanceof File) || bidFile.size === 0) {
    return Response.json({ error: "Please attach your bid document." }, { status: 400 });
  }

  if (
    !BID_REVIEW_ALLOWED_MIME_TYPES.includes(
      bidFile.type as (typeof BID_REVIEW_ALLOWED_MIME_TYPES)[number]
    )
  ) {
    return Response.json({ error: "Unsupported file format." }, { status: 400 });
  }

  if (bidFile.size > MAX_BID_FILE_BYTES) {
    return Response.json(
      { error: "That file is too large. Please remove it and try again." },
      { status: 400 }
    );
  }

  const gmailUser = process.env.GMAIL_USER;
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailAppPassword) {
    console.error("Bid review: GMAIL_USER / GMAIL_APP_PASSWORD not configured.");
    return Response.json(
      { error: "Email is not configured yet. Please contact us directly." },
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
      subject: `Paid bid review request ($249) from ${name}`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone || "Not provided"}`,
        `Email: ${email}`,
        `Stripe session: ${sessionId}`,
        "",
        "Notes:",
        notes || "(none provided)",
      ].join("\n"),
      attachments: [
        {
          filename: bidFile.name || "bid-document",
          content: Buffer.from(await bidFile.arrayBuffer()),
          contentType: bidFile.type || "application/octet-stream",
        },
      ],
    });
  } catch (error) {
    console.error("Bid review: failed to send email.", error);
    return Response.json(
      { error: "Something went wrong sending your bid. Please contact us directly." },
      { status: 502 }
    );
  }

  // Best-effort only — the business already has the bid and contact info
  // above, so a failure here shouldn't fail the customer's request.
  try {
    await transporter.sendMail({
      from: `"Vegas Hardscape Design" <${gmailUser}>`,
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: "We've received your bid — Bid Review confirmation",
      text: [
        `Hi ${name},`,
        "",
        "We've received your contractor's bid and your payment is confirmed.",
        `Your written review will be sent to this email address within ${BID_REVIEW_TURNAROUND_DISPLAY}.`,
        BID_REVIEW_GUARANTEE_DISPLAY,
        "",
        "Questions in the meantime? Just reply to this email.",
      ].join("\n"),
    });
  } catch (error) {
    console.error("Bid review: failed to send customer confirmation email.", error);
  }

  return Response.json({ ok: true });
}
