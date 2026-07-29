import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function DataAnalytics() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="data-analytics"
          title="Data Analytics"
          subtitle="Transforming Data into Business Intelligence. In the realm of big data, extracting meaningful information is crucial. Not leveraging your data can keep you in the dark, missing out on game-changing opportunities."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1551288049-bebda4e38f71.webp"
        />
        <PageFeatures slug="data-analytics" />
        <CTASection title="Tailored Insights, Tangible Growth" subtitle="Connect with our data experts to unlock the full potential of your business data." />
        <PageFAQ slug="data-analytics" />
      </main>
      <Footer />
    </>
  );
}
