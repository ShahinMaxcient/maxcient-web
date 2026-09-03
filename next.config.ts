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

/**
 * Content-Security-Policy.
 *
 * Deliberately not nonce-based. A nonce must be unique per response, which
 * means rendering every request — and the public pages are ISR-cached, which
 * took TTFB from ~1.6s to a few milliseconds. Trading that away for a stricter
 * script-src is the wrong call for a marketing site, so this policy is written
 * to be genuinely useful without one.
 *
 * What it stops: scripts loaded from any other origin, eval, <base> injection,
 * form posts redirected to an attacker's host, plugins, and framing. What it
 * does not stop: an injected *inline* <script>, because Next's own hydration
 * payload is inline and cannot be permitted without permitting that too. React
 * escapes interpolated values and nothing here passes user input to
 * dangerouslySetInnerHTML, so that path is closed at the source instead.
 */
const CSP = [
  "default-src 'self'",
  // 'unsafe-inline' is required for Next's inline hydration script. This still
  // blocks <script src> from any other origin, and omitting 'unsafe-eval'
  // blocks eval outright.
  "script-src 'self' 'unsafe-inline'",
  // React writes style={{...}} as element style attributes, which cannot carry
  // a nonce.
  "style-src 'self' 'unsafe-inline'",
  // Supabase serves every photo and logo; unsplash is allowed by the
  // remotePatterns below. blob:/data: cover the image optimiser and canvas.
  "img-src 'self' data: blob: https://*.supabase.co https://images.unsplash.com",
  // Fonts are self-hosted through next/font, so no external font origin.
  "font-src 'self' data:",
  "connect-src 'self' https://*.supabase.co",
  // three.js can create workers from a blob URL.
  "worker-src 'self' blob:",
  "frame-ancestors 'none'",
  "base-uri 'none'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const nextConfig: NextConfig = {
  async redirects() {
    // permanent: true emits 308, which Google treats exactly as a 301 and
    // which preserves the request method. Next normalises the trailing slash
    // the old WordPress URLs carried before matching, so "/foo/" hits "/foo".
    return [
      // Send the Vercel deployment domain to the real one. The *.vercel.app
      // host serves the identical site, so without this it competes with
      // maxcient.com in search results as duplicate content, and any link
      // shared from it keeps people off the branded domain. Canonical tags
      // already point home; this makes the redirect explicit.
      //
      // Scoped by host so it only fires on *.vercel.app — the rule must never
      // match requests already arriving on maxcient.com, or every page would
      // redirect to itself forever. Preview deployments match too, which is
      // intended: they should not be reachable or indexable either.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<sub>.*)\\.vercel\\.app" }],
        destination: "https://www.maxcient.com/:path*",
        permanent: true,
      },
      ...LEGACY_REDIRECTS.map((r) => ({ ...r, permanent: true })),
    ];
  },
  async headers() {
    // Vercel already sends HSTS. These cover the rest of the standard set;
    // without them the site can be framed by another origin, and browsers are
    // free to MIME-sniff responses and leak full URLs in the Referer header.
    return [
      {
        source: "/:path*",
        headers: [
          // Clickjacking: nothing here should ever be embedded in a frame.
          { key: "X-Frame-Options", value: "DENY" },
          // Stop browsers second-guessing Content-Type.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Send the origin to other sites, the full URL only to ourselves,
          // so admin paths never leak in an outbound Referer.
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // The site asks for none of these; deny them explicitly.
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
      {
        // Admin is behind auth and must never be cached by a proxy or indexed.
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  images: {
    // Next 16 narrowed the default to [75] and silently coerces any other
    // `quality` prop to the nearest allowed value — so 82 has to be declared
    // here or the full-bleed heroes quietly render at 75 again.
    qualities: [75, 82],
    // Optimised images carried Next's default 60-second TTL, so the CDN sent
    // `max-age=0, must-revalidate` and every repeat visitor re-validated all
    // 16 images on every page view. The source files are content-addressed
    // (Supabase upload paths carry a timestamp, /public assets are versioned
    // by deploy), so a long TTL cannot serve a stale image — replacing one
    // means a new URL. A year of caching removes those round trips entirely.
    minimumCacheTTL: 31536000,
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
