"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

/**
 * Floating back-to-top + WhatsApp pair, pinned bottom-right and sitting side by
 * side: back-to-top on the left, WhatsApp on the right (outermost corner).
 *
 * Both slots are always laid out, and the back-to-top only animates its own
 * opacity/scale. Mounting it on scroll instead would re-flow the row and shove
 * the WhatsApp button sideways every time the user passes the threshold.
 */

const SHOW_AFTER = 420; // px scrolled before the back-to-top pops in

function WhatsAppIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.08-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35z" />
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.96L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.85 9.85 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24a8.2 8.2 0 0 1 8.24 8.25c0 4.54-3.7 8.23-8.24 8.23z" />
    </svg>
  );
}

export default function FloatingActions({ phone }: { phone?: string }) {
  const reduce = useReducedMotion();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // wa.me only accepts digits — strip spaces, dashes and the leading "+".
  const digits = (phone || "").replace(/\D/g, "");
  const waHref = digits
    ? `https://wa.me/${digits}?text=${encodeURIComponent("Hi Maxcient, I'd like to know more about your services.")}`
    : null;

  const toTop = () =>
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });

  return (
    <div
      className="fixed z-40 flex flex-row items-center gap-3"
      style={{ right: "clamp(14px, 2vw, 24px)", bottom: "clamp(14px, 2vw, 24px)" }}
    >
      {/* Reserved slot: the button keeps its box whether or not it is shown, so
          the WhatsApp button beside it never shifts. */}
      <div style={{ width: 52, height: 52 }} className="relative">
        <AnimatePresence>
          {showTop && (
            <motion.button
              type="button"
              onClick={toTop}
              aria-label="Back to top"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 8 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: 8 }}
              transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
              className="mx-fab absolute inset-0 flex items-center justify-center rounded-full"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border-strong)",
                color: "var(--primary)",
                boxShadow: "0 10px 24px -12px rgba(20,16,40,0.55)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {waHref && (
        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Maxcient on WhatsApp"
          className="mx-fab mx-wa flex items-center justify-center rounded-full text-white"
          style={{
            width: 52,
            height: 52,
            background: "#25D366",
            boxShadow: "0 10px 26px -8px rgba(37,211,102,0.7)",
          }}
        >
          <WhatsAppIcon />
        </a>
      )}
    </div>
  );
}
