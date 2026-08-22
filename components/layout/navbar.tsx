"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuPopup,
  NavigationMenuPortal,
  NavigationMenuPositioner,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

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

        <NavigationMenu className="hidden xl:block">
          <NavigationMenuList>
            {NAV_LINKS.map((item) =>
              "children" in item ? (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuTrigger
                    className={
                      item.children.some((child) => isActive(pathname, child.href))
                        ? "text-accent"
                        : "text-foreground/70"
                    }
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {item.children.map((child) => (
                      <NavigationMenuLink
                        key={child.href}
                        render={<Link href={child.href} />}
                        active={isActive(pathname, child.href)}
                        closeOnClick
                        className={cn(
                          "rounded-md px-3 py-2",
                          isActive(pathname, child.href)
                            ? "text-accent"
                            : "text-foreground/70"
                        )}
                      >
                        {child.label}
                      </NavigationMenuLink>
                    ))}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    render={<Link href={item.href} />}
                    active={isActive(pathname, item.href)}
                    className={
                      isActive(pathname, item.href) ? "text-accent" : "text-foreground/70"
                    }
                  >
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
          <NavigationMenuPortal>
            <NavigationMenuPositioner>
              <NavigationMenuPopup>
                <NavigationMenuViewport />
              </NavigationMenuPopup>
            </NavigationMenuPositioner>
          </NavigationMenuPortal>
        </NavigationMenu>

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
          {NAV_LINKS.map((item) =>
            "children" in item ? (
              <div key={item.label} className="py-1">
                <p className="pt-3 pb-1 text-[11px] font-semibold tracking-[0.15em] text-foreground/40 uppercase">
                  {item.label}
                </p>
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block py-2 pl-3 text-sm font-medium tracking-[0.1em] uppercase",
                      isActive(pathname, child.href)
                        ? "text-accent"
                        : "text-foreground/80 hover:text-accent"
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "py-3 text-sm font-medium tracking-[0.1em] uppercase",
                  isActive(pathname, item.href)
                    ? "text-accent"
                    : "text-foreground/80 hover:text-accent"
                )}
              >
                {item.label}
              </Link>
            )
          )}
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
