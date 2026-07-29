import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import PageFeatures from "@/components/PageFeatures";
import CTASection from "@/components/CTASection";
import PageFAQ from "@/components/PageFAQ";
import Footer from "@/components/Footer";

export default function IoT() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero slug="iot-internet-of-things" title="IoT (Internet of Things)" subtitle="Connecting Devices, Transforming Lives. Transform your operations with IoT solutions — gain real-time insights and control from the edge to the cloud." image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/photo-1518770660439-4636190af475.webp" />
        <PageFeatures slug="iot-internet-of-things" />
        <CTASection title="Connect Your Business" subtitle="Explore how IoT can transform your operations with real-time intelligence." />
        <PageFAQ slug="iot-internet-of-things" />
      </main>
      <Footer />
    </>
  );
}
