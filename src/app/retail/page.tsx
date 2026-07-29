import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function Retail() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="retail" title="Retail" subtitle="Emerging Trends In Retail. The retail sector undergoes significant transformation through evolving technology and changing consumer behaviors." image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1441986300917-64674bd600d8.webp" />
        <PageFeatures slug="retail" />
        <CTASection title="Elevate Your Retail Experience" subtitle="Partner with us to implement next-generation retail technology solutions." />
        <PageFAQ slug="retail" />
      </main>
      <Footer />
    </>
  );
}
