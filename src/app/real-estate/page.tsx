import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function RealEstate() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="real-estate"
          title="Real Estate"
          subtitle="Emerging Trends in Real Estate. The real estate sector undergoes transformation through societal shifts, technological innovations, and evolving buyer preferences."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1560518883-ce09059eeffa.webp"
        />
        <PageFeatures slug="real-estate" />
        <CTASection title="Upgrade Your Real Estate Operations" subtitle="Partner with us to implement cutting-edge property technology solutions." />
        <PageFAQ slug="real-estate" />
      </main>
      <Footer />
    </>
  );
}
