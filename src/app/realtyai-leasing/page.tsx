import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import RealtyAiHero from "@/components/RealtyAiHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import { getPageOverride, isPageHidden } from "@/lib/pages";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "RealtyAI Leasing | AI-Driven Leasing & Rent Operations | Maxcient",
  description:
    "RealtyAI Leasing unifies lead management, contracts, renewals & termination, the customer service portal, and financial recognition for real estate — on Microsoft Dynamics 365.",
};

const features = [
  { title: "Lead Management", description: "Capture leads from social media and ads, auto-assign them, and manage every lead communication in one pipeline." },
  { title: "Contract Management", description: "Inventory allocation, payment-plan management, and opportunity management take every lease from interest to signature." },
  { title: "Renewal & Termination", description: "PDC and receipt management plus automated notices handle renewals and terminations with no gaps." },
  { title: "Customer Service Portal", description: "Service requests, statements of account, renewal notices, and legal / bounced-cheque management — all self-serve in one portal." },
  { title: "Financial Recognition", description: "Automated notices, streamlined communication, and a financial flow to ERP with advanced analytics on the financial modules." },
  { title: "Community Management", description: "Enhances communication and engagement between property managers and residents." },
  { title: "Broker Portal", description: "Centralizes lead management and automates routine tasks for brokers." },
  { title: "Customer Portal", description: "Provides 24/7 access to property listings and secure communication for clients." },
];

const faqs = [
  { question: "What is RealtyAI Leasing built on?", answer: "RealtyAI Leasing runs on Microsoft Dynamics 365, with 100+ advanced analytical models and 70+ out-of-the-box intelligent dashboards for a real-time view of occupancy, renewals, and collections." },
  { question: "How fast is implementation?", answer: "The out-of-the-box Lead-to-Contract module goes live in about 40 days, backed by 20+ successful implementations. Delivery runs through Planning & Initiation, Definition, Solution Build & Transition, and Go-Live & Support." },
  { question: "How does it handle renewals and collections?", answer: "Automated renewal notices, PDC and receipt management, legal and bounced-cheque handling, and a customer service portal for service requests and statements of account keep every lease current and cash flowing." },
  { question: "What AI is built in?", answer: "Today RealtyAI applies AI across Sales & Customer Service (lead management, client proposals, customer query resolution), Finance & Operations, and low-code development. Coming next: role-specific copilots, autonomous process agents, and multilingual support." },
  { question: "Does it cover the full property lifecycle?", answer: "RealtyAI Leasing is one part of the RealtyAI suite, which also spans Sales, Development Management, and Facility Management — all on a single Dynamics 365 platform. $3B+ in transactions have been closed with RealtyAI." },
];

function BrochureSection() {
  return (
    <section className="py-16" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <div>
            <p className="mb-2" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--primary)" }}>// Product Brochure</p>
            <h2 className="text-2xl sm:text-3xl font-bold t-heading">Take RealtyAI Leasing with you.</h2>
            <p className="mt-2 t-body max-w-[520px]">The full RealtyAI Leasing brochure — the end-to-end leasing lifecycle, AI integration, delivery process, and results.</p>
          </div>
          <a href="/brochures/realtyai-leasing-brochure.pdf" download="RealtyAI-Leasing-Brochure.pdf" className="group inline-flex items-center gap-3 px-7 py-4 shrink-0 transition-transform duration-200 hover:-translate-y-0.5" style={{ background: "var(--text-primary)", color: "var(--background)", fontWeight: 600, fontSize: "15px", borderRadius: "6px" }}>
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" /></svg>
            Download brochure
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", opacity: 0.65 }}>PDF · 5 MB</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function RealtyAiLeasing() {
  const slug = "realtyai-leasing";
  if (await isPageHidden(slug)) notFound();
  const override = await getPageOverride(slug);
  return (
    <>
      <NavbarServer />
      <main>
        <RealtyAiHero
          variant="Leasing"
          title={override?.title || undefined}
          subtitle={override?.subtitle || "AI-driven leasing and rent operations — from lead to contract, renewals, collections, and the customer service portal, unified on Microsoft Dynamics 365."}
          image={override?.heroImage || "/products/realtyai-leasing-hero.jpg"}
          brochureHref="/brochures/realtyai-leasing-brochure.pdf"
          brochureName="RealtyAI-Leasing-Brochure.pdf"
          stats={[
            { n: "$3B+", l: "Transactions closed" },
            { n: "40 days", l: "Lead-to-contract" },
            { n: "70+", l: "Intelligent dashboards" },
          ]}
        />
        <FeatureGrid
          id="functionalities"
          title="The RealtyAI Leasing lifecycle"
          subtitle="Five connected stages — from first lead to financial recognition — plus the portals that keep customers, brokers, and communities engaged."
          features={features}
        />
        <BrochureSection />
        <CTASection
          title="Keep every lease current."
          subtitle="See how RealtyAI Leasing automates renewals, collections, and financial recognition. Book a personalized demo with our real-estate specialists."
          image="/products/realtyai-leasing-hero.jpg"
        />
        <PageFAQ slug={slug} faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
