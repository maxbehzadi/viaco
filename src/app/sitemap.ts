import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { locales } from "@/i18n/config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/impressum", "/datenschutz"];
  const lastModified = new Date();

  return routes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${SITE_CONFIG.siteUrl}/${locale}${route}`,
      lastModified,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1.0 : 0.4,
      alternates: {
        languages: {
          de: `${SITE_CONFIG.siteUrl}/de${route}`,
          en: `${SITE_CONFIG.siteUrl}/en${route}`,
        },
      },
    }))
  );
}
