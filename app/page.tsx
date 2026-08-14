import Link from "next/link";
import { Compass, PenTool, ShieldCheck } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";
import { FEATURED_TESTIMONIAL } from "@/lib/testimonials";

const TRUST_SIGNALS = [
  {
    title: "Design-Only, By Design",
    description:
      "We plan, render, and consult — your licensed, insured contractors handle every stage of physical construction.",
  },
  {
    title: "Independent Advocate",
    description:
      "We are never paid by the contractors we oversee, and our precise material take-offs give you an accurate cost baseline — so you know when a bid is fair, not inflated.",
  },
  {
    title: "See It Before You Build It",
    description:
      "Photorealistic renderings let you approve materials, lighting, and layout on-screen — before ground is broken.",
  },
];

const SERVICE_ICONS = [PenTool, Compass, ShieldCheck];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="border-b border-border">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 sm:grid-cols-3 lg:px-10">
          {TRUST_SIGNALS.map((signal) => (
            <div
              key={signal.title}
              className="border-t border-accent/40 pt-6"
            >
              <h3 className="font-heading text-lg text-foreground">
                {signal.title}
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {signal.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            What We Do
          </p>
          <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
            Three Core Services
          </h2>
          <p className="mt-4 text-sm text-muted-foreground sm:text-base">
            Every engagement is design and consulting only, structured to
            keep you informed and in control from concept to completion.
          </p>
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
                  className="text-xs font-medium tracking-[0.15em] text-accent uppercase hover:underline"
                >
                  Learn More
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 py-24 text-center lg:px-10">
          <blockquote>
            <p className="font-heading text-xl leading-relaxed text-foreground sm:text-2xl">
              &ldquo;{FEATURED_TESTIMONIAL.quote}&rdquo;
            </p>
            <footer className="mt-6 text-xs font-medium tracking-[0.15em] text-accent uppercase">
              {FEATURED_TESTIMONIAL.author} — {FEATURED_TESTIMONIAL.detail}
            </footer>
          </blockquote>
          <Link
            href="/portfolio"
            className={cn(buttonVariants({ size: "lg" }), "h-11 px-8 text-sm tracking-wide")}
          >
            See the Full Project
          </Link>
        </div>
      </section>
    </>
  );
}
