import type { Metadata } from "next";
import Link from "next/link";
import { Compass, PenTool, ShieldCheck } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { FaqJsonLd } from "@/components/seo/faq-jsonld";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";
import { FAQS } from "@/lib/faqs";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Custom hardscape and pool layout design, 3D SketchUp renderings, and owner's representative project consulting in Las Vegas.",
};

const SERVICE_ICONS = [PenTool, Compass, ShieldCheck];

export default function ServicesPage() {
  return (
    <>
      <FaqJsonLd />

      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Services
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            Design, Rendering &amp; Owner&apos;s Rep Consulting
          </h1>
          <p className="mt-6 text-sm text-muted-foreground sm:text-base">
            We do not perform construction, installation, or physical
            contracting. Every service below is design and consulting work,
            handed off to your own licensed and insured Nevada contractors
            for execution.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="flex flex-col divide-y divide-border">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <div
                key={service.slug}
                className="grid gap-8 py-16 first:pt-0 last:pb-0 md:grid-cols-[auto_1fr] md:gap-16"
              >
                <div className="flex items-start gap-4 md:w-64 md:flex-col md:gap-6">
                  <Icon className="size-8 text-accent" strokeWidth={1.5} />
                  <span className="font-heading text-sm text-muted-foreground">
                    Service {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border">
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
            {FAQS.map((faq) => (
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
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-6 py-20 text-center lg:px-10">
          <h2 className="font-heading text-2xl text-foreground sm:text-3xl">
            Ready to see your project before it&apos;s built?
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
