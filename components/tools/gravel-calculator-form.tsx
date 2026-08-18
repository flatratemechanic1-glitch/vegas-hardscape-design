"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Mountain, Package, Ruler, Weight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { trackToolUsed } from "@/lib/analytics";
import { ceilSafe, formatNumber } from "@/lib/calculator-utils";

const MATERIALS = [
  { key: "crushed-stone", label: "Crushed Stone / Base (1.4 tons/cu yd)", tonsPerCuYd: 1.4 },
  { key: "decorative-rock", label: "Decorative Rock (1.3 tons/cu yd)", tonsPerCuYd: 1.3 },
  { key: "pea-gravel", label: "Pea Gravel (1.3 tons/cu yd)", tonsPerCuYd: 1.3 },
  { key: "custom", label: "Custom density", tonsPerCuYd: 0 },
] as const;

// Common retail bag size for decorative rock/gravel.
const CU_FT_PER_BAG = 0.5;

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
);

export function GravelCalculatorForm() {
  const [length, setLength] = useState("15");
  const [width, setWidth] = useState("10");
  const [depthIn, setDepthIn] = useState("3");
  const [materialKey, setMaterialKey] =
    useState<(typeof MATERIALS)[number]["key"]>("decorative-rock");
  const [customDensity, setCustomDensity] = useState("1.4");
  const [wasteFactor, setWasteFactor] = useState("10");

  const hasTracked = useRef(false);

  const results = useMemo(() => {
    const lengthFt = parseFloat(length) || 0;
    const widthFt = parseFloat(width) || 0;
    const areaSqFt = lengthFt * widthFt;

    const depthNum = Math.max(parseFloat(depthIn) || 0, 0);
    const wasteFactorNum = Math.max(parseFloat(wasteFactor) || 0, 0);
    const volumeCuFt = areaSqFt * (depthNum / 12) * (1 + wasteFactorNum / 100);
    const volumeCuYd = volumeCuFt / 27;

    const selectedMaterial = MATERIALS.find((m) => m.key === materialKey);
    const tonsPerCuYd =
      materialKey === "custom" ? parseFloat(customDensity) || 0 : selectedMaterial?.tonsPerCuYd ?? 0;
    const weightTons = volumeCuYd * tonsPerCuYd;

    const bags = volumeCuFt > 0 ? ceilSafe(volumeCuFt / CU_FT_PER_BAG) : 0;

    return {
      isValid: areaSqFt > 0 && depthNum > 0,
      areaSqFt,
      volumeCuYd,
      weightTons,
      bags,
    };
  }, [length, width, depthIn, materialKey, customDensity, wasteFactor]);

  useEffect(() => {
    if (results.isValid && !hasTracked.current) {
      hasTracked.current = true;
      trackToolUsed("gravel_calculator");
    }
  }, [results.isValid]);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Ruler className="size-4 text-accent" />
            Coverage Area
          </CardTitle>
          <CardDescription>
            Enter the area you plan to cover with gravel or rock.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gravel-length">Length (ft)</Label>
              <Input
                id="gravel-length"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gravel-width">Width (ft)</Label>
              <Input
                id="gravel-width"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gravel-depth">Depth (in)</Label>
            <Input
              id="gravel-depth"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.5"
              value={depthIn}
              onChange={(e) => setDepthIn(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gravel-material">Material</Label>
            <select
              id="gravel-material"
              className={selectClassName}
              value={materialKey}
              onChange={(e) =>
                setMaterialKey(e.target.value as (typeof MATERIALS)[number]["key"])
              }
            >
              {MATERIALS.map((material) => (
                <option key={material.key} value={material.key}>
                  {material.label}
                </option>
              ))}
            </select>
          </div>

          {materialKey === "custom" && (
            <div className="space-y-2">
              <Label htmlFor="gravel-custom-density">Density (tons/cu yd)</Label>
              <Input
                id="gravel-custom-density"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                value={customDensity}
                onChange={(e) => setCustomDensity(e.target.value)}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="gravel-waste">Waste Factor (%)</Label>
            <Input
              id="gravel-waste"
              type="number"
              inputMode="decimal"
              min="0"
              step="1"
              value={wasteFactor}
              onChange={(e) => setWasteFactor(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-secondary/30 lg:sticky lg:top-28">
        <CardHeader>
          <CardTitle className="text-lg">Estimated Materials</CardTitle>
          <CardDescription>
            {results.isValid
              ? "Rough quantities based on the inputs to the left."
              : "Enter an area and depth to see estimated materials."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          {results.isValid ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-card p-4">
                  <Ruler className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.areaSqFt, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Sq Ft Area
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Mountain className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.volumeCuYd, 2)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Cu Yd Volume
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Weight className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.weightTons, 2)} tons
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Bulk Weight
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Package className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.bags, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Bags (0.5 cu ft)
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Estimates only — for larger areas, bulk delivery by the ton
                is usually far more practical than buying by the bag.{" "}
                <Link href="/contact" className="font-medium text-accent hover:underline">
                  Book a consultation
                </Link>{" "}
                for an exact material plan on your project.
              </p>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Your estimated gravel volume, weight, and bag count will
              appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
