"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BID_REVIEW_ALLOWED_MIME_TYPES,
  BID_REVIEW_GUARANTEE_DISPLAY,
  BID_REVIEW_TURNAROUND_DISPLAY,
  HONEYPOT_FIELD_NAME,
  MAX_BID_FILE_BYTES,
} from "@/lib/constants";
import { compressImageFile, PhotoCompressionError } from "@/lib/image-compression";
import { trackBidReviewSubmitted } from "@/lib/analytics";
import { formatBytes } from "@/lib/utils";

type BidFile = {
  filename: string;
  blob: Blob;
  sizeBytes: number;
  status: "compressing" | "ready" | "error";
  errorMessage?: string;
};

type BidReviewUploadFormProps = {
  sessionId: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export function BidReviewUploadForm({
  sessionId,
  name,
  email,
  phone,
  notes,
}: BidReviewUploadFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bidFile, setBidFile] = useState<BidFile | null>(null);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    if (
      !BID_REVIEW_ALLOWED_MIME_TYPES.includes(
        file.type as (typeof BID_REVIEW_ALLOWED_MIME_TYPES)[number]
      )
    ) {
      setBidFile({
        filename: file.name,
        blob: file,
        sizeBytes: file.size,
        status: "error",
        errorMessage: "Please upload a PDF, JPG, PNG, or WebP file.",
      });
      return;
    }

    if (file.type === "application/pdf") {
      if (file.size > MAX_BID_FILE_BYTES) {
        setBidFile({
          filename: file.name,
          blob: file,
          sizeBytes: file.size,
          status: "error",
          errorMessage: `This PDF is too large (max ${formatBytes(MAX_BID_FILE_BYTES)}). Try re-saving it at a lower quality.`,
        });
        return;
      }
      setBidFile({ filename: file.name, blob: file, sizeBytes: file.size, status: "ready" });
      return;
    }

    setBidFile({ filename: file.name, blob: file, sizeBytes: file.size, status: "compressing" });
    try {
      const compressed = await compressImageFile(file);
      if (compressed.blob.size > MAX_BID_FILE_BYTES) {
        setBidFile({
          filename: compressed.filename,
          blob: compressed.blob,
          sizeBytes: compressed.blob.size,
          status: "error",
          errorMessage: `This photo is too large even after compression (max ${formatBytes(MAX_BID_FILE_BYTES)}).`,
        });
        return;
      }
      setBidFile({
        filename: compressed.filename,
        blob: compressed.blob,
        sizeBytes: compressed.blob.size,
        status: "ready",
      });
    } catch (err) {
      setBidFile({
        filename: file.name,
        blob: file,
        sizeBytes: file.size,
        status: "error",
        errorMessage:
          err instanceof PhotoCompressionError ? err.message : "This file couldn't be processed.",
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!bidFile || bidFile.status !== "ready") {
      setError("Please attach your bid document before submitting.");
      return;
    }

    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    formData.append("bid_file", bidFile.blob, bidFile.filename);

    try {
      const res = await fetch("/api/bid-review", { method: "POST", body: formData });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Something went wrong. Please try again.");
      }

      setSubmitted(true);
      trackBidReviewSubmitted();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="p-2">
      <CardContent>
        {submitted ? (
          <div className="flex flex-col items-center gap-2 py-16 text-center">
            <h2 className="font-heading text-2xl text-foreground">Thank you</h2>
            <p className="max-w-sm text-sm text-muted-foreground">
              We&apos;ve received your bid and payment, and sent a
              confirmation to your email. Your written review will follow
              within {BID_REVIEW_TURNAROUND_DISPLAY}. {BID_REVIEW_GUARANTEE_DISPLAY}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div aria-hidden="true" className="absolute left-[-9999px] h-px w-px overflow-hidden">
              <label htmlFor="bid-review-website">Website</label>
              <input
                id="bid-review-website"
                name={HONEYPOT_FIELD_NAME}
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <input type="hidden" name="session_id" value={sessionId} />
            <input type="hidden" name="name" value={name} />
            <input type="hidden" name="email" value={email} />
            <input type="hidden" name="phone" value={phone} />
            <input type="hidden" name="notes" value={notes} />

            <div className="rounded-sm border border-border bg-secondary/40 p-4 text-sm">
              <p className="text-foreground">{name}</p>
              <p className="text-muted-foreground">{email}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bid-review-file">Contractor Bid (PDF or photo)</Label>
              <Input
                id="bid-review-file"
                type="file"
                accept="application/pdf,image/*"
                onChange={handleFileChange}
                disabled={submitting}
              />

              {bidFile && (
                <p
                  className={
                    bidFile.status === "error"
                      ? "text-sm text-destructive"
                      : "text-xs text-muted-foreground/80"
                  }
                  role={bidFile.status === "error" ? "alert" : undefined}
                >
                  {bidFile.status === "compressing" && `Processing ${bidFile.filename}…`}
                  {bidFile.status === "ready" &&
                    `${bidFile.filename} · ${formatBytes(bidFile.sizeBytes)}`}
                  {bidFile.status === "error" && bidFile.errorMessage}
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
              disabled={submitting || !bidFile || bidFile.status !== "ready"}
              className="h-11 w-full bg-accent text-sm tracking-wide text-accent-foreground hover:bg-accent/90"
            >
              {submitting ? "Submitting..." : "Submit for Review"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
