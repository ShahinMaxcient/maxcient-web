import type { Metadata } from "next";
import MaxMarinaHero from "@/components/MaxMarinaHero";
import PageReasons from "@/components/PageReasons";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import ProductExtras from "@/components/ProductExtras";
import { notFound } from "next/navigation";
import { getPageOverride, isPageHidden } from "@/lib/pages";

export const metadata: Metadata = {
  title: "MaxMarina | Smart Marina Management Solution | Maxcient",
  description:
    "MaxMarina unifies berth management, boat sales, billing, and guest experiences on Microsoft Dynamics 365 — 30% faster berth assignments and 18% revenue growth.",
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
            <p
              className="mb-2"
              style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--primary)" }}
            >
              Product Brochure
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold t-heading">Take MaxMarina with you.</h2>
            <p className="mt-2 t-body max-w-[520px]">
              The full MaxMarina brochure — challenges, solution overview, key functionalities, architecture, and the 12-week implementation roadmap.
            </p>
          </div>
          <a
            href="/brochures/maxmarina-brochure.pdf"
            download="MaxMarina-Brochure.pdf"
            className="group inline-flex items-center gap-3 px-7 py-4 shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--text-primary)", color: "var(--background)", fontWeight: 600, fontSize: "15px", borderRadius: "6px" }}
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
            </svg>
            Download brochure
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "13px", opacity: 0.65 }}>PDF · 4 MB</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function MaxMarina() {
  const slug = "maxmarina-marina-management-solution";
  if (await isPageHidden(slug)) notFound();
  const override = await getPageOverride(slug);
  return (
    <>
      <main>
        <MaxMarinaHero
          title={override?.title || "MaxMarina"}
          subtitle={override?.subtitle || undefined}
          image={override?.heroImage || "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/maxmarina-hero-marina.webp"}
        />
        <PageReasons slug="maxmarina-marina-management-solution" product="MaxMarina" />
        <PageFeatures slug="maxmarina-marina-management-solution" id="functionalities" />
        <BrochureSection />
        <CTASection
          title="Let's Elevate Every Voyage"
          subtitle="Schedule a personalized demo and chart a successful course for your marina with MaxMarina."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/maxmarina-cta-voyage.webp"
        />
        <PageFAQ slug="maxmarina-marina-management-solution" />
        <ProductExtras />
      </main>
    </>
  );
}
