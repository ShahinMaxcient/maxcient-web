import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Services from "@/components/Services";
import Industries from "@/components/Industries";
import Products from "@/components/Products";
import Technologies from "@/components/Technologies";
import SocialProof from "@/components/SocialProof";
import FAQ from "@/components/FAQ";
import Blog from "@/components/Blog";
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
        <FAQ />
        <Blog />
      </main>
      <Footer />
    </>
  );
}
