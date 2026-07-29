import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function MicrosoftAzure() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="microsoft-azure" title="Microsoft Azure" subtitle="Cloud Computing Redefined. A comprehensive cloud computing platform offering IaaS, PaaS, and SaaS solutions with global infrastructure." image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1451187580459-43490279c0fa.webp" />
        <PageFeatures slug="microsoft-azure" />
        <CTASection title="Scale with Azure" subtitle="Let our Azure experts help you leverage the full power of cloud computing." />
        <PageFAQ slug="microsoft-azure" />
      </main>
      <Footer />
    </>
  );
}
