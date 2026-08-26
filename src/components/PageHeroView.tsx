"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
  /** Optional 3–5 line supporting paragraph shown beneath the tagline. */
  description?: string;
}

/**
 * Full-bleed hero used by every service / industry / technology / product page.
 * The image spans the full viewport width behind the copy, matching the
 * cinematic treatment of the homepage and flagship product heroes.
 */
export default function PageHeroView({ title, subtitle, image, description }: PageHeroProps) {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "100svh", background: "#0a0a12" }}>
      <Image src={image} alt={title} fill priority className="object-cover" sizes="100vw" />

      {/* Left-anchored gradient keeps the copy legible while the photo shows through on the right */}
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
            className="inline-flex items-center gap-3 mb-6"
            style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.9)", textShadow: "0 1px 10px rgba(0,0,0,0.6)" }}
          >
            <span style={{ display: "block", width: 34, height: 1, background: "rgba(255,255,255,0.85)" }} />
            Maxcient — Capabilities
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="ed-display"
            style={{ fontSize: "clamp(2.3rem, 5vw, 4.2rem)", lineHeight: 1.03, color: "#fff", filter: "drop-shadow(0 3px 16px rgba(0,0,0,0.5))" }}
          >
            {title}<span style={{ color: "var(--primary-light)" }}>.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-6 leading-relaxed"
            style={{ fontSize: "1.02rem", color: "rgba(255,255,255,0.9)", maxWidth: "560px", textShadow: "0 1px 12px rgba(0,0,0,0.6)" }}
          >
            {subtitle}
          </motion.p>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28 }}
              className="mt-5 leading-relaxed"
              style={{ fontSize: "0.95rem", color: "rgba(255,255,255,0.74)", maxWidth: "600px", textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.36 }}
            className="mt-10"
          >
            <Link
              href="/request-a-consultation"
              className="inline-flex items-center gap-3 px-8 py-4 transition-transform duration-200 hover:-translate-y-0.5"
              style={{ background: "#FFFFFF", color: "#0a0a12", fontWeight: 600, fontSize: "14px", borderRadius: "4px" }}
            >
              Get Started
              <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
