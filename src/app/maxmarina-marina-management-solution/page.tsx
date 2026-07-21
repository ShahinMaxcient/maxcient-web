import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import MaxMarinaHero from "@/components/MaxMarinaHero";
import FeatureGrid from "@/components/FeatureGrid";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";
import { getPageOverride } from "@/lib/pages";

export const metadata: Metadata = {
  title: "MaxMarina | Smart Marina Management Solution | Maxcient",
  description:
    "MaxMarina unifies berth management, boat sales, billing, and guest experiences on Microsoft Dynamics 365 — 30% faster berth assignments and 18% revenue growth.",
};

const features = [
  { title: "Berth Management", description: "Berth reservation and availability management with AI-powered allocation and utility tracking — 30% faster berth assignments." },
  { title: "Boat Sales & Services", description: "Track leads, manage the sales pipeline, and coordinate service operations — from concierge and pump-out requests to full service history." },
  { title: "Billing & Payment Automation", description: "Automated invoicing, dynamic pricing, and payment collection that uncover hidden revenue streams — an average 18% revenue increase." },
  { title: "Enhanced Guest Experiences", description: "Personalized service and automated communications keep every boat owner informed, from booking updates to contract-expiry reminders." },
  { title: "Marina Navigation & Interactive Map", description: "Interactive marina maps with real-time berth status and slip-level visibility for staff and guests." },
  { title: "Reporting & Analytics", description: "Unified Power BI dashboards and real-time KPIs deliver 360° operational visibility across the entire marina." },
  { title: "Mobile Access", description: "A React web portal and mobile app with real-time notifications and alerts — manage the marina from anywhere." },
  { title: "Events & Community", description: "Ratings and reviews, events, and community engagement tools that turn your marina into a destination." },
];

const faqs = [
  { question: "What technology is MaxMarina built on?", answer: "MaxMarina runs on Microsoft Dynamics 365 hosted on Azure, with .NET Core microservices, a React JS web portal and mobile app, Azure SQL Database, and Power BI dashboards — enterprise-grade infrastructure with secure authentication and geo-replicated data storage." },
  { question: "How long does implementation take?", answer: "In just 12 weeks MaxMarina is tailored, tested, and ready for your business. The rollout covers four phases: discovery & scoping, configuration & integration, testing & training, and go-live with ongoing support." },
  { question: "Can MaxMarina adapt to our marina's unique workflows?", answer: "Yes. MaxMarina is designed to adapt to each marina's workflows, branding, and operational needs — easily configure menus, automate processes, and personalize dashboards so the platform evolves with your business." },
  { question: "What support is included?", answer: "A dedicated account team with a named engagement manager, 24×7 SLA-driven global helpdesk, quarterly health checks and business reviews, plus continuous feature updates and on-demand staff training." },
  { question: "Does it integrate with our existing systems?", answer: "MaxMarina exposes RESTful APIs and ships with out-of-the-box connectors that feed ticketing into your existing ITSM or Zendesk system, plus pre-configured email/SMS triggers for booking updates, service alerts, and NPS surveys." },
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
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", opacity: 0.65 }}>PDF · 4 MB</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export default async function MaxMarina() {
  const override = await getPageOverride("maxmarina-marina-management-solution");
  return (
    <>
      <NavbarServer />
      <main>
        <MaxMarinaHero
          title={override?.title || "MaxMarina"}
          subtitle={override?.subtitle || undefined}
          image={override?.heroImage || "/maxmarina/hero-marina.jpg"}
        />
        <FeatureGrid
          id="functionalities"
          title="Key Functionalities"
          subtitle="MaxMarina connects core functions, eliminates data silos, and transforms marina management from reactive to strategic."
          features={features}
        />
        <BrochureSection />
        <CTASection
          title="Let's Elevate Every Voyage"
          subtitle="Schedule a personalized demo and chart a successful course for your marina with MaxMarina."
          image="/maxmarina/cta-voyage.jpg"
        />
        <PageFAQ slug="maxmarina-marina-management-solution" faqs={faqs} />
      </main>
      <Footer />
    </>
  );
}
