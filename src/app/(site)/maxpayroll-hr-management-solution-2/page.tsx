import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import ProductClients from "@/components/ProductClients";


import { pageMetadata } from "@/lib/seo";

// Unique title/description per page; Admin → Pages can override both.
export const generateMetadata = () =>
  pageMetadata({
    slug: "maxpayroll-hr-management-solution-2",
    title: "MaxPayroll — HR and Payroll",
    description:
      "HR and payroll management on Microsoft Dynamics 365, WPS-ready and built for the diverse workforces of UAE and GCC employers.",
  });

export default function MaxPayroll() {
  return (
    <>
      <main>
        <PageHero slug="maxpayroll-hr-management-solution-2" title="MaxPayroll" subtitle="Seamless & Smart HR Operations. A comprehensive HR and payroll solution powered by Microsoft Dynamics 365 for diverse workforces." image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1553877522-43269d4ea984.webp" 
          demoProduct="MaxPayroll"
        />
        <PageFeatures slug="maxpayroll-hr-management-solution-2" />
        <ProductClients slug="maxpayroll-hr-management-solution-2" />
        <CTASection title="Transform Your HR Operations" subtitle="See how MaxPayroll can streamline your workforce management." />
        <PageFAQ slug="maxpayroll-hr-management-solution-2" />
      </main>
    </>
  );
}
