"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export type OrbitItem = { label: string; href: string };

/**
 * The six service pillars, in the same order and wording as the header menu.
 * Labels are deliberately short — they ride a ~46%-radius orbit and must not
 * spill past the globe's square container.
 */
const SERVICES: OrbitItem[] = [
  { label: "ERP & CRM", href: "/erp-and-crm" },
  { label: "Data Analytics", href: "/data-analytics" },
  { label: "Automation", href: "/intelligent-automation" },
  { label: "App Development", href: "/application-development" },
  { label: "App Management", href: "/application-management" },
  { label: "Smart Teams", href: "/dedicated-development-team" },
];

// One full orbit in ~33s, matching the globe's own rotation period (speed 3.5)
// so the labels read as travelling *with* the sphere rather than against it.
const ORBIT_MS = 33000;
const SPEED = (Math.PI * 2) / ORBIT_MS;

// Ellipse radii as a fraction of the container. The globe's disc is ~86% of
// the square (radius 43%), so 46%/30% rides the rim: labels cross in front of
// the sphere low and pass behind it high.
const RX = 0.46;
const RY = 0.3;

/**
 * Service labels orbiting the hero globe.
 *
 * Positions are written straight to the DOM from one rAF loop rather than
 * through React state — six transform updates a frame should not cost six
 * re-renders. Depth is faked with opacity/scale/blur instead of real z-order:
 * the globe is a sparse dot sphere on a transparent canvas, so a faded label
 * drawn over it still reads as being behind it, and that avoids splitting the
 * ring across two stacking contexts.
 */
export default function GlobeOrbit({ items = SERVICES }: { items?: OrbitItem[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const pausedRef = useRef(false);

  // Mirrors HeroGlobe's gating: no globe (reduced motion) means nothing to
  // orbit, and below lg the sphere is too small to ring without crowding it.
  const [show, setShow] = useState(false);
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sm = window.matchMedia("(max-width: 1023px)");
    const sync = () => setShow(!rm.matches && !sm.matches);
    sync();
    rm.addEventListener("change", sync);
    sm.addEventListener("change", sync);
    return () => { rm.removeEventListener("change", sync); sm.removeEventListener("change", sync); };
  }, []);

  useEffect(() => {
    if (!show) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let angle = -Math.PI / 2;
    let last = 0;
    let raf = 0;

    // Measured unscaled once; the pills' text never changes after mount.
    let halfWidest = 0;
    let halfTallest = 0;
    for (const el of nodeRefs.current) {
      if (!el) continue;
      halfWidest = Math.max(halfWidest, el.offsetWidth / 2);
      halfTallest = Math.max(halfTallest, el.offsetHeight / 2);
    }

    const tick = (t: number) => {
      if (last === 0) last = t;
      if (!pausedRef.current) angle += (t - last) * SPEED;
      last = t;

      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      // Clamp the ellipse so the widest pill can never swing outside the globe's
      // own square. Without this the left of the orbit reaches into the copy
      // column between lg and xl, where the column is only ~460px wide.
      const rx = Math.min(w * RX, w / 2 - halfWidest - 4);
      const ry = Math.min(h * RY, h / 2 - halfTallest - 4);
      const n = items.length;

      for (let i = 0; i < n; i++) {
        const el = nodeRefs.current[i];
        if (!el) continue;
        const th = angle + (i / n) * Math.PI * 2;
        const depth = Math.sin(th);            // +1 nearest the viewer, -1 furthest
        const k = (depth + 1) / 2;             // 0 (back) … 1 (front)
        const x = Math.cos(th) * rx;
        const y = depth * ry;                  // front swings low, back rides high
        el.style.transform = `translate(-50%, -50%) translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) scale(${(0.84 + 0.16 * k).toFixed(3)})`;
        el.style.opacity = (0.32 + 0.68 * k).toFixed(3);
        el.style.zIndex = depth > 0 ? "30" : "5";
        el.style.filter = depth < -0.35 ? "blur(0.7px)" : "none";
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show, items]);

  if (!show) return null;

  return (
    // The layer itself must stay transparent to the pointer or it would eat the
    // globe's drag-to-spin; only the pills take events.
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none" aria-label="Our services">
      {items.map((it, i) => (
        <Link
          key={it.href}
          href={it.href}
          ref={(el) => { nodeRefs.current[i] = el; }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          onFocus={() => { pausedRef.current = true; }}
          onBlur={() => { pausedRef.current = false; }}
          className="mx-orbit-pill pointer-events-auto absolute left-1/2 top-1/2 inline-flex items-center gap-2 whitespace-nowrap"
          style={{
            padding: "7px 14px",
            borderRadius: 999,
            background: "rgba(255,255,255,0.94)",
            border: "1px solid var(--border-strong)",
            boxShadow: "0 10px 26px -16px rgba(20,16,40,0.55)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "-0.005em",
            color: "var(--text-primary)",
            willChange: "transform, opacity",
          }}
        >
          <span aria-hidden="true" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--primary)", flexShrink: 0 }} />
          {it.label}
        </Link>
      ))}
    </div>
  );
}
