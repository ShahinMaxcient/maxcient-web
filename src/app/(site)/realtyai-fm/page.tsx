import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ComingSoon from "@/components/ComingSoon";
import ProductExtras from "@/components/ProductExtras";

export const metadata: Metadata = {
  title: "RealtyAI FM | Facility Management | Maxcient",
  description: "RealtyAI FM — AI-driven facility management for real estate on Microsoft Dynamics 365.",
};

export default function RealtyAiFm() {
  return (
    <>
      <main>
        <PageHero
          slug="realtyai-fm"
          title="RealtyAI FM"
          subtitle="AI-driven facility management — assets, maintenance, service requests, and community engagement, unified on Microsoft Dynamics 365."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-realtyai-sales-hero.webp"
        
          demoProduct="RealtyAI FM"
        />
        <ComingSoon product="RealtyAI FM" />
        <ProductExtras />
      </main>
    </>
  );
}
