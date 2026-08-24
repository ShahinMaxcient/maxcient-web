"use client";

import { useState } from "react";
import Reveal from "./Reveal";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * "Get in touch" band — mirrors the section at the foot of
 * www.maxcient.com/erp-and-crm. Left: heading + contact details; right: a
 * compact request form that posts to the existing /api/leads endpoint.
 */
export default function GetInTouch({
  email = "hello@maxcient.com",
  phone = "+971 4 329 3710",
  service = "ERP & CRM",
}: {
  email?: string;
  phone?: string;
  service?: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const telHref = `tel:${phone.replace(/[^0-9+]/g, "")}`;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      message: String(fd.get("message") ?? ""),
      service,
    };
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const submitting = status === "submitting";

  return (
    <section className="relative overflow-hidden" style={{ background: "linear-gradient(120deg, #150f2b 0%, #241653 46%, #5b21b6 100%)" }}>
      {/* soft lavender bloom top-right */}
      <div
        className="absolute pointer-events-none"
        style={{ inset: 0, background: "radial-gradient(50% 60% at 88% 8%, rgba(167,139,250,0.28), transparent 60%)" }}
        aria-hidden
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: pitch + contact */}
          <Reveal direction="left">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--primary-light)" }}>Get in touch</span>
            <h2 className="mt-3 ed-display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", lineHeight: 1.1 }}>
              Reach our transformation experts today
            </h2>
            <p className="mt-5 leading-relaxed" style={{ color: "rgba(255,255,255,0.8)", maxWidth: 560 }}>
              Connect with our UAE-based certified consultants specializing in CRM implementation, ERP deployment, and supply chain optimization tailored to the GCC region. Our local experts understand UAE regulatory requirements and regional business practices.
            </p>

            <div className="mt-9 pt-8 space-y-5" style={{ borderTop: "1px solid rgba(255,255,255,0.16)" }}>
              <a href={`mailto:${email}`} className="flex items-center gap-4 group">
                <span className="flex items-center justify-center shrink-0" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", color: "#fbbf24" }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                </span>
                <span className="text-lg font-semibold text-white group-hover:underline">{email}</span>
              </a>
              <a href={telHref} className="flex items-center gap-4 group">
                <span className="flex items-center justify-center shrink-0" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.25)", color: "#fbbf24" }}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                </span>
                <span className="text-lg font-semibold text-white group-hover:underline">{phone}</span>
              </a>
            </div>
          </Reveal>

          {/* Right: request form */}
          <Reveal direction="right" delay={0.1} className="rounded-2xl p-7 lg:p-9" style={{ background: "#FCFBFE", boxShadow: "0 40px 80px -40px rgba(0,0,0,0.5)" }}>
            {status === "success" ? (
              <div className="py-6">
                <h3 className="text-2xl font-bold t-heading">Thank you!</h3>
                <p className="mt-4 t-body">Your request has been received. Our team will reach out within 24 hours.</p>
                <button type="button" onClick={() => setStatus("idle")} className="mt-8 inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline">
                  Send another request
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold t-heading">Request a GAP Analysis report</h3>
                <p className="mt-2 text-sm t-body">Tell us a little about your business and we'll get back to you.</p>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="git-name" className="block text-sm font-medium t-label mb-1.5">Name</label>
                    <input id="git-name" name="name" type="text" required className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all" placeholder="Your name" />
                  </div>
                  <div>
                    <label htmlFor="git-email" className="block text-sm font-medium t-label mb-1.5">Email</label>
                    <input id="git-email" name="email" type="email" required className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all" placeholder="you@company.com" />
                  </div>
                  <div>
                    <label htmlFor="git-message" className="block text-sm font-medium t-label mb-1.5">Message</label>
                    <textarea id="git-message" name="message" rows={4} className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all resize-none" placeholder="How can we help?" />
                  </div>
                  {status === "error" && <p className="text-sm" style={{ color: "#dc2626" }} role="alert">{error}</p>}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full text-white px-8 py-4 rounded-xl text-base font-semibold transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: "linear-gradient(90deg, var(--primary), var(--accent-light))" }}
                  >
                    {submitting ? "Submitting…" : "Request a quote"}
                  </button>
                </form>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
