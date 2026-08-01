import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import Image from "next/image";

export type Guidance = { title: string; body: string; points?: string[] };
export type Industry = { name: string; heading: string; body: string; features: string[] };
export type TechPlatform = { name: string; intro: string; features: string[]; deployment?: string[]; suitableFor?: string };

export type ServiceDetailProps = {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  guidance: Guidance[];
  industriesIntro: string;
  industries: Industry[];
  techPlatform?: TechPlatform;
  valueTitle: string;
  valueBody: string;
  ctaTitle: string;
  ctaSubtitle: string;
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

export default function ServiceDetail(p: ServiceDetailProps) {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug={p.slug} title={p.title} subtitle={p.subtitle} image={p.heroImage} />

        {/* How we help */}
        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {p.guidance.map((item) => (
                <div key={item.title} className="p-8 rounded-2xl border t-border hover:shadow-lg transition-all flex flex-col">
                  <h3 className="text-lg font-bold t-heading leading-snug">{item.title}</h3>
                  <p className="mt-4 t-body leading-relaxed">{item.body}</p>
                  {item.points && item.points.length > 0 && (
                    <ul className="mt-5 space-y-2.5">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2.5 text-sm t-label leading-relaxed">
                          <svg className="w-4 h-4 mt-0.5 text-[var(--accent)] shrink-0" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                          </svg>
                          {pt}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Solutions */}
        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Industries</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">Industry Solutions</h2>
              <p className="mt-4 t-body leading-relaxed">{p.industriesIntro}</p>
            </div>
            <div className="space-y-16">
              {p.industries.map((ind, i) => (
                <div key={ind.name} className="grid lg:grid-cols-2 gap-12 items-center">
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
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
                  </div>
                  <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <Image src={INDUSTRY_IMAGES[i % INDUSTRY_IMAGES.length]} alt={ind.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Optional technology platform */}
        {p.techPlatform && (
          <section className="py-14 lg:py-16 t-bg-surface">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl border t-border p-8 sm:p-10">
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
              </div>
            </div>
          </section>
        )}

        {/* Value proposition + local expertise */}
        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold t-heading">{p.valueTitle}</h2>
            <p className="mt-5 t-body leading-relaxed">{p.valueBody}</p>
            <p className="mt-4 t-body leading-relaxed">{LOCAL_EXPERTISE}</p>
          </div>
        </section>

        <CTASection title={p.ctaTitle} subtitle={p.ctaSubtitle} />
        <PageFAQ slug={p.slug} />
      </main>
      <Footer />
    </>
  );
}
