import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "RealtyAI FM | Facility Management | Maxcient",
  description: "RealtyAI FM — AI-driven facility management for real estate on Microsoft Dynamics 365.",
};

export default function RealtyAiFm() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero
          slug="realtyai-fm"
          title="RealtyAI FM"
          subtitle="AI-driven facility management — assets, maintenance, service requests, and community engagement, unified on Microsoft Dynamics 365."
          image="/products/realtyai-sales-hero.jpg"
        />
        <ComingSoon product="RealtyAI FM" />
      </main>
      <Footer />
    </>
  );
}
