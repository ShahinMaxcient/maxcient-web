"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { markIntroDone } from "@/lib/intro-signal";

// Cinematic "curtain" easing.
const EASE = [0.76, 0, 0.24, 1] as const;
const PANEL_BG = "#F7F7F8"; // neutral paper — matches the site background

/**
 * First-visit welcome splash. Shows once per browser session: the screen holds
 * on "Welcome to Maxcient Technologies", then the two halves part vertically to
 * reveal the site. Skips entirely for returning-in-session visitors and for
 * anyone who prefers reduced motion. Click anywhere to open early.
 */
export default function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);

  const finish = useCallback(() => {
    setVisible(false);
    document.body.style.overflow = "";
    markIntroDone();
  }, []);

  useEffect(() => {
    let skip = false;
    try {
      skip =
        sessionStorage.getItem("mx-intro-seen") === "1" ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* private mode — just play it */
    }
    if (skip) {
      setVisible(false);
      markIntroDone();
      return;
    }
    try {
      sessionStorage.setItem("mx-intro-seen", "1");
    } catch {}
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    // Open once the hero behind it is actually painted, rather than on a fixed
    // timer that can part the doors onto a half-loaded page. Guarded at both
    // ends: a minimum hold so it never flashes, and a hard cap so a slow or
    // failed image can never leave a visitor staring at the splash.
    const MIN_HOLD = 1100;
    const MAX_WAIT = 4500;
    const startedAt = performance.now();
    let done = false;
    let poll = 0;
    let capTimer = 0;

    const open = () => {
      if (done) return;
      done = true;
      window.clearInterval(poll);
      window.clearTimeout(capTimer);
      const waited = performance.now() - startedAt;
      window.setTimeout(() => setOpening(true), Math.max(0, MIN_HOLD - waited));
    };

    const heroReady = () => {
      // Homepage: the hero's visual is the globe canvas, which fades itself in
      // once its geometry is built.
      const canvas = document.querySelector("main section canvas");
      if (canvas && getComputedStyle(canvas).opacity === "1") return true;
      const hero = document.querySelector("main section img, main img");
      if (hero) {
        const img = hero as HTMLImageElement;
        return img.complete && img.naturalWidth > 0;
      }
      // Nothing to wait on (or the globe is disabled) — go on page load.
      return !canvas && document.readyState === "complete";
    };

    if (heroReady()) open();
    else poll = window.setInterval(() => { if (heroReady()) open(); }, 100);
    capTimer = window.setTimeout(open, MAX_WAIT);

    return () => {
      window.clearInterval(poll);
      window.clearTimeout(capTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  const door = { duration: 1.05, ease: EASE } as const;

  return (
    <div
      className="fixed inset-0 z-[9999] overflow-hidden"
      style={{ pointerEvents: opening ? "none" : "auto" }}
      aria-hidden
      onClick={() => !opening && setOpening(true)}
    >
      {/* top door */}
      <motion.div
        className="absolute inset-x-0 top-0"
        style={{ height: "calc(50% + 1px)", background: PANEL_BG }}
        initial={{ y: 0 }}
        animate={{ y: opening ? "-100%" : 0 }}
        transition={door}
      />
      {/* bottom door — drives completion */}
      <motion.div
        className="absolute inset-x-0 bottom-0"
        style={{ height: "calc(50% + 1px)", background: PANEL_BG }}
        initial={{ y: 0 }}
        animate={{ y: opening ? "100%" : 0 }}
        transition={door}
        onAnimationComplete={() => {
          if (opening) finish();
        }}
      />

      {/* seam accent line at the centre where the doors meet — shown instantly */}
      <motion.div
        className="absolute inset-x-0 top-1/2 origin-center"
        style={{ height: 1, background: "#7c3aed", boxShadow: "0 0 14px 1px rgba(124,58,237,0.4)" }}
        initial={{ opacity: 0.7 }}
        animate={{ scaleX: opening ? 1.05 : 1, opacity: opening ? 0 : 0.7 }}
        transition={{ duration: 0.5, ease: EASE }}
      />

      {/* welcome content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ pointerEvents: "none" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: opening ? 0 : 1, y: opening ? -18 : 0 }}
        transition={{ duration: opening ? 0.45 : 0.6, ease: "easeOut" }}
      >
        {/* No glow behind the words — a blurred violet ellipse on the light
            splash panel is the site's first impression, and it read as a stain. */}
        {/* Label is rendered statically (no entrance fade/delay) so it shows
            the instant the splash appears — only the reveal is animated. */}
        <p
          className="relative"
          style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, fontWeight: 600, letterSpacing: "0.42em", textTransform: "uppercase", color: "#7c3aed", marginBottom: 22, paddingLeft: "0.42em" }}
        >
          Welcome to
        </p>
        <h1
          className="relative"
          style={{ fontFamily: "var(--font-display), var(--font-geist-sans), sans-serif", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02, color: "#14101F", fontSize: "clamp(1.6rem, 7vw, 3.9rem)" }}
        >
          Maxcient Technologies<span style={{ color: "#7c3aed" }}>.</span>
        </h1>
        <div
          className="relative"
          style={{ width: 120, height: 2, marginTop: 26, borderRadius: 2, background: "linear-gradient(90deg, transparent, #7c3aed, transparent)" }}
        />
      </motion.div>
    </div>
  );
}
