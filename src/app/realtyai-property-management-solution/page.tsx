import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Sales Excellence", description: "Lead tracking, residential and commercial sales, inventory management, and VAT integration with multilingual support." },
  { title: "Leasing Efficiency", description: "Lead management, tenant offers, contract management, automated renewal and termination notifications." },
  { title: "Maintenance Mastery", description: "Request system, customer portal, case and work order management, planned maintenance organization." },
  { title: "UAE Compliance", description: "Integrates with RERA documentation, Ejari registration, and DLD compliance for Dubai, Abu Dhabi, and Sharjah." },
  { title: "AI-Powered Intelligence", description: "Microsoft Copilot Studio agents that analyze market trends, predict valuations, and provide actionable insights." },
  { title: "Client Portals", description: "Self-service portals for tenants and buyers with real-time updates, document access, and communication tools." },
  { title: "Payment Management", description: "Flexible payment plan oversight with automated tracking, reminders, and financial reconciliation." },
  { title: "Inventory Tracking", description: "Real-time property inventory tracking with availability management across multiple portfolios." },
];

const faqs = [
  { question: "What makes RealtyAI different from competitors?", answer: "RealtyAI is built on Microsoft Dynamics 365 specifically for the UAE market, with native RERA, Ejari, and DLD compliance, Arabic/English support, and AI-powered market intelligence." },
  { question: "Can it manage multiple properties?", answer: "Yes, RealtyAI is designed for multi-property portfolios, enabling centralized management of residential, commercial, and mixed-use properties across different emirates." },
  { question: "Does it handle both commercial and residential?", answer: "Absolutely. RealtyAI supports sales, leasing, and facility management for both residential and commercial properties with specialized workflows for each." },
  { question: "How does it handle maintenance requests?", answer: "Through an integrated request system with customer portal, automated case creation, work order management, inventory tracking, and planned maintenance scheduling." },
  { question: "How is data security ensured?", answer: "Built on Microsoft Dynamics 365 with enterprise-grade security, UAE data residency, encryption, role-based access controls, and compliance with local regulations." },
];

export default function RealtyAI() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="realtyai-property-management-solution" title="RealtyAI" subtitle="Property Management, Simplified. Comprehensive property management for UAE real estate professionals, built on Microsoft Dynamics 365." image="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=1920&q=80" />
        <FeatureGrid title="Core Capabilities" subtitle="End-to-end property management tailored for the UAE real estate market." features={features} />
        <CTASection title="Simplify Your Property Management" subtitle="See how RealtyAI can streamline your real estate operations." />
        <PageFAQ slug="realtyai-property-management-solution" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
