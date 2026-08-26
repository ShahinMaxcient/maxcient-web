import Link from "next/link";
import TechIcon, { techBrandColor } from "./TechIcon";

/**
 * Platform card: brand-violet panel carrying the mark, copy and CTA beneath.
 *
 * Shared by the homepage "Technologies" grid and the industry pages, so the two
 * cannot drift apart. Presentational only — the caller supplies its own reveal
 * wrapper, since the homepage staggers with SectionReveal and the industry
 * pages use RevealGroup.
 *
 * The mark sits in a white disc rather than straight on the fill, so each
 * platform keeps its own brand colour instead of being flattened to white.
 * Without `href` the card renders as a plain div — an industry page may list a
 * platform that has no page of its own, and a link to nowhere is worse than none.
 */
export default function TechCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href?: string;
}) {
  const color = techBrandColor(title);

  const body = (
    <>
      <div className="mx-tech-head flex items-center justify-center">
        <span
          className="mx-tech-disc flex items-center justify-center rounded-full"
          style={{ width: 92, height: 92, background: "#FFFFFF", color, boxShadow: "0 14px 30px -12px rgba(20,16,40,0.45)" }}
        >
          <TechIcon name={title} className="w-11 h-11" />
        </span>
      </div>

      <div className="flex flex-col flex-1 p-7">
        <h3 className="text-lg font-bold transition-colors group-hover:text-[var(--primary)]" style={{ color: "var(--text-primary)", letterSpacing: "-0.01em" }}>
          {title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{description}</p>
        {href && (
          <span
            className="mx-tech-cta mt-6 self-start inline-flex items-center gap-2"
            style={{ background: "var(--primary)", color: "#fff", fontSize: 13, fontWeight: 600, padding: "10px 18px", borderRadius: 4 }}
          >
            Learn more
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        )}
      </div>
    </>
  );

  const shell = "mx-tech-card group h-full flex flex-col rounded-2xl overflow-hidden border t-border";
  return href
    ? <Link href={href} className={shell} style={{ background: "var(--surface)" }}>{body}</Link>
    : <div className={shell} style={{ background: "var(--surface)" }}>{body}</div>;
}
