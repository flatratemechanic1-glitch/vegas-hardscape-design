"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

export function PrepKitPrintButton() {
  return (
    <Button
      type="button"
      size="lg"
      onClick={() => window.print()}
      className="h-11 gap-2 px-8 text-sm tracking-wide print:hidden"
    >
      <Printer className="size-4" strokeWidth={1.5} />
      Print / Save as PDF
    </Button>
  );
}
