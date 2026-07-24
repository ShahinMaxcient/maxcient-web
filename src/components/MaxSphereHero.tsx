"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const GOLD = "#c9a24b";

export default function MaxSphereHero() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100svh", background: "#0b1020" }}>
      {/* Deep navy base with a warm gold glow on the right — mirrors the brochure cover. */}
      <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 82% 42%, rgba(201,162,75,0.20) 0%, rgba(201,162,75,0.06) 26%, rgba(11,16,32,0) 55%), linear-gradient(160deg, #0b1020 0%, #0d1428 60%, #0a0f1e 100%)" }} />

      {/* Concentric orbital rings (the brochure's motif) */}
      <div className="absolute pointer-events-none" style={{ right: "6%", top: "50%", transform: "translateY(-50%)" }}>
        {[520, 380, 250].map((d, i) => (
          <div key={d} className="absolute rounded-full" style={{ width: d, height: d, left: -d / 2, top: -d / 2, border: `1px solid rgba(201,162,75,${0.16 - i * 0.03})` }} />
        ))}
        <div className="absolute rounded-full" style={{ width: 74, height: 74, left: -37, top: -37, background: `radial-gradient(circle, ${GOLD} 0%, #a07d2e 100%)`, boxShadow: `0 0 60px 6px rgba(201,162,75,0.35)` }} />
        <div className="absolute rounded-full" style={{ width: 12, height: 12, left: 122, top: -162, background: GOLD }} />
        <div className="absolute rounded-full" style={{ width: 14, height: 14, left: 214, top: -6, background: "#e6d9b8" }} />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 flex flex-col justify-center" style={{ minHeight: "100svh", paddingTop: "128px", paddingBottom: "72px" }}>
        <div className="max-w-[720px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-7"
            style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.16em", color: GOLD }}
          >
            <span style={{ display: "block", width: 34, height: 1, background: GOLD }} />
            One Platform · Every Journey
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="ed-display"
            style={{ fontSize: "clamp(2.85rem, 6.5vw, 5.75rem)", lineHeight: 1.02, fontFamily: "var(--font-geist-sans), system-ui, sans-serif", color: "#fff" }}
          >
            MaxSphere <span style={{ color: GOLD }}>One</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 leading-relaxed"
            style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.82)", maxWidth: "580px" }}
          >
            The super app for real estate — a deployment-ready mobile and web platform that unifies discovery, sales, tenancy, ownership, payments, facilities and community, over the systems you already run.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex items-center gap-6 flex-wrap"
          >
            <Link href="/request-a-consultation" className="group inline-flex items-center gap-3 px-8 py-4 transition-transform duration-200 hover:-translate-y-0.5" style={{ background: GOLD, color: "#0b1020", fontWeight: 600, fontSize: "15px", borderRadius: "4px" }}>
              <span>Book a demo</span>
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>

            <a href="/brochures/maxsphere-one-brochure.pdf" download="MaxSphere-One-Brochure.pdf" className="inline-flex items-center gap-2.5" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", color: "rgba(255,255,255,0.9)" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" /></svg>
              Download brochure
            </a>

            <span className="inline-flex items-center gap-2.5 px-4 py-2.5" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)", borderRadius: "5px" }}>
              <svg width="16" height="16" viewBox="0 0 23 23" aria-hidden="true" className="shrink-0">
                <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" /><rect x="12.5" y="0" width="10.5" height="10.5" fill="#7FBA00" /><rect x="0" y="12.5" width="10.5" height="10.5" fill="#00A4EF" /><rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
              </svg>
              <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff" }}>Microsoft Solutions Partner</span>
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 grid grid-cols-3 gap-px overflow-hidden"
            style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", maxWidth: "560px" }}
          >
            {[
              { n: "55,000+", l: "Units live in production" },
              { n: "~6 mo", l: "To phased go-live" },
              { n: "7+", l: "Personas, one app" },
            ].map((s) => (
              <div key={s.l} className="px-5 py-5" style={{ background: "rgba(8,12,26,0.62)" }}>
                <div style={{ fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#fff", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.09em", color: "rgba(255,255,255,0.58)", marginTop: 7 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
