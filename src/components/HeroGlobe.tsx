"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

/**
 * three.js is ~150KB gzipped, so the globe is loaded lazily and client-only —
 * it must never sit in the hero's critical path or block first paint.
 */
const Globe = dynamic(() => import("./Globe"), { ssr: false, loading: () => null });

/** The six offices, so the globe says something rather than just spinning. */
const OFFICES = [
  { lat: 25.2048, lng: 55.2708 },  // Dubai
  { lat: 23.5880, lng: 58.3829 },  // Muscat
  { lat: 24.7136, lng: 46.6753 },  // Riyadh
  { lat: 12.9716, lng: 77.5946 },  // Bengaluru
  { lat: 9.9312,  lng: 76.2673 },  // Kochi
  { lat: 53.7960, lng: -1.7594 },  // Bradford
];

export default function HeroGlobe() {
  // `hidden` in CSS would still mount this and pull the three.js chunk, so the
  // decision is made in JS. Reduced-motion gets nothing: a globe that spins
  // forever is precisely what that setting asks us not to render.
  const [state, setState] = useState<{ on: boolean; small: boolean }>({ on: false, small: false });
  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sm = window.matchMedia("(max-width: 1023px)");
    const sync = () => setState({ on: !rm.matches, small: sm.matches });

    // Wait for the browser to go idle before mounting. The three.js chunk is
    // by far the largest asset on the page, and starting it during hydration
    // made it compete for bandwidth in exactly the window where React is
    // attaching its handlers — so a click on a nav link did nothing until it
    // finished. Deferring to idle changes nothing about how the globe looks
    // or behaves; it just stops it blocking the page becoming interactive.
    //
    // requestIdleCallback is unsupported in Safari, hence the timeout branch.
    // The 2000ms deadline is a ceiling, not a delay: on a fast connection idle
    // arrives in a few hundred milliseconds.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const handle = hasIdle
      ? window.requestIdleCallback(sync, { timeout: 2000 })
      : window.setTimeout(sync, 400);

    rm.addEventListener("change", sync);
    sm.addEventListener("change", sync);
    return () => {
      if (hasIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      rm.removeEventListener("change", sync);
      sm.removeEventListener("change", sync);
    };
  }, []);

  if (!state.on) return null;

  return (
    <Globe
      speed={3.5}
      smoothing={8}
      // 86.6% of the (square) canvas — the sphere's projected disc is the
      // silhouette, not the great circle, so this is larger than r/d suggests.
      // Up from 8.4, which drew it at 73.6%.
      scale={9.1}
      maxPixelRatio={state.small ? 1.6 : 2}
      direction="right"
      initialLatitude={16}
      initialLongitude={-30}
      stopOnHover
      showGrid
      oceanColor="rgba(0,0,0,0)"
      graticuleColor="rgba(20,16,31,0.20)"
      gridWidth={1.15}
      gridStep={20}
      // Fewer dots on phones: the sphere is drawn much smaller there, so the
      // extra instances cost frame time without being visible.
      dots={{ color: "#7c3aed", size: 5, density: state.small ? 7 : 8, allDots: false }}
      markerConfig={{ markers: OFFICES, color: "#14101F", size: 24 }}
    />
  );
}
