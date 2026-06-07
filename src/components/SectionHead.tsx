"use client";

import { ReactNode } from "react";

/**
 * SectionHead — editorial two-column section header.
 * Left: mono eyebrow + big display title. Right: lede paragraph.
 */
export default function SectionHead({
  eyebrow,
  title,
  children,
  dark = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  dark?: boolean;
}) {
  return (
    <div className="grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-20 items-end mb-16">
      <div>
        <div className="mb-4" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: dark ? "rgba(245,242,235,0.5)" : "var(--text-muted)" }}>
          <span style={{ color: "var(--primary)" }}>// </span>{eyebrow}
        </div>
        <h2 className="ed-display" style={{ fontSize: "clamp(2.25rem, 4.5vw, 4rem)", color: dark ? "var(--background)" : "var(--text-primary)" }}>
          {title}
        </h2>
      </div>
      {children && (
        <p className="leading-relaxed" style={{ fontSize: "1.05rem", color: dark ? "rgba(245,242,235,0.6)" : "var(--text-muted)", maxWidth: "480px" }}>
          {children}
        </p>
      )}
    </div>
  );
}
