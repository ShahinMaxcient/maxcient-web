import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Smart Invoicing", description: "Streamlined billing processes with transparent transactions, customizable payment schedules, and automated reminders." },
  { title: "Expense Management", description: "Advanced categorization, reimbursement handling, currency conversion, and built-in validation for error-free tracking." },
  { title: "Comprehensive Reporting", description: "Automated financial summaries, transparent approvals, tax handling, budgeting modules, and trend analytics." },
  { title: "Scholarship Tracking", description: "Manage scholarships, discounts, and financial aid with automated calculations and reporting." },
  { title: "Online Payments", description: "Integrated online payment gateways for convenient fee collection from parents and students." },
  { title: "Multi-Currency Support", description: "Global operations support through multi-currency features for international schools." },
  { title: "Student Accounts", description: "Individual student account management with complete financial history and transaction tracking." },
  { title: "Financial Analytics", description: "Deep financial trend analysis, revenue forecasting, and budget performance dashboards." },
];

const faqs = [
  { question: "How does SmartFees simplify invoicing?", answer: "SmartFees automates invoice creation with customizable templates, scheduled billing cycles, automated payment reminders, and real-time payment tracking." },
  { question: "Can it handle diverse expense scenarios?", answer: "Yes, SmartFees supports complex expense categorization, multi-level approvals, reimbursements, and currency conversion with built-in error-checking validation." },
  { question: "What reporting capabilities does it offer?", answer: "Comprehensive financial reports including revenue analysis, expense trends, budget performance, outstanding payments, and customizable dashboards for school administrators." },
  { question: "Does it support multi-currency?", answer: "Yes, SmartFees supports global operations through multi-currency features, making it ideal for international schools with diverse fee structures." },
  { question: "How is data security handled?", answer: "SmartFees is built on Microsoft Dynamics 365 with enterprise-grade encryption, role-based access controls, and compliance with educational data protection standards." },
];

export default function SmartFees() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero title="SmartFees" subtitle="Flawless Financial Operations for Schools. Powered by Microsoft Dynamics 365, centralizing invoicing, expense tracking, and payroll management for educational institutions." image="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80" />
        <FeatureGrid title="SmartFees Features" subtitle="Complete financial management platform designed for educational institutions." features={features} />
        <CTASection title="Streamline School Finances" subtitle="Discover how SmartFees can transform your school's financial operations." />
        <PageFAQ faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
