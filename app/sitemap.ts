import type { MetadataRoute } from "next";
import { SERVICE_AREAS } from "@/lib/constants";
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
    "/about",
    "/contact",
  ];
  const areaRoutes = SERVICE_AREAS.map((area) => `/service-areas/${area.slug}`);
  const routes = [...staticRoutes, ...areaRoutes];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
