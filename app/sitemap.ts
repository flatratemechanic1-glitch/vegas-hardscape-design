import type { MetadataRoute } from "next";
import { SERVICE_AREAS } from "@/lib/constants";
import { SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/services", "/portfolio", "/about", "/contact"];
  const areaRoutes = SERVICE_AREAS.map((area) => `/service-areas/${area.slug}`);
  const routes = [...staticRoutes, ...areaRoutes];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
