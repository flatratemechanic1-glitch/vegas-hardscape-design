import type { Metadata } from "next";
import { FileSearch } from "lucide-react";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { SampleReport } from "@/components/bid-review/sample-report";
import { PricingForm } from "@/components/bid-review/pricing-form";
import { FaqList } from "@/components/bid-review/faq-list";
import { CtaBand } from "@/components/bid-review/cta-band";
import { BID_REVIEW_PRICE_DISPLAY } from "@/lib/constants";
import { BID_REVIEW_FAQS } from "@/lib/bid-review-faqs";

export const metadata: Metadata = {
  title: "Bid Review",
  description:
    "Get an unbiased, flat-fee written review of your contractor's bid — pricing sanity check, scope gaps, red flags, and questions to ask. Available nationwide.",
  alternates: {
    canonical: "/bid-review",
  },
};

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

      <SampleReport />
      <PricingForm errorMessage={errorMessage} />
      <FaqList faqs={BID_REVIEW_FAQS} />
      <CtaBand />
    </>
  );
}
