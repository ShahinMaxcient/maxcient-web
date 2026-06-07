import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Products from "@/components/Products";
import Technologies from "@/components/Technologies";
import SocialProof from "@/components/SocialProof";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <Industries />
        <Products />
        <Technologies />
        <SocialProof />
        <Testimonials />
        <FAQ />
        <Blog />
        <CTASection
          title="Get in touch"
          subtitle="Reach our transformation experts today. Connect with our UAE-based certified consultants specializing in CRM, ERP, and Dynamics 365 across the GCC."
        />
      </main>
      <Footer />
    </>
  );
}
