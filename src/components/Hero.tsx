"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

const Face = ({ cls, z, accent }: { cls: string; z: number; accent?: boolean }) => (
  <div className={`ed-face ${accent ? "accent" : ""}`} style={{ transform: cls.replace("Z", `Z(${z}px)`) }} />
);

function Cube({ size = 90, z = 45 }: { size?: number; z?: number }) {
  return (
    <div className="ed-scene" style={{ position: "relative", width: size, height: size, animation: "ed-cube-spin 18s linear infinite" }}>
      <Face cls="translateZ" z={z} />
      <Face cls="rotateY(180deg) translateZ" z={z} />
      <Face cls="rotateY(-90deg) translateZ" z={z} />
      <Face cls="rotateY(90deg) translateZ" z={z} accent />
      <Face cls="rotateX(90deg) translateZ" z={z} />
      <Face cls="rotateX(-90deg) translateZ" z={z} />
    </div>
  );
}

export default function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLElement>) => {
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / r.width;
    const y = (e.clientY - r.top - r.height / 2) / r.height;
    stage.style.transform = `perspective(1400px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
  };
  const handleLeave = () => {
    if (stageRef.current) stageRef.current.style.transform = "";
  };

  // sphere longitude rings
  const longitudes = [0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5];
  const latitudes = [
    { w: 360, m: 0 }, { w: 300, m: 30 }, { w: 240, m: 60 }, { w: 170, m: 95 }, { w: 90, m: 135 },
  ];

  return (
    <section
      className="relative min-h-screen overflow-hidden"
      style={{ background: "var(--background)", paddingTop: "120px" }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* faint grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 20%, transparent 70%)",
        opacity: 0.6,
      }} />

      <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center" style={{ minHeight: "calc(100vh - 120px)" }}>
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
            style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
          >
            Maximize<br />
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ position: "relative", zIndex: 1 }}>Tech</span>
              <span style={{ position: "absolute", left: 0, right: 0, bottom: "10%", height: "26%", background: "var(--primary)", transform: "skewX(-3deg)", zIndex: 0 }} />
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
            <Link href="/request-a-consultation" className="group relative inline-flex items-center gap-3 overflow-hidden px-8 py-4"
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
            className="mt-16 flex gap-12 flex-wrap"
          >
            {[{ n: "06", l: "Global Offices" }, { n: "5/5", l: "Client Rating" }, { n: "98%", l: "Satisfaction" }].map((s) => (
              <div key={s.l}>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, letterSpacing: "-0.02em", color: "var(--text-primary)" }}>{s.n}</div>
                <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)", marginTop: 4 }}>{s.l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — 3D stage */}
        <div className="hidden lg:flex items-center justify-center" style={{ height: 600, perspective: "1400px" }}>
          <div ref={stageRef} className="ed-scene" style={{ position: "relative", width: "100%", height: "100%", transition: "transform 0.2s ease-out" }}>
            {/* wireframe sphere */}
            <div className="ed-scene" style={{ position: "absolute", top: "50%", left: "50%", width: 360, height: 360, transform: "translate(-50%,-50%)", animation: "ed-sphere-spin 22s linear infinite" }}>
              {longitudes.map((ry, i) => (
                <div key={`lon${i}`} style={{
                  position: "absolute", top: "50%", left: "50%", width: 360, height: 360, borderRadius: "50%",
                  border: `${i === 2 ? 2 : 1.5}px solid ${i === 2 ? "var(--primary)" : "var(--text-primary)"}`,
                  opacity: i === 2 ? 0.9 : 0.5,
                  transform: `translate(-50%,-50%) rotateY(${ry}deg)`,
                }} />
              ))}
              {latitudes.map((lat, i) => (
                <div key={`lat${i}`} style={{
                  position: "absolute", top: "50%", left: "50%", width: lat.w, height: lat.w, borderRadius: "50%",
                  border: "1.5px solid var(--text-primary)", opacity: 0.28,
                  transform: `translate(-50%,-50%) rotateX(90deg)`,
                }} />
              ))}
            </div>

            {/* floating cube */}
            <div style={{ position: "absolute", top: "10%", right: "6%", animation: "ed-float-a 6s ease-in-out infinite" }}>
              <Cube size={90} z={45} />
            </div>

            {/* pyramid */}
            <div style={{ position: "absolute", bottom: "16%", left: "4%", animation: "ed-float-b 7.5s ease-in-out infinite" }}>
              <div className="ed-scene" style={{ position: "relative", width: 80, height: 80, animation: "ed-pyr-spin 14s linear infinite" }}>
                {[
                  { r: "rotateY(0deg) translateZ(28px)", a: false },
                  { r: "rotateY(90deg) translateZ(28px)", a: true },
                  { r: "rotateY(180deg) translateZ(28px)", a: false },
                  { r: "rotateY(270deg) translateZ(28px)", a: true },
                ].map((p, i) => (
                  <div key={i} style={{
                    position: "absolute", left: "50%", top: 0, width: 0, height: 0, marginLeft: -40,
                    borderLeft: "40px solid transparent", borderRight: "40px solid transparent",
                    borderBottom: `70px solid ${p.a ? "var(--primary)" : "var(--text-primary)"}`,
                    transformOrigin: "50% 100%", transform: p.r,
                  }} />
                ))}
              </div>
            </div>

            {/* tags */}
            <div className="ed-tag" style={tagStyle("8%", null, null, "4%")}>
              <span style={dotStyle("#00C781")} /> MICROSOFT GOLD PARTNER
            </div>
            <div className="ed-tag" style={tagStyle(null, "8%", "4%", null)}>
              <span style={dotStyle("var(--primary)")} /> 100% ON-TIME DELIVERY
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function tagStyle(top: string | null, bottom: string | null, right: string | null, left: string | null): React.CSSProperties {
  return {
    position: "absolute",
    ...(top ? { top } : {}), ...(bottom ? { bottom } : {}),
    ...(right ? { right } : {}), ...(left ? { left } : {}),
    padding: "10px 14px", background: "var(--surface)", border: "1px solid var(--border-strong)",
    fontFamily: "var(--font-geist-mono), monospace", fontSize: "10.5px", fontWeight: 600,
    textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-primary)",
    borderRadius: "3px", display: "flex", alignItems: "center", gap: "8px",
    boxShadow: "var(--shadow-hard)", animation: "ed-float-a 5s ease-in-out infinite",
  };
}
function dotStyle(bg: string): React.CSSProperties {
  return { width: 8, height: 8, background: bg, borderRadius: "50%", display: "block" };
}
