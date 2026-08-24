"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll-entrance animation, matching the vocabulary maxcient.com uses
 * (fadeInUp / fadeInDown / fadeInLeft / fadeInRight). `direction` is where the
 * element travels FROM:
 *   up    → rises into place (starts lower)   — fadeInUp
 *   down  → drops into place (starts higher)  — fadeInDown
 *   left  → enters from the left              — fadeInLeft
 *   right → enters from the right             — fadeInRight
 *   none  → fade only
 * Reveals once, when scrolled into view. Reduced-motion collapses to a plain
 * fade so the site still animates gently without any movement.
 */
type Direction = "up" | "down" | "left" | "right" | "none";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  distance = 44,
  duration = 0.7,
  className = "",
  style,
  as = "div",
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  as?: "div" | "section" | "li" | "span";
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as] as typeof motion.div;

  const offset =
    direction === "up" ? { y: distance }
    : direction === "down" ? { y: -distance }
    : direction === "left" ? { x: -distance }
    : direction === "right" ? { x: distance }
    : {};

  const variants: Variants = reduce
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.45 } } }
    : {
        hidden: { opacity: 0, ...offset },
        show: { opacity: 1, x: 0, y: 0, transition: { duration, delay, ease: EASE } },
      };

  return (
    <Tag
      className={className}
      style={style}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      {children}
    </Tag>
  );
}
