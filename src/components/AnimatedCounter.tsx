"use client";

import { useInView, useReducedMotion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

/**
 * Counts up to `target` the first time it scrolls into view.
 * Reduced motion skips straight to the final number rather than ticking.
 */
export default function AnimatedCounter({
  target,
  suffix = "",
  duration = 1800,
}: {
  target: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView || reduce) return;
    let start = 0;
    let raf = 0;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target, reduce, duration]);

  // Reduced motion renders the final figure outright rather than ticking to it.
  return <span ref={ref}>{reduce ? target : count}{suffix}</span>;
}
