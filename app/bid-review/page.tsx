import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Check, FileSearch, Lock, ShieldCheck } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { cn } from "@/lib/utils";
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

// Illustrative sample only — a fabricated bid built to demonstrate the
// report format, not an actual client's project. Market-range figures are
// blurred in the rendered table (see the `range` cell below) so the page
// shows the shape of the findings without giving away the benchmark data
// that's part of what a customer pays for.
const SAMPLE_LINE_ITEMS = [
  {
    item: "Travertine paver installation (900 sq ft)",
    bid: "$18,400",
    range: "$14-17/sq ft",
    assessment: "$3,100 above range",
    flagged: true,
  },
  {
    item: "Pool deck demo & haul-off",
    bid: "$3,200",
    range: "$2,800-3,500",
    assessment: "Typical",
    flagged: false,
  },
  {
    item: "Electrical for lighting (allowance)",
    bid: "$2,200",
    range: "—",
    assessment: "Vague scope",
    flagged: true,
  },
  {
    item: "Engineered retaining wall (60 linear ft)",
    bid: "$12,000",
    range: "$140-175/ft",
    assessment: "$1,500 above range",
    flagged: true,
  },
  {
    item: "Irrigation tie-in",
    bid: "$700",
    range: "$900-1,300",
    assessment: "$200 below range",
    flagged: false,
  },
  {
    item: "Permit & HOA submittal handling",
    bid: "$850",
    range: "$500-900",
    assessment: "Typical",
    flagged: false,
  },
];

const SAMPLE_TOTAL_BID = "$37,350";

const SAMPLE_FINDINGS = [
  "Pricing: The travertine paver line comes in $3,100 above the current Las Vegas Valley market range for this size and material — the full range is in your paid review. Ask for a materials and labor breakdown before agreeing to it.",
  "Pricing: The engineered retaining wall's per-foot rate runs $1,500 above the typical range for this length and height, and it's not clear whether a stamped engineering review is included, or billed separately.",
  "Pricing: The irrigation tie-in comes in about $200 below typical range for this scope — good news on price, though worth a quick check that the scope (zone count, fittings) matches a typical tie-in at this price.",
  "Scope gap: “Electrical for lighting” is a single $2,200 allowance with no fixture count, wattage, or trenching detail. Vague allowances like this are one of the most common places change orders show up later.",
];

const SAMPLE_QUESTIONS = [
  "Can you break the electrical allowance down by fixture count, wattage, and trenching instead of one lump sum?",
  "What's driving the $3,100 premium on the paver install compared to current market rates — material grade, base prep, or something else?",
  "Is a stamped engineering review included for the retaining wall at this height, or is that billed separately?",
  "Can you confirm the irrigation tie-in's zone count and fittings match a typical setup at this price?",
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

      <section className="bg-foreground">
        <div className="mx-auto max-w-2xl px-6 py-16 text-center lg:px-10">
          <p className="font-heading text-3xl text-background sm:text-5xl">
            Don&apos;t Ever Overpay For Your Backyard Project.
          </p>
          <p className="mt-4 text-sm text-background/70 sm:text-base">
            This one small investment — a flat {BID_REVIEW_PRICE_DISPLAY} —
            could save you thousands.
          </p>
        </div>
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

      <section className="border-t border-border">
        <div className="mx-auto max-w-3xl px-6 py-24 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              See A Sample
            </p>
            <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
              What A Review Actually Looks Like
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-sm border border-border bg-card text-left">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border bg-secondary/40 px-6 py-5">
              <div>
                <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase">
                  Bid Review Report
                </p>
                <p className="mt-1 font-heading text-lg text-foreground">
                  Backyard Hardscape &amp; Pool Deck Renovation
                </p>
              </div>
              <p className="text-right text-xs text-muted-foreground">
                Prepared by
                <br />
                Vegas Hardscape Design
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs tracking-wide text-muted-foreground uppercase">
                    <th scope="col" className="px-6 py-3 font-medium">
                      Line Item
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      Bid
                    </th>
                    <th scope="col" className="px-4 py-3 font-medium">
                      <span className="inline-flex items-center gap-1.5">
                        Market Range
                        <Lock className="size-3 shrink-0" strokeWidth={2} />
                      </span>
                    </th>
                    <th scope="col" className="px-6 py-3 font-medium">
                      Assessment
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {SAMPLE_LINE_ITEMS.map((row) => (
                    <tr key={row.item}>
                      <td className="px-6 py-4 align-top text-foreground">{row.item}</td>
                      <td className="px-4 py-4 align-top whitespace-nowrap text-foreground">
                        {row.bid}
                      </td>
                      <td className="px-4 py-4 align-top whitespace-nowrap text-muted-foreground">
                        {row.range === "—" ? (
                          row.range
                        ) : (
                          <span
                            className="pointer-events-none blur-[4px] select-none"
                            aria-hidden="true"
                          >
                            {row.range}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 align-top whitespace-nowrap">
                        <span
                          className={
                            row.flagged
                              ? "inline-flex items-center gap-1.5 text-accent"
                              : "inline-flex items-center gap-1.5 text-muted-foreground"
                          }
                        >
                          {row.flagged ? (
                            <AlertTriangle className="size-3.5 shrink-0" strokeWidth={2} />
                          ) : (
                            <Check className="size-3.5 shrink-0" strokeWidth={2} />
                          )}
                          {row.assessment}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-border">
                    <td className="px-6 py-4 font-medium text-foreground">Total Bid</td>
                    <td className="px-4 py-4 font-medium whitespace-nowrap text-foreground">
                      {SAMPLE_TOTAL_BID}
                    </td>
                    <td colSpan={2}></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <p className="border-t border-border px-6 py-3 text-xs text-muted-foreground/80">
              <Lock className="mr-1.5 inline size-3" strokeWidth={2} />
              Market-rate benchmarks are blurred here — they&apos;re included
              in full in your paid review.
            </p>

            <div className="border-t border-border px-6 py-6">
              <p className="text-xs font-medium tracking-[0.15em] text-foreground/60 uppercase">
                Findings
              </p>
              <ul className="mt-3 space-y-3">
                {SAMPLE_FINDINGS.map((finding) => (
                  <li key={finding} className="flex items-start gap-3 text-sm text-foreground">
                    <AlertTriangle
                      className="mt-0.5 size-4 shrink-0 text-accent"
                      strokeWidth={2}
                    />
                    {finding}
                  </li>
                ))}
              </ul>

              <p className="mt-6 text-xs font-medium tracking-[0.15em] text-foreground/60 uppercase">
                Questions To Bring To Your Contractor
              </p>
              <ul className="mt-3 space-y-3">
                {SAMPLE_QUESTIONS.map((question) => (
                  <li key={question} className="flex items-start gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
                    {question}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col items-start gap-2 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-heading text-lg text-foreground">
                  $4,600 in above-range pricing flagged
                </p>
                <p className="text-xs font-medium tracking-[0.1em] text-accent uppercase">
                  ~18x the cost of the review
                </p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">Bottom line: </span>
                Three items worth resolving before signing — the paver
                pricing ($3,100 above range), the retaining wall pricing and
                engineering ($1,500 above range), and the electrical
                allowance&apos;s vague scope. The irrigation tie-in comes in
                $200 below range — good news — and demo and permitting line
                up with current market rates.
              </p>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-muted-foreground/80">
            Illustrative example built from typical bid patterns — not an
            actual client&apos;s project.
          </p>
        </div>
      </section>

      <section id="get-started" className="mx-auto max-w-4xl scroll-mt-8 px-6 py-24 text-center lg:px-10">
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

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center lg:px-10">
          <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
            Ready To Know What&apos;s Fair?
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            A flat {BID_REVIEW_PRICE_DISPLAY}, reviewed within{" "}
            {BID_REVIEW_TURNAROUND_DISPLAY} — before you sign, not after.
          </p>
          <Link
            href="#get-started"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 h-11 bg-accent px-8 text-sm tracking-wide text-accent-foreground hover:bg-accent/90"
            )}
          >
            Get My Bid Reviewed
          </Link>
        </div>
      </section>
    </>
  );
}
