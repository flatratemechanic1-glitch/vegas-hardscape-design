import { stripe } from "@/lib/stripe";
import { BID_REVIEW_PRICE_CENTS } from "@/lib/constants";
import { SITE_URL } from "@/lib/site-config";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (isRateLimited(getClientIp(request))) {
    return Response.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("Bid review checkout: STRIPE_SECRET_KEY not configured.");
    return Response.json(
      { error: "Payments aren't configured yet. Please contact us directly." },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
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
    return Response.json(
      { error: "Something went wrong starting checkout. Please try again." },
      { status: 502 }
    );
  }
}
