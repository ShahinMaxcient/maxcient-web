import Link from "next/link";

export default function ComingSoon({ product }: { product: string }) {
  return (
    <section className="py-24 lg:py-32" style={{ background: "var(--background)" }}>
      <div className="max-w-[720px] mx-auto px-5 sm:px-8 text-center">
        <p style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--primary)" }}>
          // Coming Soon
        </p>
        <h2 className="ed-display mt-4" style={{ fontSize: "clamp(1.9rem, 4vw, 2.75rem)", color: "var(--text-primary)" }}>
          We&apos;re putting the finishing touches on {product}.
        </h2>
        <p className="mt-5 leading-relaxed" style={{ fontSize: "1.05rem", color: "var(--text-muted)" }}>
          The full details for this solution are on the way. In the meantime, our team can walk you
          through how {product}{" "}fits your business — book a quick consultation and we&apos;ll show you.
        </p>
        <div className="mt-9 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/request-a-consultation"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 transition-transform duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--text-primary)", color: "var(--background)", fontWeight: 600, fontSize: "15px", borderRadius: "6px" }}
          >
            Book a consultation
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 transition-colors duration-200"
            style={{ border: "1px solid var(--border-strong)", color: "var(--text-primary)", fontWeight: 600, fontSize: "15px", borderRadius: "6px" }}
          >
            Explore other products
          </Link>
        </div>
      </div>
    </section>
  );
}
