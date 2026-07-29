import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function ProfessionalServices() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="professional-services" title="Professional Services" subtitle="Emerging Trends In Professional Services. The sector is undergoing a paradigm shift driven by digital transformation and evolving client expectations." image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1521737711867-e3b97375f902.webp" />
        <PageFeatures slug="professional-services" />
        <CTASection title="Reimagine Service Excellence" subtitle="Partner with us to transform your professional services operations." />
        <PageFAQ slug="professional-services" />
      </main>
      <Footer />
    </>
  );
}
