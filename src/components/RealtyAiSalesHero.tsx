"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

interface Props {
  title?: string;
  subtitle?: string;
  image?: string;
}

export default function RealtyAiSalesHero({
  title = "RealtyAI Sales",
  subtitle = "The AI-driven sales engine for real estate — from lead capture to booking, handover, and broker commissions, unified on Microsoft Dynamics 365.",
  image = "/products/realtyai-sales-hero.jpg",
}: Props) {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: "100svh", background: "#0a0a12" }}
    >
      <Image
        src={image}
        alt="RealtyAI Sales — modern real estate"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Left-anchored gradient: keeps the copy legible, lets the property show on the right. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(10,10,18,0.90) 0%, rgba(12,10,28,0.72) 40%, rgba(20,16,44,0.34) 68%, rgba(124,58,237,0.12) 100%)",
        }}
      />

      <div
        className="relative max-w-[1400px] mx-auto px-5 sm:px-8 flex flex-col justify-center"
        style={{ minHeight: "100svh", paddingTop: "128px", paddingBottom: "72px" }}
      >
        <div className="max-w-[720px]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-7"
            style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.9)", textShadow: "0 1px 10px rgba(0,0,0,0.6)" }}
          >
            <span style={{ display: "block", width: 34, height: 1, background: "rgba(255,255,255,0.85)" }} />
            Maxcient — RealtyAI Suite
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="ed-display"
            style={{ fontSize: "clamp(2.75rem, 6.5vw, 5.5rem)", lineHeight: 1.03, fontFamily: "var(--font-geist-sans), system-ui, sans-serif", color: "#fff", filter: "drop-shadow(0 3px 16px rgba(0,0,0,0.5))" }}
          >
            {title === "RealtyAI Sales" ? (
              <>
                Realty<span style={{ color: "var(--primary-light)" }}>AI</span>{" "}
                <span style={{ color: "#fff" }}>Sales</span>
              </>
            ) : (
              <span style={{ color: "#fff" }}>{title}</span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 leading-relaxed"
            style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.9)", maxWidth: "560px", textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex items-center gap-6 flex-wrap"
          >
            <Link
              href="/request-a-consultation"
              className="group inline-flex items-center gap-3 px-8 py-4 transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#FFFFFF", color: "#0a0a12", fontWeight: 600, fontSize: "15px", borderRadius: "4px" }}
            >
              <span>Book a demo</span>
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>

            <a
              href="/brochures/realtyai-sales-brochure.pdf"
              download="RealtyAI-Sales-Brochure.pdf"
              className="inline-flex items-center gap-2.5"
              style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.09em", color: "rgba(255,255,255,0.95)", textShadow: "0 1px 10px rgba(0,0,0,0.6)" }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" /></svg>
              Download brochure
            </a>

            <span
              className="inline-flex items-center gap-2.5 px-4 py-2.5"
              style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", borderRadius: "5px", backdropFilter: "blur(6px)" }}
            >
              <svg width="16" height="16" viewBox="0 0 23 23" aria-hidden="true" className="shrink-0">
                <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
                <rect x="12.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
                <rect x="0" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
                <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
              </svg>
              <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff" }}>
                Microsoft Solutions Partner
              </span>
            </span>
          </motion.div>

          {/* Brochure result stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 grid grid-cols-3 gap-px overflow-hidden"
            style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: "8px", maxWidth: "560px" }}
          >
            {[
              { n: "$3B+", l: "Transactions closed" },
              { n: "40 days", l: "Lead-to-contract" },
              { n: "100+", l: "AI analytical models" },
            ].map((s) => (
              <div key={s.l} className="px-5 py-5" style={{ background: "rgba(8,8,18,0.6)", backdropFilter: "blur(4px)" }}>
                <div style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.02em", color: "#FFFFFF", lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.09em", color: "rgba(255,255,255,0.62)", marginTop: 7 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
