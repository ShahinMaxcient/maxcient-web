import Link from "next/link";
import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";

type SectionHeaderProps = { eyebrow?: string; title?: string; body?: string };

/**
 * Turn a LinkedIn post reference into an official embed src. Accepts:
 *  - a full embed src / iframe tag (…/embed/feed/update/…)
 *  - any URL containing urn:li:(share|ugcPost|activity):<id>
 *  - a post link like …/posts/…-activity-<id>-…
 * Returns null when nothing usable is found.
 */
function toEmbedSrc(input: string): string | null {
  const s = (input || "").trim();
  if (!s) return null;
  if (s.includes("/embed/feed/update/")) {
    const tag = s.match(/src=["']([^"']+)["']/);
    return tag ? tag[1] : s;
  }
  const urn = s.match(/urn:li:(share|ugcPost|activity):(\d+)/);
  if (urn) return `https://www.linkedin.com/embed/feed/update/urn:li:${urn[1]}:${urn[2]}`;
  const act = s.match(/activity[:-](\d{10,25})/);
  if (act) return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${act[1]}`;
  return null;
}

export default function LinkedInPosts({
  posts,
  companyUrl,
  header,
}: {
  posts: string[];
  companyUrl?: string;
  header?: SectionHeaderProps;
}) {
  const srcs = posts.map(toEmbedSrc).filter((s): s is string => !!s);
  if (srcs.length === 0) return null;

  return (
    <section id="linkedin" className="pt-12 lg:pt-16 pb-20 lg:pb-28" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow={header?.eyebrow || "LinkedIn"} title={header?.title || "Latest on LinkedIn."}>
            {header?.body || "Fresh updates, launches and insights from the Maxcient team — straight from our LinkedIn."}
          </SectionHead>
        </SectionReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {srcs.map((src, i) => (
            <SectionReveal key={src} delay={i * 0.06}>
              <div className="overflow-hidden rounded-2xl border t-border" style={{ background: "var(--surface)", boxShadow: "0 14px 34px -22px rgba(20,16,40,0.35)" }}>
                <iframe
                  src={src}
                  title={`Maxcient LinkedIn post ${i + 1}`}
                  loading="lazy"
                  className="w-full block"
                  style={{ height: 560, border: 0 }}
                  allowFullScreen
                />
              </div>
            </SectionReveal>
          ))}
        </div>

        {companyUrl && (
          <SectionReveal delay={0.1}>
            <div className="mt-12 flex justify-center">
              <Link
                href={companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-lg font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: "#0A66C2" }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
                </svg>
                Follow us on LinkedIn
              </Link>
            </div>
          </SectionReveal>
        )}
      </div>
    </section>
  );
}
