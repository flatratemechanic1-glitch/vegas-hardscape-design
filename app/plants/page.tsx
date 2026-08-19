import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { PlantsPageContent } from "@/components/plants/plants-page-content";
import { cn } from "@/lib/utils";
import { PLANT_FAQS } from "@/lib/plant-faqs";

export const metadata: Metadata = {
  title: "Desert Plants for Las Vegas Landscaping",
  description:
    "A guide to the most popular drought-tolerant, SNWA-approved desert plants for Las Vegas yards — trees, shrubs, cacti, groundcovers, and grasses, with water use and care notes.",
  alternates: {
    canonical: "/plants",
  },
};

export default function PlantsPage() {
  return (
    <>
      <FaqJsonLd faqs={PLANT_FAQS} />

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Desert Plants
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            Desert Plants for Las Vegas Landscaping
          </h1>
          <p className="mt-6 text-sm text-muted-foreground sm:text-base">
            Popular, drought-tolerant plants that thrive in the Mojave
            desert and hold up to Las Vegas summers — many qualify for
            SNWA&apos;s Water Smart Landscapes rebate when you convert grass
            to xeriscape.
          </p>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Browse by category, and add any plants you like to a quote
            request — we&apos;ll work them into your 3D landscape design.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <PlantsPageContent />
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
            {PLANT_FAQS.map((faq) => (
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

      <section className="border-b border-border">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-24 text-center lg:px-10">
          <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
            Ready to design a water-wise landscape?
          </h2>
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
