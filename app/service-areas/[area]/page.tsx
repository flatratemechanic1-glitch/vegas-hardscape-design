import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calculator, Compass, Leaf, PenTool, ShieldCheck } from "lucide-react";
import { GalleryGrid } from "@/components/portfolio/gallery-grid";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICE_AREAS, SERVICES, TRUST_SIGNALS } from "@/lib/constants";
import { FAQS } from "@/lib/faqs";
import { FEATURED_TESTIMONIAL } from "@/lib/testimonials";
import { GALLERY_ITEMS } from "@/lib/portfolio";

export const dynamicParams = false;

const SERVICE_ICONS = [PenTool, Compass, ShieldCheck];
const TRUST_ICONS = [PenTool, ShieldCheck, Compass];

export async function generateStaticParams() {
  return SERVICE_AREAS.map((area) => ({ area: area.slug }));
}

export async function generateMetadata(
  { params }: PageProps<"/service-areas/[area]">
): Promise<Metadata> {
  const { area: slug } = await params;
  const area = SERVICE_AREAS.find((a) => a.slug === slug);
  if (!area) return {};

  return {
    title: `${area.name} Hardscape & Pool Design`,
    description: `Custom hardscape and pool design, 3D renderings, and owner's rep consulting for homeowners in ${area.name}, part of the Las Vegas Valley.`,
    alternates: {
      canonical: `/service-areas/${area.slug}`,
    },
  };
}

export default async function ServiceAreaPage(
  { params }: PageProps<"/service-areas/[area]">
) {
  const { area: slug } = await params;
  const area = SERVICE_AREAS.find((a) => a.slug === slug);
  if (!area) notFound();

  const areaPhotos = GALLERY_ITEMS.filter((item) => item.area === area.slug);

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Service Area
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            {area.name} Hardscape, Pool Design &amp; Owner&apos;s Rep
            Consulting
          </h1>
          <p className="mt-6 text-sm text-muted-foreground sm:text-base">
            {area.blurb}
          </p>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Vegas Hardscape Design plans, renders, and independently
            oversees luxury outdoor projects for homeowners in {area.name}{" "}
            — without ever picking up a shovel.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-secondary/30">
        <Link
          href="/tools"
          className="mx-auto flex max-w-4xl items-center justify-center gap-3 px-6 py-4 text-center text-sm text-foreground/80 transition-colors hover:text-accent lg:px-10"
        >
          <Calculator className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
          Planning your {area.name} project? Try our free planning
          calculators
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </section>

      <section className="border-b border-border bg-secondary/30">
        <Link
          href="/plants"
          className="mx-auto flex max-w-4xl items-center justify-center gap-3 px-6 py-4 text-center text-sm text-foreground/80 transition-colors hover:text-accent lg:px-10"
        >
          <Leaf className="size-4 shrink-0 text-accent" strokeWidth={1.5} />
          Looking for drought-tolerant plants for {area.name}? Browse our
          desert plant guide
          <span aria-hidden="true">&rarr;</span>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            What We Do
          </p>
          <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
            Three Core Services
          </h2>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <div key={service.slug} className="flex flex-col gap-4">
                <Icon className="size-6 text-accent" strokeWidth={1.5} />
                <h3 className="font-heading text-xl text-foreground">
                  {service.title}
                </h3>
                <p className="flex-1 text-sm text-muted-foreground">
                  {service.summary}
                </p>
                <Link
                  href="/services"
                  aria-label={`Learn more about ${service.title}`}
                  className="text-xs font-medium tracking-[0.15em] text-accent uppercase hover:underline"
                >
                  Learn More
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {areaPhotos.length > 0 ? (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
                Recent Work
              </p>
              <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
                Recent Work Near {area.name}
              </h2>
              <p className="mt-4 text-sm text-muted-foreground sm:text-base">
                A sample of concept renderings and design work near{" "}
                {area.name}.
              </p>
            </div>

            <div className="mt-16">
              <GalleryGrid items={areaPhotos} />
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/portfolio"
                className="text-xs font-medium tracking-[0.15em] text-accent uppercase hover:underline"
              >
                See Full Portfolio
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="border-t border-border bg-secondary/40">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
            <div className="grid gap-10 sm:grid-cols-3">
              {TRUST_SIGNALS.map((signal, i) => {
                const Icon = TRUST_ICONS[i];
                return (
                  <div key={signal.title} className="border-t border-accent/40 pt-6">
                    <Icon className="size-6 text-accent" strokeWidth={1.5} />
                    <h3 className="mt-4 font-heading text-lg text-foreground">
                      {signal.title}
                    </h3>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {signal.description}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/portfolio"
                className="text-xs font-medium tracking-[0.15em] text-accent uppercase hover:underline"
              >
                See Our Portfolio
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="border-b border-border">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 py-24 text-center lg:px-10">
          <blockquote>
            <p className="font-heading text-xl leading-relaxed text-foreground sm:text-2xl">
              &ldquo;{FEATURED_TESTIMONIAL.quote}&rdquo;
            </p>
            <footer className="mt-6 text-xs font-medium tracking-[0.15em] text-accent uppercase">
              {FEATURED_TESTIMONIAL.author} — {FEATURED_TESTIMONIAL.detail}
            </footer>
          </blockquote>
        </div>
      </section>

      <section>
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
            Ready to see your {area.name} project before it&apos;s built?
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
