import { stripe } from "@/lib/stripe";
import {
  BID_REVIEW_NOTES_MAX_LENGTH,
  BID_REVIEW_PRICE_CENTS,
  EMAIL_REGEX,
  HONEYPOT_FIELD_NAME,
} from "@/lib/constants";
import { SITE_URL } from "@/lib/site-config";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

function getStringField(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" ? value : null;
}

// This route is hit by a plain native <form> POST (no client JS), so errors
// can't be shown via a fetch()'d JSON response - they're surfaced by
// redirecting back to the pitch page with a query param it reads and displays.
function redirectWithError(message: string) {
  const url = new URL("/bid-review", SITE_URL);
  url.searchParams.set("error", message);
  return Response.redirect(url.toString(), 303);
}

export async function POST(request: Request) {
  const formData = await request.formData().catch(() => null);
  if (!formData) {
    return redirectWithError("Missing required fields.");
  }

  // Bots that auto-fill every field trip the honeypot. Silently send them
  // back to the pitch page rather than to a real Stripe Checkout session.
  if (getStringField(formData, HONEYPOT_FIELD_NAME)?.trim()) {
    return Response.redirect(new URL("/bid-review", SITE_URL).toString(), 303);
  }

  if (isRateLimited(getClientIp(request))) {
    return redirectWithError("Too many requests. Please try again later.");
  }

  const name = getStringField(formData, "name")?.trim();
  const email = getStringField(formData, "email")?.trim();
  const phone = getStringField(formData, "phone")?.trim() ?? "";
  const notes = getStringField(formData, "notes")?.trim() ?? "";

  if (!name || !email) {
    return redirectWithError("Please enter your name and email.");
  }
  if (!EMAIL_REGEX.test(email)) {
    return redirectWithError("Please enter a valid email address.");
  }
  if (notes.length > BID_REVIEW_NOTES_MAX_LENGTH) {
    return redirectWithError(
      `Please shorten your notes to ${BID_REVIEW_NOTES_MAX_LENGTH} characters or less.`
    );
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Bid review checkout: STRIPE_SECRET_KEY not configured.");
    return redirectWithError("Payments aren't configured yet. Please contact us directly.");
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      metadata: { name, phone, notes },
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: BID_REVIEW_PRICE_CENTS,
            product_data: {
              name: "Contractor Bid Review",
              description:
                "A written second opinion on a contractor's bid — pricing, scope gaps, red flags, and questions to ask.",
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${SITE_URL}/bid-review/upload?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/bid-review`,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a session URL.");
    }

    return Response.redirect(session.url, 303);
  } catch (error) {
    console.error("Bid review checkout: failed to create Stripe session.", error);
    return redirectWithError("Something went wrong starting checkout. Please try again.");
  }
}
