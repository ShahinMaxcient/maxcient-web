import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "MaxSphere One | Maxcient",
  description: "MaxSphere One — an all-in-one business platform by Maxcient.",
};

export default function MaxSphereOne() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero
          slug="maxsphere-one"
          title="MaxSphere One"
          subtitle="One connected platform for your entire operation — unifying data, workflows, and teams on Microsoft Dynamics 365."
          image="/products/maxsphere-one.jpg"
        />
        <ComingSoon product="MaxSphere One" />
      </main>
      <Footer />
    </>
  );
}
