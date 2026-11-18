import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const isPreviewDeployment =
    Boolean(process.env.VERCEL_ENV) &&
    process.env.VERCEL_ENV !== "production";

  if (isPreviewDeployment) {
    return {
      rules: [
        {
          userAgent: "*",
          disallow: "/",
        },
      ],
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_CONFIG.siteUrl}/sitemap.xml`,
  };
}
