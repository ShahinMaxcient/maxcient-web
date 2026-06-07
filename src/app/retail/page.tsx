import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Omnichannel Shopping", description: "Seamless integration of physical stores with digital platforms for unified customer experiences." },
  { title: "Augmented Reality", description: "Virtual try-ons and immersive product experiences driving customer engagement and reducing returns." },
  { title: "Personalized Shopping", description: "Data analytics tailoring experiences to individual preferences with AI-driven recommendations." },
  { title: "Inventory Management", description: "Real-time stock management, forecasting, and automated replenishment systems." },
  { title: "POS Integration", description: "Modern point-of-sale systems integrated with CRM, inventory, and e-commerce platforms." },
  { title: "Customer Analytics", description: "Purchase pattern analysis, loyalty insights, and customer behavior tracking for strategic decisions." },
  { title: "E-commerce Optimization", description: "Digital storefront optimization with conversion tracking, A/B testing, and performance analytics." },
  { title: "Supply Chain Analytics", description: "End-to-end supply chain visibility with demand forecasting and vendor performance tracking." },
];

const faqs = [
  { question: "What are the key retail industry challenges?", answer: "Challenges include omnichannel integration, inventory optimization, customer retention, supply chain disruptions, and adapting to rapidly changing consumer behaviors." },
  { question: "How can technology transform retail?", answer: "Technology enables personalized experiences, automated operations, real-time insights, seamless omnichannel integration, and data-driven decision making across all retail functions." },
  { question: "Why is omnichannel retailing important?", answer: "Customers expect seamless experiences across all touchpoints. Omnichannel integration increases customer satisfaction, loyalty, and lifetime value while reducing operational friction." },
  { question: "How can retailers build customer loyalty?", answer: "Through personalized experiences, loyalty programs, excellent customer service, data-driven engagement, and consistent brand experiences across all channels." },
  { question: "What is the impact of e-commerce on physical stores?", answer: "Physical stores are evolving into experience centers. The key is integrating online and offline channels to provide unified shopping experiences that leverage the strengths of both." },
];

export default function Retail() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="Retail" subtitle="Emerging Trends In Retail. The retail sector undergoes significant transformation through evolving technology and changing consumer behaviors." image="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80" />
        <FeatureGrid title="Retail Solutions" subtitle="Innovative technology solutions for modern retail operations." features={features} />
        <CTASection title="Elevate Your Retail Experience" subtitle="Partner with us to implement next-generation retail technology solutions." />
        <PageFAQ faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
