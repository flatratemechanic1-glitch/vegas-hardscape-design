"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Flame, Layers, Package, Ruler } from "lucide-react";
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

// Common retail bag size for base fill material.
const CU_FT_PER_BAG = 0.5;

export function FirePitCalculatorForm() {
  const [interiorDiameter, setInteriorDiameter] = useState("4");
  const [blockWidthIn, setBlockWidthIn] = useState("12");
  const [blockHeightIn, setBlockHeightIn] = useState("4");
  const [desiredHeightIn, setDesiredHeightIn] = useState("12");
  const [baseFillDepthIn, setBaseFillDepthIn] = useState("4");

  const hasTracked = useRef(false);

  const results = useMemo(() => {
    const diameterFt = parseFloat(interiorDiameter) || 0;
    const circumferenceFt = Math.PI * diameterFt;

    const blockWidthNum = Math.max(parseFloat(blockWidthIn) || 0, 0);
    const blockHeightNum = Math.max(parseFloat(blockHeightIn) || 0, 0);
    const desiredHeightNum = Math.max(parseFloat(desiredHeightIn) || 0, 0);

    const blocksPerCourse =
      blockWidthNum > 0 ? ceilSafe((circumferenceFt * 12) / blockWidthNum) : 0;
    const courses = blockHeightNum > 0 ? ceilSafe(desiredHeightNum / blockHeightNum) : 0;
    const totalBlocks = blocksPerCourse * courses;

    const baseFillDepthNum = Math.max(parseFloat(baseFillDepthIn) || 0, 0);
    const baseFillCuFt = Math.PI * (diameterFt / 2) ** 2 * (baseFillDepthNum / 12);
    const baseFillBags = baseFillCuFt > 0 ? ceilSafe(baseFillCuFt / CU_FT_PER_BAG) : 0;

    return {
      isValid: diameterFt > 0 && blockWidthNum > 0 && blockHeightNum > 0,
      circumferenceFt,
      blocksPerCourse,
      courses,
      totalBlocks,
      baseFillCuFt,
      baseFillBags,
    };
  }, [interiorDiameter, blockWidthIn, blockHeightIn, desiredHeightIn, baseFillDepthIn]);

  useEffect(() => {
    if (results.isValid && !hasTracked.current) {
      hasTracked.current = true;
      trackToolUsed("fire_pit_calculator");
    }
  }, [results.isValid]);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Ruler className="size-4 text-accent" />
            Fire Pit Dimensions
          </CardTitle>
          <CardDescription>
            Enter your desired interior size and block dimensions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="firepit-diameter">Interior Diameter (ft)</Label>
            <Input
              id="firepit-diameter"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.5"
              value={interiorDiameter}
              onChange={(e) => setInteriorDiameter(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firepit-block-width">Block Width (in)</Label>
              <Input
                id="firepit-block-width"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={blockWidthIn}
                onChange={(e) => setBlockWidthIn(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firepit-block-height">Block Height (in)</Label>
              <Input
                id="firepit-block-height"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={blockHeightIn}
                onChange={(e) => setBlockHeightIn(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firepit-height">Desired Height (in)</Label>
              <Input
                id="firepit-height"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={desiredHeightIn}
                onChange={(e) => setDesiredHeightIn(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="firepit-base-depth">Base Fill Depth (in)</Label>
              <Input
                id="firepit-base-depth"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={baseFillDepthIn}
                onChange={(e) => setBaseFillDepthIn(e.target.value)}
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
              : "Enter your fire pit dimensions to see estimated materials."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          {results.isValid ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-card p-4">
                  <Ruler className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.circumferenceFt, 1)} ft
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Circumference
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Flame className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.blocksPerCourse, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Blocks per Course
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Layers className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.totalBlocks, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Total Blocks ({results.courses} courses)
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Package className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.baseFillBags, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Base Fill Bags (0.5 cu ft)
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Estimates only — actual block count depends on the specific
                product, since many fire pit blocks are pre-curved for
                circular construction rather than cut from straight units.{" "}
                <Link href="/contact" className="font-medium text-accent hover:underline">
                  Book a consultation
                </Link>{" "}
                for an exact material plan on your project.
              </p>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Your estimated block count and base fill will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
