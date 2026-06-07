import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Virtual Collaboration", description: "Remote consultation tools enabling seamless collaboration across geographical boundaries." },
  { title: "Data-Driven Decisions", description: "Leveraging analytics for informed strategies with client engagement metrics and performance measurement." },
  { title: "Process Optimization", description: "Automation and process optimization for efficiency, timely delivery, and service excellence." },
  { title: "Client Management", description: "Advanced CRM platforms with client relationship tracking, engagement analytics, and pipeline management." },
  { title: "Project Tracking", description: "Comprehensive project lifecycle tracking with resource allocation, milestone management, and reporting." },
  { title: "Financial Forecasting", description: "Automated invoicing, billing management, and financial performance analytics with budgeting tools." },
  { title: "Resource Optimization", description: "Intelligent resource allocation and scheduling with utilization analytics and capacity planning." },
  { title: "Compliance Checks", description: "Automated compliance monitoring, contract management, and regulatory adherence tools." },
];

const faqs = [
  { question: "What are the primary challenges facing professional services?", answer: "Key challenges include talent retention, client relationship management, project delivery efficiency, data security, regulatory compliance, and adapting to remote work models." },
  { question: "How does technology revolutionize professional services?", answer: "Technology enables virtual collaboration, data-driven insights, automated workflows, better resource management, and enhanced client experiences across all service delivery touchpoints." },
  { question: "Why is client relationship management important?", answer: "Strong CRM drives client retention, enables personalized service delivery, provides insights for upselling, and builds long-term partnerships that fuel sustainable growth." },
  { question: "How do you ensure consistent service quality?", answer: "Through standardized processes, performance analytics, continuous feedback loops, quality assurance frameworks, and ongoing team training and development programs." },
  { question: "Why are agile methodologies gaining adoption?", answer: "Agile enables faster delivery, better adaptability to changing requirements, improved collaboration, continuous improvement, and greater client satisfaction through iterative development." },
];

export default function ProfessionalServices() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Professional Services" subtitle="Emerging Trends In Professional Services. The sector is undergoing a paradigm shift driven by digital transformation and evolving client expectations." image="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&q=80" />
        <FeatureGrid title="Professional Services Solutions" subtitle="Technology solutions designed for dynamic service environments." features={features} />
        <CTASection title="Reimagine Service Excellence" subtitle="Partner with us to transform your professional services operations." />
        <PageFAQ faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
