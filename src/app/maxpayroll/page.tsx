import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import ProductHero from "@/components/ProductHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import { isPageHidden } from "@/lib/pages";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "MaxPayroll | Smart HR & Payroll on Dynamics 365 | Maxcient",
  description:
    "MaxPayroll by Maxcient, powered by Microsoft Dynamics 365 — an HR and payroll solution for diverse workforces, centralizing onboarding, leave management and payroll processing.",
};

const features = [
  { title: "Onboarding Excellence", description: "Streamlined onboarding, customizable alternate-calendar setups, efficient leave management, and quick certificate-request automation." },
  { title: "Advanced Payroll Processing", description: "A tailored payroll-formula designer with advances, deductions and off-cycles, air-ticket management for global teams, and built-in validation for error-free payroll." },
  { title: "Leave Management", description: "Policy-driven leave management with alternate-calendar support tuned for diverse, multi-country workforces." },
  { title: "Payroll Formula Designer", description: "Design payroll formulas tailored to your organization, then apply them consistently across every run." },
  { title: "Workflow Approvals", description: "Transparent, automated workflow approvals that cut manual intervention across requests and requests-for-change." },
  { title: "Medical Insurance", description: "Simplified medical-insurance handling for your employees, integrated directly into the HR record." },
  { title: "Air Ticket Management", description: "Manage air-ticket entitlements and payouts for global and expatriate teams within payroll." },
  { title: "Reports & Analytics", description: "Insightful, real-time report analytics that turn HR and payroll data into informed decisions." },
];

const faqs = [
  { question: "How does MaxPayroll enhance the onboarding process?", answer: "MaxPayroll simplifies employee onboarding by offering streamlined procedures, alternate calendar setups, and automated certificate requests, ensuring new hires are integrated into the organization swiftly and efficiently. Its intuitive interface reduces administrative burdens, allowing HR teams to focus on engaging new employees. Furthermore, its centralized platform ensures that all onboarding activities, from documentation to training schedules, are organized and easily accessible." },
  { question: "Can MaxPayroll handle diverse payroll scenarios?", answer: "Absolutely! From employee advances and deductions to off-cycle payouts, MaxPayroll is equipped to manage complex payroll scenarios, ensuring accuracy and compliance. Its adaptive system can accommodate unique payroll conditions specific to different regions or business structures. Additionally, its error-checking mechanisms preempt potential discrepancies, ensuring that each payroll cycle runs smoothly." },
  { question: "How does the formula designer in MaxPayroll work?", answer: "The formula designer in MaxPayroll is a robust tool that allows HR teams to define and customize payroll calculations based on various parameters, ensuring precise and accurate payroll computations. It provides flexibility in setting up complex payroll components, from bonuses to tax deductions. By catering to diverse computation needs, the formula designer ensures that businesses can tailor their payroll processes according to their specific requirements." },
  { question: "Is MaxPayroll suitable for international organizations?", answer: "Yes, MaxPayroll caters to the intricate demands of diverse workforces, including features like air ticket management, making it suitable for international organizations. Its multi-currency support and region-specific compliance checks ensure that global businesses operate without hitches. Moreover, its ability to integrate with various country-specific HR tools ensures seamless operations across borders." },
  { question: "How secure is the data in MaxPayroll?", answer: "MaxPayroll, built on the Microsoft Dynamics 365 platform, prioritizes data security. All employee and organizational data is stored with state-of-the-art encryption, ensuring confidentiality and peace of mind. Regular security audits and updates reinforce its commitment to data protection. Plus, customizable access permissions ensure that sensitive data is only accessible to authorized personnel." },
  { question: "Can I integrate MaxPayroll with other HR tools?", answer: "Given MaxPayroll's foundation on Microsoft Dynamics 365, it offers broad integration capabilities, allowing you to seamlessly incorporate it with other HR tools, enhancing its versatility and utility. Its open architecture facilitates easy connections with a range of HR software, from recruitment platforms to performance management systems. This ensures a holistic HR management experience, where all tools communicate efficiently for optimal results." },
];

export default async function MaxPayroll() {
  if (await isPageHidden("maxpayroll")) notFound();
  return (
    <>
      <NavbarServer />
      <main>
        <ProductHero
          title="Max"
          accentWord="Payroll"
          subtitle="Seamless & smart HR operations. Powered by Microsoft Dynamics 365, MaxPayroll centralizes onboarding, leave management and payroll processing for diverse workforces — driving operations with precision and assurance."
          image="/products/maxpayroll-hero.jpg"
          stats={[
            { n: "D365", l: "Powered by Microsoft" },
            { n: "WPS", l: "UAE payroll ready" },
            { n: "360°", l: "Workforce visibility" },
          ]}
        />
        <FeatureGrid
          id="functionalities"
          title="Everything HR & payroll, in one place."
          subtitle="Advanced HR functionality and comprehensive insight — so you can manage your workforce with precision and confidence, from onboarding through every payroll run."
          features={features}
        />
        <CTASection
          title="Run payroll with confidence."
          subtitle="See how MaxPayroll streamlines onboarding, leave and payroll on Microsoft Dynamics 365. Book a walkthrough with our HR-tech specialists."
          image="/products/maxpayroll-hero.jpg"
        />
        <PageFAQ slug="maxpayroll" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
