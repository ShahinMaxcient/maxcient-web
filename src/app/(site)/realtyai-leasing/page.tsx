import type { Metadata } from "next";
import RealtyAiHero from "@/components/RealtyAiHero";
import PageReasons from "@/components/PageReasons";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import ProductExtras from "@/components/ProductExtras";
import { getPageOverride, isPageHidden } from "@/lib/pages";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "RealtyAI Leasing | AI-Driven Leasing & Rent Operations | Maxcient",
  description:
    "RealtyAI Leasing unifies lead management, contracts, renewals & termination, the customer service portal, and financial recognition for real estate — on Microsoft Dynamics 365.",
};

function BrochureSection() {
  return (
    <section className="py-16" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <div>
            <p className="mb-2" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--primary)" }}>Product Brochure</p>
            <h2 className="text-2xl sm:text-3xl font-bold t-heading">Take RealtyAI Leasing with you.</h2>
            <p className="mt-2 t-body max-w-[520px]">The full RealtyAI Leasing brochure — the end-to-end leasing lifecycle, AI integration, delivery process, and results.</p>
          </div>
          <a href="/brochures/realtyai-leasing-brochure.pdf" download="RealtyAI-Leasing-Brochure.pdf" className="group inline-flex items-center gap-3 px-7 py-4 shrink-0 transition-transform duration-200 hover:-translate-y-0.5" style={{ background: "var(--text-primary)", color: "var(--background)", fontWeight: 600, fontSize: "15px", borderRadius: "6px" }}>
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" /></svg>
            Download brochure
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "13px", opacity: 0.65 }}>PDF · 5 MB</span>
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
      <main>
        <RealtyAiHero
          variant="Leasing"
          title={override?.title || undefined}
          subtitle={override?.subtitle || "AI-driven leasing and rent operations — from lead to contract, renewals, collections, and the customer service portal, unified on Microsoft Dynamics 365."}
          image={override?.heroImage || "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-realtyai-leasing-hero.webp"}
          brochureHref="/brochures/realtyai-leasing-brochure.pdf"
          brochureName="RealtyAI-Leasing-Brochure.pdf"
          stats={[
            { n: "$3B+", l: "Transactions closed" },
            { n: "40 days", l: "Lead-to-contract" },
            { n: "70+", l: "Intelligent dashboards" },
          ]}
        />
        <PageReasons slug="realtyai-leasing" product="RealtyAI Leasing" />
        <PageFeatures slug="realtyai-leasing" id="functionalities" />
        <BrochureSection />
        <CTASection
          title="Keep every lease current."
          subtitle="See how RealtyAI Leasing automates renewals, collections, and financial recognition. Book a personalized demo with our real-estate specialists."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-realtyai-leasing-hero.webp"
        />
        <PageFAQ slug="realtyai-leasing" />
        <ProductExtras />
      </main>
    </>
  );
}
