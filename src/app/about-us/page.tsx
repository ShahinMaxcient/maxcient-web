import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import Footer from "@/components/Footer";
import Image from "next/image";

const values = [
  { title: "Integrity", desc: "Maintaining highest standards in actions and decisions, building trust through transparency and accountability." },
  { title: "Innovation", desc: "Creating forward-thinking solutions for emerging challenges, staying ahead of the technology curve." },
  { title: "Collaboration", desc: "Leveraging teamwork for enhanced outcomes, partnering closely with clients to achieve shared goals." },
];

const stats = [
  { label: "Founded", value: "2017" },
  { label: "Countries", value: "3" },
  { label: "Degree Holders", value: "100%" },
  { label: "2+ Year Tenure", value: "70%" },
  { label: "Senior Specialists", value: "86%" },
  { label: "Client Rating", value: "5/5" },
];

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero slug="about-us" title="About Maxcient" subtitle="Technology is not an option — it's an accelerator. We are a digital enabler helping businesses adapt to and shape the future through technological innovation." image="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&q=80" />

        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Our Mission</span>
                <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">Empowering Digital Transformation</h2>
                <p className="mt-6 text-lg t-body leading-relaxed">
                  Maxcient is a digital enabler that helps businesses adapt to and shape the future through technological innovation. We leverage cutting-edge platforms including Microsoft Dynamics 365, Power Platform, Azure, Blockchain, AI, and IoT to deliver enterprise-grade solutions.
                </p>
                <p className="mt-4 t-body leading-relaxed">
                  Serving industries from manufacturing and real estate to retail and professional services, we bring deep domain expertise and a commitment to delivering measurable business value.
                </p>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-2xl">
                <Image src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80" alt="Team" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Numbers</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">Maxcient at a Glance</h2>
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
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Values</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">What We Stand For</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {values.map((v) => (
                <div key={v.title} className="p-8 rounded-2xl border t-border hover:shadow-lg transition-all text-center">
                  <h3 className="text-xl font-bold t-heading">{v.title}</h3>
                  <p className="mt-4 t-body leading-relaxed">{v.desc}</p>
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
