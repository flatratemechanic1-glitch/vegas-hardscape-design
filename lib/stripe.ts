import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  console.error("Stripe: STRIPE_SECRET_KEY not configured.");
}

export const stripe = new Stripe(stripeSecretKey ?? "");
