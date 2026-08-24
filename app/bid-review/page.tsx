import type { Metadata } from "next";
import { Check, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BID_REVIEW_PRICE_DISPLAY } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Bid Review",
  description:
    "Get an unbiased, flat-fee written review of your contractor's bid — pricing sanity check, scope gaps, red flags, and questions to ask. Available nationwide.",
  alternates: {
    canonical: "/bid-review",
  },
};

const WHAT_YOU_GET = [
  "Whether the pricing lines up with current market rates",
  "Scope gaps or vague line items to watch for",
  "Red flags worth raising before you sign",
  "Specific questions to bring back to your contractor",
];

export default function BidReviewPage() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
      <FileSearch className="mx-auto size-10 text-accent" strokeWidth={1.5} />
      <p className="mt-6 text-xs font-medium tracking-[0.3em] text-accent uppercase">
        Bid Review
      </p>
      <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
        An Unbiased Second Opinion on Your Contractor&apos;s Bid
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        We&apos;re never paid by the contractors we review, so the read is
        entirely in your corner. Upload your bid, and we&apos;ll send back a
        written review you can bring to the negotiating table — no design
        engagement required, and available to homeowners anywhere in the
        country, not just the Las Vegas Valley.
      </p>

      <div className="mx-auto mt-12 max-w-md rounded-sm border border-border bg-secondary/40 p-8 text-left">
        <p className="text-xs font-medium tracking-[0.15em] text-foreground/60 uppercase">
          What you get
        </p>
        <ul className="mt-5 space-y-3">
          {WHAT_YOU_GET.map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm text-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-8 font-heading text-3xl text-foreground">
          {BID_REVIEW_PRICE_DISPLAY}
          <span className="ml-2 text-sm font-normal text-muted-foreground">
            flat fee
          </span>
        </p>

        <form action="/api/bid-review/checkout" method="POST" className="mt-6">
          <Button
            type="submit"
            size="lg"
            className="h-11 w-full bg-accent text-sm tracking-wide text-accent-foreground hover:bg-accent/90"
          >
            Pay &amp; Get Started
          </Button>
        </form>
        <p className="mt-3 text-center text-xs text-muted-foreground/80">
          Secure checkout via Stripe. You&apos;ll upload your bid after payment.
        </p>
      </div>
    </section>
  );
}
