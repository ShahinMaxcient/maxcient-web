import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import TrustedBy from "@/components/TrustedBy";
import Image from "next/image";
import { getAboutSettings } from "@/lib/settings";
import { getCollectionItems } from "@/lib/content";


import { pageMetadata } from "@/lib/seo";

// Unique title/description per page; Admin → Pages can override both.
export const generateMetadata = () =>
  pageMetadata({
    slug: "about-us",
    title: "About Maxcient",
    description:
      "A digital enabler for the UAE and GCC since 2014. Microsoft Solutions Partner delivering Dynamics 365, Power Platform and Azure from Dubai.",
  });

// Content mirrors www.maxcient.com/about-us.
const values = [
  { title: "Integrity", description: "Upholding the highest standards in all our actions and decisions." },
  { title: "Innovation", description: "Pioneering solutions for tomorrow's challenges today." },
  { title: "Collaboration", description: "Working together to achieve greater results." },
];

const globalReach = [
  { stat: "Since 2014", body: "Serving businesses from startups to enterprises across various verticals." },
  { stat: "Trusted Partner", body: "Businesses across 3 countries rely on our specialized expertise." },
  { stat: "Celebrating Diversity", body: "Celebrating a multitude of perspectives for richer solutions." },
];

const teamStrength = [
  { metric: "100%", body: "of our team boasts bachelor's and master's degrees." },
  { metric: "70%", body: "have been loyal Maxcient members for 2+ years." },
  { metric: "86%", body: "are senior and mid-level specialists leading the tech frontier." },
];

export default async function AboutUs() {
  const [about, clients, offices] = await Promise.all([
    getAboutSettings(),
    getCollectionItems<{ name: string; logo: string }>("clients"),
    getCollectionItems<{ region: string; city: string; address: string }>("offices"),
  ]);

  return (
    <>
      <main>
        <PageHero
          slug="about-us"
          title="Technology is not an option — it's an accelerator."
          subtitle="At Maxcient, we're rooted in the possibilities of the digital era. We champion technology as a key enabler, propelling businesses forward."
          image={about.heroImage}
        />

        {/* Embrace the digital future */}
        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">About Maxcient</span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">Embrace the Digital Future with Maxcient.</h2>
                <p className="mt-6 t-body leading-relaxed">In a world where technology isn't just an option but a catalyst, Maxcient ensures you're always steps ahead. Our expertise roots you in the possibilities of the digital age, empowering your decisions with clarity and confidence. With Maxcient, you don't just adapt to the future; you shape it. Dive into the innovative journey with us.</p>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image src={about.missionImage} alt="Maxcient team" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Our values</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">Values that guide every action, decision, and solution we make.</h2>
              <p className="mt-4 t-body leading-relaxed">With Maxcient, you're partnering with a team whose foundations are built on integrity, innovation, and a relentless pursuit of excellence. Join us in carving a future anchored by purpose and vision.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="p-8 rounded-2xl border t-border t-bg-surface hover:shadow-lg transition-all text-center">
                  <h3 className="text-xl font-bold t-heading">{v.title}</h3>
                  <p className="mt-4 t-body leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust / social proof */}
        <section className="pt-14 lg:pt-16 t-bg-surface">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold t-heading">Trusted by industry leaders and rising stars</h2>
            <p className="mt-4 t-body leading-relaxed">Their trust in us is our most valued endorsement, motivating us to continually set higher benchmarks. Join the ranks of esteemed organizations that have chosen to embark on a transformative journey with us.</p>
          </div>
        </section>
        <TrustedBy clients={clients} header={{ title: "Trusted by industry leaders and rising stars" }} />

        {/* Global reach */}
        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Our Global Reach</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">A global impact, from day one.</h2>
              <p className="mt-4 t-body leading-relaxed">From our inception, we've made a global impact, creating tech solutions across borders and industries, making Maxcient a name synonymous with trust.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {globalReach.map((g) => (
                <div key={g.stat} className="p-7 rounded-2xl border t-border t-bg-surface">
                  <div className="text-xl font-bold text-[var(--primary)]">{g.stat}</div>
                  <p className="mt-3 text-sm t-body leading-relaxed">{g.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team strength */}
        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Our people</span>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">Our strength lies in our people</h2>
              <p className="mt-4 t-body leading-relaxed">A diverse group of highly educated and experienced professionals dedicated to delivering excellence.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {teamStrength.map((t) => (
                <div key={t.metric} className="text-center p-8 rounded-2xl border t-border t-bg-alt">
                  <div className="text-4xl font-bold text-[var(--primary)]">{t.metric}</div>
                  <p className="mt-3 text-sm t-body leading-relaxed">{t.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dev centers + partnerships */}
        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-2xl border t-border t-bg-surface">
              <h3 className="text-xl font-bold t-heading">Dedicated Development Centers</h3>
              <p className="mt-4 t-body leading-relaxed">Elevate your business with our tailored tech hubs, designed to power your vision. Our development centers are more than just workspaces; they're innovation hubs where ideas are transformed into game-changing solutions.</p>
            </div>
            <div className="p-8 rounded-2xl border t-border t-bg-surface">
              <h3 className="text-xl font-bold t-heading">Aligned with industry leaders. Driving transformative change.</h3>
              <p className="mt-4 t-body leading-relaxed">Collaborating with tech giants and innovators, we ensure our clients receive cutting-edge solutions, keeping them ahead of the curve.</p>
            </div>
          </div>
        </section>

        {/* Offices */}
        {offices.length > 0 && (
          <section className="py-14 lg:py-16 t-bg-surface">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-10">
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Our offices</span>
                <h2 className="mt-3 text-3xl sm:text-4xl font-bold t-heading">Where to find us</h2>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {offices.map((o) => (
                  <div key={o.city} className="p-6 rounded-2xl border t-border t-bg-alt">
                    <div className="text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">{o.region}</div>
                    <h3 className="mt-1 text-lg font-bold t-heading">{o.city}</h3>
                    <p className="mt-2 text-sm t-body leading-relaxed">{o.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection
          title="Let's build your digital future"
          subtitle="Talk to our transformation experts about how Maxcient can help you realize business value faster with end-to-end solutions and cloud services."
        />
      </main>
    </>
  );
}
