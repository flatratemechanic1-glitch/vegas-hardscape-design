import type { Metadata } from "next";
import Link from "next/link";
import { PrepKitPrintButton } from "@/components/tools/prep-kit-print-button";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SITE_NAME } from "@/lib/constants";
import { PREP_KIT_FAQS } from "@/lib/tool-faqs";

export const metadata: Metadata = {
  title: "Free Backyard Project Prep Kit",
  description:
    "A free yard measurement worksheet and design-consultation checklist to help you get organized before starting a Las Vegas backyard project.",
  alternates: {
    canonical: "/backyard-prep-kit",
  },
};

const CHECKLIST_ITEMS = [
  "Photos of your yard from multiple angles (8-10 recommended, including any problem areas)",
  "Your HOA's architectural guidelines or CC&Rs, if applicable",
  "Any existing plot plan, survey, or builder's landscape plan",
  "A rough budget range in mind",
  "2-3 inspiration photos or projects you like",
  "Notes on any known drainage, grading, or irrigation issues",
  "Everyone who needs to be part of the decision, available for the consultation",
];

const DESIGNER_QUESTIONS = [
  "Are you a design-only firm, or do you also handle construction?",
  "Will I get a detailed material take-off I can use to compare contractor bids?",
  "How many rendering revisions are included before final approval?",
  "What's the typical timeline from initial consultation to construction-ready plans?",
  "Do you handle HOA submittal packages, or is that on me?",
  "Who oversees the project once construction starts, and how often will I hear from them?",
];

export default function BackyardPrepKitPage() {
  return (
    <>
      <FaqJsonLd faqs={PREP_KIT_FAQS} />

      <div className="hidden text-center print:block">
        <p className="font-heading text-lg text-foreground">{SITE_NAME}</p>
        <p className="text-sm text-muted-foreground">Backyard Project Prep Kit</p>
      </div>

      <section className="border-b border-border print:border-0">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10 print:py-6">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase print:hidden">
            Free Resource
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl print:text-2xl">
            Backyard Project Prep Kit
          </h1>
          <p className="mt-6 text-sm text-muted-foreground sm:text-base print:hidden">
            A measurement worksheet and consultation checklist to help you
            get organized before you talk to a designer — fill it in on
            screen or print it and take it with you.
          </p>
          <div className="mt-8 print:hidden">
            <PrepKitPrintButton />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl space-y-12 px-6 py-24 lg:px-10 print:space-y-8 print:py-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Yard Measurement Worksheet</CardTitle>
            <CardDescription>
              Rough numbers are fine — this is for getting organized, not a
              final survey.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="prep-length">Overall Yard Length (ft)</Label>
                <Input id="prep-length" type="text" inputMode="decimal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prep-width">Overall Yard Width (ft)</Label>
                <Input id="prep-width" type="text" inputMode="decimal" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prep-features">
                Existing Features (pool, patio, trees, slope direction, etc.)
              </Label>
              <Textarea id="prep-features" rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prep-sun">
                Sun &amp; Shade Notes (which areas get morning sun, afternoon
                sun, or full shade?)
              </Label>
              <Textarea id="prep-sun" rows={3} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prep-utilities">
                Utility &amp; Sprinkler Line Locations (approximate)
              </Label>
              <Textarea id="prep-utilities" rows={2} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="prep-access">
                Access Notes (gate width, side yard clearance, equipment
                access)
              </Label>
              <Input id="prep-access" type="text" />
            </div>

            <div className="space-y-2">
              <Label>Rough Sketch (optional)</Label>
              <div
                className="h-64 w-full rounded-lg border border-border bg-card"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, var(--border), var(--border) 1px, transparent 1px, transparent 24px), repeating-linear-gradient(90deg, var(--border), var(--border) 1px, transparent 1px, transparent 24px)",
                }}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Consultation Prep Checklist</CardTitle>
            <CardDescription>
              Have these ready before your first design consultation.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <ul className="space-y-3">
              {CHECKLIST_ITEMS.map((item, i) => (
                <li key={item} className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id={`prep-check-${i}`}
                    className="mt-1 size-4 shrink-0 accent-accent"
                  />
                  <label htmlFor={`prep-check-${i}`} className="text-sm text-foreground">
                    {item}
                  </label>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Questions to Ask Your Designer</CardTitle>
            <CardDescription>
              Good questions to bring to any first consultation, with any
              designer.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-2">
            <div className="flex flex-col divide-y divide-border">
              {DESIGNER_QUESTIONS.map((question) => (
                <p key={question} className="py-3 text-sm text-foreground first:pt-0 last:pb-0">
                  {question}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="border-t border-border bg-secondary/40 print:hidden">
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
            {PREP_KIT_FAQS.map((faq) => (
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

      <section className="border-t border-border print:hidden">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center lg:px-10">
          <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
            Ready to bring this to a consultation?
          </h2>
          <p className="max-w-xl text-sm text-muted-foreground sm:text-base">
            Book a 3D design consultation and bring your filled-out prep
            kit — it&apos;ll help us make the most of your first
            conversation.
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
