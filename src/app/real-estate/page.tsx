import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Proptech Solutions", description: "Property technology streamlining buying and selling through blockchain-powered platforms and efficient processes." },
  { title: "Market Analytics", description: "Big data enables trend prediction, investment opportunity identification, and competitive benchmarking." },
  { title: "Remote Transactions", description: "Virtual closings and digital paperwork accommodating digital-first clients and remote stakeholders." },
  { title: "Property Management", description: "Comprehensive portfolio management, lease tracking, facility scheduling, and tenant relationship tools." },
  { title: "Virtual Tours", description: "Immersive AR/VR property viewing experiences for buyers and investors anywhere in the world." },
  { title: "Investment Analytics", description: "Data-driven property valuation, risk assessment, and investment performance tracking with AI insights." },
  { title: "CRM for Real Estate", description: "Tailored client relationship management with automated follow-ups, lead scoring, and pipeline tracking." },
  { title: "Financial Reporting", description: "Automated financial reports, revenue forecasting, and compliance documentation for property operations." },
];

const faqs = [
  { question: "How does smart home technology benefit real estate?", answer: "Smart home features increase property value, attract tech-savvy buyers, reduce energy costs, and provide enhanced security — making properties more competitive in the market." },
  { question: "What are the advantages of sustainable construction?", answer: "Sustainable buildings reduce operational costs, attract environmentally conscious tenants, comply with green regulations, and maintain higher property values over time." },
  { question: "How do virtual property tours work?", answer: "We create immersive 3D tours using AR/VR technology, allowing potential buyers and tenants to explore properties remotely with realistic walkthroughs and interactive features." },
  { question: "Can custom analytics help with investments?", answer: "Yes, our analytics platforms provide property valuation models, market trend predictions, risk assessments, and ROI calculations to support data-driven investment decisions." },
  { question: "How does Maxcient enhance real estate operations?", answer: "We provide end-to-end digital solutions including ERP systems, CRM platforms, automation tools, and custom applications specifically designed for real estate workflows." },
];

export default function RealEstate() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="real-estate"
          title="Real Estate"
          subtitle="Emerging Trends in Real Estate. The real estate sector undergoes transformation through societal shifts, technological innovations, and evolving buyer preferences."
          image="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80"
        />
        <FeatureGrid title="Real Estate Solutions" subtitle="Digital transformation solutions for modern real estate operations." features={features} />
        <CTASection title="Upgrade Your Real Estate Operations" subtitle="Partner with us to implement cutting-edge property technology solutions." />
        <PageFAQ slug="real-estate" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
