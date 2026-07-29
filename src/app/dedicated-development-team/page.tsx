import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function DedicatedDevelopmentTeam() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="dedicated-development-team"
          title="Smart Teams"
          subtitle="Building Specialized Teams for Your Unique Goals. Empower your business with our Smart Teams, bringing expertise and innovation to every project."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1522071820081-009f0129c71c.webp"
        />
        <PageFeatures slug="dedicated-development-team" />
        <CTASection title="Build Your Dream Team" subtitle="Connect with us to assemble the perfect team for your next project." />
        <PageFAQ slug="dedicated-development-team" />
      </main>
      <Footer />
    </>
  );
}
