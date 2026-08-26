import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ComingSoon from "@/components/ComingSoon";
import ProductExtras from "@/components/ProductExtras";

export const metadata: Metadata = {
  title: "E-Invoice Connector | Maxcient",
  description: "E-Invoice Connector — e-invoicing integration for Microsoft Dynamics 365 F&O and Business Central.",
};

export default function EInvoiceConnector() {
  return (
    <>
      <main>
        <PageHero
          slug="e-invoice-connector"
          title="E-Invoice Connector"
          subtitle="Compliant e-invoicing for Microsoft Dynamics 365 — with dedicated connectors for Finance & Operations (F&O) and Business Central (BC)."
          image="https://kitfuqlhhtcqepgwgbkp.supabase.co/storage/v1/object/public/uploads/site/products-e-invoice-connector.webp"
        />
        <ComingSoon product="the E-Invoice Connector" />
        <ProductExtras slug="e-invoice-connector" />
      </main>
    </>
  );
}
