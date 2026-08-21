"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur print:hidden">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-heading text-lg tracking-wide text-foreground"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={32}
            height={32}
            className="size-8"
            priority
          />
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-5 xl:flex 2xl:gap-7">
          {NAV_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs font-medium tracking-[0.1em] whitespace-nowrap uppercase transition-colors hover:text-accent",
                  active ? "text-accent" : "text-foreground/70"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className={cn(buttonVariants({ size: "lg" }), "hidden px-5 xl:inline-flex")}
        >
          Book a Consultation
        </Link>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="text-foreground xl:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-border/80 bg-background px-6 py-6 xl:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-3 text-sm font-medium tracking-[0.1em] uppercase text-foreground/80 hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className={cn(buttonVariants({ size: "lg" }), "mt-3 w-full")}
          >
            Book a Consultation
          </Link>
        </nav>
      )}
    </header>
  );
}
