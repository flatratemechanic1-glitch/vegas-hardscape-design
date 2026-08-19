import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactPageContent } from "@/components/contact/contact-page-content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a 3D design consultation with Vegas Hardscape Design, serving Summerlin, The Lakes, Queensridge, and the greater Las Vegas Valley.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <Suspense>
      <ContactPageContent />
    </Suspense>
  );
}
