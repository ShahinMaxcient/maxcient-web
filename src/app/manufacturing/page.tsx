import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function Manufacturing() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="manufacturing"
          title="Manufacturing"
          subtitle="Emerging Trends In Manufacturing. Enhance productivity through intelligent manufacturing solutions powered by IoT, AI, and Microsoft Dynamics 365."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1581091226825-a6a2a5aee158.webp"
        />
        <PageFeatures slug="manufacturing" />
        <CTASection title="Transform Your Manufacturing" subtitle="Connect with our manufacturing technology experts to explore intelligent solutions." />
        <PageFAQ slug="manufacturing" />
      </main>
      <Footer />
    </>
  );
}
