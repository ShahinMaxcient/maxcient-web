"use client";

import { useState } from "react";

const SERVICES = [
  "ERP & CRM",
  "Data Analytics",
  "Intelligent Automation",
  "Application Development",
  "Application Management",
  "Smart Teams",
  "RealtyAI",
  "SmartFees",
  "MaxPayroll",
];

type Status = "idle" | "submitting" | "success" | "error";

export default function ConsultationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      company: String(fd.get("company") ?? ""),
      service: String(fd.get("service") ?? ""),
      message: String(fd.get("message") ?? ""),
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

  if (status === "success") {
    return (
      <div>
        <h2 className="text-2xl font-bold t-heading">Thank you!</h2>
        <p className="mt-4 t-body">
          Your request has been received. Our team will reach out within 24 hours to
          schedule your consultation.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center gap-2 text-[var(--primary)] font-semibold hover:underline"
        >
          Submit another request
        </button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <div>
      <h2 className="text-2xl font-bold t-heading">Get in Touch</h2>
      <p className="mt-4 t-body">Our team will reach out within 24 hours to schedule your consultation.</p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium t-label mb-2">Full Name</label>
          <input id="name" name="name" type="text" required className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all" placeholder="Your full name" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium t-label mb-2">Email Address</label>
          <input id="email" name="email" type="email" required className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all" placeholder="you@company.com" />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium t-label mb-2">Phone Number</label>
          <input id="phone" name="phone" type="tel" className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all" placeholder="+971 XX XXX XXXX" />
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium t-label mb-2">Company</label>
          <input id="company" name="company" type="text" className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all" placeholder="Company name" />
        </div>
        <div>
          <label htmlFor="service" className="block text-sm font-medium t-label mb-2">Service Interest</label>
          <select id="service" name="service" defaultValue="" className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all t-body">
            <option value="">Select a service</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium t-label mb-2">Message</label>
          <textarea id="message" name="message" rows={4} className="w-full px-4 py-3 rounded-xl t-input outline-none transition-all resize-none" placeholder="Tell us about your project..." />
        </div>

        {status === "error" && (
          <p className="text-sm" style={{ color: "#dc2626" }} role="alert">{error}</p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] text-white px-8 py-4 rounded-xl text-base font-semibold hover:shadow-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Submitting…" : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
