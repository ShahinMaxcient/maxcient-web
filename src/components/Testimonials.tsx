"use client";

import SectionReveal from "./SectionReveal";
import SectionHead from "./SectionHead";

const cards = [
  {
    tag: "Trusted by customers",
    quote: "To our happy customers, we are a technology partner — not just a vendor.",
    rating: 5,
  },
  {
    tag: "Customer success",
    quote: "Collaborative growth through trusted, mutually beneficial partnerships.",
    rating: 5,
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex items-center gap-1" aria-label={`Rated ${n} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="w-4 h-4" viewBox="0 0 24 24" fill={i < n ? "var(--primary)" : "var(--border-strong)"} aria-hidden="true">
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section id="who-we-are" className="py-20 lg:py-28" style={{ background: "var(--background)" }}>
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8">
        <SectionReveal>
          <SectionHead eyebrow="Who We Are" title={<>Powered by values<br />and experience.</>}>
            We know the tech world inside out. Trust us to bring top-notch solutions backed by solid
            experience and real values — for our customers, we are a partner, not just a vendor.
          </SectionHead>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {cards.map((c, i) => (
            <SectionReveal key={c.tag} delay={i * 0.08}>
              <div className="h-full p-8 lg:p-10 flex flex-col justify-between" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "6px" }}>
                <div>
                  <div className="mb-5" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--text-muted)" }}>
                    <span style={{ color: "var(--primary)" }}>// </span>{c.tag}
                  </div>
                  <p className="leading-relaxed" style={{ fontSize: "1.35rem", fontWeight: 600, letterSpacing: "-0.01em", color: "var(--text-primary)" }}>
                    “{c.quote}”
                  </p>
                </div>
                <div className="mt-8 flex items-center gap-3">
                  <Stars n={c.rating} />
                  <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--text-muted)" }}>
                    Rated {c.rating}/5
                  </span>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
