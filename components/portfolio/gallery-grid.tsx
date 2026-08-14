"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  Dialog,
  DialogBackdrop,
  DialogClose,
  DialogPopup,
  DialogPortal,
} from "@/components/ui/dialog";

export type GalleryItem = {
  label: string;
  caption: string;
  aspect: string;
  image: string;
};

const navButtonClass =
  "absolute flex size-10 items-center justify-center rounded-full bg-background/10 text-background transition-colors hover:bg-background/20";

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeItem = openIndex !== null ? items[openIndex] : null;

  function showPrev() {
    setOpenIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length));
  }

  function showNext() {
    setOpenIndex((i) => (i === null ? i : (i + 1) % items.length));
  }

  useEffect(() => {
    if (openIndex === null) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") showNext();
      else if (event.key === "ArrowLeft") showPrev();
    }

    // Capture phase: Base UI's focus-trapped dialog stops propagation of
    // keydown events during the bubble phase, so a bubble-phase window
    // listener never sees them. Capture fires before that, top-down.
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    return () => window.removeEventListener("keydown", handleKeyDown, { capture: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIndex]);

  return (
    <>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        {items.map((item, index) => (
          <div
            key={item.image}
            role="button"
            tabIndex={0}
            onClick={() => setOpenIndex(index)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setOpenIndex(index);
              }
            }}
            className="mb-6 cursor-pointer break-inside-avoid overflow-hidden rounded-sm border border-border bg-secondary/40 outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <figure>
              <div className={`relative ${item.aspect}`}>
                <Image
                  src={item.image}
                  alt={item.caption}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 rounded-full bg-foreground/70 px-2.5 py-1 text-[10px] font-medium tracking-[0.15em] text-background uppercase backdrop-blur-sm">
                  {item.label}
                </span>
              </div>
              <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground">
                {item.caption}
              </figcaption>
            </figure>
          </div>
        ))}
      </div>

      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => {
          if (!open) setOpenIndex(null);
        }}
      >
        <DialogPortal>
          <DialogBackdrop />
          <DialogPopup className="inset-4 flex flex-col items-center justify-center sm:inset-8">
            {activeItem && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeItem.image}
                  alt={activeItem.caption}
                  className="max-h-[75vh] w-auto max-w-full rounded-sm object-contain"
                />
                <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center">
                  <p className="text-xs font-medium tracking-[0.15em] text-accent uppercase">
                    {activeItem.label}
                  </p>
                  <span className="hidden text-background/40 sm:inline">·</span>
                  <p className="text-sm text-background">{activeItem.caption}</p>
                </div>
              </>
            )}

            <DialogClose
              aria-label="Close"
              className="absolute top-0 right-0 size-9 bg-background/10 text-background hover:bg-background/20"
            >
              <X className="size-5" />
            </DialogClose>

            {items.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={showPrev}
                  className={`${navButtonClass} top-1/2 left-0 -translate-y-1/2`}
                >
                  <ChevronLeft className="size-6" />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={showNext}
                  className={`${navButtonClass} top-1/2 right-0 -translate-y-1/2`}
                >
                  <ChevronRight className="size-6" />
                </button>
              </>
            )}
          </DialogPopup>
        </DialogPortal>
      </Dialog>
    </>
  );
}
