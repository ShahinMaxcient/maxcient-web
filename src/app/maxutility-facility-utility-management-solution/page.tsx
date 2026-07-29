import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import MaxUtilityHero from "@/components/MaxUtilityHero";
import WhyChoose from "@/components/WhyChoose";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import ProductExtras from "@/components/ProductExtras";
import { notFound } from "next/navigation";
import { getPageOverride, isPageHidden } from "@/lib/pages";

export const metadata: Metadata = {
  title: "MaxUtility | Facility & Utility Management Solution | Maxcient",
  description:
    "MaxUtility unifies onboarding, metering, billing, service, and collections for facilities and utilities on Microsoft Dynamics 365 — with BTU/IoT meter automation and 360° real-time visibility.",
};

const reasons = [
  { title: "Ends the manual OPEX drain", body: "Manual meter readings, error-prone billing, and disconnected systems inflate OPEX and hide revenue leakage. MaxUtility automates the full lifecycle — onboarding, metering, billing, service, and collections." },
  { title: "360° visibility, real time", body: "Real-time Power BI dashboards with alerts over SMS, WhatsApp, and email give operations and finance one live view across assets, meters, and money — no more waiting on compliance reports." },
  { title: "12 weeks, then 24×7", body: "Tailored, tested, and live in about 12 weeks — then backed by a named engagement manager, a 24×7 SLA-driven helpdesk, and quarterly health checks and business reviews." },
];

const features = [
  { title: "Customer & Tenant Onboarding", description: "New customers live in minutes, not days.", bullets: ["Guided onboarding workflows", "E-signature built in", "No paperwork bottlenecks"] },
  { title: "Contract & Tariff Management", description: "Every agreement and rate change tracked.", bullets: ["Auto-numbering and version control", "Tariff structures per utility and segment", "Audit-ready contract history"] },
  { title: "Meter Reading Automation (BTU / IoT)", description: "No manual reads, no billing errors.", bullets: ["On-demand and scheduled readings", "BTU and IoT meter integration", "Exception flagging for anomalies"] },
  { title: "Billing & Invoice Automation", description: "Recover the revenue leakage hidden by silos.", bullets: ["Automated invoicing and receipts", "ERP posting for Dynamics 365 F&O", "Consolidated billing across services"] },
  { title: "Payment & ERP Synchronization", description: "Finance and operations in lockstep.", bullets: ["Payment collection and reconciliation", "Straight-through sync to the ERP"] },
  { title: "Disconnection / Reconnection Workflow", description: "Policy enforced consistently, automatically.", bullets: ["Built-in penalty logic", "Automated disconnection and reconnection"] },
  { title: "Asset & Meter Management", description: "One source of truth for every asset.", bullets: ["Status, history, and utilization per meter", "Portfolio-wide asset registry"] },
  { title: "Reporting & Analytics Dashboards", description: "360° visibility across the operation.", bullets: ["Real-time Power BI dashboards", "Alerts via SMS, WhatsApp, and email"] },
  { title: "Mobile & Self-Service Portal", description: "Owners, tenants, and staff self-serve.", bullets: ["React web portal and mobile app", "Act from anywhere, any time"] },
  { title: "Real-Time Notifications & Alerts", description: "Everyone informed, automatically.", bullets: ["Billing and service-request triggers", "Contract expiry and NPS surveys"] },
  { title: "Customer Support & Help Desk", description: "Unified issue tracking, your tools.", bullets: ["Built-in ticketing", "Out-of-the-box ITSM / Zendesk connectors"] },
  { title: "Regulatory Compliance & VAT", description: "Reclaim the hours lost to reporting.", bullets: ["Automated VAT handling", "Compliance reporting built in"] },
  { title: "Integration & Scalability", description: "Fits your stack, grows with you.", bullets: ["RESTful APIs", "Azure DevOps pipelines"] },
  { title: "Data Migration & Full Auditing", description: "Nothing lost, everything traceable.", bullets: ["Structured data migration", "Complete audit trails"] },
];

const faqs = [
  { question: "What technology is MaxUtility built on?", answer: "MaxUtility runs on Microsoft Dynamics 365 hosted on Azure, with .NET Core microservices and Azure Functions, a React JS web portal and mobile app, Azure SQL Database, and Power BI dashboards. Enterprise-grade infrastructure provides secure authentication, resilient hosting, and geo-replicated data storage." },
  { question: "How does MaxUtility automate metering and billing?", answer: "Meter readings are captured on-demand and on schedule via BTU and IoT integration, then flow into automated invoicing, receipts, and ERP posting for Dynamics 365 Finance & Operations. Disconnection and reconnection workflows apply penalty logic automatically — removing manual reads and error-prone billing that inflate OPEX." },
  { question: "How long does implementation take?", answer: "In just 12 weeks MaxUtility is tailored, tested, and ready — across four phases: Discovery & Scoping, Configuration & Integration, Testing & Training, and Go-Live & Support, ensuring a smooth transition with minimal downtime." },
  { question: "What support is included?", answer: "A dedicated account team with a named engagement manager and technical consultant, 24×7 SLA-driven global helpdesk with guaranteed response and resolution targets, quarterly health checks and business reviews, continuous feature updates and on-demand training, plus help desk integration into your existing ITSM." },
  { question: "Is MaxUtility compliant and does it integrate with our systems?", answer: "Yes. MaxUtility handles regulatory compliance and VAT out of the box, provides full data migration and auditing, and exposes RESTful APIs with pre-built connectors so it integrates cleanly with your ERP, ITSM, and notification channels." },
  { question: "Which notification channels are supported?", answer: "Reporting dashboards and alerts reach customers and staff over SMS, WhatsApp, and email — pre-configured triggers cover billing, service requests, contract expiry, and NPS surveys." },
  { question: "How does MaxUtility reduce revenue leakage?", answer: "By closing the gaps that cause it: automated BTU/IoT meter readings eliminate manual errors, billing posts straight to Dynamics 365 F&O, disconnection penalty logic is enforced consistently, and full audit trails make every dirham traceable." },
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
            <p
              className="mb-2"
              style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.14em", color: "var(--primary)" }}
            >
              // Product Brochure
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold t-heading">Take MaxUtility with you.</h2>
            <p className="mt-2 t-body max-w-[520px]">
              The full MaxUtility brochure — today&apos;s challenges, solution overview, key functionalities, architecture, and the 12-week implementation roadmap.
            </p>
          </div>
          <a
            href="/brochures/maxutility-brochure.pdf"
            download="MaxUtility-Brochure.pdf"
            className="group inline-flex items-center gap-3 px-7 py-4 shrink-0 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--text-primary)", color: "var(--background)", fontWeight: 600, fontSize: "15px", borderRadius: "6px" }}
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
            </svg>
            Download brochure
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", opacity: 0.65 }}>PDF · 2.6 MB</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function MaxUtility() {
  const slug = "maxutility-facility-utility-management-solution";
  if (await isPageHidden(slug)) notFound();
  const override = await getPageOverride(slug);
  return (
    <>
      <NavbarServer />
      <main>
        <MaxUtilityHero
          title={override?.title || "MaxUtility"}
          subtitle={override?.subtitle || undefined}
          image={override?.heroImage || "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/maxutility-hero-utility.webp"}
        />
        <WhyChoose product="MaxUtility" reasons={reasons} />
        <FeatureGrid
          id="functionalities"
          title="Key Functionalities"
          subtitle="MaxUtility connects core functions, eliminates data silos, and transforms utility management from reactive to strategic."
          features={features}
        />
        <BrochureSection />
        <CTASection
          title="Let's Elevate Every Process"
          subtitle="Get in touch with our expert consultants and chart a successful course for your facilities and utilities with MaxUtility."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/maxutility-cta-dam.webp"
        />
        <PageFAQ slug="maxutility-facility-utility-management-solution" faqs={faqs} />
        <ProductExtras />
      </main>
      <Footer />
    </>
  );
}
