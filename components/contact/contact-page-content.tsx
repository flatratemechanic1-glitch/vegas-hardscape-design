"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Mail, MapPin, Phone, Star, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_EMAIL,
  CONTACT_PHONE_DISPLAY,
  GOOGLE_BUSINESS_PROFILE_URL,
  HONEYPOT_FIELD_NAME,
  MAX_CONTACT_PHOTOS,
  MAX_TOTAL_PHOTO_BYTES_CLIENT,
  SERVICE_AREAS,
} from "@/lib/constants";
import { compressImageFile, PhotoCompressionError } from "@/lib/image-compression";
import { trackLeadSubmitted } from "@/lib/analytics";
import { TrackedPhoneLink } from "@/components/layout/tracked-phone-link";
import { cn, formatBytes } from "@/lib/utils";

const BUDGET_RANGES = [
  "Under $50,000",
  "$50,000 – $150,000",
  "$150,000 – $300,000",
  "$300,000+",
  "Not sure yet",
];

type PhotoAttachment = {
  id: string;
  previewUrl: string;
  filename: string;
  status: "compressing" | "ready" | "error";
  blob?: Blob;
  sizeBytes?: number;
  errorMessage?: string;
};

export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [photos, setPhotos] = useState<PhotoAttachment[]>([]);
  const [photoSelectionError, setPhotoSelectionError] = useState<string | null>(null);
  const photosRef = useRef(photos);
  photosRef.current = photos;

  useEffect(() => {
    return () => {
      for (const photo of photosRef.current) {
        URL.revokeObjectURL(photo.previewUrl);
      }
    };
  }, []);

  const totalPhotoBytes = photos.reduce((sum, p) => sum + (p.sizeBytes ?? 0), 0);
  const isOverTotalLimit = totalPhotoBytes > MAX_TOTAL_PHOTO_BYTES_CLIENT;
  const hasCompressingPhotos = photos.some((p) => p.status === "compressing");
  const hasPhotoErrors = photos.some((p) => p.status === "error");

  async function handlePhotosChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    event.target.value = "";
    if (files.length === 0) return;

    const remainingCapacity = MAX_CONTACT_PHOTOS - photos.length;
    const accepted = files.slice(0, Math.max(0, remainingCapacity));

    if (files.length > accepted.length) {
      setPhotoSelectionError(`You can attach up to ${MAX_CONTACT_PHOTOS} photos.`);
    } else {
      setPhotoSelectionError(null);
    }

    for (const file of accepted) {
      const id = crypto.randomUUID();
      const tempPreviewUrl = URL.createObjectURL(file);
      setPhotos((prev) => [
        ...prev,
        { id, previewUrl: tempPreviewUrl, filename: file.name, status: "compressing" },
      ]);

      try {
        const compressed = await compressImageFile(file);
        URL.revokeObjectURL(tempPreviewUrl);
        const previewUrl = URL.createObjectURL(compressed.blob);
        setPhotos((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  previewUrl,
                  filename: compressed.filename,
                  status: "ready",
                  blob: compressed.blob,
                  sizeBytes: compressed.blob.size,
                }
              : p
          )
        );
      } catch (err) {
        setPhotos((prev) =>
          prev.map((p) =>
            p.id === id
              ? {
                  ...p,
                  status: "error",
                  errorMessage:
                    err instanceof PhotoCompressionError
                      ? err.message
                      : "This photo couldn't be processed.",
                }
              : p
          )
        );
      }
    }
  }

  function handleRemovePhoto(id: string) {
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
    setPhotoSelectionError(null);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (hasCompressingPhotos) {
      setError("Please wait for your photos to finish processing.");
      return;
    }
    if (hasPhotoErrors) {
      setError("Remove the photo(s) that failed to process before submitting.");
      return;
    }
    if (isOverTotalLimit) {
      setError("Your photos are too large combined — remove one and try again.");
      return;
    }

    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    for (const photo of photos) {
      if (photo.status === "ready" && photo.blob) {
        formData.append("photos", photo.blob, photo.filename);
      }
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      trackLeadSubmitted("contact_page");
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
            <TrackedPhoneLink
              location="contact_page"
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Phone className="size-4 shrink-0" />
              {CONTACT_PHONE_DISPLAY}
            </TrackedPhoneLink>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Mail className="size-4 shrink-0" />
              {CONTACT_EMAIL}
            </a>
            <a
              href={GOOGLE_BUSINESS_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-accent"
            >
              <Star className="size-4 shrink-0" />
              Read Our Google Review
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
                  key={area.slug}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {area.name}
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
                <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
                  <label htmlFor="contact-website">Website</label>
                  <input
                    id="contact-website"
                    name={HONEYPOT_FIELD_NAME}
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

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

                <div className="space-y-2">
                  <Label htmlFor="photos">Project Photos (optional)</Label>
                  <Input
                    id="photos"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotosChange}
                    disabled={submitting || photos.length >= MAX_CONTACT_PHOTOS}
                  />
                  <p className="text-xs text-muted-foreground/80">
                    Up to {MAX_CONTACT_PHOTOS} photos · resized automatically
                  </p>

                  {photoSelectionError && (
                    <p className="text-sm text-destructive" role="alert">
                      {photoSelectionError}
                    </p>
                  )}

                  {photos.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-1">
                      {photos.map((photo) => (
                        <div key={photo.id} className="flex flex-col gap-1">
                          <div className="relative size-20">
                            <img
                              src={photo.previewUrl}
                              alt={photo.filename}
                              className={cn(
                                "size-20 rounded-lg border border-border object-cover",
                                photo.status === "compressing" && "animate-pulse opacity-60"
                              )}
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon-xs"
                              aria-label="Remove photo"
                              onClick={() => handleRemovePhoto(photo.id)}
                              className="absolute -top-2 -right-2 rounded-full border border-border bg-background"
                            >
                              <X />
                            </Button>
                          </div>
                          {photo.status === "error" && (
                            <p className="max-w-20 text-[10px] text-destructive">
                              {photo.errorMessage}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {photos.length > 0 && (
                    <p
                      className={cn(
                        "text-xs",
                        isOverTotalLimit ? "text-destructive" : "text-muted-foreground/80"
                      )}
                    >
                      {photos.length}/{MAX_CONTACT_PHOTOS} photos · {formatBytes(totalPhotoBytes)}
                      {isOverTotalLimit &&
                        ` — combined size exceeds ${formatBytes(MAX_TOTAL_PHOTO_BYTES_CLIENT)}, remove a photo.`}
                    </p>
                  )}
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
