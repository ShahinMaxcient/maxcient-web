/**
 * "Microsoft Solutions Partner" credential badge for page heroes.
 *
 * Glass-on-dark by default, since every hero that carries it sits over a
 * darkened photograph. The Microsoft squares are inline SVG rather than an
 * image file: four rects cost less than a request and stay crisp at any DPI.
 */
export default function PartnerBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2.5 px-4 py-2.5 ${className}`}
      style={{
        background: "rgba(255,255,255,0.12)",
        border: "1px solid rgba(255,255,255,0.22)",
        borderRadius: "5px",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 23 23" aria-hidden="true" className="shrink-0">
        <rect x="0" y="0" width="10.5" height="10.5" fill="#F25022" />
        <rect x="12.5" y="0" width="10.5" height="10.5" fill="#7FBA00" />
        <rect x="0" y="12.5" width="10.5" height="10.5" fill="#00A4EF" />
        <rect x="12.5" y="12.5" width="10.5" height="10.5" fill="#FFB900" />
      </svg>
      <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: "#fff", whiteSpace: "nowrap" }}>
        Microsoft Solutions Partner
      </span>
    </span>
  );
}
