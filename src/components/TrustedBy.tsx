"use client";

import Image from "next/image";
import SectionReveal from "./SectionReveal";

type ClientItem = { name: string; logo: string };
type SectionHeaderProps = { eyebrow?: string; title?: string; body?: string };

export default function TrustedBy({ clients, header }: { clients: ClientItem[]; header?: SectionHeaderProps }) {
  return (
    <section className="py-14 lg:py-16" style={{ background: "var(--surface-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <p className="text-center" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
            <span style={{ color: "var(--primary)" }}>// </span>{header?.title || "Trusted by UAE’s leading enterprises"}
          </p>
        </SectionReveal>

        {/* Logos come from many brands with different backgrounds (white,
            black, brand-coloured blocks), so each sits on its own white tile —
            uniform and legible against the lavender band. */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {clients.map((c, i) => (
            <SectionReveal key={c.name} delay={(i % 5) * 0.05}>
              <div
                className="flex items-center justify-center transition-shadow duration-300 hover:shadow-md"
                style={{ height: 96, padding: "14px 18px", background: "#FFFFFF", border: "1px solid var(--border)", borderRadius: 10 }}
              >
                <Image
                  src={c.logo}
                  alt={c.name}
                  width={200}
                  height={100}
                  className="ed-client-logo"
                  style={{ width: "auto", height: "auto", maxHeight: 56, maxWidth: "100%", objectFit: "contain" }}
                />
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
