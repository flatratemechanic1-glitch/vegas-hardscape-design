import type { Metadata } from "next";
import Link from "next/link";
import {
  BrickWall,
  Calculator,
  ClipboardCheck,
  Droplet,
  Flame,
  FlaskConical,
  Leaf,
  Mountain,
  Sprout,
  Square,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Free Landscape Tools",
  description:
    "Free planning calculators for Las Vegas hardscape and landscape projects, from Vegas Hardscape Design.",
  alternates: {
    canonical: "/tools",
  },
};

const TOOLS = [
  {
    href: "/tools/paver-calculator",
    title: "Paver Patio Calculator",
    description:
      "Estimate paver count, base gravel, and bedding sand for a patio, walkway, or driveway.",
    icon: Calculator,
  },
  {
    href: "/tools/turf-calculator",
    title: "Artificial Turf Calculator",
    description:
      "Estimate turf, infill, and seaming materials for a grass-to-turf conversion, plus water savings.",
    icon: Sprout,
  },
  {
    href: "/tools/retaining-wall-calculator",
    title: "Retaining Wall Calculator",
    description:
      "Estimate block count, base material, and drainage backfill for a garden or grading retaining wall.",
    icon: BrickWall,
  },
  {
    href: "/tools/concrete-calculator",
    title: "Concrete Calculator",
    description:
      "Estimate cubic yards of ready-mix, bag count, and a rebar grid for a slab, patio, or footing.",
    icon: Square,
  },
  {
    href: "/tools/pool-volume-calculator",
    title: "Pool Volume Calculator",
    description:
      "Estimate your pool's gallons, cubic feet, and fill time from its shape and dimensions.",
    icon: Droplet,
  },
  {
    href: "/tools/pool-chlorine-calculator",
    title: "Pool Chlorine Calculator",
    description:
      "Estimate how much liquid chlorine your pool needs to reach a target free chlorine level.",
    icon: FlaskConical,
  },
  {
    href: "/tools/gravel-calculator",
    title: "Gravel Calculator",
    description:
      "Estimate cubic yards, tons, and bag count of gravel or decorative rock for a path or ground cover.",
    icon: Mountain,
  },
  {
    href: "/tools/mulch-calculator",
    title: "Mulch Calculator",
    description:
      "Estimate cubic yards and bag count of mulch for your planting beds.",
    icon: Leaf,
  },
  {
    href: "/tools/fire-pit-calculator",
    title: "Fire Pit Calculator",
    description:
      "Estimate block count and base fill for a round fire pit from its diameter and block size.",
    icon: Flame,
  },
];

export default function ToolsPage() {
  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Free Tools
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            Free Landscape Planning Tools
          </h1>
          <p className="mt-6 text-sm text-muted-foreground sm:text-base">
            Quick, free calculators to help you plan a Las Vegas hardscape
            or landscape project before you talk to a contractor.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link key={tool.href} href={tool.href} className="group">
                <Card className="h-full transition-colors group-hover:bg-secondary/40">
                  <CardHeader>
                    <Icon className="size-6 text-accent" strokeWidth={1.5} />
                    <CardTitle className="mt-3 text-xl">{tool.title}</CardTitle>
                    <CardDescription>{tool.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <span className="text-xs font-medium tracking-[0.15em] text-accent uppercase group-hover:underline">
                      Use the Calculator
                    </span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
              More Resources
            </p>
            <h2 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
              Not a Calculator, But Just as Free
            </h2>
          </div>

          <div className="mt-16 flex justify-center">
            <Link href="/backyard-prep-kit" className="group w-full max-w-md">
              <Card className="h-full transition-colors group-hover:bg-secondary/60">
                <CardHeader>
                  <ClipboardCheck className="size-6 text-accent" strokeWidth={1.5} />
                  <CardTitle className="mt-3 text-xl">
                    Backyard Project Prep Kit
                  </CardTitle>
                  <CardDescription>
                    A printable yard measurement worksheet and design
                    consultation checklist to get organized before your
                    first meeting.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-xs font-medium tracking-[0.15em] text-accent uppercase group-hover:underline">
                    Get the Prep Kit
                  </span>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
