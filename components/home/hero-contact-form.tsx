"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_TEL } from "@/lib/constants";

export function HeroContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = new FormData(event.currentTarget);
    const message = String(form.get("message") ?? "").trim();
    form.set(
      "message",
      message || "No project details provided — submitted from homepage quick contact form."
    );
    form.append("budget", "");

    try {
      const res = await fetch("/api/contact", { method: "POST", body: form });

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
    <div className="mx-auto w-full max-w-md rounded-sm border border-background/15 bg-background/95 p-6 shadow-xl backdrop-blur-sm sm:p-8 lg:mx-0">
      {submitted ? (
        <div className="flex flex-col items-center gap-2 py-8 text-center">
          <h2 className="font-heading text-xl text-foreground">Thank you</h2>
          <p className="text-sm text-muted-foreground">
            We&apos;ve received your details and will be in touch shortly to
            schedule your consultation.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <h2 className="font-heading text-xl text-foreground">
              Request a Consultation
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Or call{" "}
              <a href={`tel:${CONTACT_PHONE_TEL}`} className="hover:text-accent">
                {CONTACT_PHONE_DISPLAY}
              </a>
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-name">Name</Label>
            <Input id="hero-name" name="name" required autoComplete="name" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hero-email">Email</Label>
              <Input
                id="hero-email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-phone">Phone</Label>
              <Input id="hero-phone" name="phone" type="tel" autoComplete="tel" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hero-message">Project Details</Label>
            <Textarea
              id="hero-message"
              name="message"
              rows={2}
              placeholder="Briefly tell us about your project (optional)"
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
            className="h-11 w-full bg-accent text-sm tracking-wide text-accent-foreground hover:bg-accent/90"
          >
            {submitting ? "Sending..." : "Request a Consultation"}
          </Button>
        </form>
      )}
    </div>
  );
}
