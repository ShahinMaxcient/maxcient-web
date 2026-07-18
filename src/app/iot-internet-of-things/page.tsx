import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "IoT Consultation", description: "Expert assessment and tailored recommendations for strategic IoT implementation in your business." },
  { title: "Device Integration", description: "Seamless infrastructure integration with comprehensive device management and monitoring." },
  { title: "Data Analytics", description: "Transforms raw IoT sensor data into actionable business intelligence and real-time insights." },
  { title: "Sensor Networks", description: "Real-time parameter monitoring with connected sensor networks across your operations." },
  { title: "Industrial IoT", description: "Connected manufacturing monitoring for production optimization and predictive maintenance." },
  { title: "Fleet Tracking", description: "Real-time fleet tracking and management for logistics and distribution operations." },
  { title: "Smart Automation", description: "Intelligent automation systems triggered by IoT data for responsive, adaptive operations." },
  { title: "Retail IoT", description: "Customer personalization and inventory management powered by IoT data and analytics." },
];

const faqs = [
  { question: "What are the main benefits of IoT?", answer: "IoT enhances efficiency through automation, provides real-time data access for timely decisions, reduces costs, and opens innovative business opportunities and competitive advantages." },
  { question: "How is IoT security handled?", answer: "We implement multiple security layers including device authentication, data encryption, network segmentation, regular firmware updates, and continuous monitoring for threats." },
  { question: "Which industries benefit most from IoT?", answer: "Manufacturing, real estate, retail, distribution, and professional services all benefit significantly from IoT solutions tailored to their specific operational needs." },
  { question: "How does IoT impact customer experience?", answer: "IoT enables personalized services, real-time responsiveness, predictive maintenance, and proactive customer support — all contributing to enhanced satisfaction and loyalty." },
  { question: "What about implementation costs?", answer: "While initial investment varies by scope, IoT solutions deliver strong long-term ROI through operational savings, efficiency gains, and new revenue opportunities." },
];

export default function IoT() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="iot-internet-of-things" title="IoT (Internet of Things)" subtitle="Connecting Devices, Transforming Lives. Transform your operations with IoT solutions — gain real-time insights and control from the edge to the cloud." image="https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&q=80" />
        <FeatureGrid title="IoT Solutions" subtitle="End-to-end IoT services from consultation to deployment and analytics." features={features} />
        <CTASection title="Connect Your Business" subtitle="Explore how IoT can transform your operations with real-time intelligence." />
        <PageFAQ slug="iot-internet-of-things" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
