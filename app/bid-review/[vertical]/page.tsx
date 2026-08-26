import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, FileSearch } from "lucide-react";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { SampleReport } from "@/components/bid-review/sample-report";
import { PricingForm } from "@/components/bid-review/pricing-form";
import { FaqList } from "@/components/bid-review/faq-list";
import { CtaBand } from "@/components/bid-review/cta-band";
import { BID_REVIEW_PRICE_DISPLAY } from "@/lib/constants";
import { BID_REVIEW_FAQS } from "@/lib/bid-review-faqs";
import { BID_REVIEW_VERTICALS } from "@/lib/bid-review-verticals";

export const dynamicParams = false;

export async function generateStaticParams() {
  return BID_REVIEW_VERTICALS.map((vertical) => ({ vertical: vertical.slug }));
}

export async function generateMetadata(
  { params }: PageProps<"/bid-review/[vertical]">
): Promise<Metadata> {
  const { vertical: slug } = await params;
  const vertical = BID_REVIEW_VERTICALS.find((v) => v.slug === slug);
  if (!vertical) return {};

  return {
    title: `${vertical.name} Bid Review`,
    description: `Get an unbiased, flat-fee written review of your ${vertical.name.toLowerCase()} bid before you sign — pricing sanity check, scope gaps, red flags, and questions to ask. Available nationwide.`,
    alternates: {
      canonical: `/bid-review/${vertical.slug}`,
    },
  };
}

export default async function BidReviewVerticalPage(
  { params, searchParams }: PageProps<"/bid-review/[vertical]">
) {
  const { vertical: slug } = await params;
  const vertical = BID_REVIEW_VERTICALS.find((v) => v.slug === slug);
  if (!vertical) notFound();

  const { error } = await searchParams;
  const errorMessage = typeof error === "string" ? error : null;

  return (
    <>
      <FaqJsonLd faqs={BID_REVIEW_FAQS} />

      <section className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
        <FileSearch className="mx-auto size-10 text-accent" strokeWidth={1.5} />
        <p className="mt-6 text-xs font-medium tracking-[0.3em] text-accent uppercase">
          {vertical.kicker}
        </p>
        <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
          An Unbiased Second Opinion on Your {vertical.name} Bid
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          {vertical.intro}
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
            Common Red Flags In {vertical.name} Bids
          </p>
          <ul className="mt-6 space-y-4">
            {vertical.redFlags.map((flag) => (
              <li key={flag} className="flex items-start gap-3 text-sm leading-relaxed text-foreground sm:text-base">
                <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2} />
                {flag}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <SampleReport />
      <PricingForm errorMessage={errorMessage} />
      <FaqList faqs={BID_REVIEW_FAQS} />
      <CtaBand />
    </>
  );
}
