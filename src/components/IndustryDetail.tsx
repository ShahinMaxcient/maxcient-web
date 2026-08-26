import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import GetInTouch from "@/components/GetInTouch";
import IndustryTabs from "@/components/IndustryTabs";
import TechCard from "@/components/TechCard";
import Reveal from "@/components/Reveal";
import { RevealGroup, RevealItem } from "@/components/RevealGroup";
import { getCollectionItems } from "@/lib/content";

export type Trend = { title: string; body: string };
export type Solution = { heading: string; body: string; features: string[] };
export type TechCard = { name: string; body: string };

export type IndustryDetailProps = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  trends: Trend[];
  solutionsHeading: string;
  solutionsIntro: string;
  solutions: Solution[];
  /** Industry-specific images for the solution tabs (one per solution, in order). */
  solutionImages?: string[];
  techCards: TechCard[];
  valueTitle: string;
  valueBody: string;
  ctaTitle: string;
  ctaSubtitle: string;
};

// The five service-solution blocks map 1:1 to the service pillars, in this order:
// ERP/Smart-Factory, Data Analytics, Automation, App Development, App Management.
const SOLUTION_IMAGES = [
  "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/services-crm.webp",
  "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/services-analytics.webp",
  "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/services-automation.webp",
  "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/services-development.webp",
  "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/services-management.webp",
];

// Short tab labels for the solution pillars (the solutions arrive in this order).
const PILLAR_LABELS = ["ERP & CRM", "Data Analytics", "Automation", "App Development", "App Management"];

const LOCAL_EXPERTISE =
  "Reach our transformation experts today — connect with our UAE-based certified consultants specializing in CRM implementation, ERP deployment, and supply chain optimization tailored to the GCC region. Our local experts understand UAE regulatory requirements and regional business practices.";

// A themed icon per emerging trend, chosen from the trend title.
function TrendIcon({ name }: { name: string }) {
  const n = name.toLowerCase();
  const p = { className: "w-6 h-6", fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, viewBox: "0 0 24 24" };
  if (n.includes("digital twin") || n.includes("twin"))
    return <svg {...p}><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></svg>;
  if (n.includes("iot") || n.includes("smart"))
    return <svg {...p}><rect x="8" y="8" width="8" height="8" rx="1.5" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9 7 7M17 17l2.1 2.1M19.1 4.9 17 7M7 17l-2.1 2.1" /></svg>;
  if (n.includes("augmented") || n.includes("reality") || /\bar\b/.test(n))
    return <svg {...p}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>;
  if (n.includes("proptech") || n.includes("property") || n.includes("real estate"))
    return <svg {...p}><path d="M3 21h18M5 21V7l7-4 7 4v14" /><path d="M9 21v-6h6v6" /></svg>;
  if (n.includes("supply") || n.includes("logistic") || n.includes("chain"))
    return <svg {...p}><rect x="1" y="6" width="14" height="11" rx="1.5" /><path d="M15 9h4l3 3v5h-7" /><circle cx="6" cy="19" r="1.6" /><circle cx="18" cy="19" r="1.6" /></svg>;
  if (n.includes("inventory") || n.includes("warehouse") || n.includes("stock"))
    return <svg {...p}><path d="M21 8V6a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 6v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4" /><path d="m3.3 7 8.7 5 8.7-5M12 22V12" /></svg>;
  if (n.includes("personaliz") || n.includes("personal"))
    return <svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>;
  if (n.includes("omnichannel") || n.includes("e-commerce") || n.includes("commerce") || n.includes("consumer") || n.includes("shopping"))
    return <svg {...p}><circle cx="9" cy="21" r="1" /><circle cx="18" cy="21" r="1" /><path d="M2.5 3h2l2.4 12.4a2 2 0 0 0 2 1.6h8.7a2 2 0 0 0 2-1.6L23 7H6" /></svg>;
  if (n.includes("automation") || n.includes("process") || n.includes("optimization"))
    return <svg {...p}><circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" /></svg>;
  if (n.includes("analytic") || n.includes("data") || n.includes("market") || n.includes("predictive") || n.includes("decision") || n.includes("insight"))
    return <svg {...p}><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-3 3" /></svg>;
  if (n.includes("collaboration") || n.includes("remote") || n.includes("virtual") || n.includes("transaction"))
    return <svg {...p}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  if (n.includes("custom") || n.includes("customer") || n.includes("journey"))
    return <svg {...p}><path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6" /></svg>;
  return <svg {...p}><path d="M23 6l-9.5 9.5-5-5L1 18" /><path d="M17 6h6v6" /></svg>;
}

/**
 * Resolve a platform name to its technology page.
 *
 * Industry pages name platforms in their own words — "IoT (Internet of Things)"
 * where the collection says "IoT", "Microsoft Power Platform" where it says
 * "Power Platform" — so an exact match is not enough. Compare on alphanumerics
 * only, prefer an exact hit, then fall back to the longest containment so the
 * broadest sensible match wins. Anything unmatched simply gets no link, which
 * is also what keeps unpublished platforms from being linked.
 */
function resolveTechHref(name: string, techs: { title: string; href: string }[]): string | undefined {
  const norm = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, "");
  const n = norm(name);
  const exact = techs.find((t) => norm(t.title) === n);
  if (exact) return exact.href;
  const partial = techs
    .filter((t) => { const c = norm(t.title); return c.length > 2 && (n.includes(c) || c.includes(n)); })
    .sort((a, b) => norm(b.title).length - norm(a.title).length)[0];
  return partial?.href;
}

export default async function IndustryDetail(p: IndustryDetailProps) {
  const techs = await getCollectionItems<{ title: string; href: string }>("technologies");
  const images = p.solutionImages && p.solutionImages.length ? p.solutionImages : SOLUTION_IMAGES;
  const solutionTabs = p.solutions.map((s, i) => ({
    name: PILLAR_LABELS[i] ?? `Solution ${i + 1}`,
    heading: s.heading,
    body: s.body,
    features: s.features,
    image: images[i % images.length],
  }));

  return (
    <>
      <main>
        <PageHero slug={p.slug} title={p.title} subtitle={p.subtitle} image={p.heroImage} />

        {/* Emerging trends */}
        <section className="py-16 lg:py-20 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Emerging Trends</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">Trends shaping {p.title}</h2>
            </Reveal>
            <RevealGroup className="grid md:grid-cols-3 gap-6 items-stretch" stagger={0.1}>
              {p.trends.map((t) => (
                <RevealItem
                  key={t.title}
                  className="group h-full p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(124,58,237,0.45)]"
                  style={{ background: "linear-gradient(158deg, var(--surface-alt) 0%, #E4D9FB 100%)", border: "1px solid var(--border-strong)" }}
                >
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl mb-6 transition-transform duration-300 group-hover:scale-105"
                    style={{ background: "var(--primary)", color: "#fff", boxShadow: "0 10px 22px -10px rgba(124,58,237,0.65)" }}
                  >
                    <TrendIcon name={t.title} />
                  </div>
                  <h3 className="text-lg font-bold t-heading leading-snug">{t.title}</h3>
                  <p className="mt-3 text-sm t-body leading-relaxed">{t.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Service-solution blocks — interactive tabs (mirrors maxcient.com) */}
        <section className="py-16 lg:py-24 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">What we do</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">{p.solutionsHeading}</h2>
              <p className="mt-4 t-body leading-relaxed">{p.solutionsIntro}</p>
            </Reveal>
            <Reveal direction="up" delay={0.05}>
              <IndustryTabs industries={solutionTabs} />
            </Reveal>
          </div>
        </section>

        {/* Technology platforms */}
        {p.techCards.length > 0 && (
          <section className="py-16 lg:py-20 t-bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Technologies</span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">Platforms we leverage for {p.title}</h2>
              </Reveal>
              <RevealGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch" stagger={0.08}>
                {p.techCards.map((c) => (
                  <RevealItem key={c.name} className="h-full">
                    <TechCard title={c.name} description={c.body} href={resolveTechHref(c.name, techs)} />
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        )}

        {/* Value band */}
        <section className="py-16 lg:py-20 t-bg-alt">
          <Reveal direction="up" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold t-heading">{p.valueTitle}</h2>
            <p className="mt-5 t-body leading-relaxed">{p.valueBody}</p>
            <p className="mt-4 t-body leading-relaxed">{LOCAL_EXPERTISE}</p>
          </Reveal>
        </section>

        <CTASection title={p.ctaTitle} subtitle={p.ctaSubtitle} />
        <PageFAQ slug={p.slug} />
        <GetInTouch />
      </main>
    </>
  );
}
