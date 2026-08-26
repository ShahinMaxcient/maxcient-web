import type { Metadata } from "next";
import RealtyAiSalesHero from "@/components/RealtyAiSalesHero";
import PageReasons from "@/components/PageReasons";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import ProductExtras from "@/components/ProductExtras";
import { getPageOverride, isPageHidden } from "@/lib/pages";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "RealtyAI Sales | AI-Driven Real Estate Sales | Maxcient",
  description:
    "RealtyAI Sales unifies lead management, the sales process, post-sales, handover, and broker commissions for real estate — on Microsoft Dynamics 365. $3B+ transactions closed.",
};

function BrochureSection() {
  return (
    <section className="py-16" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl"
          style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
        >
          <div>
            <p className="mb-2" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--primary)" }}>
              Product Brochure
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
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "13px", opacity: 0.65 }}>PDF · 5 MB</span>
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
      <main>
        <RealtyAiSalesHero
          title={override?.title || "RealtyAI Sales"}
          subtitle={override?.subtitle || undefined}
          image={override?.heroImage || "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-realtyai-sales-hero.webp"}
        
          demoProduct="RealtyAI Sales"
        />
        <PageReasons slug="realtyai-sales" product="RealtyAI Sales" />
        <PageFeatures slug="realtyai-sales" id="functionalities" />
        <BrochureSection />
        <CTASection
          title="Close more, faster."
          subtitle="See how RealtyAI Sales takes your team from lead to contract in 40 days. Book a personalized demo with our real-estate specialists."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-realtyai-sales-hero.webp"
        />
        <PageFAQ slug="realtyai-sales" />
        <ProductExtras slug="realtyai-sales" />
      </main>
    </>
  );
}
