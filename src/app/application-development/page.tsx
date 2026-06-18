import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Robust Applications", description: "We help organizations determine appropriate development strategies and tools for building enterprise-grade applications." },
  { title: "Custom Solutions", description: "Building custom applications for unique needs — generic designs might not address the specialized requirements of every business." },
  { title: "Quality Testing", description: "Thorough testing and refinement processes to ensure features function correctly and products perform competitively." },
  { title: "Modular Development", description: "Modular application development with Microsoft Dynamics 365 — CRM and ERP modules that grow with your business." },
  { title: "AI-Driven Analytics", description: "AI-driven analytics integration for informed decisions with comprehensive data models and role-based security." },
  { title: "Third-Party Integration", description: "Extensive customization and third-party integrations with rapid, user-friendly application deployment." },
  { title: "Cloud & Mobile", description: "Cloud-based and mobile application development with Dynamics 365 Service and native mobile apps." },
  { title: "Ongoing Support", description: "Continuous monitoring, regular updates, and immediate troubleshooting with dedicated post-deployment support." },
];

const faqs = [
  { question: "How long does application development typically take?", answer: "Average medium-sized applications take approximately 3-4 months from conception to deployment, depending on complexity and requirements." },
  { question: "Do you provide post-deployment support?", answer: "Yes, we provide ongoing support and maintenance services, with continuous monitoring, regular updates, and immediate troubleshooting." },
  { question: "What technologies do you use?", answer: "Our proficiency includes Microsoft Dynamics 365, Power Platform, Settlemint Blockchain, OpenAI, and IoT solutions, among other modern technologies." },
  { question: "How do you ensure application security?", answer: "We implement multiple layers of security, including data encryption, secure coding practices, and regular security audits throughout the development lifecycle." },
  { question: "Can clients be involved in the development process?", answer: "Absolutely! We believe in a collaborative approach and ensure our clients are involved at every stage of the development process." },
];

export default function ApplicationDevelopment() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero slug="application-development"
          title="Application Development"
          subtitle="Bespoke application solutions tailored to your unique business needs. Custom application development to meet unique business needs with cutting-edge technology."
          image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1920&q=80"
        />
        <FeatureGrid title="Development Capabilities" subtitle="End-to-end application development powered by Microsoft Dynamics 365." features={features} />
        <CTASection title="Let's Build Something Great" subtitle="Connect with our development team to discuss your custom application needs." />
        <PageFAQ slug="application-development" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
