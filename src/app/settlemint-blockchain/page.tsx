import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Blockchain Consultation", description: "Expert guidance on integration and identifying optimal blockchain solutions for your specific business challenges." },
  { title: "Custom Development", description: "Tailored blockchain solutions ensuring seamless integration within your existing business frameworks." },
  { title: "Maintenance & Support", description: "Continuous technical assistance and updates for optimal operation of your blockchain infrastructure." },
  { title: "IoT Data Marketplace", description: "Decentralized IoT sensor data marketplace for secure, transparent data exchange." },
  { title: "Token Management", description: "Token creation, management, and distribution platform for digital asset operations." },
  { title: "Smart Contracts", description: "Automated, secure smart contracts for supply chain, transactions, and business agreements." },
  { title: "Easy Integration", description: "Smooth blockchain incorporation into existing systems without extensive modifications." },
  { title: "Enhanced Security", description: "Blockchain's inherent encryption and immutability providing fortified data protection." },
];

const faqs = [
  { question: "What makes SettleMint unique?", answer: "SettleMint simplifies decentralized application development with comprehensive tools that reduce time-to-market and enable businesses to leverage blockchain without deep technical expertise." },
  { question: "How does it ensure security?", answer: "It uses blockchain's inherent encryption and immutability for unmatched security, combined with additional enterprise-grade security layers and compliance measures." },
  { question: "Can it integrate with existing systems?", answer: "Yes, SettleMint's platform-agnostic design enables seamless integration with your existing business systems and workflows." },
  { question: "How does it reduce time-to-market?", answer: "Comprehensive pre-built tools, templates, and middleware reduce development complexity, enabling faster deployment of blockchain solutions." },
  { question: "Are solutions customizable by industry?", answer: "Absolutely. SettleMint offers industry-specific customizable solutions for manufacturing, real estate, retail, distribution, and professional services." },
];

export default function SettlemintBlockchain() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="SettleMint (Blockchain)" subtitle="Unifying Business Processes for Excellence. Fast, scalable, and easy-to-integrate blockchain solutions for enterprises." image="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1920&q=80" />
        <FeatureGrid title="Blockchain Solutions" subtitle="Comprehensive blockchain services from consultation to deployment and support." features={features} />
        <CTASection title="Explore Blockchain for Your Business" subtitle="Discover how blockchain can transform your operations with security and transparency." />
        <PageFAQ faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
