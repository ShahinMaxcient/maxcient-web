import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import Image from "next/image";
import { getAboutSettings } from "@/lib/settings";
import { getCollectionItems } from "@/lib/content";

export default async function AboutUs() {
  const [about, values, stats] = await Promise.all([
    getAboutSettings(),
    getCollectionItems<{ title: string; description: string }>("companyValues"),
    getCollectionItems<{ label: string; value: string }>("aboutStats"),
  ]);

  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="about-us" title={about.heroTitle} subtitle={about.heroSubtitle} image={about.heroImage} />

        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">{about.missionEyebrow}</span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">{about.missionTitle}</h2>
                <p className="mt-6 text-lg t-body leading-relaxed">{about.missionBody}</p>
                <p className="mt-4 t-body leading-relaxed">{about.missionBody2}</p>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image src={about.missionImage} alt="Team" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">{about.statsEyebrow}</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">{about.statsTitle}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center p-6 t-bg-surface rounded-2xl border t-border">
                  <div className="text-3xl font-bold text-[var(--primary)]">{s.value}</div>
                  <div className="mt-2 text-sm t-body">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">{about.valuesEyebrow}</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">{about.valuesTitle}</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="p-8 rounded-2xl border t-border hover:shadow-lg transition-all text-center">
                  <h3 className="text-xl font-bold t-heading">{v.title}</h3>
                  <p className="mt-4 t-body leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
