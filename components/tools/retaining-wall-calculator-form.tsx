"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { BrickWall, Layers, LayoutGrid, Ruler } from "lucide-react";
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

const BLOCK_SIZES = [
  { key: "small", label: 'Small (12" x 4")', widthIn: 12, heightIn: 4 },
  { key: "medium", label: 'Medium (16" x 6")', widthIn: 16, heightIn: 6 },
  { key: "large", label: 'Large (18" x 8")', widthIn: 18, heightIn: 8 },
  { key: "custom", label: "Custom size", widthIn: 0, heightIn: 0 },
] as const;

// Standard density for compacted base/drainage stone — close enough for
// planning purposes; exact yields vary by supplier and moisture content.
const BASE_TONS_PER_CUBIC_YARD = 1.4;

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
);

export function RetainingWallCalculatorForm() {
  const [length, setLength] = useState("20");
  const [height, setHeight] = useState("3");
  const [blockSizeKey, setBlockSizeKey] =
    useState<(typeof BLOCK_SIZES)[number]["key"]>("small");
  const [customWidthIn, setCustomWidthIn] = useState("12");
  const [customHeightIn, setCustomHeightIn] = useState("4");
  const [wasteFactor, setWasteFactor] = useState("10");
  const [baseDepthIn, setBaseDepthIn] = useState("6");
  const [backfillWidthIn, setBackfillWidthIn] = useState("12");

  const hasTracked = useRef(false);

  const results = useMemo(() => {
    const lengthFt = parseFloat(length) || 0;
    const heightFt = parseFloat(height) || 0;
    const wallAreaSqFt = lengthFt * heightFt;

    const selectedBlock = BLOCK_SIZES.find((b) => b.key === blockSizeKey);
    const blockWidthIn =
      blockSizeKey === "custom" ? parseFloat(customWidthIn) || 0 : selectedBlock?.widthIn ?? 0;
    const blockHeightIn =
      blockSizeKey === "custom" ? parseFloat(customHeightIn) || 0 : selectedBlock?.heightIn ?? 0;
    const blockFaceAreaSqFt = (blockWidthIn * blockHeightIn) / 144;

    const wasteFactorNum = Math.max(parseFloat(wasteFactor) || 0, 0);
    const blockCount =
      blockFaceAreaSqFt > 0
        ? ceilSafe((wallAreaSqFt / blockFaceAreaSqFt) * (1 + wasteFactorNum / 100))
        : 0;

    const baseDepthNum = Math.max(parseFloat(baseDepthIn) || 0, 0);
    const baseTrenchWidthFt = blockWidthIn > 0 ? blockWidthIn / 12 : 1;
    const baseVolumeCuYd = (lengthFt * (baseDepthNum / 12) * baseTrenchWidthFt) / 27;
    const baseTons = baseVolumeCuYd * BASE_TONS_PER_CUBIC_YARD;

    const backfillWidthNum = Math.max(parseFloat(backfillWidthIn) || 0, 0);
    const backfillVolumeCuYd = (lengthFt * heightFt * (backfillWidthNum / 12)) / 27;
    const backfillTons = backfillVolumeCuYd * BASE_TONS_PER_CUBIC_YARD;

    return {
      isValid: wallAreaSqFt > 0 && blockFaceAreaSqFt > 0,
      wallAreaSqFt,
      blockCount,
      baseVolumeCuYd,
      baseTons,
      backfillVolumeCuYd,
      backfillTons,
    };
  }, [
    length,
    height,
    blockSizeKey,
    customWidthIn,
    customHeightIn,
    wasteFactor,
    baseDepthIn,
    backfillWidthIn,
  ]);

  useEffect(() => {
    if (results.isValid && !hasTracked.current) {
      hasTracked.current = true;
      trackToolUsed("retaining_wall_calculator");
    }
  }, [results.isValid]);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Ruler className="size-4 text-accent" />
            Wall Dimensions
          </CardTitle>
          <CardDescription>
            Enter the wall you plan to build and your preferred block size.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wall-length">Length (ft)</Label>
              <Input
                id="wall-length"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wall-height">Height (ft)</Label>
              <Input
                id="wall-height"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wall-block-size">Block Size</Label>
            <select
              id="wall-block-size"
              className={selectClassName}
              value={blockSizeKey}
              onChange={(e) =>
                setBlockSizeKey(e.target.value as (typeof BLOCK_SIZES)[number]["key"])
              }
            >
              {BLOCK_SIZES.map((size) => (
                <option key={size.key} value={size.key}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          {blockSizeKey === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="wall-custom-width">Block Width (in)</Label>
                <Input
                  id="wall-custom-width"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.5"
                  value={customWidthIn}
                  onChange={(e) => setCustomWidthIn(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wall-custom-height">Block Height (in)</Label>
                <Input
                  id="wall-custom-height"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.5"
                  value={customHeightIn}
                  onChange={(e) => setCustomHeightIn(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="wall-waste">Waste Factor (%)</Label>
              <Input
                id="wall-waste"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={wasteFactor}
                onChange={(e) => setWasteFactor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wall-base-depth">Base Depth (in)</Label>
              <Input
                id="wall-base-depth"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={baseDepthIn}
                onChange={(e) => setBaseDepthIn(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="wall-backfill-width">Drainage Backfill Width (in)</Label>
            <Input
              id="wall-backfill-width"
              type="number"
              inputMode="decimal"
              min="0"
              step="1"
              value={backfillWidthIn}
              onChange={(e) => setBackfillWidthIn(e.target.value)}
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
              : "Enter a wall length and height to see estimated materials."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          {results.isValid ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-card p-4">
                  <Ruler className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.wallAreaSqFt, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Sq Ft Wall Face
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <BrickWall className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.blockCount, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Blocks Needed
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Layers className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.baseTons, 1)} tons
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Base Material ({formatNumber(results.baseVolumeCuYd, 1)} cu yd)
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <LayoutGrid className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.backfillTons, 1)} tons
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Drainage Backfill ({formatNumber(results.backfillVolumeCuYd, 1)} cu yd)
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Estimates only — actual block count, base depth, and drainage
                needs depend on your soil, wall height, and site grading.{" "}
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
              Your estimated block count, base material, and drainage
              backfill will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
