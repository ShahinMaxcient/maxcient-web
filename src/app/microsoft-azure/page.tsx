import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Cloud Migration", description: "Seamless transition to Azure with minimal disruption, enhanced scalability, and cost-efficiency." },
  { title: "DevOps Implementation", description: "Improved team collaboration and agility with faster releases and higher code quality." },
  { title: "Security & Compliance", description: "Expert-led security assessments and adherence to industry standards and regulations." },
  { title: "Virtual Machines", description: "Scalable compute resources on-demand for development, testing, and production workloads." },
  { title: "Kubernetes Service", description: "Managed container orchestration for deploying and managing containerized applications." },
  { title: "Cosmos DB", description: "Globally distributed, multi-model database service for mission-critical applications." },
  { title: "Azure Functions", description: "Serverless compute service for running event-driven code without managing infrastructure." },
  { title: "Azure Active Directory", description: "Identity and access management for secure authentication and authorization." },
];

const faqs = [
  { question: "What are the primary advantages of Azure?", answer: "Azure offers unparalleled scalability, enterprise-grade security, global infrastructure, seamless Microsoft integration, and a comprehensive set of cloud services for any workload." },
  { question: "How is data security handled?", answer: "Azure provides multi-layered security including encryption at rest and in transit, advanced threat protection, compliance certifications, and comprehensive identity management." },
  { question: "Can you help with cloud migration?", answer: "Yes, we specialize in facilitating smooth transitions to Azure with meticulous planning, phased rollouts, data migration, and comprehensive post-migration support." },
  { question: "What is the pricing model?", answer: "Azure uses a pay-as-you-go model, meaning you only pay for what you use. This eliminates large upfront investments and allows costs to scale with your business needs." },
  { question: "Does Azure support open-source technologies?", answer: "Yes, Azure supports a wide range of open-source technologies including Linux, Docker, Kubernetes, PostgreSQL, and many popular frameworks and tools." },
];

export default function MicrosoftAzure() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Microsoft Azure" subtitle="Cloud Computing Redefined. A comprehensive cloud computing platform offering IaaS, PaaS, and SaaS solutions with global infrastructure." image="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80" />
        <FeatureGrid title="Azure Services & Products" subtitle="Comprehensive cloud solutions for every business need." features={features} />
        <CTASection title="Scale with Azure" subtitle="Let our Azure experts help you leverage the full power of cloud computing." />
        <PageFAQ faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
