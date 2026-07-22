import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import MaxUtilityHero from "@/components/MaxUtilityHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { getPageOverride, isPageHidden } from "@/lib/pages";

export const metadata: Metadata = {
  title: "MaxUtility | Facility & Utility Management Solution | Maxcient",
  description:
    "MaxUtility unifies onboarding, metering, billing, service, and collections for facilities and utilities on Microsoft Dynamics 365 — with BTU/IoT meter automation and 360° real-time visibility.",
};

const features = [
  { title: "Customer & Tenant Onboarding", description: "Streamline customer and tenant onboarding with guided e-signature workflows — no more clunky paperwork frustrating owners and tenants." },
  { title: "Contract & Tariff Management", description: "Manage contracts and tariffs with auto-numbering and version control, so every agreement and rate change is tracked and audit-ready." },
  { title: "Meter Reading Automation (BTU / IoT)", description: "Integrate meter readings on-demand and on schedule via BTU and IoT — eliminating manual reads and error-prone billing that inflate OPEX." },
  { title: "Billing & Invoice Automation", description: "Automate invoicing, receipts, and ERP posting for Dynamics 365 Finance & Operations — recovering the revenue leakage hidden by disconnected systems." },
  { title: "Payment & ERP Synchronization", description: "Collect payments and synchronize them straight into your ERP, keeping finance and operations in perfect lockstep." },
  { title: "Disconnection / Reconnection Workflow", description: "Manage disconnections and reconnections with built-in penalty logic — enforced consistently and automatically." },
  { title: "Asset & Meter Management", description: "Track every asset and meter across your portfolio with a single source of truth for status, history, and utilization." },
  { title: "Reporting & Analytics Dashboards", description: "Real-time Power BI dashboards and alerts via SMS, WhatsApp, and email deliver 360° visibility across assets, meters, and finance." },
  { title: "Mobile & Self-Service Portal", description: "A React web portal and mobile app let owners, tenants, and staff self-serve and act from anywhere." },
  { title: "Real-Time Notifications & Alerts", description: "Pre-configured triggers for billing, service requests, contract expiry, and NPS surveys keep everyone informed automatically." },
  { title: "Customer Support & Help Desk", description: "Built-in ticketing with out-of-the-box connectors that feed into your existing ITSM or Zendesk for unified issue tracking." },
  { title: "Regulatory Compliance & VAT", description: "Automated VAT handling and compliance reporting that reclaim the staff hours consumed by manual regulatory work." },
  { title: "Integration & Scalability", description: "RESTful APIs and Azure DevOps pipelines integrate MaxUtility with your stack and scale with your operational growth." },
  { title: "Data Migration & Full Auditing", description: "Structured data migration with complete audit trails — nothing lost, everything traceable." },
];

const faqs = [
  { question: "What technology is MaxUtility built on?", answer: "MaxUtility runs on Microsoft Dynamics 365 hosted on Azure, with .NET Core microservices and Azure Functions, a React JS web portal and mobile app, Azure SQL Database, and Power BI dashboards. Enterprise-grade infrastructure provides secure authentication, resilient hosting, and geo-replicated data storage." },
  { question: "How does MaxUtility automate metering and billing?", answer: "Meter readings are captured on-demand and on schedule via BTU and IoT integration, then flow into automated invoicing, receipts, and ERP posting for Dynamics 365 Finance & Operations. Disconnection and reconnection workflows apply penalty logic automatically — removing manual reads and error-prone billing that inflate OPEX." },
  { question: "How long does implementation take?", answer: "In just 12 weeks MaxUtility is tailored, tested, and ready — across four phases: Discovery & Scoping, Configuration & Integration, Testing & Training, and Go-Live & Support, ensuring a smooth transition with minimal downtime." },
  { question: "What support is included?", answer: "A dedicated account team with a named engagement manager and technical consultant, 24×7 SLA-driven global helpdesk with guaranteed response and resolution targets, quarterly health checks and business reviews, continuous feature updates and on-demand training, plus help desk integration into your existing ITSM." },
  { question: "Is MaxUtility compliant and does it integrate with our systems?", answer: "Yes. MaxUtility handles regulatory compliance and VAT out of the box, provides full data migration and auditing, and exposes RESTful APIs with pre-built connectors so it integrates cleanly with your ERP, ITSM, and notification channels." },
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
          image={override?.heroImage || "/maxutility/hero-utility.jpg"}
        />
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
          image="/maxutility/cta-dam.jpg"
        />
        <PageFAQ slug="maxutility-facility-utility-management-solution" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
