import NavbarServer from "@/components/NavbarServer";
import Footer from "@/components/Footer";

/**
 * Shell for every public page. The header and footer live here rather than in
 * each page so they render once and PERSIST across client navigations — the
 * header stays put while the next page loads, instead of disappearing with the
 * old page and reappearing with the new one.
 */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarServer />
      {children}
      <Footer />
    </>
  );
}
