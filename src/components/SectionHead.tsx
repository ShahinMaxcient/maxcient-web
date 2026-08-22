"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import BrandMark from "./BrandMark";

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
        <motion.div
          className="mb-4"
          style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: dark ? "rgba(245,242,235,0.5)" : "var(--text-muted)" }}
          initial={{ opacity: 0, x: -8 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "0px 0px -18% 0px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <BrandMark />{eyebrow}
        </motion.div>
        {typeof title === "string" ? (
          /* String titles get the masked word-by-word reveal. */
          <AnimatedText
            as="h2"
            text={title}
            delay={0.08}
            className="ed-display"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.9rem)", color: dark ? "var(--background)" : "var(--text-primary)" }}
          />
        ) : (
          <h2 className="ed-display" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.9rem)", color: dark ? "var(--background)" : "var(--text-primary)" }}>
            {title}
          </h2>
        )}
      </div>
      {children && (
        <motion.p
          className="leading-relaxed"
          style={{ fontSize: "0.95rem", color: dark ? "rgba(245,242,235,0.6)" : "var(--text-muted)", maxWidth: "480px" }}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -18% 0px" }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.p>
      )}
    </div>
  );
}
