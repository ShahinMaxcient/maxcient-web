import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function ApplicationDevelopment() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="application-development"
          title="Application Development"
          subtitle="Bespoke application solutions tailored to your unique business needs. Custom application development to meet unique business needs with cutting-edge technology."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1498050108023-c5249f4df085.webp"
        />
        <PageFeatures slug="application-development" />
        <CTASection title="Let's Build Something Great" subtitle="Connect with our development team to discuss your custom application needs." />
        <PageFAQ slug="application-development" />
      </main>
      <Footer />
    </>
  );
}
