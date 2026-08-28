import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { getHiddenSlugs } from "@/lib/pages";
import { SITE_URL } from "@/lib/seo";

/**
 * Sitemap, generated from the database rather than a hand-kept list.
 *
 * Pages hidden in Admin → Pages are excluded: submitting a URL that returns
 * 404 wastes crawl budget and is reported as an error in Search Console.
 * Blog posts come from the Post table so newly published articles appear
 * without a code change.
 */

// Every marketing route in the (site) group. Kept explicit rather than read
// from the filesystem, because a sitemap should list what we intend to be
// indexed — not whatever happens to compile.
const STATIC_ROUTES: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { path: "", priority: 1.0, changeFrequency: "weekly" },
  { path: "about-us", priority: 0.8, changeFrequency: "monthly" },
  { path: "request-a-consultation", priority: 0.9, changeFrequency: "monthly" },
  { path: "blog", priority: 0.7, changeFrequency: "weekly" },

  // Services
  { path: "erp-and-crm", priority: 0.9, changeFrequency: "monthly" },
  { path: "data-analytics", priority: 0.8, changeFrequency: "monthly" },
  { path: "intelligent-automation", priority: 0.8, changeFrequency: "monthly" },
  { path: "application-development", priority: 0.8, changeFrequency: "monthly" },
  { path: "application-management", priority: 0.8, changeFrequency: "monthly" },
  { path: "dedicated-development-team", priority: 0.8, changeFrequency: "monthly" },

  // Industries
  { path: "manufacturing", priority: 0.8, changeFrequency: "monthly" },
  { path: "real-estate", priority: 0.8, changeFrequency: "monthly" },
  { path: "retail", priority: 0.8, changeFrequency: "monthly" },
  { path: "distribution", priority: 0.8, changeFrequency: "monthly" },
  { path: "professional-services", priority: 0.8, changeFrequency: "monthly" },

  // Technologies
  { path: "microsoft-dynamics-365", priority: 0.9, changeFrequency: "monthly" },
  { path: "microsoft-power-platform", priority: 0.8, changeFrequency: "monthly" },
  { path: "microsoft-azure", priority: 0.8, changeFrequency: "monthly" },
  { path: "azure-ai", priority: 0.8, changeFrequency: "monthly" },
  { path: "microsoft-copilot", priority: 0.8, changeFrequency: "monthly" },
  { path: "iot-internet-of-things", priority: 0.7, changeFrequency: "monthly" },
  { path: "open-ai", priority: 0.7, changeFrequency: "monthly" },

  // Products
  { path: "realtyai-sales", priority: 0.8, changeFrequency: "monthly" },
  { path: "realtyai-leasing", priority: 0.8, changeFrequency: "monthly" },
  { path: "realtyai-fm", priority: 0.7, changeFrequency: "monthly" },
  { path: "maxsphere-one", priority: 0.8, changeFrequency: "monthly" },
  { path: "maxmarina-marina-management-solution", priority: 0.8, changeFrequency: "monthly" },
  { path: "maxutility-facility-utility-management-solution", priority: 0.8, changeFrequency: "monthly" },
  { path: "maxpayroll", priority: 0.8, changeFrequency: "monthly" },
  { path: "maxpayroll-hr-management-solution-2", priority: 0.6, changeFrequency: "monthly" },
  { path: "smartfees-school-admin-solution", priority: 0.7, changeFrequency: "monthly" },
  { path: "e-invoice-connector", priority: 0.7, changeFrequency: "monthly" },

  // Legal — low priority but legitimately indexable.
  { path: "privacy-policy", priority: 0.3, changeFrequency: "yearly" },
  { path: "terms-of-use", priority: 0.3, changeFrequency: "yearly" },
  { path: "cookie-policy", priority: 0.3, changeFrequency: "yearly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const [hidden, posts] = await Promise.all([
    getHiddenSlugs().catch(() => new Set<string>()),
    prisma.post
      .findMany({
        where: { status: "PUBLISHED" },
        select: { slug: true, updatedAt: true },
        orderBy: { publishedAt: "desc" },
      })
      .catch(() => []),
  ]);

  const pages = STATIC_ROUTES.filter((r) => !hidden.has(r.path)).map((r) => ({
    url: `${SITE_URL}${r.path ? `/${r.path}` : ""}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const articles = posts.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: p.updatedAt ?? now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...articles];
}
