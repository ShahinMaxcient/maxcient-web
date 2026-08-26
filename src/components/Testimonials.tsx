"use client";

import Image from "next/image";
import Reveal from "./Reveal";
import AnimatedCounter from "./AnimatedCounter";

type TestimonialCard = { tag: string; quote: string; rating: number };
type SectionHeaderProps = { eyebrow?: string; title?: string; body?: string };
type WhoWeAreProps = { image: string; badgeValue: number; badgeSuffix: string; badgeLabel: string };

/** Gold rating stars, matching www.maxcient.com's treatment for this band. */
function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center justify-center gap-1" aria-label={`Rated ${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill={i < n ? "#F5B301" : "var(--border-strong)"} aria-hidden="true">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

/** Outline mark above each value: a star for trust, an award ribbon for success. */
function ValueIcon({ tag }: { tag: string }) {
  const n = tag.toLowerCase();
  const p = {
    className: "w-8 h-8 mx-auto",
    fill: "none",
    stroke: "var(--primary)",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    viewBox: "0 0 24 24",
  };
  if (n.includes("success") || n.includes("growth") || n.includes("partner"))
    return (
      <svg {...p}>
        <circle cx="12" cy="9" r="6" />
        <path d="M8.2 14.2 7 22l5-2.6L17 22l-1.2-7.8" />
      </svg>
    );
  return (
    <svg {...p}>
      <path d="M12 2.5 15 9l7 .6-5.3 4.6 1.6 6.9L12 17.5 5.7 21.1l1.6-6.9L2 9.6 9 9z" />
    </svg>
  );
}

export default function Testimonials({
  cards,
  header,
  whoWeAre,
}: {
  cards: TestimonialCard[];
  header?: SectionHeaderProps;
  whoWeAre?: WhoWeAreProps;
}) {
  return (
    <section id="who-we-are" className="py-20 lg:py-28" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy + values */}
          <Reveal direction="left">
            <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--primary)" }}>
              {header?.eyebrow || "Who We Are"}
            </span>
            <h2
              className="mt-4 ed-display"
              style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)", lineHeight: 1.08, fontWeight: 800, letterSpacing: "-0.025em", color: "var(--text-primary)" }}
            >
              {header?.title || "Enterprise technology, powered by values and experience."}
            </h2>
            <p className="mt-6 leading-relaxed" style={{ fontSize: "1.02rem", color: "var(--text-muted)", maxWidth: "560px" }}>
              {header?.body || "We know the tech world inside out. Trust us to bring top-notch solutions backed by solid experience and real values."}
            </p>

            <div className="wwa-grid mt-10 grid grid-cols-1 sm:grid-cols-2" style={{ borderTop: "1px solid var(--border)" }}>
              {cards.map((c) => (
                <div key={c.tag} className="px-4 py-8 text-center">
                  <ValueIcon tag={c.tag} />
                  <div className="mt-4">
                    <Stars n={c.rating} />
                  </div>
                  <h3 className="mt-4 font-bold" style={{ fontSize: "1.05rem", color: "var(--text-primary)" }}>{c.tag}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{c.quote}</p>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Image + experience badge */}
          {whoWeAre?.image && (
            <Reveal direction="right" delay={0.08}>
              <div className="relative">
                <div className="relative overflow-hidden" style={{ borderRadius: 6, boxShadow: "0 30px 60px -34px rgba(20,16,40,0.45)" }}>
                  <Image
                    src={whoWeAre.image}
                    alt="Maxcient consultants meeting enterprise clients in Dubai"
                    width={1200}
                    height={1200}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="w-full h-auto block"
                  />
                </div>
                {/* Badge sits inside the frame's bottom-right, as on maxcient.com */}
                <div
                  className="absolute"
                  style={{ right: "clamp(14px, 3%, 30px)", bottom: "clamp(14px, 6%, 42px)", background: "var(--primary)", padding: "16px 26px", borderRadius: 2, boxShadow: "0 16px 34px -16px rgba(124,58,237,0.75)" }}
                >
                  <div style={{ fontSize: "clamp(1.9rem, 3vw, 2.6rem)", fontWeight: 800, lineHeight: 1, letterSpacing: "-0.02em", color: "#FFFFFF" }}>
                    <AnimatedCounter target={whoWeAre.badgeValue} suffix={whoWeAre.badgeSuffix} />
                  </div>
                  <div className="mt-2" style={{ fontSize: "0.9rem", fontWeight: 600, lineHeight: 1.3, color: "rgba(255,255,255,0.92)", maxWidth: "8.5em" }}>
                    {whoWeAre.badgeLabel}
                  </div>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
