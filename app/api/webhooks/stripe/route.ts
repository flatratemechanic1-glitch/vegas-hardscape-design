import nodemailer from "nodemailer";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { CONTACT_EMAIL } from "@/lib/constants";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!webhookSecret || !signature) {
    console.error("Stripe webhook: missing STRIPE_WEBHOOK_SECRET or signature header.");
    return Response.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const rawBody = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook: signature verification failed.", error);
    return Response.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const gmailUser = process.env.GMAIL_USER;
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailAppPassword) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: gmailUser, pass: gmailAppPassword },
      });

      try {
        await transporter.sendMail({
          from: `"Vegas Hardscape Design Website" <${gmailUser}>`,
          to: process.env.CONTACT_TO_EMAIL || CONTACT_EMAIL,
          subject: "Paid bid review received — awaiting upload",
          text: [
            "A customer just paid $249 for a bid review.",
            `Customer email: ${session.customer_details?.email || "unknown"}`,
            `Stripe session: ${session.id}`,
            "",
            "They'll be redirected to upload their bid document. If you don't receive a follow-up submission within a day or two, follow up directly using the email above.",
          ].join("\n"),
        });
      } catch (error) {
        console.error("Stripe webhook: failed to send payment notification email.", error);
      }
    } else {
      console.error("Stripe webhook: GMAIL_USER / GMAIL_APP_PASSWORD not configured.");
    }
  }

  return Response.json({ received: true });
}
