"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";

export interface GridImage {
  src: string;
  label?: string;
}

interface InteractiveGridProps {
  images: GridImage[];
  columns?: number;
  rows?: number;
  gap?: number;
  rounded?: number;
  /** 1-10; percentage of the card the logo fills (x20). */
  logoScale?: number;
  cardFill?: string;
  cardBorder?: string;
  shadow?: boolean;
  cardShadow?: string;
  glow?: boolean;
  glowStart?: string;
  glowEnd?: string;
  glowIntensity?: number;
  perspective?: number;
  rotateX?: number;
  rotateY?: number;
  /** Height of each card relative to its width. */
  cardAspect?: number;
  style?: CSSProperties;
}

const MAX_GLOW_BLUR = 16;
const DURATION = 200;
const LEAVE_DELAY = 200;
const NS = "mx-grid";

const CSS = `
.${NS}-card { transition: all ${DURATION}ms; }
.${NS}-shadow {
  box-shadow: 2px 2px 5px var(--ag-shadow), 3px 3px 10px var(--ag-shadow), 6px 6px 20px var(--ag-shadow);
}
.${NS}-card img { opacity: .72; transition: all ${DURATION}ms; shape-rendering: geometricPrecision; }
.${NS}-card:hover img { opacity: 1; }
.${NS}-small { transform: scale(1.05) translate(-5px) translateY(-5px) translateZ(0); }
.${NS}-big   { transform: scale(1.15) translate(-20px) translateY(-20px) translateZ(15px); }
.${NS}-glow-big   { animation: ${NS}-glow 1.5s ease-in-out infinite alternate; }
.${NS}-glow-small { animation: ${NS}-glow-sm 1.5s ease-in-out infinite alternate; }
@keyframes ${NS}-glow {
  0% { filter: drop-shadow(0 0 2px var(--ag-glow-start)); }
  to { filter: drop-shadow(0 1px var(--ag-glow-blur) var(--ag-glow-end)); }
}
@keyframes ${NS}-glow-sm {
  0% { filter: drop-shadow(0 0 2px var(--ag-glow-start)); }
  to { filter: drop-shadow(0 1px var(--ag-glow-blur-small) var(--ag-glow-start)); }
}
/* Touch devices have no hover, so the dim-until-hover state would strand the
   logos permanently faded — show them at full strength instead. */
@media (hover: none) {
  .${NS}-card img { opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .${NS}-card, .${NS}-card img { transition: none !important; }
  .${NS}-big, .${NS}-small { transform: none !important; }
  .${NS}-glow-big, .${NS}-glow-small { animation: none !important; }
}
`;

export default function InteractiveGrid({
  images,
  columns = 6,
  rows = 4,
  gap = 19,
  rounded = 10,
  logoScale = 4,
  cardFill = "#FFFFFF",
  cardBorder = "rgba(124,58,237,0.16)",
  shadow = false,
  cardShadow = "rgba(124,58,237,0.18)",
  glow = true,
  glowStart = "#a78bfa",
  glowEnd = "#7c3aed",
  glowIntensity = 55,
  perspective = 1600,
  rotateX = 0,
  rotateY = 0,
  cardAspect = 0.6,
  style,
}: InteractiveGridProps) {
  const items = useMemo(() => images.filter((i) => i?.src), [images]);

  // Responsive layout — always enough cells for every logo, no repeats.
  const hostRef = useRef<HTMLDivElement>(null);
  const [cols, setCols] = useState(columns);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () => {
      const w = host.clientWidth || 1;
      // Phones get two logos per row: at three the marks were shrinking below
      // the point where a wordmark stays legible.
      setCols(w < 440 ? 2 : w < 560 ? 3 : w < 700 ? 4 : w < 820 ? 5 : columns);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => ro.disconnect();
  }, [columns]);

  const rowCount = Math.max(1, Math.ceil(items.length / cols));
  const count = items.length;

  // Size the grid from its own width so cards keep their proportions.
  const [cardH, setCardH] = useState(0);
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const measure = () => {
      const w = host.clientWidth || 1;
      setCardH(Math.round(((w - gap * (cols - 1)) / cols) * cardAspect));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    return () => ro.disconnect();
  }, [cols, gap, cardAspect]);

  const [hovered, setHovered] = useState<number | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); }, []);

  const neighbours = useMemo(() => {
    if (hovered === null) return [];
    const out: number[] = [];
    if (hovered % cols !== 0) out.push(hovered - 1);
    if (hovered % cols !== cols - 1) out.push(hovered + 1);
    out.push(hovered - cols, hovered + cols);
    return out.filter((n) => n >= 0 && n < count);
  }, [hovered, cols, count]);

  const onEnter = (i: number) => {
    if (leaveTimer.current) { clearTimeout(leaveTimer.current); leaveTimer.current = null; }
    setHovered(i);
  };
  const onLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => setHovered(null), LEAVE_DELAY);
  };

  const glowBlur = (Math.min(100, Math.max(0, glowIntensity)) / 100) * MAX_GLOW_BLUR;
  const logoPct = Math.min(10, Math.max(1, Math.round(logoScale))) * 20;

  return (
    <div
      ref={hostRef}
      style={{
        ...style,
        position: "relative",
        width: "100%",
        boxSizing: "border-box",
        "--ag-shadow": cardShadow,
        "--ag-glow-start": glowStart,
        "--ag-glow-end": glowEnd,
        "--ag-glow-blur": `${glowBlur.toFixed(1)}px`,
        "--ag-glow-blur-small": `${(glowBlur / 2).toFixed(1)}px`,
      } as CSSProperties}
    >
      <style>{CSS}</style>
      <div
        onPointerLeave={onLeave}
        style={{
          // Flex-wrap rather than grid: with 20 logos across 6 columns the
          // final row holds only 2, and flex lets that row centre instead of
          // hanging off to the left.
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignContent: "center",
          gap,
          width: "100%",
          transform: `perspective(${perspective}px) rotateX(${rotateY}deg) rotateY(${rotateX}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        {items.map((img, i) => {
          const isBig = hovered === i;
          const isSmall = !isBig && neighbours.includes(i);
          return (
            <div
              key={i}
              onPointerEnter={() => onEnter(i)}
              className={[
                `${NS}-card`,
                shadow && `${NS}-shadow`,
                isBig && `${NS}-big`,
                isSmall && `${NS}-small`,
                glow && isBig && `${NS}-glow-big`,
                glow && isSmall && `${NS}-glow-small`,
              ].filter(Boolean).join(" ")}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "16px 12px",
                background: cardFill,
                border: `1px solid ${cardBorder}`,
                borderRadius: rounded,
                boxSizing: "border-box",
                flex: `0 0 calc((100% - ${(cols - 1) * gap}px) / ${cols})`,
                height: cardH ? `${cardH}px` : undefined,
                minWidth: 0,
                minHeight: 0,
                overflow: "visible",
                zIndex: isBig ? count + 1 : i + 1,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.label ?? ""}
                draggable={false}
                loading="lazy"
                style={{
                  width: `${logoPct}%`,
                  height: `${logoPct}%`,
                  objectFit: "contain",
                  display: "block",
                  margin: "0 auto",
                  userSelect: "none",
                  pointerEvents: "none",
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
