import type { NextConfig } from "next";

/**
 * URLs that were indexed on the WordPress maxcient.com and have moved.
 *
 * Google indexes URLs, not sites: the domain's authority and backlinks
 * survive the move on their own, but any address that changes becomes a 404
 * and loses its rankings unless it is redirected. Verified against the live
 * wp-sitemap on 2026-08-28 — 23 of the 27 old pages already match a route
 * here exactly, so only the four groups below need mapping.
 *
 * The blog is the important one: WordPress published posts at the ROOT
 * (maxcient.com/article-name), while this site serves them under /blog/.
 * Every old post URL would otherwise 404.
 */
const LEGACY_REDIRECTS: { source: string; destination: string }[] = [
  // Section index and pages that were renamed or merged.
  { source: "/blog-posts", destination: "/blog" },
  { source: "/contact-us", destination: "/request-a-consultation" },
  { source: "/realtyai-property-management-solution", destination: "/realtyai-sales" },

  // Root-level posts that still exist here, matched by title.
  { source: "/build-a-unified-data-platform-to-enhance-end-to-end-customer-experience", destination: "/blog/build-a-unified-data-platform" },
  { source: "/it-is-time-to-outsource-development-to-an-offshore-development-firm", destination: "/blog/outsource-development-to-an-offshore-firm" },
  { source: "/attaining-operational-flexibility-during-uncertain-times", destination: "/blog/operational-flexibility-during-uncertain-times" },
  { source: "/how-to-bring-about-rapid-growth-and-flexibility-with-power-platform", destination: "/blog/rapid-growth-with-power-platform" },

  // WordPress archive and plugin routes. Wildcards rather than the five
  // exact URLs found in the wp-sitemap, because WordPress generates these
  // patterns open-endedly and an unlisted one would otherwise 404.
  { source: "/category/:slug*", destination: "/blog" },
  { source: "/author/:slug*", destination: "/blog" },
  { source: "/metform-form/:slug*", destination: "/request-a-consultation" },
  { source: "/tag/:slug*", destination: "/blog" },

  // The remaining root-level posts. Their content was migrated from the live
  // WordPress site keeping the original slug, so each points at its own
  // article rather than the blog index.
  { source: "/unlocking-success-the-role-of-data-driven-business-operations", destination: "/blog/unlocking-success-the-role-of-data-driven-business-operations" },
  { source: "/dynamics-365-is-the-first-choice-for-increasing-speed-to-the-market", destination: "/blog/dynamics-365-is-the-first-choice-for-increasing-speed-to-the-market" },
  { source: "/what-are-the-benefits-of-offshore-software-development-services", destination: "/blog/what-are-the-benefits-of-offshore-software-development-services" },
  { source: "/improve-your-global-brand-value-with-cloud-technology", destination: "/blog/improve-your-global-brand-value-with-cloud-technology" },
  { source: "/discover-the-types-and-essence-of-offshore-software-development", destination: "/blog/discover-the-types-and-essence-of-offshore-software-development" },
  { source: "/why-should-you-use-cloud-based-bi-for-demand-forecasting-and-accurate-decision-making", destination: "/blog/why-should-you-use-cloud-based-bi-for-demand-forecasting-and-accurate-decision-making" },
  { source: "/how-to-be-accurate-with-your-erp-implementation-cost-estimations", destination: "/blog/how-to-be-accurate-with-your-erp-implementation-cost-estimations" },
  { source: "/4-ways-power-automate-can-boost-productivity-in-facility-management", destination: "/blog/4-ways-power-automate-can-boost-productivity-in-facility-management" },
  { source: "/how-to-choose-an-offshore-software-development-company", destination: "/blog/how-to-choose-an-offshore-software-development-company" },
];

const nextConfig: NextConfig = {
  async redirects() {
    // permanent: true emits 308, which Google treats exactly as a 301 and
    // which preserves the request method. Next normalises the trailing slash
    // the old WordPress URLs carried before matching, so "/foo/" hits "/foo".
    return LEGACY_REDIRECTS.map((r) => ({ ...r, permanent: true }));
  },
  images: {
    // Next 16 narrowed the default to [75] and silently coerces any other
    // `quality` prop to the nearest allowed value — so 82 has to be declared
    // here or the full-bleed heroes quietly render at 75 again.
    qualities: [75, 82],
    // Default ladder jumps 2048 -> 3840, so a 1440px screen at 2x DPR (needing
    // ~2880) is handed a 3840 file — on the full-bleed heroes that was ~400KB
    // of pixels it never displays. The two extra rungs keep the same sharpness
    // at a much closer match.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3072, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // Supabase Storage — where admin-uploaded images live.
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },
};

export default nextConfig;
