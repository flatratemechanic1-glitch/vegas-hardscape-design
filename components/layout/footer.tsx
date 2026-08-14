import Link from "next/link";
import { Mail, MapPin, Phone, Star } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  GOOGLE_BUSINESS_PROFILE_URL,
  NAV_LINKS,
  SERVICE_AREAS,
  SITE_NAME,
} from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4 lg:px-10">
        <div className="space-y-3">
          <p className="font-heading text-lg text-foreground">{SITE_NAME}</p>
          <p className="max-w-xs text-sm text-muted-foreground">
            Design, photorealistic rendering, and owner&apos;s representative
            consulting for luxury outdoor projects across Las Vegas.
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.15em] text-foreground/60 uppercase">
            Navigate
          </p>
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.15em] text-foreground/60 uppercase">
            Service Areas
          </p>
          <p className="flex items-start gap-2 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            <span>
              {SERVICE_AREAS.join(", ")}, and surrounding Las Vegas Valley
              communities.
            </span>
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium tracking-[0.15em] text-foreground/60 uppercase">
            Contact
          </p>
          <a
            href={`tel:${CONTACT_PHONE_TEL}`}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <Phone className="size-4 shrink-0" />
            {CONTACT_PHONE_DISPLAY}
          </a>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <Mail className="size-4 shrink-0" />
            {CONTACT_EMAIL}
          </a>
          <a
            href={GOOGLE_BUSINESS_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
          >
            <Star className="size-4 shrink-0" />
            Find Us on Google
          </a>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 lg:px-10">
        <p className="mx-auto max-w-7xl text-xs text-muted-foreground/80">
          {SITE_NAME} provides design, rendering, and owner&apos;s
          representative consulting services only. We do not perform
          construction, installation, or physical contracting work; all
          on-site work is completed by our clients&apos; own licensed and
          insured Nevada contractors.
        </p>
      </div>
    </footer>
  );
}
