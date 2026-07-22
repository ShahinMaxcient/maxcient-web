"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Scroll behavior helpers.
 *
 * `html { scroll-behavior: smooth }` breaks the App Router's scroll-to-top on
 * navigation (a page opened from the footer can land at the bottom), so it is
 * removed from CSS. This component restores the two behaviors we still want:
 *
 *  1. On every route change (no hash), jump to the top of the page.
 *  2. Same-page anchor links (#section) still scroll smoothly.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  // 1. Reset scroll to top on navigation (unless the URL targets an anchor).
  useEffect(() => {
    if (window.location.hash) return;
    const reset = () => window.scrollTo(0, 0);
    reset();
    // Run once more after paint to beat any late scroll restoration.
    const raf = requestAnimationFrame(reset);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  // 2. Smoothly scroll to same-page anchors on click.
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const anchor = (e.target as HTMLElement | null)?.closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.pathname !== window.location.pathname || !url.hash) return;

      const target = document.querySelector(url.hash);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", url.hash);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
