import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const products = [
  { name: "Power Apps", desc: "Low-code application development platform for building custom business apps rapidly.", color: "from-purple-500 to-purple-700" },
  { name: "Power Automate", desc: "Workflow automation across applications and services, reducing manual tasks.", color: "from-blue-500 to-blue-700" },
  { name: "Power BI", desc: "Data visualization and business analytics with interactive dashboards and reports.", color: "from-yellow-500 to-amber-600" },
  { name: "Power Virtual Agents", desc: "AI-powered chatbot creation without coding for customer and employee support.", color: "from-green-500 to-green-700" },
  { name: "Power Pages", desc: "Website creation platform for external users to interact with business data.", color: "from-pink-500 to-pink-700" },
  { name: "AI Builder", desc: "Add AI capabilities to your apps and workflows with minimal technical expertise.", color: "from-indigo-500 to-indigo-700" },
  { name: "Dataverse", desc: "Cloud-based secure data storage and management for your business data.", color: "from-teal-500 to-teal-700" },
  { name: "Connectors", desc: "Integration with hundreds of external services and platforms for seamless data flow.", color: "from-orange-500 to-orange-700" },
];

const faqs = [
  { question: "What is Microsoft Power Platform?", answer: "It's a comprehensive suite of business application tools empowering organizations with customized app development, data analytics, and process automation through low-code solutions." },
  { question: "How does Power BI differ from competitors?", answer: "Power BI offers seamless Microsoft ecosystem integration, AI-driven insights, real-time collaboration, and enterprise-grade security at a competitive price point." },
  { question: "Can it integrate with existing systems?", answer: "Yes, Power Platform offers hundreds of connectors to integrate with existing business systems, third-party services, and custom APIs for seamless data flow." },
  { question: "What are the business process automation benefits?", answer: "Power Automate reduces manual tasks, eliminates errors, speeds up processes, ensures consistency, and frees employees to focus on higher-value strategic work." },
  { question: "What can Power Virtual Agents do?", answer: "It enables creation of intelligent chatbots without coding, handling customer inquiries, employee support, and automated workflows through conversational AI." },
];

export default function MicrosoftPowerPlatform() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="microsoft-power-platform" title="Microsoft Power Platform" subtitle="Empowering Businesses Through Agile Solutions. Connect data, build apps, automate workflows, and create chatbots — all with low-code tools." image="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1920&q=80" />

        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Products</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">Platform Products</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((p) => (
                <div key={p.name} className="p-6 rounded-2xl border t-border hover:shadow-lg transition-all group">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white font-bold text-sm`}>
                    {p.name.split(" ").pop()?.slice(0, 2).toUpperCase()}
                  </div>
                  <h3 className="mt-4 font-semibold t-heading">{p.name}</h3>
                  <p className="mt-2 text-sm t-body">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection title="Empower Your Team with Power Platform" subtitle="Let us help you build custom solutions that drive innovation across your organization." />
        <PageFAQ slug="microsoft-power-platform" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
