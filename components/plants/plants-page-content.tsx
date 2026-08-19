"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Droplet, Leaf, Plus } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { trackPlantsQuoteRequested } from "@/lib/analytics";
import { PLANT_CATEGORIES, PLANTS, type Plant, type PlantCategory } from "@/lib/plants";

const STORAGE_KEY = "vhd-plant-quote-list";
const ALL_CATEGORIES = "All" as const;

function PlantCard({
  plant,
  selected,
  onToggle,
}: {
  plant: Plant;
  selected: boolean;
  onToggle: () => void;
}) {
  return (
    <Card className="h-full">
      <div className="relative aspect-[4/3]">
        {plant.image ? (
          <Image
            src={plant.image}
            alt={`${plant.name} in a Las Vegas desert landscape`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2 bg-secondary/60 text-accent">
            <Leaf className="size-8" strokeWidth={1.5} />
            <span className="px-4 text-center text-[10px] font-medium tracking-[0.15em] uppercase text-muted-foreground">
              Photo Coming Soon
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-foreground/70 px-2.5 py-1 text-[10px] font-medium tracking-[0.15em] text-background uppercase backdrop-blur-sm">
          <Droplet className="size-3" />
          {plant.waterUse} Water
        </span>
      </div>

      <CardHeader>
        <h3 className="font-heading text-lg text-foreground">{plant.name}</h3>
        <p className="text-xs italic text-muted-foreground">{plant.scientificName}</p>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span>{plant.sunExposure}</span>
          <span>{plant.matureSize}</span>
        </div>
        <p className="flex-1 text-sm text-muted-foreground">{plant.description}</p>
        <Button
          type="button"
          variant={selected ? "secondary" : "outline"}
          size="sm"
          onClick={onToggle}
          aria-pressed={selected}
          className="w-full"
        >
          {selected ? (
            <>
              <Check /> Added to Quote
            </>
          ) : (
            <>
              <Plus /> Add to Quote
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export function PlantsPageContent() {
  const [activeCategory, setActiveCategory] = useState<PlantCategory | typeof ALL_CATEGORIES>(
    ALL_CATEGORIES
  );
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setSelected(new Set(JSON.parse(stored)));
    } catch {
      // Ignore corrupt/unavailable localStorage — selection just starts empty.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...selected]));
  }, [selected, hydrated]);

  function toggle(slug: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  const visiblePlants = useMemo(
    () =>
      activeCategory === ALL_CATEGORIES
        ? PLANTS
        : PLANTS.filter((plant) => plant.category === activeCategory),
    [activeCategory]
  );

  const selectedNames = useMemo(
    () => PLANTS.filter((plant) => selected.has(plant.slug)).map((plant) => plant.name),
    [selected]
  );

  const quoteHref = `/contact?plants=${encodeURIComponent(selectedNames.join(", "))}`;

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2">
        <button
          type="button"
          onClick={() => setActiveCategory(ALL_CATEGORIES)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-xs font-medium tracking-[0.1em] uppercase transition-colors",
            activeCategory === ALL_CATEGORIES
              ? "border-accent bg-accent text-white"
              : "border-border text-muted-foreground hover:text-foreground"
          )}
        >
          All Plants
        </button>
        {PLANT_CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-xs font-medium tracking-[0.1em] uppercase transition-colors",
              activeCategory === category
                ? "border-accent bg-accent text-white"
                : "border-border text-muted-foreground hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePlants.map((plant) => (
          <PlantCard
            key={plant.slug}
            plant={plant}
            selected={selected.has(plant.slug)}
            onToggle={() => toggle(plant.slug)}
          />
        ))}
      </div>

      {selected.size > 0 && (
        <>
          <div className="h-20" aria-hidden="true" />
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4 lg:px-10">
              <p className="text-sm text-foreground">
                <span className="font-medium">{selected.size}</span>{" "}
                {selected.size === 1 ? "plant" : "plants"} selected for your quote
              </p>
              <Link
                href={quoteHref}
                onClick={() => trackPlantsQuoteRequested(selected.size)}
                className={cn(buttonVariants({ size: "lg" }), "px-6 text-sm tracking-wide")}
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
