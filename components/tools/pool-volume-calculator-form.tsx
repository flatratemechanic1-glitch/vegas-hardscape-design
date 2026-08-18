"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Droplet, FlaskConical, Ruler, Timer } from "lucide-react";
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
import { formatNumber } from "@/lib/calculator-utils";

const SHAPES = [
  { key: "rectangular", label: "Rectangular" },
  { key: "round", label: "Round" },
  { key: "oval", label: "Oval" },
  { key: "freeform", label: "Freeform / Kidney" },
] as const;

const GALLONS_PER_CUBIC_FOOT = 7.48;
// Typical residential garden hose flow rate — actual fill rate varies with
// hose diameter and water pressure.
const GARDEN_HOSE_GPM = 9;

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
);

export function PoolVolumeCalculatorForm() {
  const [shapeKey, setShapeKey] = useState<(typeof SHAPES)[number]["key"]>("rectangular");
  const [length, setLength] = useState("32");
  const [width, setWidth] = useState("16");
  const [diameter, setDiameter] = useState("18");
  const [shallowDepth, setShallowDepth] = useState("3");
  const [deepDepth, setDeepDepth] = useState("6");

  const hasTracked = useRef(false);

  const results = useMemo(() => {
    const shallowFt = parseFloat(shallowDepth) || 0;
    const deepFt = parseFloat(deepDepth) || 0;
    const avgDepthFt = (shallowFt + deepFt) / 2;

    const lengthFt = parseFloat(length) || 0;
    const widthFt = parseFloat(width) || 0;
    const diameterFt = parseFloat(diameter) || 0;

    let volumeCuFt = 0;
    let isValid = false;

    if (shapeKey === "round") {
      volumeCuFt = Math.PI * (diameterFt / 2) ** 2 * avgDepthFt;
      isValid = diameterFt > 0 && avgDepthFt > 0;
    } else if (shapeKey === "oval") {
      volumeCuFt = (Math.PI / 4) * lengthFt * widthFt * avgDepthFt;
      isValid = lengthFt > 0 && widthFt > 0 && avgDepthFt > 0;
    } else if (shapeKey === "freeform") {
      volumeCuFt = lengthFt * widthFt * avgDepthFt * 0.85;
      isValid = lengthFt > 0 && widthFt > 0 && avgDepthFt > 0;
    } else {
      volumeCuFt = lengthFt * widthFt * avgDepthFt;
      isValid = lengthFt > 0 && widthFt > 0 && avgDepthFt > 0;
    }

    const gallons = volumeCuFt * GALLONS_PER_CUBIC_FOOT;
    const fillHours = gallons / (GARDEN_HOSE_GPM * 60);

    return { isValid, avgDepthFt, volumeCuFt, gallons, fillHours };
  }, [shapeKey, length, width, diameter, shallowDepth, deepDepth]);

  useEffect(() => {
    if (results.isValid && !hasTracked.current) {
      hasTracked.current = true;
      trackToolUsed("pool_volume_calculator");
    }
  }, [results.isValid]);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Ruler className="size-4 text-accent" />
            Pool Dimensions
          </CardTitle>
          <CardDescription>
            Enter your pool&apos;s shape and dimensions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="pool-shape">Pool Shape</Label>
            <select
              id="pool-shape"
              className={selectClassName}
              value={shapeKey}
              onChange={(e) => setShapeKey(e.target.value as (typeof SHAPES)[number]["key"])}
            >
              {SHAPES.map((shape) => (
                <option key={shape.key} value={shape.key}>
                  {shape.label}
                </option>
              ))}
            </select>
          </div>

          {shapeKey === "round" ? (
            <div className="space-y-2">
              <Label htmlFor="pool-diameter">Diameter (ft)</Label>
              <Input
                id="pool-diameter"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
              />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pool-length">Length (ft)</Label>
                <Input
                  id="pool-length"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.5"
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pool-width">Width (ft)</Label>
                <Input
                  id="pool-width"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.5"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="pool-shallow-depth">Shallow End Depth (ft)</Label>
              <Input
                id="pool-shallow-depth"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={shallowDepth}
                onChange={(e) => setShallowDepth(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pool-deep-depth">Deep End Depth (ft)</Label>
              <Input
                id="pool-deep-depth"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={deepDepth}
                onChange={(e) => setDeepDepth(e.target.value)}
              />
            </div>
          </div>

          {shapeKey === "freeform" && (
            <p className="text-xs leading-relaxed text-muted-foreground">
              Freeform shapes vary too much for an exact formula — this uses
              a rough approximation based on your pool&apos;s length and
              width.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="bg-secondary/30 lg:sticky lg:top-28">
        <CardHeader>
          <CardTitle className="text-lg">Estimated Volume</CardTitle>
          <CardDescription>
            {results.isValid
              ? "Rough quantities based on the inputs to the left."
              : "Enter your pool dimensions to see its estimated volume."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          {results.isValid ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-card p-4">
                  <Droplet className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.gallons, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Gallons
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Ruler className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.volumeCuFt, 0)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Cubic Feet
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Ruler className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.avgDepthFt, 1)} ft
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Average Depth
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Timer className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.fillHours, 1)} hrs
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Est. Fill Time (garden hose)
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-lg border border-accent/40 bg-accent/10 p-4">
                <div className="flex items-start gap-3">
                  <FlaskConical className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
                  <p className="text-sm text-foreground">
                    <span className="text-muted-foreground">
                      Now that you have your gallons,{" "}
                    </span>
                    <Link
                      href={`/tools/pool-chlorine-calculator?gallons=${Math.round(results.gallons)}`}
                      className="font-medium text-accent hover:underline"
                    >
                      use it in the Pool Chlorine Calculator
                    </Link>
                    <span className="text-muted-foreground"> →</span>
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Estimates only — actual volume varies with real-world
                construction and can differ from a simplified geometric
                formula.{" "}
                <Link
                  href="/contact"
                  className="font-medium text-accent hover:underline"
                >
                  Book a consultation
                </Link>{" "}
                for exact figures on a project we design.
              </p>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Your pool&apos;s estimated gallons, cubic feet, and fill time
              will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
