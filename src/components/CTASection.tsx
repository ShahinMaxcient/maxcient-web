"use client";

import Link from "next/link";

function CTACube({ pos, size = 80, anim }: { pos: React.CSSProperties; size?: number; anim: string }) {
  const z = size / 2;
  const faces = [
    `translateZ(${z}px)`, `rotateY(180deg) translateZ(${z}px)`, `rotateY(-90deg) translateZ(${z}px)`,
    `rotateY(90deg) translateZ(${z}px)`, `rotateX(90deg) translateZ(${z}px)`, `rotateX(-90deg) translateZ(${z}px)`,
  ];
  return (
    <div style={{ position: "absolute", width: size, height: size, perspective: 600, ...pos, animation: anim }}>
      <div style={{ position: "relative", width: "100%", height: "100%", transformStyle: "preserve-3d", animation: "ed-cube-spin 30s linear infinite" }}>
        {faces.map((t, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, border: "1.5px solid rgba(245,242,235,0.25)", background: i === 3 ? "var(--primary)" : "transparent", borderColor: i === 3 ? "var(--primary)" : "rgba(245,242,235,0.25)", transform: t }} />
        ))}
      </div>
    </div>
  );
}

export default function CTASection({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--text-primary)", padding: "120px 0" }}>
      {/* grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(245,242,235,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(245,242,235,0.07) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 80%)",
      }} />
      {/* floating cubes */}
      <div className="hidden md:block">
        <CTACube pos={{ top: "18%", left: "8%" }} anim="ed-float-a 8s ease-in-out infinite" />
        <CTACube pos={{ bottom: "16%", right: "10%" }} anim="ed-float-b 9s ease-in-out infinite" />
        <CTACube pos={{ top: "60%", left: "14%" }} size={50} anim="ed-float-a 10s ease-in-out infinite reverse" />
      </div>

      <div className="relative max-w-[1100px] mx-auto px-5 sm:px-8 text-center">
        <h2 className="ed-display" style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--background)" }}>{title}</h2>
        <p className="mx-auto mt-7 leading-relaxed" style={{ fontSize: "1.15rem", color: "rgba(245,242,235,0.65)", maxWidth: "540px" }}>{subtitle}</p>
        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/request-a-consultation" className="inline-flex items-center justify-center gap-3 px-9 py-4 transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--background)", color: "var(--text-primary)", fontWeight: 600, fontSize: "15px", borderRadius: "4px" }}
          >
            Book a consultation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <a href="tel:+97143293710" className="inline-flex items-center justify-center px-9 py-4 transition-all duration-200"
            style={{ background: "transparent", color: "var(--background)", border: "1px solid rgba(245,242,235,0.25)", fontWeight: 600, fontSize: "15px", borderRadius: "4px", fontFamily: "var(--font-geist-mono), monospace", letterSpacing: "0.04em" }}
          >
            +971 4 329 3710
          </a>
        </div>
      </div>
    </section>
  );
}
