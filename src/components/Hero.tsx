"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import HeroGlobe from "./HeroGlobe";
import GlobeOrbit from "./GlobeOrbit";
import HeroCurves from "./HeroCurves";
import type { HeroSettings } from "@/lib/settings";
import { DEFAULT_HERO } from "@/lib/settings";

// Render the headline with the brand's lavender box behind the word "Tech".
// Static — the reveal animation was removed at the client's request. Inline
// span + clone so the highlight wraps cleanly if the line breaks.
function renderHeadline(text: string): ReactNode {
  const marker = "Tech";
  const idx = text.indexOf(marker);
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <span
        style={{
          background: "#7c3aed",
          color: "#FFFFFF",
          borderRadius: 8,
          padding: "0.02em 0.16em",
          WebkitBoxDecorationBreak: "clone",
          boxDecorationBreak: "clone",
        }}
      >
        {marker}
      </span>
      {text.slice(idx + marker.length)}
    </>
  );
}

export default function Hero({ data = DEFAULT_HERO }: { data?: HeroSettings }) {
  const telHref = `tel:${data.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* ── Upper half: light ────────────────────────────────────────────────
          No photograph — the globe is the hero's single visual, and a busy
          skyline behind it turned the dots to noise. The paper is the same
          colour as the intro splash, so the curtain opens onto a seamless
          ground. Keeping the TOP light is also what lets the navbar stay on
          its dark-text branch and the black globe graticule stay readable;
          the dark shade goes underneath instead (see the plinth below). */}
      <div className="relative">
        {/* Shaded backdrop — a straight directional sweep, tinted at the copy
            column and clearing to white under the globe.

            This replaces hero-shade.webp, which carried the same tint but as a
            curved, feathered blot across the frame. Full-bleed and first on the
            page, that shape read as a wash of spilled ink rather than as
            lighting. A linear gradient anchored to the edges gives the same
            depth with nothing for the eye to mistake for a stain — and costs a
            paint instead of an image request. */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(100deg, rgba(167,139,250,0.13) 0%, rgba(167,139,250,0.05) 32%, rgba(255,255,255,0.55) 60%, #FFFFFF 100%)",
          }}
        />

        {/* Light trails sweeping edge to edge, behind the globe */}
        <HeroCurves />

      <div
        className="relative max-w-[1400px] mx-auto px-5 sm:px-8 flex flex-col justify-center"
        style={{ minHeight: "min(80vh, 780px)", paddingTop: "108px", paddingBottom: "56px" }}
      >
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center">
          <div className="max-w-[640px] text-left">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 mb-7"
              style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--primary)" }}
            >
              <span style={{ display: "block", width: 36, height: 1, background: "var(--primary)" }} />
              {data.tagline}
            </motion.div>

            <h1
              className="ed-display"
              style={{
                fontSize: "clamp(2.2rem, 4.4vw, 3.7rem)",
                lineHeight: "1.06em",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
                color: "#14101F",
                margin: 0,
              }}
            >
              {renderHeadline(data.headline)}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="mt-7 leading-relaxed"
              style={{ fontSize: "1.02rem", color: "var(--text-muted)", maxWidth: "560px" }}
            >
              {data.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10 flex items-center gap-7 flex-wrap"
            >
              <Link
                href="/request-a-consultation"
                className="group inline-flex items-center gap-3 px-8 py-4 transition-transform duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--text-primary)", color: "#FFFFFF", fontWeight: 600, fontSize: "14px", borderRadius: "4px" }}
              >
                <span>{data.ctaText}</span>
                <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center gap-2"
                style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)" }}
              >
                {data.ctaSecondary}
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>

              <a href={telHref} className="group inline-flex items-center gap-3">
                <span className="flex items-center justify-center shrink-0 transition-colors" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid var(--border-strong)", color: "var(--primary)" }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="leading-tight">
                  <span className="block" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)" }}>Call us</span>
                  <span className="block" style={{ fontWeight: 600, fontSize: "14px", color: "var(--text-primary)" }}>{data.phone}</span>
                </span>
              </a>

              {data.badge && (
                <span
                  className="inline-flex items-center gap-2.5 px-4 py-2.5"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "5px" }}
                >
                  <svg width="16" height="16" viewBox="0 0 23 23" aria-hidden="true" className="shrink-0">
                    <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
                    <rect x="12.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
                    <rect x="0" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
                    <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
                  </svg>
                  <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-secondary)" }}>
                    {data.badge}
                  </span>
                </span>
              )}
            </motion.div>
          </div>

          {/* Globe. Stacks under the copy on phones at a reduced size — with the
              photograph gone it is the hero's only visual, so mobile keeps it,
              but below the headline rather than above it. */}
          <div
            className="relative mx-auto w-full max-w-[380px] lg:max-w-[600px]"
            style={{ aspectRatio: "1 / 1", maxHeight: 600 }}
          >
            {/* No bloom behind the sphere. On neutral paper a soft violet
                circle behind violet dots is just a smudge; the globe carries
                its own light. */}
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroGlobe />
            </motion.div>
            {/* Service labels riding an orbit around the sphere (lg+ only).
                pointer-events-none so this overlay never steals the globe's
                drag-to-spin; the pills re-enable events on themselves. */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <GlobeOrbit />
            </motion.div>
          </div>
        </div>

      </div>
      </div>

      {/* ── Lower band: ink ──────────────────────────────────────────────────
          The light/dark mix lives here rather than at the top. Putting the
          dark behind the globe would erase the black graticule, and putting it
          at the top would force the navbar to flip colour mid-hero and break
          the splash seam. This band is the one horizontal strip of the hero
          that holds no globe, so the two requirements stop competing.
          It is normal flow, not an absolute layer, so it grows correctly when
          the stats reflow to 2x2 on phones. */}
      <div className="relative" style={{ borderTop: "1px solid rgba(167,139,250,0.30)" }}>
        {/* haze above the seam so the paper falls into the ink instead of
            hitting a wall — capped low enough not to dull the globe's dots */}
        <div
          className="absolute inset-x-0 pointer-events-none"
          style={{
            bottom: "100%",
            height: 88,
            background:
              /* Neutral fade only. The violet ellipse that used to ride along
                 with it pooled on the paper just above the seam. */
              "linear-gradient(to top, rgba(20,16,31,0.11) 0%, rgba(20,16,31,0.045) 38%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 62% 150% at 14% 118%, rgba(124,58,237,0.30) 0%, rgba(124,58,237,0.10) 46%, transparent 74%), radial-gradient(ellipse 46% 130% at 82% 128%, rgba(167,139,250,0.14) 0%, transparent 68%), linear-gradient(180deg, #1D1636 0%, #17122B 38%, #14101F 100%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative max-w-[1400px] mx-auto px-5 sm:px-8"
          /* The marquee below is rotate(-1.5deg) with margin -12px, so one of
             its top corners sits ~19px lower than its layout box. The extra
             bottom padding keeps ink — not paper — behind that wedge. */
          style={{ paddingTop: 30, paddingBottom: 64 }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4" style={{ maxWidth: "880px" }}>
            {data.stats.map((s) => (
              <div key={s.l} className="hero-stat px-5 py-3 first:pl-0">
                <div style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.1em", color: "#B9B2CC", marginTop: 9 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
