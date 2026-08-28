import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import ProductClients from "@/components/ProductClients";


import { pageMetadata } from "@/lib/seo";

// Unique title/description per page; Admin → Pages can override both.
export const generateMetadata = () =>
  pageMetadata({
    slug: "smartfees-school-admin-solution",
    title: "SmartFees — School Fee Management",
    description:
      "School administration on Microsoft Dynamics 365 — fee invoicing, expense tracking and payroll for educational institutions in the UAE.",
  });

export default function SmartFees() {
  return (
    <>
      <main>
        <PageHero slug="smartfees-school-admin-solution" title="SmartFees" subtitle="Flawless Financial Operations for Schools. Powered by Microsoft Dynamics 365, centralizing invoicing, expense tracking, and payroll management for educational institutions." image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1554224155-6726b3ff858f.webp" 
          demoProduct="SmartFees"
        />
        <PageFeatures slug="smartfees-school-admin-solution" />
        <ProductClients slug="smartfees-school-admin-solution" />
        <CTASection title="Streamline School Finances" subtitle="Discover how SmartFees can transform your school's financial operations." />
        <PageFAQ slug="smartfees-school-admin-solution" />
      </main>
    </>
  );
}
