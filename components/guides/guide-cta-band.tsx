import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BID_REVIEW_PRICE_DISPLAY, BID_REVIEW_TURNAROUND_DISPLAY } from "@/lib/constants";

export function GuideCtaBand() {
  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-2xl px-6 py-20 text-center lg:px-10">
        <h2 className="font-heading text-3xl text-foreground sm:text-4xl">
          Want This Read On Your Own Bid?
        </h2>
        <p className="mt-4 text-sm text-muted-foreground sm:text-base">
          A flat {BID_REVIEW_PRICE_DISPLAY}, reviewed within{" "}
          {BID_REVIEW_TURNAROUND_DISPLAY} — before you sign, not after.
        </p>
        <Link
          href="/bid-review"
          className={cn(
            buttonVariants({ size: "lg" }),
            "mt-8 h-11 bg-accent px-8 text-sm tracking-wide text-accent-foreground hover:bg-accent/90"
          )}
        >
          Get My Bid Reviewed
        </Link>
      </div>
    </section>
  );
}
