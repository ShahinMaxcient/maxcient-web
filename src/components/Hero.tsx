"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { HeroSettings } from "@/lib/settings";
import { DEFAULT_HERO } from "@/lib/settings";

export default function Hero({ data = DEFAULT_HERO }: { data?: HeroSettings }) {
  const telHref = `tel:${data.phone.replace(/[^0-9+]/g, "")}`;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "min(92vh, 900px)", background: "#100c20" }}
    >
      <Image
        src={data.image}
        alt="Maxcient — enterprise technology, delivered"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(16,12,32,0.66) 0%, rgba(18,13,38,0.40) 38%, rgba(30,20,60,0.12) 70%, rgba(124,58,237,0.03) 100%)",
        }}
      />
      {/* Top-down darkening so the transparent navbar stays readable over the sky */}
      <div
        className="absolute inset-x-0 top-0 pointer-events-none"
        style={{ height: "160px", background: "linear-gradient(to bottom, rgba(16,12,32,0.30), transparent)" }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 90% 80% at 30% 40%, black 30%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 80% at 30% 40%, black 30%, transparent 85%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 flex flex-col justify-center" style={{ minHeight: "min(92vh, 900px)", paddingTop: "120px", paddingBottom: "64px" }}>
        <div className="max-w-[760px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-7"
            style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.72)" }}
          >
            <span style={{ display: "block", width: 36, height: 1, background: "rgba(255,255,255,0.9)" }} />
            {data.tagline}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="ed-display"
            style={{ fontSize: "clamp(2.85rem, 6.5vw, 5.75rem)", color: "#FFFFFF", lineHeight: 1.04, fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
          >
            {data.headline.includes("Tech ROI") ? (
              <>Maximize{" "}<span style={{ position: "relative", display: "inline-block" }}><span style={{ position: "relative", zIndex: 1 }}>Tech</span><span style={{ position: "absolute", left: 0, right: 0, bottom: "10%", height: "26%", background: "var(--primary-light)", transform: "skewX(-3deg)", zIndex: 0, opacity: 0.85 }} /></span>{" "}ROI<span style={{ color: "var(--primary-light)" }}>.</span></>
            ) : (
              <>{data.headline}</>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 leading-relaxed"
            style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.82)", maxWidth: "560px" }}
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex items-center gap-7 flex-wrap"
          >
            <Link
              href="/request-a-consultation"
              className="group inline-flex items-center gap-3 px-8 py-4 transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#FFFFFF", color: "#100c20", fontWeight: 600, fontSize: "15px", borderRadius: "4px" }}
            >
              <span>{data.ctaText}</span>
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link
              href="#services"
              className="inline-flex items-center gap-2"
              style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.85)" }}
            >
              {data.ctaSecondary}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>

            <a href={telHref} className="group inline-flex items-center gap-3">
              <span className="flex items-center justify-center shrink-0 transition-colors" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.3)", color: "#fbbf24" }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="block" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.12em", color: "rgba(255,255,255,0.65)" }}>Call us</span>
                <span className="block" style={{ fontWeight: 600, fontSize: "15px", color: "#FFFFFF" }}>{data.phone}</span>
              </span>
            </a>

            {data.badge && (
              <span
                className="inline-flex items-center gap-2.5 px-4 py-2.5"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "5px", backdropFilter: "blur(6px)" }}
              >
                <svg width="16" height="16" viewBox="0 0 23 23" aria-hidden="true" className="shrink-0">
                  <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
                  <rect x="12.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
                  <rect x="0" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
                  <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
                </svg>
                <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff" }}>
                  {data.badge}
                </span>
              </span>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden"
          style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "8px", maxWidth: "760px" }}
        >
          {data.stats.map((s) => (
            <div key={s.l} className="px-5 py-5" style={{ background: "rgba(16,12,32,0.55)", backdropFilter: "blur(4px)" }}>
              <div style={{ fontSize: "1.85rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "10.5px", textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(255,255,255,0.62)", marginTop: 7 }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
