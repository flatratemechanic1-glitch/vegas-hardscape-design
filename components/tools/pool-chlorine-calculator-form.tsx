"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, Droplet, FlaskConical, Percent } from "lucide-react";
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

const PRODUCTS = [
  { key: "12.5", label: "Liquid Chlorine (12.5%)", concentration: 12.5 },
  { key: "10", label: "Liquid Chlorine (10%)", concentration: 10 },
] as const;

// Widely-used pool-chemistry constant: fl oz of 12.5% liquid chlorine
// needed per 10,000 gal to raise free chlorine by 1 ppm. Scaled linearly
// for other concentrations of the same product family.
const BASE_OZ_PER_10K_GAL_PER_PPM = 10.2;

const selectClassName = cn(
  "h-8 w-full min-w-0 rounded-lg border border-input bg-transparent px-2.5 py-1 text-base transition-colors outline-none",
  "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm dark:bg-input/30"
);

export function PoolChlorineCalculatorForm() {
  const searchParams = useSearchParams();
  const [gallons, setGallons] = useState(searchParams.get("gallons") || "15000");
  const [currentPpm, setCurrentPpm] = useState("1");
  const [targetPpm, setTargetPpm] = useState("3");
  const [productKey, setProductKey] = useState<(typeof PRODUCTS)[number]["key"]>("12.5");

  const hasTracked = useRef(false);

  const results = useMemo(() => {
    const gallonsNum = Math.max(parseFloat(gallons) || 0, 0);
    const currentNum = Math.max(parseFloat(currentPpm) || 0, 0);
    const targetNum = Math.max(parseFloat(targetPpm) || 0, 0);
    const ppmNeeded = Math.max(targetNum - currentNum, 0);

    const selectedProduct = PRODUCTS.find((p) => p.key === productKey);
    const concentration = selectedProduct?.concentration ?? 12.5;
    const concentrationFactor = 12.5 / concentration;

    const ounces =
      (ppmNeeded * gallonsNum / 10000) * BASE_OZ_PER_10K_GAL_PER_PPM * concentrationFactor;
    const quarts = ounces / 32;
    const galsOfChlorine = ounces / 128;

    return {
      isValid: gallonsNum > 0,
      ppmNeeded,
      ounces,
      quarts,
      galsOfChlorine,
    };
  }, [gallons, currentPpm, targetPpm, productKey]);

  useEffect(() => {
    if (results.isValid && !hasTracked.current) {
      hasTracked.current = true;
      trackToolUsed("pool_chlorine_calculator");
    }
  }, [results.isValid]);

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-12">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Percent className="size-4 text-accent" />
            Pool &amp; Chlorine Readings
          </CardTitle>
          <CardDescription>
            Enter your pool volume and current vs. target free chlorine.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label htmlFor="chlorine-gallons">Pool Volume (gallons)</Label>
            <Input
              id="chlorine-gallons"
              type="number"
              inputMode="decimal"
              min="0"
              step="100"
              value={gallons}
              onChange={(e) => setGallons(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              Don&apos;t know your gallons?{" "}
              <Link href="/tools/pool-volume-calculator" className="text-accent hover:underline">
                Use the Pool Volume Calculator
              </Link>
              .
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chlorine-current">Current Free Chlorine (ppm)</Label>
              <Input
                id="chlorine-current"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={currentPpm}
                onChange={(e) => setCurrentPpm(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="chlorine-target">Target Free Chlorine (ppm)</Label>
              <Input
                id="chlorine-target"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.5"
                value={targetPpm}
                onChange={(e) => setTargetPpm(e.target.value)}
              />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Typical targets: 1-3 ppm for daily maintenance, 5 ppm after heavy
            use, 10+ ppm for shock/breakpoint chlorination.
          </p>

          <div className="space-y-2">
            <Label htmlFor="chlorine-product">Chlorine Product</Label>
            <select
              id="chlorine-product"
              className={selectClassName}
              value={productKey}
              onChange={(e) =>
                setProductKey(e.target.value as (typeof PRODUCTS)[number]["key"])
              }
            >
              {PRODUCTS.map((product) => (
                <option key={product.key} value={product.key}>
                  {product.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-secondary/30 lg:sticky lg:top-28">
        <CardHeader>
          <CardTitle className="text-lg">Estimated Dose</CardTitle>
          <CardDescription>
            {results.isValid
              ? "Rough dosing estimate based on the inputs to the left."
              : "Enter your pool volume to see an estimated dose."}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          {results.isValid ? (
            <>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-border bg-card p-4">
                  <FlaskConical className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.ppmNeeded, 1)}
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Ppm to Add
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-card p-4">
                  <Droplet className="size-4 text-accent" strokeWidth={1.5} />
                  <p className="mt-3 font-heading text-2xl text-foreground">
                    {formatNumber(results.ounces, 1)} oz
                  </p>
                  <p className="text-xs tracking-wide text-muted-foreground uppercase">
                    Liquid Chlorine ({formatNumber(results.galsOfChlorine, 2)} gal)
                  </p>
                </div>
              </div>

              <div className="mt-3 rounded-lg border border-accent/40 bg-accent/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={1.5} />
                  <p className="text-sm text-muted-foreground">
                    Starting-point estimate only, assuming{" "}
                    {PRODUCTS.find((p) => p.key === productKey)?.label.toLowerCase()}.
                    Actual demand varies with stabilizer level, temperature, and
                    sunlight. Add chemicals gradually, retest before swimming, and
                    always follow your product&apos;s label.
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                <Link href="/contact" className="font-medium text-accent hover:underline">
                  Book a consultation
                </Link>{" "}
                if pool chemistry issues keep coming back — it&apos;s often a
                sign of an equipment or design issue worth a second look.
              </p>
            </>
          ) : (
            <div className="rounded-lg border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Your estimated chlorine dose will appear here.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
