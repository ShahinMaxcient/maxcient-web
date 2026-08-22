import type { Metadata } from "next";
import MaxSphereHero from "@/components/MaxSphereHero";
import PageReasons from "@/components/PageReasons";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import ProductExtras from "@/components/ProductExtras";
import { getPageOverride, isPageHidden } from "@/lib/pages";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "MaxSphere One | The Super App for Real Estate | Maxcient",
  description:
    "MaxSphere One is a deployment-ready real-estate super app — mobile and web — unifying discovery, sales, tenancy, ownership, payments, facilities and community over the systems you already run.",
};

function BrochureSection() {
  return (
    <section className="py-16" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <div>
            <p className="mb-2" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--primary)" }}>// Capability Overview</p>
            <h2 className="text-2xl sm:text-3xl font-bold t-heading">Take MaxSphere One with you.</h2>
            <p className="mt-2 t-body max-w-[520px]">The full capability overview — the twelve modules, the nine personas, AI governance, architecture, and the live GCC case study.</p>
          </div>
          <a href="/brochures/maxsphere-one-brochure.pdf" download="MaxSphere-One-Brochure.pdf" className="group inline-flex items-center gap-3 px-7 py-4 shrink-0 transition-transform duration-200 hover:-translate-y-0.5" style={{ background: "var(--text-primary)", color: "var(--background)", fontWeight: 600, fontSize: "15px", borderRadius: "6px" }}>
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" /></svg>
            Download brochure
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "13px", opacity: 0.65 }}>PDF</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function MaxSphereOne() {
  if (await isPageHidden("maxsphere-one")) notFound();
  const override = await getPageOverride("maxsphere-one");
  return (
    <>
      <main>
        <MaxSphereHero title={override?.title || undefined} subtitle={override?.subtitle || undefined} />
        <PageReasons slug="maxsphere-one" product="MaxSphere One" />
        <PageFeatures slug="maxsphere-one" id="functionalities" />
        <BrochureSection />
        <CTASection
          title="Rebrand it. Configure it. Launch it."
          subtitle="Bring your brand and your systems — Maxcient brings a proven real-estate super app foundation and the team to make it yours."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-maxsphere-one.webp"
        />
        <PageFAQ slug="maxsphere-one" />
        <ProductExtras />
      </main>
    </>
  );
}
