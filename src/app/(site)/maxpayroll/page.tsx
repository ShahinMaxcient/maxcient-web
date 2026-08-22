import type { Metadata } from "next";
import ProductHero from "@/components/ProductHero";
import PageReasons from "@/components/PageReasons";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import ProductExtras from "@/components/ProductExtras";
import { getPageOverride, isPageHidden } from "@/lib/pages";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "MaxPayroll | Smart HR & Payroll on Dynamics 365 | Maxcient",
  description:
    "MaxPayroll by Maxcient, powered by Microsoft Dynamics 365 — an HR and payroll solution for diverse workforces, centralizing onboarding, leave management and payroll processing.",
};

export default async function MaxPayroll() {
  if (await isPageHidden("maxpayroll")) notFound();
  const override = await getPageOverride("maxpayroll");
  // Default renders the two-tone "Max|Payroll" wordmark; a custom title replaces it whole.
  const customTitle = override?.title && override.title !== "MaxPayroll" ? override.title : null;
  return (
    <>
      <main>
        <ProductHero
          title={customTitle ?? "Max"}
          accentWord={customTitle ? undefined : "Payroll"}
          subtitle={override?.subtitle || "Seamless & smart HR operations. Powered by Microsoft Dynamics 365, MaxPayroll centralizes onboarding, leave management and payroll processing for diverse workforces — driving operations with precision and assurance."}
          image={override?.heroImage || "https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-maxpayroll-hero.webp"}
          stats={[
            { n: "D365", l: "Powered by Microsoft" },
            { n: "WPS", l: "UAE payroll ready" },
            { n: "360°", l: "Workforce visibility" },
          ]}
        />
        <PageReasons slug="maxpayroll" product="MaxPayroll" />
        <PageFeatures slug="maxpayroll" id="functionalities" />
        <CTASection
          title="Run payroll with confidence."
          subtitle="See how MaxPayroll streamlines onboarding, leave and payroll on Microsoft Dynamics 365. Book a walkthrough with our HR-tech specialists."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-maxpayroll-hero.webp"
        />
        <PageFAQ slug="maxpayroll" />
        <ProductExtras />
      </main>
    </>
  );
}
