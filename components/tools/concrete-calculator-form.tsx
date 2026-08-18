"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Boxes, Link2, Package, Ruler } from "lucide-react";
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

const BAG_SIZES = [
  { key: "60", label: "60 lb bags", yieldsCuFt: 0.45 },
  { key: "80", label: "80 lb bags", yieldsCuFt: 0.6 },
] as const;

// Rule-of-thumb rebar grid on 24 in. centers, common for residential slabs.
const REBAR_SPACING_FT = 2;

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
);

export function ConcreteCalculatorForm() {
  const [length, setLength] = useState("10");
  const [width, setWidth] = useState("10");
  const [thicknessIn, setThicknessIn] = useState("4");
  const [wasteFactor, setWasteFactor] = useState("10");
  const [bagSizeKey, setBagSizeKey] = useState<(typeof BAG_SIZES)[number]["key"]>("80");

  const hasTracked = useRef(false);

  const results = useMemo(() => {
    const lengthFt = parseFloat(length) || 0;
    const widthFt = parseFloat(width) || 0;
    const areaSqFt = lengthFt * widthFt;

    const thicknessNum = Math.max(parseFloat(thicknessIn) || 0, 0);
    const volumeCuFt = areaSqFt * (thicknessNum / 12);
    const wasteFactorNum = Math.max(parseFloat(wasteFactor) || 0, 0);
    const volumeCuFtWithWaste = volumeCuFt * (1 + wasteFactorNum / 100);
    const volumeCuYd = volumeCuFtWithWaste / 27;

    const selectedBag = BAG_SIZES.find((b) => b.key === bagSizeKey);
    const bagsNeeded =
      selectedBag && selectedBag.yieldsCuFt > 0
        ? ceilSafe(volumeCuFtWithWaste / selectedBag.yieldsCuFt)
        : 0;

    const barsAlongWidth = widthFt > 0 ? ceilSafe(widthFt / REBAR_SPACING_FT) + 1 : 0;
    const barsAlongLength = lengthFt > 0 ? ceilSafe(lengthFt / REBAR_SPACING_FT) + 1 : 0;
    const rebarFt = barsAlongWidth * lengthFt + barsAlongLength * widthFt;

    return {
      isValid: areaSqFt > 0 && thicknessNum > 0,
      areaSqFt,
      volumeCuYd,
      bagsNeeded,
      rebarFt,
    };
  }, [length, width, thicknessIn, wasteFactor, bagSizeKey]);

  useEffect(() => {
    if (results.isValid && !hasTracked.current) {
      hasTracked.current = true;
      trackToolUsed("concrete_calculator");
    }
  }, [results.isValid]);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Ruler className="size-4 text-accent" />
            Slab Dimensions
          </CardTitle>
          <CardDescription>
            Enter the slab, footing, or pad you plan to pour.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="concrete-length">Length (ft)</Label>
              <Input
                id="concrete-length"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concrete-width">Width (ft)</Label>
              <Input
                id="concrete-width"
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
            <Label htmlFor="concrete-thickness">Thickness (in)</Label>
            <Input
              id="concrete-thickness"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.5"
              value={thicknessIn}
              onChange={(e) => setThicknessIn(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="concrete-waste">Waste Factor (%)</Label>
              <Input
                id="concrete-waste"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={wasteFactor}
                onChange={(e) => setWasteFactor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="concrete-bag-size">Bag Size</Label>
              <select
                id="concrete-bag-size"
                className={selectClassName}
                value={bagSizeKey}
                onChange={(e) =>
                  setBagSizeKey(e.target.value as (typeof BAG_SIZES)[number]["key"])
                }
              >
                {BAG_SIZES.map((bag) => (
                  <option key={bag.key} value={bag.key}>
                    {bag.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-secondary/30 lg:sticky lg:top-28">
        <CardHeader>
          <CardTitle className="text-lg">Estimated Materials</CardTitle>
          <CardDescription>
            {results.isValid
              ? "Rough quantities based on the inputs to the left."
              : "Enter slab dimensions and thickness to see estimated materials."}
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
                  <Boxes className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.volumeCuYd, 2)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Cu Yd Ready-Mix
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Package className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.bagsNeeded, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Bags (if bagged mix)
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Link2 className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.rebarFt, 0)} ft
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Rebar Grid (24&quot; O.C.)
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Estimates only — for anything beyond a small pour, confirm
                exact yardage with your ready-mix supplier.{" "}
                <Link
                  href="/contact"
                  className="font-medium text-accent hover:underline"
                >
                  Book a consultation
                </Link>{" "}
                for an exact material plan on your project.
              </p>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Your estimated concrete volume, bag count, and rebar grid will
              appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
