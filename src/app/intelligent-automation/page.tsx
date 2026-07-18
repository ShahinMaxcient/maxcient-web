import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Smart Automation Adoption", description: "We help you adopt intelligent automation, identifying processes ripe for automation and designing optimal strategies." },
  { title: "Custom Automation Solutions", description: "Designing automation solutions tailored for optimal efficiency across your unique operational requirements." },
  { title: "Process Harmonization", description: "Harmonizing your business processes for peak automation performance with seamless integration." },
  { title: "Production Automation", description: "Production cycle automation, quality assurance, and supply chain management with predictive maintenance." },
  { title: "Real-time Monitoring", description: "Advanced real-time monitoring and workforce optimization with intelligent alerts and dashboards." },
  { title: "Workflow Automation", description: "Automated document processing, approval workflows, and task management reducing manual intervention." },
  { title: "AI-Powered Bots", description: "Intelligent chatbots and virtual assistants for customer support, vendor coordination, and internal operations." },
  { title: "Compliance Tracking", description: "Automated compliance monitoring and regulatory management ensuring adherence to industry standards." },
];

const faqs = [
  { question: "What is intelligent automation?", answer: "Intelligent automation combines AI, machine learning, and robotic process automation to automate complex business processes, reducing errors and increasing efficiency beyond what traditional automation achieves." },
  { question: "How does it differ from traditional automation?", answer: "Traditional automation follows predefined rules, while intelligent automation uses AI to make decisions, learn from patterns, and adapt to changing conditions, handling unstructured data and complex workflows." },
  { question: "What are the business benefits?", answer: "Benefits include reduced operational costs, improved accuracy, faster processing times, enhanced employee productivity, better customer experience, and the ability to scale operations efficiently." },
  { question: "Which industries benefit most?", answer: "All industries benefit, but manufacturing, retail, distribution, real estate, and professional services see particularly strong ROI from intelligent automation solutions." },
  { question: "How does it impact employment?", answer: "Intelligent automation augments human capabilities rather than replacing them. It handles repetitive tasks, freeing employees to focus on strategic, creative, and relationship-building activities." },
];

export default function IntelligentAutomation() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="intelligent-automation"
          title="Intelligent Automation"
          subtitle="Revolutionizing Business with Smart Automation. Enhance efficiency with intelligent automation, reducing errors and increasing productivity across your operations."
          image="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&q=80"
        />
        <FeatureGrid title="Automation Capabilities" subtitle="Comprehensive intelligent automation solutions designed for optimal efficiency." features={features} />
        <CTASection title="Accelerate Your Digital Journey" subtitle="Talk to us about how Maxcient can help transform your operations with intelligent automation." />
        <PageFAQ slug="intelligent-automation" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
