"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";

// Cinematic "curtain" easing.
const EASE = [0.76, 0, 0.24, 1] as const;
const PANEL_BG = "#120e20"; // deep aubergine ink — matches the brand

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
      return;
    }
    try {
      sessionStorage.setItem("mx-intro-seen", "1");
    } catch {}
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
    const t = setTimeout(() => setOpening(true), 1650);
    return () => {
      clearTimeout(t);
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

      {/* seam accent line at the centre where the doors meet */}
      <motion.div
        className="absolute inset-x-0 top-1/2 origin-center"
        style={{ height: 1, background: "#a78bfa", boxShadow: "0 0 18px 1px rgba(167,139,250,0.6)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: opening ? 1.05 : 1, opacity: opening ? 0 : 0.7 }}
        transition={{ duration: opening ? 0.5 : 0.9, ease: EASE, delay: opening ? 0 : 0.15 }}
      />

      {/* welcome content */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ pointerEvents: "none" }}
        initial={{ opacity: 1 }}
        animate={{ opacity: opening ? 0 : 1, y: opening ? -18 : 0 }}
        transition={{ duration: opening ? 0.45 : 0.6, ease: "easeOut" }}
      >
        {/* soft lavender glow behind the words */}
        <div
          className="absolute"
          style={{ width: "70vw", maxWidth: 640, height: 320, borderRadius: "50%", background: "radial-gradient(ellipse at center, rgba(124,58,237,0.28), transparent 65%)", filter: "blur(8px)" }}
        />
        <motion.p
          className="relative"
          style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: 12, fontWeight: 600, letterSpacing: "0.42em", textTransform: "uppercase", color: "#a78bfa", marginBottom: 22, paddingLeft: "0.42em" }}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.35 }}
        >
          Welcome to
        </motion.p>
        <motion.h1
          className="relative"
          style={{ fontFamily: "var(--font-poppins), var(--font-geist-sans), sans-serif", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.02, color: "#FFFFFF", fontSize: "clamp(2rem, 6.5vw, 3.9rem)" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        >
          Maxcient Technologies<span style={{ color: "#a78bfa" }}>.</span>
        </motion.h1>
        <motion.div
          className="relative"
          style={{ height: 2, marginTop: 26, borderRadius: 2, background: "linear-gradient(90deg, transparent, #a78bfa, transparent)" }}
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: 120, opacity: 1 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.9 }}
        />
      </motion.div>
    </div>
  );
}
