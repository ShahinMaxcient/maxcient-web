"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Fragment, type CSSProperties, type ReactNode } from "react";

type Trigger = "mount" | "inView";

type Props = {
  /** Plain text — split and revealed word by word. */
  text?: string;
  /** Pre-built word nodes, for headlines with styled words. Wins over `text`. */
  words?: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  className?: string;
  style?: CSSProperties;
  /** Seconds before the first word moves. */
  delay?: number;
  /** Seconds between consecutive words. */
  stagger?: number;
  trigger?: Trigger;
};

/**
 * Masked word reveal: each word sits in an overflow-hidden box and slides up
 * into place, staggered. The mask is padded so descenders (g, y, p) are never
 * clipped. Falls back to a plain fade when the visitor prefers reduced motion.
 */
export default function AnimatedText({
  text,
  words,
  as = "div",
  className = "",
  style,
  delay = 0,
  stagger = 0.055,
  trigger = "inView",
}: Props) {
  const reduce = useReducedMotion();
  const items: ReactNode[] = words ?? (text ? text.split(/\s+/).filter(Boolean) : []);
  if (items.length === 0) return null;

  const Tag = motion[as] as typeof motion.div;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger, delayChildren: delay } },
  };

  // Overshoot slightly past the mask so nothing peeks before it animates.
  const word: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.4 } } }
    : {
        hidden: { y: "115%" },
        show: { y: "0%", transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] } },
      };

  const animateProps =
    trigger === "mount"
      ? { animate: "show" as const }
      : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -18% 0px" } };

  return (
    <Tag
      className={className}
      style={style}
      variants={container}
      initial="hidden"
      {...animateProps}
    >
      {items.map((w, i) => (
        <Fragment key={i}>
          {/* mask: clips the word until it slides in */}
          <span
            style={{
              display: "inline-block",
              overflow: "hidden",
              verticalAlign: "bottom",
              paddingBottom: "0.14em",
              marginBottom: "-0.14em",
            }}
          >
            <motion.span variants={word} style={{ display: "inline-block", willChange: "transform" }}>
              {w}
            </motion.span>
          </span>
          {i < items.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}
