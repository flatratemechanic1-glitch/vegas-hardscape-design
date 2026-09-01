import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides",
  description:
    "Free guides on reading a contractor bid, understanding pricing, and spotting red flags before you sign — for paver, pool, concrete, and hardscape projects anywhere.",
  alternates: {
    canonical: "/guides",
  },
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <>
      <section className="border-b border-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center lg:px-10">
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Guides
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            Bid-Reading &amp; Pricing Guides
          </h1>
          <p className="mt-6 text-sm text-muted-foreground sm:text-base">
            What to look for in a contractor bid before you sign — free,
            and useful wherever you&apos;re building.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`} className="group">
              <Card className="h-full transition-colors group-hover:bg-secondary/40">
                <CardHeader>
                  <BookOpen className="size-6 text-accent" strokeWidth={1.5} />
                  <CardTitle className="mt-3 text-xl">{guide.title}</CardTitle>
                  <CardDescription>{guide.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <span className="text-xs font-medium tracking-[0.15em] text-accent uppercase group-hover:underline">
                    Read the Guide
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
