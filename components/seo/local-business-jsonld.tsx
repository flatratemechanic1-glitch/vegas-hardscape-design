import {
  CONTACT_EMAIL,
  CONTACT_PHONE_TEL,
  GOOGLE_BUSINESS_PROFILE_URL,
  SERVICE_AREAS,
  SERVICE_ZIP_CODES,
  SITE_DESCRIPTION,
  SITE_NAME,
} from "@/lib/constants";
import { SITE_URL } from "@/lib/site-config";

// No public storefront — this is a mobile design practice, so geo is the
// approximate center of the service area (Summerlin/West Las Vegas), not a
// street address. Add social profile URLs to `sameAs` alongside the GBP link
// once those exist.
export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    image: `${SITE_URL}/hero.jpg`,
    priceRange: "$$$",
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_TEL,
    url: SITE_URL,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.1716,
      longitude: -115.3255,
    },
    areaServed: [
      ...SERVICE_AREAS.map((name) => ({
        "@type": "Place",
        name,
      })),
      ...SERVICE_ZIP_CODES.map((postalCode) => ({
        "@type": "PostalAddress",
        postalCode,
        addressRegion: "NV",
        addressCountry: "US",
      })),
    ],
    sameAs: [GOOGLE_BUSINESS_PROFILE_URL] as string[],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
