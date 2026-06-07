"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: "var(--background)", paddingTop: "120px", paddingBottom: "80px" }}
    >
      {/* faint grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 75%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 75%)",
        opacity: 0.6,
      }} />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.15fr_1fr] gap-12 lg:gap-16 items-center">
        {/* Left */}
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-7"
            style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-secondary)" }}
          >
            <span style={{ display: "block", width: 36, height: 1, background: "var(--text-primary)" }} />
            EST · 2017 — DUBAI · UAE
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="ed-display"
            style={{ fontSize: "clamp(2.75rem, 6vw, 5.25rem)" }}
          >
            Maximize{" "}
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ position: "relative", zIndex: 1 }}>Tech</span>
              <span style={{ position: "absolute", left: 0, right: 0, bottom: "10%", height: "26%", background: "var(--primary-light)", transform: "skewX(-3deg)", zIndex: 0 }} />
            </span>{" "}
            ROI<span style={{ color: "var(--primary)" }}>.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-7 leading-relaxed" style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "520px" }}
          >
            A digital enabler for the UAE &amp; GCC. We build enterprise systems with Microsoft
            Dynamics 365, Power Platform, Azure, AI, and blockchain — delivered by a senior team
            across 6 global offices.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex items-center gap-7 flex-wrap"
          >
            <Link href="/request-a-consultation" className="group relative inline-flex items-center gap-3 overflow-hidden px-8 py-4 transition-colors duration-200"
              style={{ background: "var(--text-primary)", color: "var(--background)", fontWeight: 600, fontSize: "15px", borderRadius: "4px" }}
            >
              <span className="relative z-10">Book a consultation</span>
              <svg className="relative z-10 w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <Link href="#services" className="inline-flex items-center gap-2"
              style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-secondary)" }}
            >
              See our work
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
            </Link>
          </motion.div>

          {/* meta stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-14 flex gap-12 flex-wrap"
          >
            {[{ n: "06", l: "Global Offices" }, { n: "5/5", l: "Client Rating" }, { n: "98%", l: "Satisfaction" }].map((s) => (
              <div key={s.l}>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>{s.n}</div>
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — professional image with editorial frame + static cards */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="relative" style={{ aspectRatio: "4/3.4" }}
        >
          {/* offset accent frame */}
          <div className="absolute hidden sm:block" style={{ inset: 0, border: "1px solid var(--text-primary)", transform: "translate(18px, 18px)", borderRadius: "6px" }} />

          {/* image */}
          <div className="relative w-full h-full overflow-hidden" style={{ border: "1px solid var(--border)", borderRadius: "6px" }}>
            <Image
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80"
              alt="Maxcient enterprise technology team"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* trust badge — Microsoft Gold Partner */}
          <div className="absolute -top-4 -left-4 sm:-left-5 flex items-center gap-2.5 px-4 py-3"
            style={{ background: "var(--surface)", border: "1px solid var(--border-strong)", borderRadius: "5px", boxShadow: "var(--shadow-hard)" }}
          >
            <span className="flex items-center justify-center" style={{ width: 22, height: 22, borderRadius: "50%", background: "#00C781", color: "#fff" }}>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            </span>
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-primary)" }}>
              Microsoft Gold Partner
            </span>
          </div>

          {/* stat card — projects delivered */}
          <div className="absolute -bottom-5 -right-3 sm:-right-5 px-5 py-4"
            style={{ background: "var(--primary-light)", color: "var(--foreground)", borderRadius: "5px", boxShadow: "var(--shadow)" }}
          >
            <div style={{ fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1 }}>120<span style={{ opacity: 0.7 }}>+</span></div>
            <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 5, opacity: 0.85 }}>
              Projects Delivered
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
