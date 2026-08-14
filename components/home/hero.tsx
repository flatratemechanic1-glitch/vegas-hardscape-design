import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICE_AREA_HIGHLIGHTS, SITE_TAGLINE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden bg-foreground">
      <Image
        src="/hero.jpg"
        alt="Photorealistic rendering of a luxury Las Vegas desert-modern backyard with an infinity pool and mountain views"
        fill
        priority
        className="object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/70 to-foreground/30" />

      <div className="relative mx-auto max-w-5xl px-6 py-32 text-center lg:px-10">
        <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
          Serving {SERVICE_AREA_HIGHLIGHTS.join(" · ")} &amp; Beyond
        </p>

        <h1 className="mt-6 font-heading text-4xl leading-tight text-background sm:text-5xl lg:text-6xl">
          {SITE_TAGLINE}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base text-background/80 sm:text-lg">
          Vegas Hardscape Design plans, renders, and independently oversees
          your luxury outdoor project — from first concept to final
          walkthrough — without ever picking up a shovel.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "h-11 bg-accent px-8 text-sm tracking-wide text-accent-foreground hover:bg-accent/90"
            )}
          >
            Book a 3D Design Consultation
          </Link>
          <Link
            href="/portfolio"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "h-11 border-background/30 bg-transparent px-8 text-sm tracking-wide text-background hover:bg-background/10 hover:text-background"
            )}
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  );
}
