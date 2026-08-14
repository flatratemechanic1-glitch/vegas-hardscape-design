import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SERVICE_AREA_HIGHLIGHTS, SITE_TAGLINE } from "@/lib/constants";
import { HeroContactForm } from "@/components/home/hero-contact-form";

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

      <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16 lg:px-10 lg:py-24">
        <div className="text-center lg:text-left">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Serving {SERVICE_AREA_HIGHLIGHTS.join(" · ")} &amp; Beyond
          </p>

          <h1 className="mt-6 font-heading text-4xl leading-tight text-background sm:text-5xl lg:text-6xl">
            {SITE_TAGLINE}
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base text-background/80 sm:text-lg lg:mx-0">
            Vegas Hardscape Design plans, renders, and independently oversees
            your luxury outdoor project — from first concept to final
            walkthrough — without ever picking up a shovel.
          </p>

          <div className="mt-10 flex justify-center lg:justify-start">
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

        <HeroContactForm />
      </div>
    </section>
  );
}
