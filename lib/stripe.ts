import Stripe from "stripe";

// Trimmed defensively - some deployment platforms' env var UIs append a
// trailing newline on save, which Node's http client rejects outright as an
// invalid header character rather than a bad credential.
const stripeSecretKey = process.env.STRIPE_SECRET_KEY?.trim();

if (!stripeSecretKey) {
  console.error("Stripe: STRIPE_SECRET_KEY not configured.");
}

export const stripe = new Stripe(stripeSecretKey ?? "");
