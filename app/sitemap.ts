import type { MetadataRoute } from "next";
import { SERVICE_AREAS } from "@/lib/constants";
import { BID_REVIEW_VERTICALS } from "@/lib/bid-review-verticals";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/portfolio",
    "/tools",
    "/tools/paver-calculator",
    "/tools/turf-calculator",
    "/tools/retaining-wall-calculator",
    "/tools/concrete-calculator",
    "/tools/pool-volume-calculator",
    "/tools/pool-chlorine-calculator",
    "/tools/gravel-calculator",
    "/tools/mulch-calculator",
    "/tools/fire-pit-calculator",
    "/backyard-prep-kit",
    "/plants",
    "/bid-review",
    "/about",
    "/contact",
  ];
  const areaRoutes = SERVICE_AREAS.map((area) => `/service-areas/${area.slug}`);
  const bidReviewVerticalRoutes = BID_REVIEW_VERTICALS.map(
    (vertical) => `/bid-review/${vertical.slug}`
  );
  const routes = [...staticRoutes, ...areaRoutes, ...bidReviewVerticalRoutes];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
