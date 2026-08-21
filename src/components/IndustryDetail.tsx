import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import Image from "next/image";

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

const LOCAL_EXPERTISE =
  "Reach our transformation experts today — connect with our UAE-based certified consultants specializing in CRM implementation, ERP deployment, and supply chain optimization tailored to the GCC region. Our local experts understand UAE regulatory requirements and regional business practices.";

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export default function IndustryDetail(p: IndustryDetailProps) {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug={p.slug} title={p.title} subtitle={p.subtitle} image={p.heroImage} />

        {/* Emerging trends */}
        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Emerging Trends</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">Trends shaping {p.title}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {p.trends.map((t) => (
                <div key={t.title} className="p-7 rounded-2xl border t-border hover:shadow-lg transition-all">
                  <h3 className="text-base font-bold t-heading leading-snug">{t.title}</h3>
                  <p className="mt-3 text-sm t-body leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service-solution blocks */}
        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">What we do</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">{p.solutionsHeading}</h2>
              <p className="mt-4 t-body leading-relaxed">{p.solutionsIntro}</p>
            </div>
            <div className="space-y-16">
              {p.solutions.map((s, i) => (
                <div key={s.heading} className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <h3 className="text-2xl font-bold t-heading leading-snug">{s.heading}</h3>
                    <p className="mt-4 t-body leading-relaxed">{s.body}</p>
                    <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {s.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm t-label">
                          <CheckIcon />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <Image src={SOLUTION_IMAGES[i % SOLUTION_IMAGES.length]} alt={s.heading} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology platforms */}
        {p.techCards.length > 0 && (
          <section className="py-14 lg:py-16 t-bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Technologies</span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">Platforms we leverage for {p.title}</h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {p.techCards.map((c) => (
                  <div key={c.name} className="p-7 rounded-2xl border t-border t-bg-alt hover:shadow-lg transition-all">
                    <h3 className="text-base font-bold t-heading">{c.name}</h3>
                    <p className="mt-3 text-sm t-body leading-relaxed">{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Value band */}
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
