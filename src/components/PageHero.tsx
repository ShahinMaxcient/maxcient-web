"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--background)", paddingTop: "72px" }}>
      {/* faint grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "80px 80px", opacity: 0.5,
      }} />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 py-16 lg:py-24 grid lg:grid-cols-[1.3fr_1fr] gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-6"
            style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-secondary)" }}
          >
            <span style={{ display: "block", width: 30, height: 1, background: "var(--text-primary)" }} />
            Maxcient — Capabilities
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="ed-display" style={{ fontSize: "clamp(2.75rem, 6vw, 5rem)" }}
          >
            {title}<span style={{ color: "var(--primary)" }}>.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 leading-relaxed" style={{ fontSize: "1.1rem", color: "var(--text-muted)", maxWidth: "540px" }}
          >
            {subtitle}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-9">
            <Link href="/request-a-consultation" className="inline-flex items-center gap-3 px-8 py-3.5"
              style={{ background: "var(--text-primary)", color: "var(--background)", fontWeight: 600, fontSize: "15px", borderRadius: "4px" }}
            >
              Get Started
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>

        {/* image with hard editorial offset frame */}
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:block relative" style={{ aspectRatio: "4/3" }}
        >
          <div className="absolute" style={{ inset: 0, border: "1px solid var(--text-primary)", transform: "translate(16px, 16px)", borderRadius: "6px" }} />
          <div className="relative w-full h-full overflow-hidden" style={{ border: "1px solid var(--border)", borderRadius: "6px" }}>
            <Image src={image} alt={title} fill className="object-cover" priority />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
