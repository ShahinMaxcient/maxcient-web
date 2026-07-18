"use client";

import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";
import Link from "next/link";

type ServiceCard = { num: string; title: string; desc: string; href: string; span: string; variant: string };

/* ---- Icon set (Lucide-style line icons) + a color per service theme ---- */
const ICONS: Record<string, { color: string; path: React.ReactNode }> = {
  crm: { color: "#7c3aed", path: (<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>) },
  automation: { color: "#db2777", path: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /> },
  analytics: { color: "#2563eb", path: (<><path d="M3 3v18h18" /><rect x="7" y="11" width="3" height="6" rx="0.5" /><rect x="12" y="7" width="3" height="10" rx="0.5" /><rect x="17" y="13" width="3" height="4" rx="0.5" /></>) },
  development: { color: "#0891b2", path: (<><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></>) },
  management: { color: "#059669", path: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>) },
  team: { color: "#d97706", path: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>) },
  cloud: { color: "#0284c7", path: <path d="M17.5 19a4.5 4.5 0 0 0 .5-9h-1.26A7 7 0 1 0 5 15.5" /> },
  default: { color: "#7c3aed", path: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" /></>) },
};

function pickIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes("crm") || t.includes("erp")) return ICONS.crm;
  if (t.includes("automation")) return ICONS.automation;
  if (t.includes("analytic") || t.includes("data")) return ICONS.analytics;
  if (t.includes("management") || t.includes("manage") || t.includes("support")) return ICONS.management;
  if (t.includes("development") || t.includes("develop") || t.includes("application dev")) return ICONS.development;
  if (t.includes("team") || t.includes("smart")) return ICONS.team;
  if (t.includes("cloud") || t.includes("iot")) return ICONS.cloud;
  return ICONS.default;
}

type SectionHeaderProps = { eyebrow?: string; title?: string; body?: string };

export default function Services({ services, header }: { services: ServiceCard[]; header?: SectionHeaderProps }) {
  return (
    <section id="services" className="py-20 lg:py-28" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow={header?.eyebrow || "Our Services"} title={header?.title || "Six capabilities, one partner."}>
            {header?.body || "We cover the full lifecycle of enterprise systems — from strategy and platform selection through implementation, integration, and ongoing managed services."}
          </SectionHead>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-3.5 lg:auto-rows-[220px]">
          {services.map((s, i) => {
            const isFlagship = s.variant === "flagship";
            const isAccent = s.variant === "accent";
            const isDark = s.variant === "dark";
            const onColorBg = isAccent || isDark; // lavender or dark card → keep icon white
            const bg = isAccent ? "var(--primary-light)" : isDark ? "var(--text-primary)" : "var(--surface)";
            const fg = isAccent ? "var(--foreground)" : isDark ? "var(--background)" : "var(--text-primary)";
            const borderColor = onColorBg ? "transparent" : "var(--border)";

            const ico = pickIcon(s.title);
            const chipBg = onColorBg ? "rgba(255,255,255,0.18)" : `${ico.color}14`;
            const iconColor = onColorBg ? (isAccent ? "#FFFFFF" : "#FFFFFF") : ico.color;

            return (
              <SectionReveal key={s.title} delay={i * 0.05} className={s.span}>
                <Link href={s.href} className="block h-full">
                  <div
                    className="ed-service-card group relative h-full overflow-hidden flex flex-col justify-between"
                    style={{ background: bg, color: fg, border: `1px solid ${borderColor}`, borderRadius: "8px", padding: "28px" }}
                  >
                    {/* top row: colored icon chip + arrow */}
                    <div className="flex items-start justify-between">
                      <span
                        className="flex items-center justify-center shrink-0"
                        style={{ width: isFlagship ? 56 : 48, height: isFlagship ? 56 : 48, borderRadius: 14, background: chipBg, color: iconColor }}
                      >
                        <svg width={isFlagship ? 28 : 24} height={isFlagship ? 28 : 24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          {ico.path}
                        </svg>
                      </span>
                      <span
                        className="ed-service-arrow flex items-center justify-center shrink-0"
                        style={{ width: 36, height: 36, borderRadius: "50%", border: `1px solid ${onColorBg ? "rgba(255,255,255,0.35)" : "var(--border-strong)"}`, color: fg }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>

                    <div>
                      <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", opacity: 0.55, marginBottom: 8 }}>{s.num}</div>
                      <h3 style={{ fontSize: isFlagship ? "1.85rem" : "1.4rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.12, marginBottom: 10 }}>{s.title}</h3>
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
