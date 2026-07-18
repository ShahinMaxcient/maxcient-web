import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const modules = [
  { name: "Marketing", desc: "Campaign management, lead generation, and customer journey orchestration." },
  { name: "Sales", desc: "Sales automation, pipeline management, and AI-driven forecasting." },
  { name: "Customer Service", desc: "Omnichannel support, case management, and self-service portals." },
  { name: "Field Service", desc: "Work order management, scheduling, and mobile workforce solutions." },
  { name: "Finance", desc: "Financial management, reporting, and compliance with global standards." },
  { name: "Supply Chain", desc: "End-to-end supply chain visibility, procurement, and warehouse management." },
  { name: "Commerce", desc: "Unified commerce experiences across digital and physical channels." },
  { name: "Human Resources", desc: "Employee management, benefits administration, and workforce analytics." },
  { name: "Project Operations", desc: "Project planning, resource management, and profitability tracking." },
  { name: "Business Central", desc: "All-in-one business management for small and medium businesses." },
  { name: "Customer Insights", desc: "Real-time customer data platform with AI-powered analytics." },
];

const faqs = [
  { question: "How does Dynamics 365 differ from competitors?", answer: "Dynamics 365 uniquely combines CRM and ERP in a single platform with seamless Microsoft ecosystem integration, modular flexibility, and built-in AI capabilities." },
  { question: "Is it scalable for growing businesses?", answer: "Absolutely. The modular architecture allows businesses to start with what they need and add capabilities as they grow, with cloud-based scalability handling any workload." },
  { question: "What about migration challenges?", answer: "We provide comprehensive migration support with dedicated teams, data mapping, testing, training, and phased rollouts designed to minimize disruption to operations." },
  { question: "How is data security handled?", answer: "Dynamics 365 leverages Microsoft's enterprise-grade security including encryption, compliance certifications, role-based access, and advanced threat protection." },
  { question: "Does it integrate with other Microsoft products?", answer: "Yes, it integrates seamlessly with Microsoft 365, Teams, Power Platform, Azure, and other Microsoft services for a unified business ecosystem." },
];

export default function MicrosoftDynamics365() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="microsoft-dynamics-365" title="Microsoft Dynamics 365" subtitle="Unifying Business Processes for Excellence. An integrated business application suite combining CRM and ERP capabilities, enhanced by AI and data analytics." image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80" />

        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Modules</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">Product Modules</h2>
              <p className="mt-4 text-lg t-body">Comprehensive suite of interconnected business applications.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((mod, i) => (
                <div key={mod.name} className="p-6 rounded-2xl border t-border hover:border-[var(--primary)]/20 hover:shadow-lg transition-all group">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs">
                    {mod.name.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="mt-4 font-semibold t-heading">{mod.name}</h3>
                  <p className="mt-2 text-sm t-body">{mod.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold t-heading">Our Services</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Implementation & Customization", desc: "Tailoring Dynamics 365 solutions for optimal fit with your business processes and requirements." },
                { title: "Integration with Legacy Systems", desc: "Ensuring seamless data continuity between Dynamics 365 and your existing systems and workflows." },
                { title: "Training & Support", desc: "Dedicated training sessions and ongoing platform assistance to maximize your team's productivity." },
              ].map((s) => (
                <div key={s.title} className="p-8 t-bg-surface rounded-2xl border t-border hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold t-heading">{s.title}</h3>
                  <p className="mt-4 t-body leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection title="Transform with Dynamics 365" subtitle="Let our certified experts guide your Dynamics 365 implementation journey." />
        <PageFAQ slug="microsoft-dynamics-365" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
