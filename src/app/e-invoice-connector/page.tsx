import type { Metadata } from "next";
import NavbarServer from "@/components/NavbarServer";
import PageHero from "@/components/PageHero";
import ComingSoon from "@/components/ComingSoon";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "E-Invoice Connector | Maxcient",
  description: "E-Invoice Connector — e-invoicing integration for Microsoft Dynamics 365 F&O and Business Central.",
};

export default function EInvoiceConnector() {
  return (
    <>
      <NavbarServer />
      <main>
        <PageHero
          slug="e-invoice-connector"
          title="E-Invoice Connector"
          subtitle="Compliant e-invoicing for Microsoft Dynamics 365 — with dedicated connectors for Finance & Operations (F&O) and Business Central (BC)."
          image="/products/e-invoice-connector.jpg"
        />
        <ComingSoon product="the E-Invoice Connector" />
      </main>
      <Footer />
    </>
  );
}
