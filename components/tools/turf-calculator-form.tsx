"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Droplets, Link2, Package, Ruler } from "lucide-react";
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

const ROLL_WIDTHS_FT = [12, 15] as const;

// Rule-of-thumb rates used across residential turf installs — exact
// figures vary by product spec and installer preference.
const STAPLES_PER_SQ_FT = 0.3;
// Commonly cited desert-climate estimate for grass irrigation use;
// presented as an illustrative figure, not a guarantee.
const GALLONS_SAVED_PER_SQ_FT_PER_YEAR = 55;

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
);

function formatNumber(value: number, digits = 0) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  });
}

export function TurfCalculatorForm() {
  const [length, setLength] = useState("30");
  const [width, setWidth] = useState("20");
  const [rollWidthFt, setRollWidthFt] = useState<string>("15");
  const [wasteFactor, setWasteFactor] = useState("10");
  const [infillRate, setInfillRate] = useState("1.5");

  const hasTracked = useRef(false);

  const results = useMemo(() => {
    const lengthFt = parseFloat(length) || 0;
    const widthFt = parseFloat(width) || 0;
    const areaSqFt = lengthFt * widthFt;

    const wasteFactorNum = Math.max(parseFloat(wasteFactor) || 0, 0);
    const turfToOrderSqFt = areaSqFt * (1 + wasteFactorNum / 100);

    const rollWidth = parseFloat(rollWidthFt) || 0;
    const shorterSide = Math.min(lengthFt, widthFt);
    const longerSide = Math.max(lengthFt, widthFt);
    const stripsNeeded = rollWidth > 0 ? Math.ceil(shorterSide / rollWidth) : 0;
    const seams = Math.max(stripsNeeded - 1, 0);
    const seamTapeFt = seams * longerSide;

    const infillRateNum = Math.max(parseFloat(infillRate) || 0, 0);
    const infillLbs = areaSqFt * infillRateNum;
    const infillBags = Math.ceil(infillLbs / 50);

    const staples = Math.ceil(areaSqFt * STAPLES_PER_SQ_FT);

    const estimatedGallonsPerYear = areaSqFt * GALLONS_SAVED_PER_SQ_FT_PER_YEAR;

    return {
      isValid: areaSqFt > 0,
      areaSqFt,
      turfToOrderSqFt,
      seams,
      seamTapeFt,
      infillLbs,
      infillBags,
      staples,
      estimatedGallonsPerYear,
    };
  }, [length, width, rollWidthFt, wasteFactor, infillRate]);

  useEffect(() => {
    if (results.isValid && !hasTracked.current) {
      hasTracked.current = true;
      trackToolUsed("turf_calculator");
    }
  }, [results.isValid]);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Ruler className="size-4 text-accent" />
            Yard Dimensions
          </CardTitle>
          <CardDescription>
            Enter the area you plan to convert to artificial turf.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="turf-length">Length (ft)</Label>
              <Input
                id="turf-length"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="turf-width">Width (ft)</Label>
              <Input
                id="turf-width"
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
            <Label htmlFor="turf-roll-width">Turf Roll Width</Label>
            <select
              id="turf-roll-width"
              className={selectClassName}
              value={rollWidthFt}
              onChange={(e) => setRollWidthFt(e.target.value)}
            >
              {ROLL_WIDTHS_FT.map((w) => (
                <option key={w} value={w}>
                  {w} ft (standard)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="turf-waste">Waste Factor (%)</Label>
              <Input
                id="turf-waste"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={wasteFactor}
                onChange={(e) => setWasteFactor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="turf-infill-rate">Infill Rate (lb/sq ft)</Label>
              <Input
                id="turf-infill-rate"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.1"
                value={infillRate}
                onChange={(e) => setInfillRate(e.target.value)}
              />
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
              : "Enter a yard length and width to see estimated materials."}
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
                    Sq Ft Total Area
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Package className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.turfToOrderSqFt, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Sq Ft Turf to Order
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Link2 className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {results.seams}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Estimated Seams ({formatNumber(results.seamTapeFt, 0)} ft tape)
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Package className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.infillBags, 0)} bags
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Infill ({formatNumber(results.infillLbs, 0)} lb)
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-foreground">
                  <span className="font-heading text-lg text-foreground">
                    {formatNumber(results.staples, 0)}
                  </span>{" "}
                  landscape staples <span className="text-muted-foreground">(approx.)</span>
                </p>
              </div>

              <div className="mt-3 rounded-lg border border-accent/40 bg-accent/10 p-4">
                <div className="flex items-start gap-3">
                  <Droplets className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
                  <p className="text-sm text-foreground">
                    <span className="font-heading text-lg text-foreground">
                      ~{formatNumber(results.estimatedGallonsPerYear, 0)} gal/year
                    </span>{" "}
                    <span className="text-muted-foreground">
                      illustrative water savings from converting this area — actual
                      savings depend on your current irrigation and plant choices.
                      Check SNWA&apos;s Water Smart Landscapes program for current
                      rebate details.
                    </span>
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Estimates only — actual roll layout, seam placement, and
                infill depend on your yard&apos;s exact shape and the turf
                product chosen.{" "}
                <Link
                  href="/contact"
                  className="font-medium text-accent hover:underline"
                >
                  Book a consultation
                </Link>{" "}
                for an exact material take-off on your project.
              </p>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Your estimated turf, infill, and seaming materials will appear
              here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
