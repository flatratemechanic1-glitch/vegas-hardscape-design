"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Leaf, Package, Ruler } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackToolUsed } from "@/lib/analytics";
import { ceilSafe, formatNumber } from "@/lib/calculator-utils";

// Common retail bag size for mulch.
const CU_FT_PER_BAG = 2;

export function MulchCalculatorForm() {
  const [length, setLength] = useState("12");
  const [width, setWidth] = useState("8");
  const [depthIn, setDepthIn] = useState("3");
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

    const bags = volumeCuFt > 0 ? ceilSafe(volumeCuFt / CU_FT_PER_BAG) : 0;

    return {
      isValid: areaSqFt > 0 && depthNum > 0,
      areaSqFt,
      volumeCuYd,
      bags,
    };
  }, [length, width, depthIn, wasteFactor]);

  useEffect(() => {
    if (results.isValid && !hasTracked.current) {
      hasTracked.current = true;
      trackToolUsed("mulch_calculator");
    }
  }, [results.isValid]);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Ruler className="size-4 text-accent" />
            Bed Dimensions
          </CardTitle>
          <CardDescription>
            Enter the planting bed you plan to mulch.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mulch-length">Length (ft)</Label>
              <Input
                id="mulch-length"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mulch-width">Width (ft)</Label>
              <Input
                id="mulch-width"
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
            <Label htmlFor="mulch-depth">Depth (in)</Label>
            <Input
              id="mulch-depth"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.5"
              value={depthIn}
              onChange={(e) => setDepthIn(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mulch-waste">Waste Factor (%)</Label>
            <Input
              id="mulch-waste"
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
              : "Enter a bed area and depth to see estimated materials."}
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
                  <Leaf className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.volumeCuYd, 2)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Cu Yd Volume
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4 col-span-2">
                  <Package className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.bags, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Bags (2 cu ft standard retail bags)
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Estimates only — for larger beds, bulk delivery by the cubic
                yard is usually cheaper than buying by the bag.{" "}
                <Link href="/contact" className="font-medium text-accent hover:underline">
                  Book a consultation
                </Link>{" "}
                for an exact material plan on your project.
              </p>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Your estimated mulch volume and bag count will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
