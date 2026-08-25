import type { Metadata } from "next";
import { Check, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import {
  BID_REVIEW_GUARANTEE_DISPLAY,
  BID_REVIEW_PRICE_DISPLAY,
  BID_REVIEW_TURNAROUND_DISPLAY,
  HONEYPOT_FIELD_NAME,
} from "@/lib/constants";
import { BID_REVIEW_FAQS } from "@/lib/bid-review-faqs";

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

export default async function BidReviewPage({
  searchParams,
}: PageProps<"/bid-review">) {
  const { error } = await searchParams;
  const errorMessage = typeof error === "string" ? error : null;

  return (
    <>
      <FaqJsonLd faqs={BID_REVIEW_FAQS} />

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
          entirely in your corner. Tell us about your project, pay the flat
          fee, and upload your bid — we&apos;ll send back a written review you
          can bring to the negotiating table. No design engagement required,
          and available to homeowners anywhere in the country, not just the
          Las Vegas Valley.
        </p>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-2xl px-6 py-20 lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Why We Built This
          </p>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-foreground sm:text-base">
            <p>
              I started this because I&apos;ve sat on the other side of the
              table — getting bids on my own backyard and watching the same
              scope of work come back at wildly different prices from one
              contractor to the next, with a gap wide enough that I&apos;d
              also see homeowners doing the same project themselves for a
              fraction, sometimes an eighth, of what a bid quoted. There was
              no way to tell, from the paper alone, how much of that gap was
              real expertise and overhead, and how much was just markup
              because nobody was checking.
            </p>
            <p>
              That&apos;s the whole problem with bidding: contractors know
              pricing, scope, and where corners get cut. Homeowners usually
              don&apos;t, and most find out the hard way — after
              they&apos;ve already signed. Bid Review exists to close that
              gap before you sign anything, so you and your contractor are on
              even footing.
            </p>
            <p>
              We&apos;re not selling you a design, and we&apos;re not getting
              paid by the contractor on the other end of your bid. It&apos;s
              an honest second opinion, priced to be worth getting before a
              decision that&apos;s worth a lot more than {BID_REVIEW_PRICE_DISPLAY}.
            </p>
          </div>
          <p className="mt-6 text-xs font-medium tracking-[0.15em] text-accent uppercase">
            — Reggie, Founder
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
        <div className="mx-auto max-w-md rounded-sm border border-border bg-secondary/40 p-8 text-left">
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
            Reviewed within {BID_REVIEW_TURNAROUND_DISPLAY}. {BID_REVIEW_GUARANTEE_DISPLAY}
          </p>

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
            Secure checkout via Stripe. Full refund if we don&apos;t find
            anything actionable. You&apos;ll upload your bid after payment.
          </p>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-2xl px-6 py-24 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              See A Sample
            </p>
            <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
              What A Review Actually Looks Like
            </h2>
          </div>

          <div className="mt-10 rounded-sm border border-border bg-secondary/40 p-6 text-left text-sm leading-relaxed text-foreground sm:text-base">
            <p>
              <span className="font-medium text-accent">Pricing:</span> Your
              bid lists $18,400 for 900 sq ft of travertine paver
              installation ($20.44/sq ft). Current Las Vegas Valley market
              range for travertine pavers, including base prep, typically
              runs $14-17/sq ft. This line is roughly 20-30% above the
              typical range — worth asking for a materials and labor
              breakdown before agreeing to it.
            </p>
            <p className="mt-4">
              <span className="font-medium text-accent">Scope gap:</span> The
              bid includes &ldquo;electrical for lighting&rdquo; as a single
              $2,200 line item with no fixture count, wattage, or trenching
              detail specified. Get this itemized before signing — vague
              electrical allowances are one of the most common places change
              orders show up later.
            </p>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground/80">
            Illustrative example built from typical bid patterns — not an
            actual client&apos;s project.
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-4xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              FAQ
            </p>
            <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-16 flex flex-col divide-y divide-border">
            {BID_REVIEW_FAQS.map((faq) => (
              <div key={faq.question} className="py-8 first:pt-0 last:pb-0">
                <h3 className="font-heading text-lg text-foreground sm:text-xl">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
