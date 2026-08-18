import type { Metadata } from "next";
import Link from "next/link";
import { BrickWall, Calculator, Droplet, FlaskConical, Sprout, Square } from "lucide-react";
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

      <section className="mx-auto max-w-5xl px-6 py-24 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2">
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
    </>
  );
}
