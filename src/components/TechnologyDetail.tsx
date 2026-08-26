import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import FramedImage from "@/components/FramedImage";
import Reveal from "@/components/Reveal";
import { RevealGroup, RevealItem } from "@/components/RevealGroup";

export type Callout = { title: string; body: string };
export type ServiceCard = { title: string; body: string; bullets: string[] };
export type Module = { name: string; body: string };
export type IndustryCallout = { name: string; body: string };

export type TechnologyDetailProps = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  whatIsHeading: string;
  whatIsBody: string;
  /** When set, the "What is X" intro becomes a two-column text + image layout. */
  whatIsImage?: string;
  callouts: Callout[];
  servicesHeading: string;
  services: ServiceCard[];
  /** When set, services render as alternating image/text rows (one image per service). */
  serviceImages?: string[];
  modulesHeading: string;
  modulesIntro?: string;
  modules: Module[];
  industryIntro: string;
  industryCallouts: IndustryCallout[];
  ctaTitle: string;
  ctaSubtitle: string;
};

function CheckIcon() {
  return (
    <svg className="w-4 h-4 mt-0.5 text-[var(--accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export default function TechnologyDetail(p: TechnologyDetailProps) {
  const serviceImages = p.serviceImages ?? [];
  return (
    <>
      <main>
        <PageHero slug={p.slug} title={p.title} subtitle={p.subtitle} image={p.heroImage} />

        {/* What is X + benefit callouts */}
        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {p.whatIsImage ? (
              <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14 lg:mb-16">
                <Reveal direction="left">
                  <h2 className="text-3xl sm:text-4xl font-bold t-heading">{p.whatIsHeading}</h2>
                  <p className="mt-4 t-body leading-relaxed">{p.whatIsBody}</p>
                </Reveal>
                <Reveal direction="right" delay={0.08}>
                  <FramedImage src={p.whatIsImage} alt={p.whatIsHeading} />
                </Reveal>
              </div>
            ) : (
              <Reveal direction="up" className="max-w-3xl mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold t-heading">{p.whatIsHeading}</h2>
                <p className="mt-4 t-body leading-relaxed">{p.whatIsBody}</p>
              </Reveal>
            )}
            <RevealGroup className="grid md:grid-cols-3 gap-6 items-stretch" stagger={0.08}>
              {p.callouts.map((c) => (
                <RevealItem key={c.title} className="h-full p-7 rounded-2xl border t-border hover:shadow-lg transition-all">
                  <h3 className="text-base font-bold t-heading leading-snug">{c.title}</h3>
                  <p className="mt-3 text-sm t-body leading-relaxed">{c.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        {/* Services */}
        <section className="py-14 lg:py-20 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Our services</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">{p.servicesHeading}</h2>
            </Reveal>
            {serviceImages.length > 0 ? (
              <div className="space-y-16 lg:space-y-24">
                {p.services.map((s, i) => {
                  const flip = i % 2 === 1;
                  return (
                    <div key={s.title} className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                      <Reveal direction={flip ? "right" : "left"} className={flip ? "lg:order-2" : ""}>
                        <h3 className="text-2xl sm:text-3xl font-bold t-heading leading-snug">{s.title}</h3>
                        <p className="mt-4 t-body leading-relaxed">{s.body}</p>
                        {s.bullets.length > 0 && (
                          <ul className="mt-6 space-y-2.5">
                            {s.bullets.map((b) => (
                              <li key={b} className="flex items-start gap-2.5 text-sm t-label leading-relaxed">
                                <CheckIcon />
                                {b}
                              </li>
                            ))}
                          </ul>
                        )}
                      </Reveal>
                      <Reveal direction={flip ? "left" : "right"} delay={0.08} className={flip ? "lg:order-1" : ""}>
                        <FramedImage src={serviceImages[i % serviceImages.length]} alt={s.title} />
                      </Reveal>
                    </div>
                  );
                })}
              </div>
            ) : (
              <RevealGroup className="grid md:grid-cols-3 gap-6 items-stretch" stagger={0.08}>
                {p.services.map((s) => (
                  <RevealItem key={s.title} className="h-full p-7 rounded-2xl border t-border t-bg-surface hover:shadow-lg transition-all flex flex-col">
                    <h3 className="text-lg font-bold t-heading leading-snug">{s.title}</h3>
                    <p className="mt-3 text-sm t-body leading-relaxed">{s.body}</p>
                    {s.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm t-label leading-relaxed">
                            <CheckIcon />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </RevealItem>
                ))}
              </RevealGroup>
            )}
          </div>
        </section>

        {/* Modules / products grid */}
        {p.modules.length > 0 && (
          <section className="py-14 lg:py-16 t-bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-10">
                <h2 className="text-3xl sm:text-4xl font-bold t-heading">{p.modulesHeading}</h2>
                {p.modulesIntro && <p className="mt-4 t-body leading-relaxed">{p.modulesIntro}</p>}
              </Reveal>
              <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch" stagger={0.07}>
                {p.modules.map((m) => (
                  <RevealItem key={m.name} className="h-full p-6 rounded-2xl border t-border t-bg-alt hover:shadow-lg transition-all">
                    <h3 className="text-base font-bold t-heading">{m.name}</h3>
                    <p className="mt-2.5 text-sm t-body leading-relaxed">{m.body}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </section>
        )}

        {/* For your industry */}
        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal direction="up" className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">For your industry</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">{p.title} across sectors</h2>
              <p className="mt-4 t-body leading-relaxed">{p.industryIntro}</p>
            </Reveal>
            <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch" stagger={0.07}>
              {p.industryCallouts.map((c) => (
                <RevealItem key={c.name} className="h-full p-6 rounded-2xl border t-border t-bg-surface">
                  <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">{c.name}</div>
                  <p className="mt-2 text-sm t-body leading-relaxed">{c.body}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </section>

        <CTASection title={p.ctaTitle} subtitle={p.ctaSubtitle} />
        <PageFAQ slug={p.slug} />
      </main>
    </>
  );
}
