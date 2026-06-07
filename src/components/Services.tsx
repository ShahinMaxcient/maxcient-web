"use client";

import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";
import Link from "next/link";

const services = [
  { num: "01 — FLAGSHIP", title: "ERP & CRM Implementation on Microsoft Dynamics 365", desc: "Streamline operations and unify your customer view with end-to-end D365 implementations, configured for UAE compliance and tailored to your industry workflows.", href: "/erp-and-crm", span: "lg:col-span-3 lg:row-span-2", variant: "flagship" },
  { num: "02", title: "Intelligent Automation", desc: "Smart automation across Power Platform, AI agents, and IoT triggers.", href: "/intelligent-automation", span: "lg:col-span-3", variant: "accent" },
  { num: "03", title: "Data Analytics", desc: "Unified dashboards, real-time KPIs.", href: "/data-analytics", span: "lg:col-span-2", variant: "default" },
  { num: "04", title: "Application Development", desc: "Custom systems with React, .NET, and Azure.", href: "/application-development", span: "lg:col-span-2", variant: "dark" },
  { num: "05", title: "Application Management", desc: "24/7 managed services and SRE.", href: "/application-management", span: "lg:col-span-2", variant: "default" },
  { num: "06", title: "Smart Teams", desc: "Dedicated offshore engineering pods.", href: "/dedicated-development-team", span: "lg:col-span-3", variant: "default" },
  { num: "+", title: "Cloud & IoT", desc: "Azure architecture, edge compute, telemetry.", href: "/iot-internet-of-things", span: "lg:col-span-3", variant: "default" },
];

function CardShape({ kind }: { kind: "ring" | "cube" }) {
  if (kind === "ring") {
    return (
      <div style={{ position: "absolute", top: 24, right: 24, width: 56, height: 56, perspective: 400 }}>
        <div style={{ position: "absolute", inset: 0, border: "2px solid currentColor", borderRadius: "50%", animation: "ed-bring-spin 12s linear infinite", transformStyle: "preserve-3d" }}>
          <div style={{ position: "absolute", inset: 0, border: "2px solid currentColor", borderRadius: "50%", transform: "rotateY(60deg)", opacity: 0.6 }} />
          <div style={{ position: "absolute", inset: 0, border: "2px solid currentColor", borderRadius: "50%", transform: "rotateY(120deg)", opacity: 0.35 }} />
        </div>
      </div>
    );
  }
  return (
    <div style={{ position: "absolute", top: 24, right: 24, width: 56, height: 56, perspective: 400 }}>
      <div style={{ position: "relative", width: 36, height: 36, margin: 10, transformStyle: "preserve-3d", animation: "ed-cube-spin 14s linear infinite" }}>
        {["translateZ(18px)", "rotateY(180deg) translateZ(18px)", "rotateY(-90deg) translateZ(18px)", "rotateY(90deg) translateZ(18px)", "rotateX(90deg) translateZ(18px)", "rotateX(-90deg) translateZ(18px)"].map((t, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, border: "1.5px solid currentColor", transform: t }} />
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-20 lg:py-28" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow="Our Services" title={<>Six capabilities,<br />one partner.</>}>
            We cover the full lifecycle of enterprise systems — from strategy and platform
            selection through implementation, integration, and ongoing managed services.
          </SectionHead>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3.5 lg:auto-rows-[220px]">
          {services.map((s, i) => {
            const isFlagship = s.variant === "flagship";
            const isAccent = s.variant === "accent";
            const isDark = s.variant === "dark";
            const bg = isAccent ? "var(--primary-light)" : isDark ? "var(--text-primary)" : "var(--surface)";
            const fg = isAccent ? "var(--foreground)" : isDark ? "var(--background)" : "var(--text-primary)";
            const shapeKind = i % 2 === 0 ? "ring" : "cube";
            return (
              <SectionReveal key={s.title} delay={i * 0.05} className={s.span}>
                <Link href={s.href} className="block h-full">
                  <div className="relative h-full overflow-hidden flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1.5"
                    style={{ background: bg, color: fg, border: `1px solid ${isAccent || isDark ? "transparent" : "var(--border)"}`, borderRadius: "6px", padding: "28px" }}
                  >
                    <div style={{ color: fg }}><CardShape kind={shapeKind} /></div>
                    <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.55 }}>{s.num}</div>
                    <div>
                      <h3 style={{ fontSize: isFlagship ? "1.8rem" : "1.4rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.12, marginBottom: 10 }}>{s.title}</h3>
                      <p style={{ fontSize: "13.5px", lineHeight: 1.55, opacity: 0.78, maxWidth: isFlagship ? "440px" : "none" }}>{s.desc}</p>
                    </div>
                  </div>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
