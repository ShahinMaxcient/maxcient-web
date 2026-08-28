import NavbarServer from "@/components/NavbarServer";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { getSiteSettings } from "@/lib/settings";
import OrganizationSchema from "@/components/OrganizationSchema";

/**
 * Shell for every public page. The header and footer live here rather than in
 * each page so they render once and PERSIST across client navigations — the
 * header stays put while the next page loads, instead of disappearing with the
 * old page and reappearing with the new one. Same reasoning for the floating
 * WhatsApp / back-to-top pair: site-wide, and no remount per navigation.
 */
export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <>
      <OrganizationSchema />
      <NavbarServer />
      {children}
      <Footer />
      <FloatingActions phone={settings.whatsappNumber || settings.contactPhone} />
    </>
  );
}
