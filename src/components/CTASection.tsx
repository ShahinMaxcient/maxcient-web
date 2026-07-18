"use client";

import Link from "next/link";
import Image from "next/image";

export default function CTASection({ title, subtitle, phone = "+971 4 329 3710", image, ctaText }: { title: string; subtitle: string; phone?: string; image?: string; ctaText?: string }) {
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;
  return (
    <section className="relative overflow-hidden" style={{ background: "#100c20", padding: "128px 0" }}>
      <Image
        src={image || "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2400&q=80"}
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* lavender gradient overlay (matches hero) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(16,12,32,0.93) 0%, rgba(24,16,52,0.86) 45%, rgba(124,58,237,0.55) 100%)",
        }}
      />

      {/* faint grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
        <h2 className="ed-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#FFFFFF" }}>{title}</h2>
        <p className="mx-auto mt-7 leading-relaxed" style={{ fontSize: "1.15rem", color: "rgba(255,255,255,0.8)", maxWidth: "560px" }}>{subtitle}</p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/request-a-consultation"
            className="inline-flex items-center justify-center gap-3 px-9 py-4 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: "#FFFFFF", color: "#100c20", fontWeight: 600, fontSize: "15px", borderRadius: "4px" }}
          >
            {ctaText || "Book a consultation"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <a
            href={telHref}
            className="inline-flex items-center justify-center px-9 py-4 transition-colors duration-200 hover:bg-white/10"
            style={{ background: "transparent", color: "#FFFFFF", border: "1px solid rgba(255,255,255,0.35)", fontWeight: 600, fontSize: "15px", borderRadius: "4px", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.04em" }}
          >
            {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
