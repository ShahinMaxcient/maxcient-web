"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function PageFAQ({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-14 lg:py-16" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: "var(--accent)" }}>FAQ</span>
          <h2 className="mt-4 text-3xl font-bold" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`rounded-2xl transition-all duration-300 ${
                openIndex === index
                  ? "glass shadow-lg shadow-indigo-500/5"
                  : "glass-light"
              }`}
              style={{ boxShadow: "var(--shadow)" }}
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold transition-colors" style={{ color: openIndex === index ? "var(--primary)" : "var(--text-primary)" }}>
                  {faq.question}
                </span>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${openIndex === index ? "bg-[var(--primary)] text-white rotate-180" : ""}`}
                  style={openIndex !== index ? { background: "var(--surface)", color: "var(--text-muted)" } : undefined}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="px-6 pb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
