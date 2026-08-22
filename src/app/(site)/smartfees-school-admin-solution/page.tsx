import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";

export default function SmartFees() {
  return (
    <>
      <main>
        <PageHero slug="smartfees-school-admin-solution" title="SmartFees" subtitle="Flawless Financial Operations for Schools. Powered by Microsoft Dynamics 365, centralizing invoicing, expense tracking, and payroll management for educational institutions." image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1554224155-6726b3ff858f.webp" />
        <PageFeatures slug="smartfees-school-admin-solution" />
        <CTASection title="Streamline School Finances" subtitle="Discover how SmartFees can transform your school's financial operations." />
        <PageFAQ slug="smartfees-school-admin-solution" />
      </main>
    </>
  );
}
