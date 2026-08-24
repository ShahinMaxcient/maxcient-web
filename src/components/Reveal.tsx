"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useState, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-entrance animation in maxcient.com's vocabulary (fadeInUp / fadeInDown
 * / fadeInLeft / fadeInRight). `direction` is where the element travels from.
 *
 * Horizontal slides (left/right) only run on lg+ screens, where the section's
 * 32px gutter absorbs the 28px travel; on narrow screens they fall back to a
 * vertical rise so a hidden element never pokes past the viewport edge and
 * creates a horizontal scrollbar. (The page can't simply be clipped — clipping
 * breaks the IntersectionObserver these animations depend on.) Reduced motion
 * collapses to a plain fade.
 */
type Direction = "up" | "down" | "left" | "right" | "none";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  distance,
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

  // Horizontal slides need desktop room. Default (SSR + mobile) is vertical.
  const [wide, setWide] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const wantsHorizontal = direction === "left" || direction === "right";
  const dir: Direction = wantsHorizontal && !wide ? "up" : direction;
  const d = distance ?? (dir === "left" || dir === "right" ? 28 : 40);
  const offset =
    dir === "up" ? { y: d }
    : dir === "down" ? { y: -d }
    : dir === "left" ? { x: -d }
    : dir === "right" ? { x: d }
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
