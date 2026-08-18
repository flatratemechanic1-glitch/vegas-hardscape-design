"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Layers, LayoutGrid, Package, Ruler } from "lucide-react";
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

const PAVER_SIZES = [
  { key: "6x9", label: '6" x 9"', widthIn: 6, lengthIn: 9 },
  { key: "6x6", label: '6" x 6"', widthIn: 6, lengthIn: 6 },
  { key: "12x12", label: '12" x 12"', widthIn: 12, lengthIn: 12 },
  { key: "16x16", label: '16" x 16"', widthIn: 16, lengthIn: 16 },
  { key: "24x24", label: '24" x 24"', widthIn: 24, lengthIn: 24 },
  { key: "custom", label: "Custom size", widthIn: 0, lengthIn: 0 },
] as const;

// Standard densities for compacted materials — close enough for planning
// purposes; exact yields vary by supplier and moisture content.
const BASE_TONS_PER_CUBIC_YARD = 1.4;
const SAND_TONS_PER_CUBIC_YARD = 1.35;
// Rule-of-thumb coverage for a 50 lb bag of polymeric joint sand at a
// typical 1/8-3/16 in. joint width.
const SQ_FT_PER_JOINT_SAND_BAG = 80;

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

export function PaverCalculatorForm() {
  const [length, setLength] = useState("20");
  const [width, setWidth] = useState("15");
  const [paverSizeKey, setPaverSizeKey] =
    useState<(typeof PAVER_SIZES)[number]["key"]>("12x12");
  const [customWidthIn, setCustomWidthIn] = useState("12");
  const [customLengthIn, setCustomLengthIn] = useState("12");
  const [wasteFactor, setWasteFactor] = useState("10");
  const [baseDepthIn, setBaseDepthIn] = useState("4");
  const [sandDepthIn, setSandDepthIn] = useState("1");

  const hasTracked = useRef(false);

  const results = useMemo(() => {
    const lengthFt = parseFloat(length) || 0;
    const widthFt = parseFloat(width) || 0;
    const areaSqFt = lengthFt * widthFt;

    const selectedSize = PAVER_SIZES.find((size) => size.key === paverSizeKey);
    const paverWidthIn =
      paverSizeKey === "custom" ? parseFloat(customWidthIn) || 0 : selectedSize?.widthIn ?? 0;
    const paverLengthIn =
      paverSizeKey === "custom" ? parseFloat(customLengthIn) || 0 : selectedSize?.lengthIn ?? 0;
    const paverAreaSqFt = (paverWidthIn * paverLengthIn) / 144;

    const wasteFactorNum = Math.max(parseFloat(wasteFactor) || 0, 0);
    const paverCount =
      paverAreaSqFt > 0
        ? Math.ceil((areaSqFt / paverAreaSqFt) * (1 + wasteFactorNum / 100))
        : 0;

    const baseDepthNum = Math.max(parseFloat(baseDepthIn) || 0, 0);
    const baseVolumeCuYd = (areaSqFt * (baseDepthNum / 12)) / 27;
    const baseTons = baseVolumeCuYd * BASE_TONS_PER_CUBIC_YARD;

    const sandDepthNum = Math.max(parseFloat(sandDepthIn) || 0, 0);
    const sandVolumeCuYd = (areaSqFt * (sandDepthNum / 12)) / 27;
    const sandTons = sandVolumeCuYd * SAND_TONS_PER_CUBIC_YARD;

    const jointSandBags =
      areaSqFt > 0 ? Math.ceil(areaSqFt / SQ_FT_PER_JOINT_SAND_BAG) : 0;

    return {
      isValid: areaSqFt > 0 && paverAreaSqFt > 0,
      areaSqFt,
      paverCount,
      baseVolumeCuYd,
      baseTons,
      sandVolumeCuYd,
      sandTons,
      jointSandBags,
    };
  }, [
    length,
    width,
    paverSizeKey,
    customWidthIn,
    customLengthIn,
    wasteFactor,
    baseDepthIn,
    sandDepthIn,
  ]);

  useEffect(() => {
    if (results.isValid && !hasTracked.current) {
      hasTracked.current = true;
      trackToolUsed("paver_calculator");
    }
  }, [results.isValid]);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Ruler className="size-4 text-accent" />
            Patio Dimensions
          </CardTitle>
          <CardDescription>
            Enter the area you plan to pave and your preferred paver size.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paver-length">Length (ft)</Label>
              <Input
                id="paver-length"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={length}
                onChange={(e) => setLength(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paver-width">Width (ft)</Label>
              <Input
                id="paver-width"
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
            <Label htmlFor="paver-size">Paver Size</Label>
            <select
              id="paver-size"
              className={selectClassName}
              value={paverSizeKey}
              onChange={(e) =>
                setPaverSizeKey(e.target.value as (typeof PAVER_SIZES)[number]["key"])
              }
            >
              {PAVER_SIZES.map((size) => (
                <option key={size.key} value={size.key}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          {paverSizeKey === "custom" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="paver-custom-width">Paver Width (in)</Label>
                <Input
                  id="paver-custom-width"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.5"
                  value={customWidthIn}
                  onChange={(e) => setCustomWidthIn(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paver-custom-length">Paver Length (in)</Label>
                <Input
                  id="paver-custom-length"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.5"
                  value={customLengthIn}
                  onChange={(e) => setCustomLengthIn(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="paver-waste">Waste Factor (%)</Label>
              <Input
                id="paver-waste"
                type="number"
                inputMode="decimal"
                min="0"
                step="1"
                value={wasteFactor}
                onChange={(e) => setWasteFactor(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paver-base-depth">Base Depth (in)</Label>
              <Input
                id="paver-base-depth"
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
            <Label htmlFor="paver-sand-depth">Bedding Sand Depth (in)</Label>
            <Input
              id="paver-sand-depth"
              type="number"
              inputMode="decimal"
              min="0"
              step="0.25"
              value={sandDepthIn}
              onChange={(e) => setSandDepthIn(e.target.value)}
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
              : "Enter a patio length and width to see estimated materials."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          {results.isValid ? (
            <>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
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
                  <LayoutGrid className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.paverCount, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Pavers Needed
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Layers className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.baseTons, 1)} tons
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Paver Base ({formatNumber(results.baseVolumeCuYd, 1)} cu yd)
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Package className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.sandTons, 1)} tons
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Bedding Sand ({formatNumber(results.sandVolumeCuYd, 1)} cu yd)
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-lg border border-border bg-card p-4">
                <p className="text-sm text-foreground">
                  <span className="font-heading text-lg text-foreground">
                    {formatNumber(results.jointSandBags, 0)}
                  </span>{" "}
                  bags of polymeric joint sand{" "}
                  <span className="text-muted-foreground">(50 lb bags)</span>
                </p>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Estimates only — actual quantities vary with site grading,
                drainage, and pattern complexity.{" "}
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
              Your estimated paver count, base material, and sand will appear
              here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
