import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import MaxSphereHero from "@/components/MaxSphereHero";
import WhyChoose from "@/components/WhyChoose";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import ProductExtras from "@/components/ProductExtras";
import { getPageOverride, isPageHidden } from "@/lib/pages";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "MaxSphere One | The Super App for Real Estate | Maxcient",
  description:
    "MaxSphere One is a deployment-ready real-estate super app — mobile and web — unifying discovery, sales, tenancy, ownership, payments, facilities and community over the systems you already run.",
};

const reasons = [
  { title: "A product, not a project", body: "A deployment-ready foundation under flexible commercial models — SaaS, vendor-managed, or enterprise with a source-code option — removes the risk and runway of a greenfield build. Rebrand it, configure it, launch it." },
  { title: "Local by design", body: "Bilingual English/Arabic at field level with full right-to-left layouts, in-country hosting, and alignment with applicable local data-protection and cybersecurity regulations such as PDPL and NCA." },
  { title: "Integration-first, governed delivery", body: "An API-led layer over your CRM, ERP, CAFM, payments, and identity — your systems stay the source of truth — delivered through formal quality gates, independent VA/PT security testing, and structured handover." },
];

const features = [
  { title: "Identity & Experience", description: "Every user onboarded securely, in their language.", bullets: ["Registration, OTP, and SSO/MFA", "Profiles, consent, and persona selection", "Tutorials, accessibility, and localization"] },
  { title: "Property Discovery", description: "Browsing that feels like a consumer app.", bullets: ["Projects, units, availability, and maps", "Filters, media, and favourites", "Comparisons, visit bookings, and inquiries"] },
  { title: "Sales & CRM", description: "The buying journey over your CRM.", bullets: ["Lead capture and appointments", "Offers and bookings", "Document collection via provided APIs"] },
  { title: "Tenancy", description: "Residential and commercial tenant journeys.", bullets: ["Move-in and move-out requests", "Clearance tracking and renewals", "Notifications and documents"] },
  { title: "Owner & Investment", description: "Owners see their portfolio, plainly.", bullets: ["Portfolio drawn from property, CRM, and ERP", "Statements and performance summaries"] },
  { title: "Broker & Agency", description: "Agencies productive from day one.", bullets: ["Onboarding and compliance", "Inventory, leads, and bookings", "Commissions and performance"] },
  { title: "Facilities & Service", description: "Maintenance requests, CAFM stays the record.", bullets: ["Request intake and classification", "Assets, work orders, and SLA stay in CAFM"] },
  { title: "Payments & Billing", description: "Payments over your gateway and ERP.", bullets: ["Payment initiation and status", "Settlement and reconciliation stay authoritative"] },
  { title: "Community", description: "Daily life inside the property, digitized.", bullets: ["Parking allocation, renewals, and payments", "Directories, announcements, and amenities", "Visitor access"] },
  { title: "Engagement & Support", description: "Every channel to reach and help users.", bullets: ["Notifications, campaigns, and content", "FAQ, help desk, tickets, and chat", "Surveys and feedback"] },
  { title: "Intelligence", description: "Useful AI now, governed AI as you grow.", bullets: ["Service assistance and document screening", "Cheque-validation support", "Governed prediction and insight later"] },
  { title: "Control Center", description: "Administration without a developer.", bullets: ["Users, roles, and CMS content", "Configuration and audit", "Adoption and integration monitoring"] },
];

const faqs = [
  { question: "What is MaxSphere One?", answer: "MaxSphere One is Maxcient's existing modular real-estate platform: native iOS and Android apps, a web administration portal, a CMS, configurable workflows and a reusable integration framework. It's a proven product you rebrand, configure and launch — not a greenfield build." },
  { question: "Does it replace our CRM, ERP or CAFM?", answer: "No. MaxSphere One is the experience, workflow and integration layer over your enterprise landscape. Your CRM, ERP, CAFM, payment and finance systems remain the authoritative record — the app owns the experience, your systems own the data." },
  { question: "How fast can we go live, and in which languages?", answer: "Typically ~6 months from configuration to a phased go-live, delivered in a single phase or across phases (P1 core, P2 extend, P3 advanced). It ships bilingual in English and Arabic with full right-to-left layouts, light and dark modes." },
  { question: "How is the AI governed?", answer: "AI arrives in controlled stages. Phase one stays low-risk and useful (NL discovery, FAQ concierge, ticket triage, document screening, cheque-validation support). Advanced prediction and personalization activate only after the use case, data sources, retention and human-approval rules are approved — with human sign-off required for financial, contractual and eligibility decisions." },
  { question: "Is it proven, and how is it deployed?", answer: "Yes — MaxSphere One runs today for a UAE government real-estate arm across 55,000+ residential, commercial and investment units, on iOS, Android and web. It's offered under flexible models: SaaS/subscription, vendor-managed deployment, or enterprise deployment with a source-code option where contractually agreed, with in-country hosting and high availability." },
  { question: "What does it integrate with?", answer: "An API-led, contract-driven layer connects your CRM, ERP/finance, CAFM, payment gateway, identity provider, courier, communications, contact centre, and e-signature — with the ability to integrate national identity and payment platforms such as UAE PASS, NAFATH, and SADAD, subject to onboarding and API availability." },
  { question: "How is it secured?", answer: "MFA, SSO, and RBAC with encryption in transit and at rest, full audit trails, a secure SDLC through design, build, and release, and independent VA/PT before and after production releases — with compliance-aligned controls for local regulations like PDPL and NCA." },
];

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
      <NavbarServer />
      <main>
        <MaxSphereHero title={override?.title || undefined} subtitle={override?.subtitle || undefined} />
        <WhyChoose product="MaxSphere One" reasons={reasons} />
        <FeatureGrid
          id="functionalities"
          title="Twelve modules, one product."
          subtitle="Pre-engineered capabilities you configure before you ever consider custom development — extensible for new partners, payment methods, channels and AI without redesigning the core."
          features={features}
        />
        <BrochureSection />
        <CTASection
          title="Rebrand it. Configure it. Launch it."
          subtitle="Bring your brand and your systems — Maxcient brings a proven real-estate super app foundation and the team to make it yours."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-maxsphere-one.webp"
        />
        <PageFAQ slug="maxsphere-one" faqs={faqs} />
        <ProductExtras />
      </main>
      <Footer />
    </>
  );
}
