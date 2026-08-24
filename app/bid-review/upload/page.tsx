import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { stripe } from "@/lib/stripe";
import { BidReviewUploadForm } from "@/components/bid-review/bid-review-upload-form";

export const metadata: Metadata = {
  title: "Upload Your Bid",
  robots: { index: false, follow: false },
};

async function getVerifiedSession(sessionId: string | undefined) {
  if (!sessionId) return null;

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid" ? session : null;
  } catch (error) {
    console.error("Bid review upload: failed to verify Stripe session.", error);
    return null;
  }
}

export default async function BidReviewUploadPage({
  searchParams,
}: PageProps<"/bid-review/upload">) {
  const { session_id: sessionId } = await searchParams;
  const session = await getVerifiedSession(
    typeof sessionId === "string" ? sessionId : undefined
  );

  if (!session) {
    return (
      <section className="mx-auto max-w-2xl px-6 py-24 text-center lg:px-10">
        <h1 className="font-heading text-3xl text-foreground">
          We couldn&apos;t verify your payment
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          This link is invalid or your payment hasn&apos;t completed yet.
          Please start over from the bid review page.
        </p>
        <Link
          href="/bid-review"
          className={cn(buttonVariants({ size: "lg" }), "mt-8 h-11 px-8 text-sm tracking-wide")}
        >
          Back to Bid Review
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-24 lg:px-10">
      <div className="text-center">
        <p className="text-xs font-medium tracking-[0.3em] text-accent uppercase">
          Payment Received
        </p>
        <h1 className="mt-4 font-heading text-3xl text-foreground sm:text-4xl">
          Upload Your Contractor&apos;s Bid
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Attach the bid document (PDF or a clear photo) and we&apos;ll send
          your written review shortly.
        </p>
      </div>

      <div className="mt-12">
        <BidReviewUploadForm sessionId={session.id} />
      </div>
    </section>
  );
}
