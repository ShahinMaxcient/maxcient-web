import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function Distribution() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="distribution" title="Distribution" subtitle="Emerging Trends In Distribution. The wholesale sector is undergoing digital transformation with focus on transparency, predictive analytics, and direct-to-consumer models." image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1586528116311-ad8dd3c8310d.webp" />
        <PageFeatures slug="distribution" />
        <CTASection title="Optimize Your Distribution" subtitle="Connect with our experts to transform your distribution operations." />
        <PageFAQ slug="distribution" />
      </main>
      <Footer />
    </>
  );
}
