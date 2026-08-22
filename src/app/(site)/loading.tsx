/**
 * Route loader. Next.js shows this the moment a navigation starts and keeps it
 * until the server render streams in. It sits inside the (site) layout, so the
 * header stays on screen above it the whole time.
 */
export default function Loading() {
  return (
    <div
      aria-busy="true"
      aria-live="polite"
      style={{
        minHeight: "78vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background)",
      }}
    >
      <span className="sr-only">Loading…</span>
      <div className="mx-loader" role="img" aria-label="Loading" />
    </div>
  );
}
