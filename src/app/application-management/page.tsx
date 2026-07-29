import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function ApplicationManagement() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="application-management"
          title="Application Management"
          subtitle="Ensuring Optimal Performance & Continuous Improvement. Reliable application management services ensuring your applications perform at their best."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1558494949-ef010cbdcc31.webp"
        />
        <PageFeatures slug="application-management" />
        <CTASection title="Optimize Your Applications" subtitle="Connect with our AMS team for a comprehensive application performance evaluation." />
        <PageFAQ slug="application-management" />
      </main>
      <Footer />
    </>
  );
}
