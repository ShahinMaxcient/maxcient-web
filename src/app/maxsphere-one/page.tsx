import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import MaxSphereHero from "@/components/MaxSphereHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import { isPageHidden } from "@/lib/pages";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "MaxSphere One | The Super App for Real Estate | Maxcient",
  description:
    "MaxSphere One is a deployment-ready real-estate super app — mobile and web — unifying discovery, sales, tenancy, ownership, payments, facilities and community over the systems you already run.",
};

const features = [
  { title: "Identity & Experience", description: "Registration, OTP, SSO/MFA, profiles, consent, persona selection, tutorials, accessibility and localization." },
  { title: "Property Discovery", description: "Projects, units, availability, maps, filters, media, favourites, comparisons, visits and inquiries." },
  { title: "Sales & CRM", description: "Lead capture, appointments, offers, bookings and document collection over your CRM through provided APIs." },
  { title: "Tenancy", description: "Residential and commercial tenant journeys — move-in and move-out requests, clearance tracking, renewals, notifications and documents." },
  { title: "Owner & Investment", description: "Portfolio and owner experience drawn from authoritative property, CRM and ERP systems." },
  { title: "Broker & Agency", description: "Agency onboarding, compliance, inventory, leads, bookings, commissions and performance." },
  { title: "Facilities & Service", description: "Maintenance request experience integrated with CAFM — assets, work orders and SLA stay in CAFM." },
  { title: "Payments & Billing", description: "Payment initiation and status over your gateway and ERP; settlement and reconciliation stay authoritative." },
  { title: "Community", description: "Parking services — allocation, renewals, payments and status — plus directories, announcements, amenities and visitor access." },
  { title: "Engagement & Support", description: "Notifications, campaigns, content, FAQ, help desk, tickets, chat, surveys and feedback." },
  { title: "Intelligence", description: "Service assistance, document screening and cheque-validation support today; governed prediction and insight as you grow." },
  { title: "Control Center", description: "Users, roles, CMS content, configuration, audit, adoption and integration monitoring." },
];

const faqs = [
  { question: "What is MaxSphere One?", answer: "MaxSphere One is Maxcient's existing modular real-estate platform: native iOS and Android apps, a web administration portal, a CMS, configurable workflows and a reusable integration framework. It's a proven product you rebrand, configure and launch — not a greenfield build." },
  { question: "Does it replace our CRM, ERP or CAFM?", answer: "No. MaxSphere One is the experience, workflow and integration layer over your enterprise landscape. Your CRM, ERP, CAFM, payment and finance systems remain the authoritative record — the app owns the experience, your systems own the data." },
  { question: "How fast can we go live, and in which languages?", answer: "Typically ~6 months from configuration to a phased go-live, delivered in a single phase or across phases (P1 core, P2 extend, P3 advanced). It ships bilingual in English and Arabic with full right-to-left layouts, light and dark modes." },
  { question: "How is the AI governed?", answer: "AI arrives in controlled stages. Phase one stays low-risk and useful (NL discovery, FAQ concierge, ticket triage, document screening, cheque-validation support). Advanced prediction and personalization activate only after the use case, data sources, retention and human-approval rules are approved — with human sign-off required for financial, contractual and eligibility decisions." },
  { question: "Is it proven, and how is it deployed?", answer: "Yes — MaxSphere One runs today for a UAE government real-estate arm across 55,000+ residential, commercial and investment units, on iOS, Android and web. It's offered under flexible models: SaaS/subscription, vendor-managed deployment, or enterprise deployment with a source-code option where contractually agreed, with in-country hosting and high availability." },
];

function BrochureSection() {
  return (
    <section className="py-16" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-8 sm:p-10 rounded-2xl" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
          <div>
            <p className="mb-2" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--primary)" }}>// Capability Overview</p>
            <h2 className="text-2xl sm:text-3xl font-bold t-heading">Take MaxSphere One with you.</h2>
            <p className="mt-2 t-body max-w-[520px]">The full capability overview — the twelve modules, the nine personas, AI governance, architecture, and the live GCC case study.</p>
          </div>
          <a href="/brochures/maxsphere-one-brochure.pdf" download="MaxSphere-One-Brochure.pdf" className="group inline-flex items-center gap-3 px-7 py-4 shrink-0 transition-transform duration-200 hover:-translate-y-0.5" style={{ background: "var(--text-primary)", color: "var(--background)", fontWeight: 600, fontSize: "15px", borderRadius: "6px" }}>
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" /></svg>
            Download brochure
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", opacity: 0.65 }}>PDF</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function MaxSphereOne() {
  if (await isPageHidden("maxsphere-one")) notFound();
  return (
    <>
      <NavbarServer />
      <main>
        <MaxSphereHero />
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
          image="/products/maxsphere-one.jpg"
        />
        <PageFAQ slug="maxsphere-one" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
