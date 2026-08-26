"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";

/**
 * Translucent "request a demo" card for product-page heroes.
 *
 * Sits on the dark hero photograph, so the panel itself is glass while the
 * inputs stay near-opaque — a fully transparent field is unreadable against a
 * busy image. Posts to the same /api/leads endpoint as the consultation form,
 * tagged `product-demo` so the two are distinguishable in the admin list.
 */
export default function HeroDemoCard({
  product,
  heading,
  intro,
  cta,
}: {
  product: string;
  heading?: string;
  intro?: string;
  cta?: string;
}) {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") || ""),
          email: String(data.get("email") || ""),
          message: String(data.get("message") || ""),
          service: product,
          source: "product-demo",
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || "We couldn't submit your request.");
      }
      form.reset();
      setState("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setState("error");
    }
  }

  const label: React.CSSProperties = {
    display: "block",
    fontSize: 13,
    fontWeight: 600,
    color: "#FFFFFF",
    marginBottom: 7,
  };
  const field: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.94)",
    border: "1px solid rgba(255,255,255,0.5)",
    borderRadius: 4,
    padding: "11px 13px",
    color: "#14101F",
    outline: "none",
    // font-size lives in CSS, not here: phones need >=16px to stop iOS zooming
    // on focus, and an inline style cannot carry a media query.
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="mx-demo-card w-full"
      style={{
        background: "rgba(255,255,255,0.13)",
        border: "1px solid rgba(255,255,255,0.26)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: 8,
        padding: "clamp(22px, 3vw, 34px)",
        boxShadow: "0 30px 70px -34px rgba(0,0,0,0.7)",
      }}
    >
      <h2
        className="ed-display"
        style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.05rem)", lineHeight: 1.12, fontWeight: 800, color: "#FFFFFF", letterSpacing: "-0.02em" }}
      >
        {heading || `Request Your Free ${product} Demo`}
      </h2>
      <p className="mt-3 leading-relaxed" style={{ fontSize: "0.92rem", color: "rgba(255,255,255,0.82)" }}>
        {intro || `Tell us how you work today and we'll tailor the ${product} walkthrough to your business — no generic slide deck.`}
      </p>

      {state === "sent" ? (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 p-4"
          style={{ background: "rgba(255,255,255,0.16)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 6 }}
        >
          <svg className="w-5 h-5 shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <p style={{ fontSize: "0.92rem", color: "#fff", lineHeight: 1.5 }}>
            Thanks — your request is in. A Maxcient consultant will be in touch shortly to arrange your {product} demo.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-6" noValidate={false}>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor={`demo-name-${product}`} style={label}>Name</label>
              <input id={`demo-name-${product}`} name="name" type="text" required autoComplete="name" placeholder="Name" style={field} />
            </div>
            <div>
              <label htmlFor={`demo-email-${product}`} style={label}>Email</label>
              <input id={`demo-email-${product}`} name="email" type="email" required autoComplete="email" placeholder="Email" style={field} />
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor={`demo-msg-${product}`} style={label}>Message</label>
            <textarea id={`demo-msg-${product}`} name="message" rows={4} placeholder="Message" style={{ ...field, resize: "vertical", minHeight: 104 }} />
          </div>

          {state === "error" && error && (
            <p role="alert" className="mt-3" style={{ fontSize: "0.85rem", color: "#FFD9D9" }}>{error}</p>
          )}

          <button
            type="submit"
            disabled={state === "sending"}
            className="mx-demo-submit mt-5 w-full inline-flex items-center justify-center gap-2"
            style={{
              background: "var(--primary)",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
              padding: "14px 20px",
              borderRadius: 4,
              cursor: state === "sending" ? "not-allowed" : "pointer",
              opacity: state === "sending" ? 0.75 : 1,
            }}
          >
            {state === "sending" ? "Sending…" : (cta || `Book Your ${product} Demo`)}
            {state !== "sending" && (
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            )}
          </button>
        </form>
      )}
    </motion.div>
  );
}
