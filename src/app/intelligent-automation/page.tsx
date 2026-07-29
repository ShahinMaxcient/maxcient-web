import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function IntelligentAutomation() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="intelligent-automation"
          title="Intelligent Automation"
          subtitle="Revolutionizing Business with Smart Automation. Enhance efficiency with intelligent automation, reducing errors and increasing productivity across your operations."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1485827404703-89b55fcc595e.webp"
        />
        <PageFeatures slug="intelligent-automation" />
        <CTASection title="Accelerate Your Digital Journey" subtitle="Talk to us about how Maxcient can help transform your operations with intelligent automation." />
        <PageFAQ slug="intelligent-automation" />
      </main>
      <Footer />
    </>
  );
}
