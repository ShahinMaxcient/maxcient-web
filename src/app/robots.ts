import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

/**
 * robots.txt.
 *
 * The admin panel and API routes are disallowed — they are behind auth and
 * return nothing useful to a crawler, and /api/health in particular would
 * otherwise be crawled repeatedly for a JSON blob.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
