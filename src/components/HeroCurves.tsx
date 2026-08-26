/**
 * Continuous light-trail curves sweeping the hero from edge to edge, passing
 * behind the globe.
 *
 * SVG rather than a baked image: the hero spans the full viewport, so a raster
 * would either band on wide screens or ship a needlessly large file — and the
 * strokes need to stay hairline-crisp at any width. `slice` keeps the curve
 * geometry undistorted while still covering.
 *
 * The reference for this is a dark hero with glowing trails; on this light
 * ground the same idea has to run at much lower opacity, or it competes with
 * the globe's dots — which is the one thing this hero cannot afford.
 */
export default function HeroCurves() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          {/* Trails fade out at both ends so they read as passing through the
              frame rather than starting and stopping at the edges. */}
          <linearGradient id="hcA" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#A78BFA" stopOpacity="0" />
            <stop offset="22%" stopColor="#A78BFA" stopOpacity="0.55" />
            <stop offset="55%" stopColor="#7C3AED" stopOpacity="0.62" />
            <stop offset="82%" stopColor="#A78BFA" stopOpacity="0.42" />
            <stop offset="100%" stopColor="#A78BFA" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="hcB" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#C4B5FD" stopOpacity="0" />
            <stop offset="30%" stopColor="#C4B5FD" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#A78BFA" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#C4B5FD" stopOpacity="0" />
          </linearGradient>
          <filter id="hcGlow" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
          <filter id="hcSparkGlow" x="-30%" y="-60%" width="160%" height="220%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>
        </defs>

        {/* The band is pitched to the globe's lower third — its visible base
            sits near y=684 in this viewBox — so the trails cross beneath the
            sphere rather than over its face, where they would read as clutter
            across the dot field.

            Soft glow pass, then the crisp stroke over it: the two together are
            what make a thin line read as luminous rather than merely thin. */}
        <g filter="url(#hcGlow)" opacity="0.5">
          <path d="M-60 700 C 300 640, 560 556, 880 596 S 1220 664, 1500 588" stroke="url(#hcA)" strokeWidth="7" />
          <path d="M-60 756 C 320 708, 600 622, 920 654 S 1250 714, 1500 646" stroke="url(#hcB)" strokeWidth="6" />
        </g>

        <path d="M-60 700 C 300 640, 560 556, 880 596 S 1220 664, 1500 588" stroke="url(#hcA)" strokeWidth="1.6" />
        <path d="M-60 756 C 320 708, 600 622, 920 654 S 1250 714, 1500 646" stroke="url(#hcB)" strokeWidth="1.3" />
        <path d="M-60 642 C 280 588, 520 512, 840 546 S 1200 608, 1500 534" stroke="url(#hcB)" strokeWidth="1" opacity="0.7" />
        <path d="M-60 792 C 340 752, 640 676, 960 704 S 1268 754, 1500 700" stroke="url(#hcA)" strokeWidth="1" opacity="0.55" />

        {/* A bright packet travelling each trail. `pathLength="1"` normalises
            every curve to the same 0–1 space, so one dash pattern and one
            keyframe work across paths of different real lengths — no measuring,
            and the speeds stay comparable. Staggered durations keep them from
            marching in lockstep. */}
        <g className="hc-sparks" filter="url(#hcSparkGlow)">
          <path className="hc-spark" pathLength={1} strokeDasharray="0.1 0.9" style={{ animationDuration: "9s" }}
            d="M-60 700 C 300 640, 560 556, 880 596 S 1220 664, 1500 588" stroke="#8B5CF6" strokeWidth="2.6" strokeLinecap="round" />
          <path className="hc-spark" pathLength={1} strokeDasharray="0.08 0.92" style={{ animationDuration: "12s", animationDelay: "-3s" }}
            d="M-60 756 C 320 708, 600 622, 920 654 S 1250 714, 1500 646" stroke="#A78BFA" strokeWidth="2.2" strokeLinecap="round" />
          <path className="hc-spark" pathLength={1} strokeDasharray="0.06 0.94" style={{ animationDuration: "15s", animationDelay: "-7s" }}
            d="M-60 642 C 280 588, 520 512, 840 546 S 1200 608, 1500 534" stroke="#C4B5FD" strokeWidth="1.8" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
