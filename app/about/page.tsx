import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Reggie, founder and lead designer of Vegas Hardscape Design — decades of artistic and structural expertise translated into precision outdoor design.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border bg-secondary/40">
          <Image
            src="/about/reggie-portrait.jpg"
            alt="Reggie, founder and lead designer of Vegas Hardscape Design"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="object-cover"
          />
        </div>

        <div>
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            About
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            Reggie, Founder &amp; Lead Designer
          </h1>

          <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              Before founding Vegas Hardscape Design, Reggie spent decades
              working as a professional airbrush artist — a discipline built
              on precision, patience, and an exacting eye for light, depth,
              and material. That same eye now drives every photorealistic
              rendering we produce, so the backyard you approve on-screen is
              the backyard you get.
            </p>
            <p>
              Paired with that artistic foundation is a lifetime of
              mechanical and structural knowledge — an understanding of how
              things are actually engineered and built. Reggie brings that
              fluency to every design, translating drainage, grading, and
              structural realities into layouts that hold up long after the
              renderings are approved.
            </p>
            <p>
              As your owner&apos;s representative, that same background lets
              Reggie read contractor bids and specifications closely, verify
              material quantities and costs against the design, and catch
              inconsistencies before they become change orders — so you know
              a bid reflects the actual project, not inflated pricing.
              He advocates for your design intent from the first shovel to
              the final walkthrough — all without ever performing the
              physical work himself. Construction is always carried out by
              your own licensed, insured Nevada contractors.
            </p>
          </div>

          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-10 h-11 px-8 text-sm tracking-wide"
            )}
          >
            Book a 3D Design Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
