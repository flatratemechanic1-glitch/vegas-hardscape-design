import { Check, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  BID_REVIEW_GUARANTEE_DISPLAY,
  BID_REVIEW_PRICE_DISPLAY,
  BID_REVIEW_TURNAROUND_DISPLAY,
  HONEYPOT_FIELD_NAME,
} from "@/lib/constants";

const WHAT_YOU_GET = [
  "Whether the pricing lines up with current market rates",
  "Scope gaps or vague line items to watch for",
  "Red flags worth raising before you sign",
  "Specific questions to bring back to your contractor",
];

export function PricingForm({ errorMessage }: { errorMessage: string | null }) {
  return (
    <section id="get-started" className="mx-auto max-w-4xl scroll-mt-8 px-6 pt-16 pb-24 text-center lg:px-10">
      <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
        Get Started
      </p>
      <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
        Get Your Bid Reviewed
      </h2>

      <div className="mx-auto mt-10 max-w-md rounded-sm border border-border bg-secondary/40 p-8 text-left">
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
        <p className="mt-2 text-sm text-muted-foreground">
          Reviewed within {BID_REVIEW_TURNAROUND_DISPLAY}.
        </p>
        <div className="mt-4 flex items-start gap-2.5 rounded-sm border border-accent/30 bg-accent/5 px-4 py-3 text-left">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
          <p className="text-sm text-foreground">{BID_REVIEW_GUARANTEE_DISPLAY}</p>
        </div>

        <form action="/api/bid-review/checkout" method="POST" className="mt-6 space-y-4">
          <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label htmlFor="bid-review-pitch-website">Website</label>
            <input
              id="bid-review-pitch-website"
              name={HONEYPOT_FIELD_NAME}
              type="text"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bid-review-pitch-name">Name</Label>
            <Input id="bid-review-pitch-name" name="name" required autoComplete="name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bid-review-pitch-email">Email</Label>
            <Input
              id="bid-review-pitch-email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bid-review-pitch-phone">Phone (optional)</Label>
            <Input id="bid-review-pitch-phone" name="phone" type="tel" autoComplete="tel" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bid-review-pitch-notes">
              Anything we should know? (optional)
            </Label>
            <Textarea
              id="bid-review-pitch-notes"
              name="notes"
              rows={3}
              placeholder="Context about the project, specific concerns, timeline, etc."
            />
          </div>

          {errorMessage && (
            <p className="text-sm text-destructive" role="alert">
              {errorMessage}
            </p>
          )}

          <Button
            type="submit"
            size="lg"
            className="h-11 w-full bg-accent text-sm tracking-wide text-accent-foreground hover:bg-accent/90"
          >
            Pay &amp; Get Started
          </Button>
        </form>
        <p className="mt-3 text-center text-xs text-muted-foreground/80">
          Secure checkout via Stripe. You&apos;ll upload your bid after
          payment. Reviewed personally by Reggie — not automated, not
          outsourced.
        </p>
      </div>
    </section>
  );
}
