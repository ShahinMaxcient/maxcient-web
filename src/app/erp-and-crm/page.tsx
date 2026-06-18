import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import Image from "next/image";

const industries = [
  {
    name: "Manufacturing",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80",
    features: ["Warehouse management", "Order processing", "Inventory tracking", "Vendor management", "Logistics planning", "Returns management", "Pricing strategies", "Customer support"],
  },
  {
    name: "Real Estate",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80",
    features: ["Property portfolio management", "Lease management", "Facility scheduling", "Tenant relations", "Investment analytics", "Document management", "Listing management", "Financial reporting"],
  },
  {
    name: "Retail",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80",
    features: ["Inventory management", "POS integration", "CRM", "E-commerce optimization", "Sales analytics", "Promotions management", "Digital marketing", "Sales reporting"],
  },
  {
    name: "Distribution",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
    features: ["Warehouse management", "Order processing", "Inventory forecasting", "Vendor management", "Transportation planning", "Returns management", "Pricing management", "Customer support"],
  },
  {
    name: "Professional Services",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&q=80",
    features: ["Client relationship management", "Project tracking", "Resource allocation", "Billing management", "Performance analytics", "Collaboration tools", "Contract management", "Feedback tools"],
  },
];

const faqs = [
  { question: "What is the main advantage of integrating ERP & CRM systems?", answer: "Integration offers a unified platform that consolidates departmental data, enabling informed decision-making, streamlined operations, and enhanced customer relationships by removing data silos." },
  { question: "How does Microsoft Dynamics 365 differ from other ERP & CRM solutions?", answer: "Microsoft Dynamics 365 stands out due to its seamless combination of both ERP and CRM functionalities within a single platform, with flexibility to choose specific modules, Microsoft product integration, and AI-driven insights." },
  { question: "Is the transition to Microsoft Dynamics 365 disruptive to current operations?", answer: "The transition is designed for minimal operational disruption, with dedicated team support, migration assistance, training sessions, and ongoing support to address challenges." },
  { question: "How does integrating ERP & CRM systems impact customer experience?", answer: "Integration provides a 360-degree customer view, enabling personalized services, prompt inquiry response, and future need prediction — resulting in smoother customer journeys." },
  { question: "What kind of businesses benefit the most from ERP & CRM integration?", answer: "Businesses of all sizes and across various industries benefit, from startups streamlining operations to large corporations pursuing excellence across manufacturing, retail, healthcare, and finance." },
];

export default function ERPAndCRM() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero slug="erp-and-crm"
          title="ERP and CRM"
          subtitle="Setting the stage for your exponential growth. Navigating the ERP & CRM landscape can be daunting. With our expertise, we guide businesses through the selection and implementation process."
          image="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80"
        />

        <section className="py-14 lg:py-16 t-bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {[
                { title: "We Guide You In Evaluating ERP & CRM", desc: "Navigating the ERP & CRM landscape can be daunting. A wrong ERP choice can derail your entire operation and cost you precious time and money. We guide businesses through the selection process." },
                { title: "We Develop ERP & CRM For Your Unique Needs", desc: "In a world where every business is unique, a one-size-fits-all solution doesn't cut it. We develop custom ERP and CRM systems tailored for your specific operational requirements." },
                { title: "We Ensure Smooth & On-Time Implementation", desc: "Transitioning to a new ERP or CRM system is a monumental task. Our proven methodology ensures smooth implementation with minimal disruption to your operations." },
              ].map((item) => (
                <div key={item.title} className="p-8 rounded-2xl border t-border hover:shadow-lg transition-all">
                  <h3 className="text-xl font-bold t-heading">{item.title}</h3>
                  <p className="mt-4 t-body leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-16 t-bg-alt">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-sm font-semibold uppercase tracking-widest text-[var(--accent)]">Industries</span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-bold t-heading">Industry Solutions</h2>
            </div>
            <div className="space-y-16">
              {industries.map((ind, i) => (
                <div key={ind.name} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? "" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <h3 className="text-2xl font-bold t-heading">{ind.name}</h3>
                    <ul className="mt-6 grid grid-cols-2 gap-3">
                      {ind.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm t-label">
                          <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={`relative rounded-2xl overflow-hidden aspect-[4/3] ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <Image src={ind.image} alt={ind.name} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <CTASection title="Start Your Digital Transformation Journey" subtitle="Reach our transformation experts today for a comprehensive ERP & CRM evaluation." />
        <PageFAQ slug="erp-and-crm" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
