import type { Metadata } from "next";
import Link from "next/link";
import { FirePitCalculatorForm } from "@/components/tools/fire-pit-calculator-form";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FIRE_PIT_CALCULATOR_FAQS } from "@/lib/tool-faqs";

export const metadata: Metadata = {
  title: "Free Fire Pit Calculator",
  description:
    "Estimate how many blocks and how much base fill your fire pit needs from its diameter and block size — a free planning calculator from Vegas Hardscape Design.",
  alternates: {
    canonical: "/tools/fire-pit-calculator",
  },
};

export default function FirePitCalculatorPage() {
  return (
    <>
      <FaqJsonLd faqs={FIRE_PIT_CALCULATOR_FAQS} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Free Tool
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            Fire Pit Calculator
          </h1>
          <p className="mt-6 text-sm text-muted-foreground sm:text-base">
            Enter your fire pit&apos;s interior diameter and block
            dimensions to estimate how many blocks and how much base fill
            you&apos;ll need for a round fire pit.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <FirePitCalculatorForm />
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
            {FIRE_PIT_CALCULATOR_FAQS.map((faq) => (
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
            Designing a full outdoor living space?
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            This calculator gives you a solid planning estimate for a
            standalone fire pit. Our design process integrates fire
            features into a complete patio and hardscape layout, mapped
            and rendered before anyone breaks ground.
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
