import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Supply Chain Integration", description: "Integrated supply chain management with full transparency and traceability across all operations." },
  { title: "Predictive Inventory", description: "Data analytics-driven inventory management with demand forecasting and automated replenishment." },
  { title: "E-commerce & D2C", description: "Direct-to-consumer models and e-commerce platforms for broader market reach." },
  { title: "Route Optimization", description: "Dynamic route planning and optimization with real-time tracking and fleet management." },
  { title: "Warehouse Automation", description: "Advanced warehouse management systems with automated picking, packing, and inventory tracking." },
  { title: "Demand Forecasting", description: "AI-powered demand forecasting and analytics for optimized procurement and stock levels." },
  { title: "Vendor Collaboration", description: "Integrated vendor and partner collaboration platforms for streamlined procurement processes." },
  { title: "Compliance Management", description: "Automated compliance tracking and regulatory management ensuring industry standard adherence." },
];

const faqs = [
  { question: "What are the main challenges in distribution?", answer: "Key challenges include supply chain disruptions, inventory optimization, last-mile delivery costs, demand volatility, and maintaining visibility across complex distribution networks." },
  { question: "How does technology impact distribution?", answer: "Technology enables real-time tracking, predictive analytics, automated warehousing, route optimization, and seamless vendor collaboration — dramatically improving efficiency and reducing costs." },
  { question: "Why is inventory management important?", answer: "Effective inventory management prevents stockouts and overstock situations, reduces carrying costs, improves cash flow, and ensures customer satisfaction through reliable product availability." },
  { question: "How can the supply chain be optimized?", answer: "Through integrated systems, real-time visibility, predictive analytics, automated processes, strong vendor relationships, and continuous performance monitoring across all touchpoints." },
  { question: "Why is digital transformation necessary?", answer: "Digital transformation is essential for staying competitive, meeting evolving customer expectations, improving operational efficiency, and building resilient, adaptable distribution networks." },
];

export default function Distribution() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Distribution" subtitle="Emerging Trends In Distribution. The wholesale sector is undergoing digital transformation with focus on transparency, predictive analytics, and direct-to-consumer models." image="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80" />
        <FeatureGrid title="Distribution Solutions" subtitle="Intelligent systems for optimizing distribution channels and operations." features={features} />
        <CTASection title="Optimize Your Distribution" subtitle="Connect with our experts to transform your distribution operations." />
        <PageFAQ faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
