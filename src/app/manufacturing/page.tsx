import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Digital Twin Technology", description: "Virtual replicas of physical assets enabling real-time monitoring, simulation, and optimization of manufacturing processes." },
  { title: "Smart Manufacturing & IoT", description: "Connected factory solutions with IoT sensors for real-time equipment monitoring and predictive maintenance." },
  { title: "Production Planning", description: "Advanced production cycle management, scheduling, and inventory control systems for streamlined operations." },
  { title: "Quality Management", description: "Comprehensive quality assurance, compliance management, and defect detection platforms." },
  { title: "Supply Chain Optimization", description: "End-to-end supply chain visibility with predictive analytics for demand forecasting and inventory optimization." },
  { title: "Workforce Optimization", description: "Task optimization platforms for workforce management, scheduling, and productivity enhancement." },
  { title: "Predictive Maintenance", description: "AI-driven predictive maintenance reducing downtime and extending equipment lifecycle." },
  { title: "Waste Reduction", description: "Advanced analytics for identifying inefficiencies, reducing waste, and optimizing resource utilization." },
];

const faqs = [
  { question: "How can Digital Twin technology benefit manufacturing?", answer: "Digital Twins create virtual replicas of physical assets, enabling manufacturers to simulate processes, predict failures, and optimize operations without risking actual production." },
  { question: "How does Maxcient support Smart Manufacturing & IoT?", answer: "We implement connected factory solutions with IoT sensors, real-time dashboards, and AI-powered analytics for equipment monitoring, predictive maintenance, and process optimization." },
  { question: "What advantages do custom data analytics bring?", answer: "Custom analytics provide industry-specific insights including production cycle optimization, inventory forecasting, quality trends, and supply chain visibility tailored to your operations." },
  { question: "How can automation streamline operations?", answer: "Intelligent automation handles repetitive tasks like quality checks, inventory tracking, and logistics coordination, freeing your workforce for strategic activities while reducing errors." },
  { question: "What about customization and personalization trends?", answer: "We help manufacturers implement flexible production systems that support mass customization, enabling personalized products without sacrificing efficiency or scale." },
];

export default function Manufacturing() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title="Manufacturing"
          subtitle="Emerging Trends In Manufacturing. Enhance productivity through intelligent manufacturing solutions powered by IoT, AI, and Microsoft Dynamics 365."
          image="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80"
        />
        <FeatureGrid title="Manufacturing Solutions" subtitle="Smart factory solutions driving the next generation of manufacturing excellence." features={features} />
        <CTASection title="Transform Your Manufacturing" subtitle="Connect with our manufacturing technology experts to explore intelligent solutions." />
        <PageFAQ faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
