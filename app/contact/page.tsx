"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_TEL,
  SERVICE_AREAS,
} from "@/lib/constants";

const BUDGET_RANGES = [
  "Under $50,000",
  "$50,000 – $150,000",
  "$150,000 – $300,000",
  "$300,000+",
  "Not sure yet",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(event.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          phone: form.get("phone"),
          email: form.get("email"),
          budget: form.get("budget"),
          message: form.get("message"),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-24 lg:px-10">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
            Contact
          </p>
          <h1 className="mt-4 font-heading text-4xl text-foreground sm:text-5xl">
            Book a 3D Design Consultation
          </h1>
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Tell us about your project and we&apos;ll reach out to schedule
            an initial design consultation. We work exclusively on design,
            rendering, and owner&apos;s representative consulting — not
            construction.
          </p>

          <div className="mt-10 space-y-3">
            <a
              href={`tel:${CONTACT_PHONE_TEL}`}
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Phone className="size-4 shrink-0" />
              {CONTACT_PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail className="size-4 shrink-0" />
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="mt-10">
            <p className="flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-foreground/60 uppercase">
              <MapPin className="size-4 shrink-0" />
              Service Areas
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SERVICE_AREAS.map((area) => (
                <span
                  key={area}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
            <p className="mt-3 text-xs text-muted-foreground/80">
              Don&apos;t see your community? We serve the greater Las Vegas
              Valley — reach out and we&apos;ll let you know.
            </p>
          </div>
        </div>

        <Card className="p-2">
          <CardContent>
            {submitted ? (
              <div className="flex flex-col items-center gap-2 py-16 text-center">
                <h2 className="font-heading text-2xl text-foreground">
                  Thank you
                </h2>
                <p className="max-w-sm text-sm text-muted-foreground">
                  We&apos;ve received your project details and will be in
                  touch shortly to schedule your consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" name="name" required autoComplete="name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="budget">Project Budget</Label>
                  <select
                    id="budget"
                    name="budget"
                    defaultValue=""
                    className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 md:text-sm"
                  >
                    <option value="" disabled>
                      Select a range
                    </option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Project Description</Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us about your space, goals, and timeline."
                  />
                </div>

                {error && (
                  <p className="text-sm text-destructive" role="alert">
                    {error}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="h-11 w-full px-8 text-sm tracking-wide"
                >
                  {submitting ? "Sending..." : "Submit Project Details"}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
