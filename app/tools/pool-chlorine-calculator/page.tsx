import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { PoolChlorineCalculatorForm } from "@/components/tools/pool-chlorine-calculator-form";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { POOL_CHLORINE_CALCULATOR_FAQS } from "@/lib/tool-faqs";

export const metadata: Metadata = {
  title: "Free Pool Chlorine Calculator",
  description:
    "Estimate how much liquid chlorine your pool needs to reach a target free chlorine level — a free planning calculator from Vegas Hardscape Design.",
  alternates: {
    canonical: "/tools/pool-chlorine-calculator",
  },
};

function CalculatorFallback() {
  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <div className="h-96 animate-pulse rounded-xl bg-secondary/40" />
      <div className="h-96 animate-pulse rounded-xl bg-secondary/40" />
    </div>
  );
}

export default function PoolChlorineCalculatorPage() {
  return (
    <>
      <FaqJsonLd faqs={POOL_CHLORINE_CALCULATOR_FAQS} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Free Tool
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            Pool Chlorine Calculator
          </h1>
          <p className="mt-6 text-sm text-muted-foreground sm:text-base">
            Enter your pool volume and current vs. target free chlorine to
            estimate how much liquid chlorine to add.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <Suspense fallback={<CalculatorFallback />}>
          <PoolChlorineCalculatorForm />
        </Suspense>
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
            {POOL_CHLORINE_CALCULATOR_FAQS.map((faq) => (
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

      <section className="border-t border-border">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center lg:px-10">
          <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
            Pool chemistry problems keep coming back?
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Recurring chlorine demand or algae issues are often a sign of an
            underlying equipment, circulation, or design problem — not just
            a dosing problem.
          </p>
          <Link
            href="/contact"
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-8 text-sm tracking-wide")}
          >
            Book a 3D Design Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
