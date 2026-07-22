"use client";

import Image from "next/image";
import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";
import Link from "next/link";

type ServiceCard = { num: string; title: string; desc: string; href: string; span: string; variant: string };

/* ---- Icon set (Lucide-style line icons) + a color per service theme ---- */
const ICONS: Record<string, { color: string; img: string; path: React.ReactNode }> = {
  crm: { color: "#7c3aed", img: "/services/crm.jpg", path: (<><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>) },
  automation: { color: "#db2777", img: "/services/automation.jpg", path: <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /> },
  analytics: { color: "#2563eb", img: "/services/analytics.jpg", path: (<><path d="M3 3v18h18" /><rect x="7" y="11" width="3" height="6" rx="0.5" /><rect x="12" y="7" width="3" height="10" rx="0.5" /><rect x="17" y="13" width="3" height="4" rx="0.5" /></>) },
  development: { color: "#0891b2", img: "/services/development.jpg", path: (<><path d="m16 18 6-6-6-6" /><path d="m8 6-6 6 6 6" /></>) },
  management: { color: "#059669", img: "/services/management.jpg", path: (<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></>) },
  team: { color: "#d97706", img: "/services/team.jpg", path: (<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>) },
  cloud: { color: "#0284c7", img: "/services/cloud.jpg", path: <path d="M17.5 19a4.5 4.5 0 0 0 .5-9h-1.26A7 7 0 1 0 5 15.5" /> },
  default: { color: "#7c3aed", img: "/services/crm.jpg", path: (<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 9h6v6H9z" /></>) },
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => {
            const ico = pickIcon(s.title);
            return (
              <SectionReveal key={s.title} delay={(i % 3) * 0.06}>
                <Link href={s.href} className="block h-full">
                  <div
                    className="ed-service-card group relative h-full overflow-hidden flex flex-col"
                    style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px" }}
                  >
                    {/* image header */}
                    <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
                      <Image
                        src={ico.img}
                        alt={s.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(16,12,32,0.55), rgba(16,12,32,0.08) 60%)" }} />
                      {/* icon chip */}
                      <span
                        className="absolute flex items-center justify-center"
                        style={{ left: 16, bottom: 16, width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.92)", color: ico.color, backdropFilter: "blur(4px)" }}
                      >
                        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          {ico.path}
                        </svg>
                      </span>
                      {/* arrow */}
                      <span
                        className="ed-service-arrow absolute flex items-center justify-center"
                        style={{ right: 16, top: 16, width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.92)", color: "#14101f" }}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </span>
                    </div>

                    {/* body */}
                    <div className="flex flex-col flex-1" style={{ padding: "22px 24px 24px" }}>
                      <div style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)", marginBottom: 8 }}>{s.num}</div>
                      <h3 style={{ fontSize: "1.3rem", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2, marginBottom: 10, color: "var(--text-primary)" }}>{s.title}</h3>
                      <p style={{ fontSize: "13.5px", lineHeight: 1.6, color: "var(--text-muted)" }}>{s.desc}</p>
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
