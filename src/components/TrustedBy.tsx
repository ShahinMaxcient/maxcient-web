"use client";

import SectionReveal from "./SectionReveal";
import InteractiveGrid from "./InteractiveGrid";
import BrandMark from "./BrandMark";

type ClientItem = { name: string; logo: string };
type SectionHeaderProps = { eyebrow?: string; title?: string; body?: string };

export default function TrustedBy({ clients, header }: { clients: ClientItem[]; header?: SectionHeaderProps }) {
  return (
    <section
      className="py-14 lg:py-16"
      style={{ background: "var(--surface-alt)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <p className="text-center" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
            <BrandMark />{header?.title || "Trusted by UAE’s leading enterprises"}
          </p>
        </SectionReveal>

        {/* Interactive logo grid — hovering a logo lifts it and nudges its
            neighbours. Logos are transparent PNGs sitting straight on the band
            (no card), 6 across on desktop down to 3. */}
        <SectionReveal>
          <div className="mt-10">
            <InteractiveGrid
              images={clients.map((c) => ({ src: c.logo, label: c.name }))}
              columns={6}
              gap={16}
              rounded={10}
              logoScale={3}
              cardAspect={0.58}
              cardFill="transparent"
              cardBorder="transparent"
              glow={false}
            />
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
