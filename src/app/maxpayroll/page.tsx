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
  { question: "What is MaxPayroll built on?", answer: "MaxPayroll is powered by Microsoft Dynamics 365. It centralizes onboarding, leave management and payroll processing on one platform, giving organizations advanced HR functionality and comprehensive insight to manage a diverse workforce with precision and confidence." },
  { question: "What does onboarding cover?", answer: "Streamlined onboarding processes, customizable alternate-calendar setups, efficient leave management, and quick certificate-request automation — creating a positive experience from day one." },
  { question: "How does payroll processing work?", answer: "A tailored payroll-formula designer handles advances, deductions and off-cycles, with air-ticket management for global teams and built-in validation for error-free, on-time payroll." },
  { question: "What management tools are included?", answer: "Transparent workflow approvals, simplified medical-insurance handling, special off-cycle payouts, and insightful report analytics — reducing manual intervention through automation." },
  { question: "What are the key advantages?", answer: "Intuitive onboarding that streamlines administration, precision in payroll with detailed real-time reporting for informed decisions, and automated workflows that reduce manual effort across approvals and requests." },
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
