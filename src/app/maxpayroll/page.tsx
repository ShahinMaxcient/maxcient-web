import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import ProductHero from "@/components/ProductHero";
import WhyChoose from "@/components/WhyChoose";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import { getPageOverride, isPageHidden } from "@/lib/pages";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "MaxPayroll | Smart HR & Payroll on Dynamics 365 | Maxcient",
  description:
    "MaxPayroll by Maxcient, powered by Microsoft Dynamics 365 — an HR and payroll solution for diverse workforces, centralizing onboarding, leave management and payroll processing.",
};

const reasons = [
  { title: "Intuitive Onboarding", body: "Streamlines administrative processes and sets the tone for a positive work experience — from documentation to training schedules, everything organized and accessible from day one." },
  { title: "Precision in Payroll", body: "Detailed, real-time reports on opportunities, tenancies, and payments — with built-in validation and error-checking that preempts discrepancies before each payroll cycle runs." },
  { title: "Automated Workflows", body: "Automated approvals and certificate requests reduce manual intervention across HR — freeing your team to focus on people, not paperwork." },
];

const features = [
  { title: "Onboarding Excellence", description: "New hires integrated swiftly and smoothly.", bullets: ["Streamlined onboarding processes", "Customizable alternate calendar setups", "Efficient leave management", "Quick certificate request automation"] },
  { title: "Advanced Payroll Processing", description: "Complex payroll handled with precision.", bullets: ["Tailored payroll formula designer", "Advances, deductions, and off-cycles", "Air ticket management for global teams", "Built-in validation for error-free payroll"] },
  { title: "Comprehensive Management Tools", description: "Everything HR needs to run the function.", bullets: ["Transparent workflow approvals", "Simplified medical insurance handling", "Special off-cycle payouts", "Insightful report analytics"] },
  { title: "Leave Management", description: "Requests, balances, and approvals in one flow.", bullets: ["Self-service leave requests", "Alternate calendars per team or region"] },
  { title: "Employee Self-Service", description: "Employees help themselves, HR stays informed.", bullets: ["Certificate requests in a click", "Personal records and payslips"] },
  { title: "Compliance & Security", description: "Enterprise-grade protection on Dynamics 365.", bullets: ["State-of-the-art encryption", "Customizable access permissions", "Regular security audits"] },
  { title: "Multi-Currency & Global Teams", description: "Built for international workforces.", bullets: ["Multi-currency support", "Region-specific compliance checks"] },
  { title: "Reporting & Analytics", description: "Decisions backed by live workforce data.", bullets: ["Real-time payroll and HR reports", "Insightful analytics dashboards"] },
];

const faqs = [
  { question: "How does MaxPayroll enhance the onboarding process?", answer: "MaxPayroll simplifies employee onboarding by offering streamlined procedures, alternate calendar setups, and automated certificate requests, ensuring new hires are integrated into the organization swiftly and efficiently. Its intuitive interface reduces administrative burdens, allowing HR teams to focus on engaging new employees. Furthermore, its centralized platform ensures that all onboarding activities, from documentation to training schedules, are organized and easily accessible." },
  { question: "Can MaxPayroll handle diverse payroll scenarios?", answer: "Absolutely! From employee advances and deductions to off-cycle payouts, MaxPayroll is equipped to manage complex payroll scenarios, ensuring accuracy and compliance. Its adaptive system can accommodate unique payroll conditions specific to different regions or business structures. Additionally, its error-checking mechanisms preempt potential discrepancies, ensuring that each payroll cycle runs smoothly." },
  { question: "How does the formula designer in MaxPayroll work?", answer: "The formula designer in MaxPayroll is a robust tool that allows HR teams to define and customize payroll calculations based on various parameters, ensuring precise and accurate payroll computations. It provides flexibility in setting up complex payroll components, from bonuses to tax deductions. By catering to diverse computation needs, the formula designer ensures that businesses can tailor their payroll processes according to their specific requirements." },
  { question: "Is MaxPayroll suitable for international organizations?", answer: "Yes, MaxPayroll caters to the intricate demands of diverse workforces, including features like air ticket management, making it suitable for international organizations. Its multi-currency support and region-specific compliance checks ensure that global businesses operate without hitches. Moreover, its ability to integrate with various country-specific HR tools ensures seamless operations across borders." },
  { question: "How secure is the data in MaxPayroll?", answer: "MaxPayroll, built on the Microsoft Dynamics 365 platform, prioritizes data security. All employee and organizational data is stored with state-of-the-art encryption, ensuring confidentiality and peace of mind. Regular security audits and updates reinforce its commitment to data protection. Plus, customizable access permissions ensure that sensitive data is only accessible to authorized personnel." },
  { question: "Can I integrate MaxPayroll with other HR tools?", answer: "Given MaxPayroll's foundation on Microsoft Dynamics 365, it offers broad integration capabilities, allowing you to seamlessly incorporate it with other HR tools, enhancing its versatility and utility. Its open architecture facilitates easy connections with a range of HR software, from recruitment platforms to performance management systems. This ensures a holistic HR management experience, where all tools communicate efficiently for optimal results." },
  { question: "What are the key advantages of MaxPayroll?", answer: "Three stand out: intuitive onboarding that streamlines administration and sets a positive tone from day one, precision in payroll with detailed real-time reporting for informed decisions, and automated workflows that cut manual effort across approvals and certificate requests." },
];

export default async function MaxPayroll() {
  if (await isPageHidden("maxpayroll")) notFound();
  const override = await getPageOverride("maxpayroll");
  // Default renders the two-tone "Max|Payroll" wordmark; a custom title replaces it whole.
  const customTitle = override?.title && override.title !== "MaxPayroll" ? override.title : null;
  return (
    <>
      <NavbarServer />
      <main>
        <ProductHero
          title={customTitle ?? "Max"}
          accentWord={customTitle ? undefined : "Payroll"}
          subtitle={override?.subtitle || "Seamless & smart HR operations. Powered by Microsoft Dynamics 365, MaxPayroll centralizes onboarding, leave management and payroll processing for diverse workforces — driving operations with precision and assurance."}
          image={override?.heroImage || "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-maxpayroll-hero.webp"}
          stats={[
            { n: "D365", l: "Powered by Microsoft" },
            { n: "WPS", l: "UAE payroll ready" },
            { n: "360°", l: "Workforce visibility" },
          ]}
        />
        <WhyChoose product="MaxPayroll" reasons={reasons} />
        <FeatureGrid
          id="functionalities"
          title="Everything HR & payroll, in one place."
          subtitle="Advanced HR functionality and comprehensive insight — so you can manage your workforce with precision and confidence, from onboarding through every payroll run."
          features={features}
        />
        <CTASection
          title="Run payroll with confidence."
          subtitle="See how MaxPayroll streamlines onboarding, leave and payroll on Microsoft Dynamics 365. Book a walkthrough with our HR-tech specialists."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-maxpayroll-hero.webp"
        />
        <PageFAQ slug="maxpayroll" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
