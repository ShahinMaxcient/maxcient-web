import Link from "next/link";
import type { Metadata } from "next";

/**
 * Site-wide 404.
 *
 * The WordPress site had years of URLs indexed; next.config.ts redirects the
 * ones we know about, but old links, mistyped addresses and stale backlinks
 * will still land somewhere unknown. Next's built-in 404 is an unstyled page
 * with no navigation, which dead-ends the visitor. This keeps them on the site
 * and points at the handful of places they were most likely heading.
 *
 * noindex so Google never lists the error page itself; the status code is
 * still a real 404, which is what tells search engines to drop dead URLs.
 */
export const metadata: Metadata = {
  title: "Page not found | Maxcient Technologies",
  robots: { index: false, follow: true },
};

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/erp-and-crm", label: "CRM and ERP" },
  { href: "/microsoft-dynamics-365", label: "Dynamics 365" },
  { href: "/blog", label: "Journal" },
  { href: "/about-us", label: "About us" },
  { href: "/request-a-consultation", label: "Talk to us" },
];

export default function NotFound() {
  return (
    <main
      className="flex flex-col items-center justify-center px-5 text-center"
      style={{ minHeight: "70vh", paddingTop: 120, paddingBottom: 96, background: "var(--background)" }}
    >
      <p
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          fontSize: 12,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.15em",
          color: "var(--text-muted)",
        }}
      >
        Error 404
      </p>

      <h1
        className="ed-display mt-4"
        style={{ fontSize: "clamp(1.9rem, 5vw, 3rem)", lineHeight: 1.1, color: "var(--text-primary)" }}
      >
        We couldn&apos;t find that page<span style={{ color: "var(--primary)" }}>.</span>
      </h1>

      <p
        className="mt-4 leading-relaxed"
        style={{ fontSize: "1rem", color: "var(--text-muted)", maxWidth: 520 }}
      >
        The link may be out of date, or the page may have moved when we rebuilt the
        site. Here is where most people are heading.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5" style={{ maxWidth: 620 }}>
        {LINKS.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="transition-colors"
            style={{
              padding: "9px 16px",
              border: "1px solid var(--border-strong)",
              borderRadius: 100,
              fontSize: 14,
              fontWeight: 500,
              color: "var(--text-secondary)",
              background: "var(--surface)",
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2.5 transition-transform duration-200 hover:-translate-y-0.5"
        style={{
          background: "var(--primary)",
          color: "#fff",
          fontWeight: 600,
          fontSize: 14,
          padding: "14px 26px",
          borderRadius: 4,
        }}
      >
        Back to home
        <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </Link>
    </main>
  );
}
