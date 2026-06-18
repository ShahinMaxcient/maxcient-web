import Navbar from "@/components/Navbar";
import PageHero from "@/components/PageHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

const features = [
  { title: "Intuitive Onboarding", description: "Streamlined onboarding processes for new recruits with customizable workflows and document management." },
  { title: "Precision Payroll", description: "Tailored payroll formula designer managing advances, deductions, off-cycles, and built-in validation." },
  { title: "Leave Management", description: "Efficient leave tracking with customizable calendar setups, approval workflows, and balance management." },
  { title: "Air Ticket Management", description: "Comprehensive air ticket management for global teams including booking, tracking, and reimbursement." },
  { title: "Workflow Approvals", description: "Transparent multi-level workflow approvals for leave, expenses, and HR requests." },
  { title: "Medical Insurance", description: "Simplified medical insurance handling with plan management, claims tracking, and employee enrollment." },
  { title: "Certificate Automation", description: "Quick certificate request automation for employment letters, salary certificates, and NOCs." },
  { title: "Report Analytics", description: "Insightful HR analytics with workforce reports, payroll summaries, and performance dashboards." },
];

const faqs = [
  { question: "How does MaxPayroll enhance onboarding?", answer: "MaxPayroll streamlines onboarding with automated document collection, customizable workflows, system access provisioning, and orientation scheduling — reducing manual HR effort significantly." },
  { question: "Can it handle diverse payroll scenarios?", answer: "Yes, the payroll formula designer supports complex calculations including multiple salary structures, variable components, deductions, off-cycle payments, and multi-entity processing." },
  { question: "Is it suitable for international teams?", answer: "Absolutely. MaxPayroll supports multi-currency, multi-entity, and multi-country payroll processing with compliance for different labor law requirements." },
  { question: "How is data security ensured?", answer: "Built on Microsoft Dynamics 365 with enterprise-grade encryption, role-based access, audit trails, and compliance with international HR data protection standards." },
  { question: "Does it integrate with other HR tools?", answer: "Yes, MaxPayroll offers open architecture integration with existing HR systems, attendance tracking, performance management, and other enterprise applications." },
];

export default function MaxPayroll() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero slug="maxpayroll-hr-management-solution-2" title="MaxPayroll" subtitle="Seamless & Smart HR Operations. A comprehensive HR and payroll solution powered by Microsoft Dynamics 365 for diverse workforces." image="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1920&q=80" />
        <FeatureGrid title="MaxPayroll Features" subtitle="Complete HR and payroll management for modern organizations." features={features} />
        <CTASection title="Transform Your HR Operations" subtitle="See how MaxPayroll can streamline your workforce management." />
        <PageFAQ slug="maxpayroll-hr-management-solution-2" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
