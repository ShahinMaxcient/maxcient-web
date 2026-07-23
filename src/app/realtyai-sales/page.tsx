import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import RealtyAiSalesHero from "@/components/RealtyAiSalesHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import { getPageOverride, isPageHidden } from "@/lib/pages";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "RealtyAI Sales | AI-Driven Real Estate Sales | Maxcient",
  description:
    "RealtyAI Sales unifies lead management, the sales process, post-sales, handover, and broker commissions for real estate — on Microsoft Dynamics 365. $3B+ transactions closed.",
};

const features = [
  { title: "Lead Management", description: "Capture leads from social media and ads, auto-assign them to the right agent, and manage every lead communication in one place." },
  { title: "Sales Process", description: "Inventory allocation, offer & booking management, and opportunity management keep every deal moving forward." },
  { title: "Post-Sales Process", description: "Offer creation, SPA printing, and unit transfer or cancellation — handled end-to-end without leaving the platform." },
  { title: "Handover Process", description: "A customer communication portal plus collection management make unit handover smooth and transparent." },
  { title: "Broker & Commission Management", description: "Revenue recognition, centralized documentation, and a broker portal app with built-in commission management." },
  { title: "Community Management", description: "Enhances communication and engagement between property managers and residents." },
  { title: "Broker Portal", description: "Centralizes lead management and automates routine tasks for brokers." },
  { title: "Customer Portal", description: "Provides 24/7 access to property listings and secure communication for clients." },
];

const faqs = [
  { question: "What is RealtyAI Sales built on?", answer: "RealtyAI Sales runs on Microsoft Dynamics 365, with 100+ advanced analytical models and 70+ out-of-the-box intelligent dashboards — giving sales, brokers, and management a real-time view of the entire pipeline." },
  { question: "How fast is implementation?", answer: "The out-of-the-box Lead-to-Contract module goes live in about 40 days, backed by 30+ successful implementations. Delivery runs through four phases: Planning & Initiation, Definition, Solution Build & Transition, and Go-Live & Support." },
  { question: "What AI is built in?", answer: "Today RealtyAI applies AI across Sales & Customer Service (lead management, client proposals, customer query resolution), Finance & Operations, and low-code development. Coming next: role-specific copilots, autonomous process agents, and multilingual support." },
  { question: "What results has RealtyAI delivered?", answer: "$3B+ in transactions closed with RealtyAI, 20+ implementations, 3000+ support hours, and 25+ dedicated subject-matter experts across the region." },
  { question: "Does it cover the full property lifecycle?", answer: "RealtyAI Sales is one part of the RealtyAI suite, which also spans Leasing & Rent Operations, Development Management, and Facility Management — all on a single Dynamics 365 platform." },
];

function BrochureSection() {
  return (
    <section className="py-16" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl"
          style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
        >
          <div>
            <p className="mb-2" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--primary)" }}>
              // Product Brochure
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold t-heading">Take RealtyAI Sales with you.</h2>
            <p className="mt-2 t-body max-w-[520px]">
              The full RealtyAI Sales brochure — the end-to-end sales lifecycle, AI integration, delivery process, and results.
            </p>
          </div>
          <a
            href="/brochures/realtyai-sales-brochure.pdf"
            download="RealtyAI-Sales-Brochure.pdf"
            className="group inline-flex items-center gap-3 px-7 py-4 shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--text-primary)", color: "var(--background)", fontWeight: 600, fontSize: "15px", borderRadius: "6px" }}
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
            </svg>
            Download brochure
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", opacity: 0.65 }}>PDF · 5 MB</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function RealtyAiSales() {
  const slug = "realtyai-sales";
  if (await isPageHidden(slug)) notFound();
  const override = await getPageOverride(slug);
  return (
    <>
      <NavbarServer />
      <main>
        <RealtyAiSalesHero
          title={override?.title || "RealtyAI Sales"}
          subtitle={override?.subtitle || undefined}
          image={override?.heroImage || "/products/realtyai-sales-hero.jpg"}
        />
        <FeatureGrid
          id="functionalities"
          title="The RealtyAI Sales lifecycle"
          subtitle="Five connected stages — from first lead to broker commission — plus the portals that keep customers, brokers, and communities engaged."
          features={features}
        />
        <BrochureSection />
        <CTASection
          title="Close more, faster."
          subtitle="See how RealtyAI Sales takes your team from lead to contract in 40 days. Book a personalized demo with our real-estate specialists."
          image="/products/realtyai-sales-hero.jpg"
        />
        <PageFAQ slug={slug} faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
