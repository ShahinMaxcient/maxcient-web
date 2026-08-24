"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";

export type ProcessStep = { title: string; body: string };

/**
 * "Our Process" as a scroll-linked timeline: a connector line fills as the
 * section scrolls through the viewport, and each numbered node lights up when
 * the progress reaches it. Horizontal on desktop, vertical on mobile.
 * Reduced motion → everything shown active, no scroll dependence.
 */
export default function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const n = steps.length;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 55%"],
  });

  // How many nodes have been "reached" by the advancing line.
  const [active, setActive] = useState(reduce ? n : 1);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (reduce) return;
    setActive(Math.max(1, Math.min(n, Math.floor(v * (n - 1) + 1.25))));
  });

  const nodeStyle = (on: boolean): React.CSSProperties => ({
    width: 54,
    height: 54,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "var(--font-geist-mono), monospace",
    fontWeight: 700,
    fontSize: "1rem",
    transition: "background-color .5s ease, color .5s ease, border-color .5s ease, transform .5s ease, box-shadow .5s ease",
    background: on ? "var(--primary)" : "var(--surface)",
    color: on ? "#fff" : "var(--text-muted)",
    border: `2px solid ${on ? "var(--primary)" : "var(--border-strong)"}`,
    transform: on ? "scale(1)" : "scale(0.9)",
    boxShadow: on ? "0 10px 24px -8px rgba(124,58,237,0.55)" : "none",
  });

  return (
    <div ref={ref}>
      {/* ── Desktop: horizontal timeline ── */}
      <div className="hidden lg:block relative">
        {/* track + progress fill run through the node centres */}
        <div className="absolute h-[3px] rounded-full" style={{ top: 26, left: "12.5%", right: "12.5%", background: "var(--border-strong)" }} aria-hidden />
        <motion.div
          className="absolute h-[3px] rounded-full origin-left"
          style={{ top: 26, left: "12.5%", right: "12.5%", background: "var(--primary)", scaleX: reduce ? 1 : scrollYProgress }}
          aria-hidden
        />
        <ol className="grid grid-cols-4 gap-6 relative">
          {steps.map((s, i) => (
            <li key={s.title} className="text-center px-2 list-none">
              <div className="mx-auto" style={nodeStyle(i < active)}>{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-5 text-base font-bold t-heading">{s.title}</h3>
              <p className="mt-2 text-sm t-body leading-relaxed">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {/* ── Mobile / tablet: vertical timeline ── */}
      <ol className="lg:hidden space-y-0">
        {steps.map((s, i) => {
          const on = i < active;
          const nextOn = i + 1 < active;
          return (
            <li key={s.title} className="relative flex gap-5 list-none pb-9 last:pb-0">
              {/* connector segment from this node down to the next */}
              {i < n - 1 && (
                <>
                  <span className="absolute w-[3px] rounded-full" style={{ left: 26, top: 54, bottom: 0, transform: "translateX(-50%)", background: "var(--border-strong)" }} aria-hidden />
                  <span
                    className="absolute w-[3px] rounded-full"
                    style={{ left: 26, top: 54, bottom: 0, background: "var(--primary)", transformOrigin: "top", transition: "transform .5s ease", transform: `translateX(-50%) scaleY(${nextOn || reduce ? 1 : 0})` }}
                    aria-hidden
                  />
                </>
              )}
              <div className="shrink-0 relative z-10" style={nodeStyle(on)}>{String(i + 1).padStart(2, "0")}</div>
              <div className="pt-2.5">
                <h3 className="text-base font-bold t-heading">{s.title}</h3>
                <p className="mt-1.5 text-sm t-body leading-relaxed">{s.body}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
