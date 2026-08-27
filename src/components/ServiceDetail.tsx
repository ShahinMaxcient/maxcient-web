import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import FramedImage from "@/components/FramedImage";
import IndustryTabs from "@/components/IndustryTabs";
import GetInTouch from "@/components/GetInTouch";
import Reveal from "@/components/Reveal";
import { RevealGroup, RevealItem } from "@/components/RevealGroup";
import ProcessTimeline from "@/components/ProcessTimeline";

export type Guidance = { title: string; body: string; points?: string[]; image?: string; tag?: string };
export type Industry = { name: string; heading: string; body: string; features: string[] };
export type ProcessStep = { title: string; body: string };
export type TechPlatform = { name: string; intro: string; features: string[]; deployment?: string[]; suitableFor?: string };

export type ServiceDetailProps = {
  slug: string;
  title: string;
  subtitle: string;
  /** Optional 3–5 line supporting paragraph shown in the hero, beneath the tagline. */
  description?: string;
  heroImage: string;
  guidance: Guidance[];
  /** Small intro shown above the guidance rows (only when guidance has images). */
  guidanceHeading?: string;
  guidanceIntro?: string;
  /** Optional "Our Process" band heading (e.g. "How We Deliver X Services"). */
  processHeading?: string;
  /** When present, the process band renders these numbered steps instead of a bare heading. */
  processSteps?: ProcessStep[];
  industriesIntro: string;
  industries: Industry[];
  /** When true, industries render as an interactive tabbed panel (mirrors maxcient.com). */
  useIndustryTabs?: boolean;
  techPlatform?: TechPlatform;
  valueTitle: string;
  valueBody: string;
  ctaTitle: string;
  ctaSubtitle: string;
  /** When true, appends the "Get in touch" band after the FAQ. */
  showGetInTouch?: boolean;
};

// The five industry blocks share the same imagery + order across every service.
const INDUSTRY_IMAGES = [
  "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1581091226825-a6a2a5aee158.webp", // Manufacturing
  "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1560518883-ce09059eeffa.webp", // Real Estate
  "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1441986300917-64674bd600d8.webp", // Retail
  "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1586528116311-ad8dd3c8310d.webp", // Distribution
  "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1521737711867-e3b97375f902.webp", // Professional Services
];

const LOCAL_EXPERTISE =
  "Reach our transformation experts today — connect with our UAE-based certified consultants specializing in CRM implementation, ERP deployment, and supply chain optimization tailored to the GCC region. Our local experts understand UAE regulatory requirements and regional business practices.";

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function WarnIcon() {
  return (
    <svg className="w-[18px] h-[18px] mt-0.5 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" strokeWidth={2.1} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    </svg>
  );
}

export default function ServiceDetail(p: ServiceDetailProps) {
  const guidanceHasImages = p.guidance.some((g) => g.image);
  const industriesWithImages = p.industries.map((ind, i) => ({ ...ind, image: INDUSTRY_IMAGES[i % INDUSTRY_IMAGES.length] }));

  return (
    <>
      <main>
        <PageHero slug={p.slug} title={p.title} subtitle={p.subtitle} description={p.description} image={p.heroImage} />

        {/* How we help */}
        {guidanceHasImages ? (
          // Editorial alternating image/text rows (mirrors maxcient.com).
          <section className="py-12 lg:py-24 t-bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {(p.guidanceHeading || p.guidanceIntro) && (
                <Reveal direction="up" className="max-w-3xl mb-14 lg:mb-20">
                  <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">How we help</span>
                  {p.guidanceHeading && <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading leading-tight">{p.guidanceHeading}</h2>}
                  {p.guidanceIntro && <p className="mt-4 t-body leading-relaxed">{p.guidanceIntro}</p>}
                </Reveal>
              )}
              <div className="space-y-16 lg:space-y-28">
                {p.guidance.map((item, i) => {
                  const flip = i % 2 === 1;
                  return (
                    <div key={item.title} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                      {/* text and image slide in from opposite sides */}
                      <Reveal direction={flip ? "right" : "left"} className={flip ? "lg:order-2" : ""}>
                        {item.tag && <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{item.tag}</span>}
                        <h3 className="mt-3 text-2xl sm:text-3xl font-bold t-heading leading-snug">{item.title}</h3>
                        <p className="mt-4 t-body leading-relaxed">{item.body}</p>
                        {item.points && item.points.length > 0 && (
                          <div className="mt-6 space-y-3">
                            {item.points.map((pt) => (
                              <div key={pt} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: "var(--surface-alt)", border: "1px solid var(--border)" }}>
                                <WarnIcon />
                                <p className="text-sm t-label leading-relaxed">{pt}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </Reveal>
                      <Reveal direction={flip ? "left" : "right"} delay={0.08} className={flip ? "lg:order-1" : ""}>
                        <FramedImage src={item.image!} alt={item.title} />
                      </Reveal>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        ) : (
          // Legacy grid cards (no images) — staggered rise.
          <section className="py-14 lg:py-16 t-bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <RevealGroup className="grid lg:grid-cols-3 gap-8 items-start" stagger={0.1}>
                {p.guidance.map((item) => (
                  <RevealItem key={item.title} className="p-8 rounded-2xl border t-border hover:shadow-lg transition-all flex flex-col">
                    <h3 className="text-lg font-bold t-heading leading-snug">{item.title}</h3>
                    <p className="mt-4 t-body leading-relaxed">{item.body}</p>
                    {item.points && item.points.length > 0 && (
                      <ul className="mt-5 space-y-2.5">
                        {item.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2.5 text-sm t-label leading-relaxed">
                            <WarnIcon />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    )}
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        )}

        {/* Our Process band */}
        {p.processSteps && p.processSteps.length > 0 ? (
          <section className="py-12 lg:py-20 t-bg-alt">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Our Process</span>
                {p.processHeading && <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">{p.processHeading}</h2>}
              </Reveal>
              <ProcessTimeline steps={p.processSteps} />
            </div>
          </section>
        ) : (
          p.processHeading && (
            <section className="py-10 lg:py-12 t-bg-surface">
              <Reveal direction="up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Our Process</span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold t-heading">{p.processHeading}</h2>
              </Reveal>
            </section>
          )
        )}

        {/* Industry Solutions */}
        <section className="py-12 lg:py-24 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-12 lg:mb-14">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Who we work with</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">Industry Solutions</h2>
              <p className="mt-4 t-body leading-relaxed">{p.industriesIntro}</p>
            </Reveal>
            {p.useIndustryTabs ? (
              <Reveal direction="up" delay={0.05}>
                <IndustryTabs industries={industriesWithImages} />
              </Reveal>
            ) : (
              <div className="space-y-16">
                {p.industries.map((ind, i) => {
                  const flip = i % 2 === 1;
                  return (
                    <div key={ind.name} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                      <Reveal direction={flip ? "right" : "left"} className={flip ? "lg:order-2" : ""}>
                        <span className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">{ind.name}</span>
                        <h3 className="mt-2 text-2xl font-bold t-heading leading-snug">{ind.heading}</h3>
                        <p className="mt-4 t-body leading-relaxed">{ind.body}</p>
                        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {ind.features.map((f) => (
                            <li key={f} className="flex items-center gap-2 text-sm t-label">
                              <CheckIcon />
                              {f}
                            </li>
                          ))}
                        </ul>
                      </Reveal>
                      <Reveal direction={flip ? "left" : "right"} delay={0.08} className={flip ? "lg:order-1" : ""}>
                        <FramedImage src={INDUSTRY_IMAGES[i % INDUSTRY_IMAGES.length]} alt={ind.name} />
                      </Reveal>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Optional technology platform */}
        {p.techPlatform && (
          <section className="py-14 lg:py-16 t-bg-alt">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal direction="up" className="rounded-2xl border t-border t-bg-surface p-8 sm:p-10">
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Technology Platform</span>
                <h2 className="mt-3 text-2xl sm:text-3xl font-bold t-heading">{p.techPlatform.name}</h2>
                <p className="mt-4 t-body leading-relaxed">{p.techPlatform.intro}</p>
                <div className="mt-6 grid sm:grid-cols-2 gap-x-8 gap-y-3">
                  {p.techPlatform.features.map((f) => (
                    <div key={f} className="flex items-start gap-2 text-sm t-label">
                      <CheckIcon />
                      {f}
                    </div>
                  ))}
                </div>
                {(p.techPlatform.deployment?.length || p.techPlatform.suitableFor) && (
                  <div className="mt-8 pt-6 grid sm:grid-cols-2 gap-6" style={{ borderTop: "1px solid var(--border)" }}>
                    {p.techPlatform.deployment && p.techPlatform.deployment.length > 0 && (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">Deployment</div>
                        <ul className="space-y-1 text-sm t-body">
                          {p.techPlatform.deployment.map((d) => <li key={d}>{d}</li>)}
                        </ul>
                      </div>
                    )}
                    {p.techPlatform.suitableFor && (
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)] mb-2">Suitable for</div>
                        <p className="text-sm t-body leading-relaxed">{p.techPlatform.suitableFor}</p>
                      </div>
                    )}
                  </div>
                )}
              </Reveal>
            </div>
          </section>
        )}

        {/* Value proposition + local expertise */}
        <section className="py-14 lg:py-16 t-bg-alt">
          <Reveal direction="up" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold t-heading">{p.valueTitle}</h2>
            <p className="mt-5 t-body leading-relaxed">{p.valueBody}</p>
            <p className="mt-4 t-body leading-relaxed">{LOCAL_EXPERTISE}</p>
          </Reveal>
        </section>

        <CTASection title={p.ctaTitle} subtitle={p.ctaSubtitle} />
        <PageFAQ slug={p.slug} />
        {p.showGetInTouch && <GetInTouch />}
      </main>
    </>
  );
}
