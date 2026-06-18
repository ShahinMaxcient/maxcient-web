import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Application Optimization", description: "We optimize your application landscape, harnessing modern applications aligned with the Microsoft roadmap for budgetary savings." },
  { title: "Custom AMS Strategies", description: "Bespoke maintenance strategies crafted for your specific application needs and ticketing systems." },
  { title: "Consistent Performance", description: "Cohesive integration within the AMS framework providing consistent updates, reduced downtimes, and regular training." },
  { title: "Proactive Monitoring", description: "Proactive monitoring of CRM modules including Sales, Service, and Marketing with AI-enhanced analytics." },
  { title: "ERP Management", description: "Streamlined ERP management for Finance and Operations with effective Field Service handling." },
  { title: "Security Practices", description: "Advanced data governance and security practices with role-based access controls and regular audits." },
  { title: "Seamless Updates", description: "Seamless updates and deployment handling with customization and integration maintenance." },
  { title: "Unified Data Flow", description: "Unified data model for efficient data flow across integrated solutions spanning key business domains." },
];

const faqs = [
  { question: "What is Application Management?", answer: "Application Management refers to overseeing and optimizing software applications throughout their lifecycle — encompassing deployment, updates, performance monitoring, troubleshooting, and alignment with evolving business needs." },
  { question: "Why is it crucial for businesses?", answer: "It ensures software remains efficient, secure, and aligned with objectives. Regular maintenance minimizes downtime and potential revenue losses while providing scalability and continuity." },
  { question: "How does it differ from Application Development?", answer: "Application Development focuses on designing and creating solutions from scratch; Application Management handles ongoing care, maintenance, and optimization post-deployment." },
  { question: "What kind of applications can be managed?", answer: "Virtually any software application benefits — including ERP systems, CRM tools, e-commerce platforms, and mobile apps — ensuring consistent value delivery and optimal performance." },
  { question: "How often are performance reviews conducted?", answer: "Performance reviews are typically conducted on a regular basis, often monthly or quarterly, depending on application criticality and business requirements." },
  { question: "What measures are taken for application security?", answer: "Security measures include regular audits, patch implementation, vulnerability monitoring, encryption techniques, user access controls, and routine authentication method updates." },
];

export default function ApplicationManagement() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero slug="application-management"
          title="Application Management"
          subtitle="Ensuring Optimal Performance & Continuous Improvement. Reliable application management services ensuring your applications perform at their best."
          image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80"
        />
        <FeatureGrid title="Management Capabilities" subtitle="End-to-end application management powered by Microsoft Dynamics 365." features={features} />
        <CTASection title="Optimize Your Applications" subtitle="Connect with our AMS team for a comprehensive application performance evaluation." />
        <PageFAQ slug="application-management" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
