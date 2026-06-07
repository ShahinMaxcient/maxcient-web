import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Unveil Insights", description: "We employ state-of-the-art tools and techniques to turn raw data into actionable insights that drive business growth." },
  { title: "Bespoke Solutions", description: "We develop custom analytics platforms that cater to your specific needs in today's dynamic business environment." },
  { title: "Data Visualization", description: "Creating intuitive data visualization tools that present complex datasets in a clear, comprehensible manner." },
  { title: "Power BI", description: "Interactive dashboards, real-time analytics, AI-driven insights, and seamless integration with various data sources." },
  { title: "Predictive Analytics", description: "Advanced AI-driven insights for forecasting trends, identifying patterns, and making data-backed predictions." },
  { title: "Data Modeling", description: "Structured data modeling and management ensuring accuracy, consistency, and accessibility across your organization." },
  { title: "Real-time Reporting", description: "Automated machine learning capabilities with collaborative workspaces and embedded analytics for apps and websites." },
  { title: "Custom Dashboards", description: "Tailored dashboards and reports designed for your specific KPIs, goals, and business intelligence needs." },
];

const faqs = [
  { question: "What is data analytics and why is it important for businesses?", answer: "Data analytics involves examining raw data to find trends, answer questions, and draw conclusions. It helps businesses make informed decisions, optimize operations, and gain competitive advantages." },
  { question: "How does data analytics differ from data science?", answer: "Data analytics focuses on processing and performing statistical analysis on existing datasets, while data science is broader, encompassing machine learning, predictive modeling, and algorithm development." },
  { question: "Do small businesses benefit from data analytics?", answer: "Absolutely. Data analytics helps businesses of all sizes make better decisions, understand customer behavior, optimize marketing spend, and improve operational efficiency." },
  { question: "How do you ensure data security and privacy?", answer: "We implement robust security measures including encryption, access controls, and regular audits, adhering to international standards for compliance and data protection." },
  { question: "What tools and platforms do you use?", answer: "We primarily use Microsoft Power BI for visualization and reporting, integrated with Azure services for data processing, storage, and advanced AI-driven analytics capabilities." },
];

export default function DataAnalytics() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          title="Data Analytics"
          subtitle="Transforming Data into Business Intelligence. In the realm of big data, extracting meaningful information is crucial. Not leveraging your data can keep you in the dark, missing out on game-changing opportunities."
          image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80"
        />
        <FeatureGrid title="Our Data Analytics Capabilities" subtitle="Comprehensive analytics solutions powered by Microsoft Power BI and Azure." features={features} />
        <CTASection title="Tailored Insights, Tangible Growth" subtitle="Connect with our data experts to unlock the full potential of your business data." />
        <PageFAQ faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
