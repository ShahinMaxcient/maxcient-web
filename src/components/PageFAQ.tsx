"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FAQItem {
  question: string;
  answer: string;
}

export default function PageFAQ({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 lg:py-24" style={{ background: "var(--surface-alt)" }}>
      <div className="max-w-[1100px] mx-auto px-5 sm:px-8">
        <div className="mb-12">
          <div className="mb-4" style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "11.5px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--text-muted)" }}>
            <span style={{ color: "var(--primary)" }}>// </span>FAQ
          </div>
          <h2 className="ed-display" style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>Frequently asked.</h2>
        </div>

        <div style={{ borderTop: "1px solid var(--border)" }}>
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={index} style={{ borderBottom: "1px solid var(--border)" }}>
                <button className="w-full py-6 text-left flex items-center justify-between gap-6" onClick={() => setOpenIndex(open ? null : index)}>
                  <span className="flex items-baseline gap-5">
                    <span style={{ fontFamily: "var(--font-geist-mono), monospace", fontSize: "12px", color: "var(--primary)", fontWeight: 600 }}>{String(index + 1).padStart(2, "0")}</span>
                    <span style={{ fontSize: "1.1rem", fontWeight: 600, letterSpacing: "-0.01em", color: open ? "var(--primary)" : "var(--text-primary)", transition: "color 0.2s" }}>{faq.question}</span>
                  </span>
                  <span className="shrink-0 flex items-center justify-center transition-transform duration-300" style={{ width: 30, height: 30, border: "1px solid var(--border-strong)", borderRadius: "50%", color: "var(--text-primary)", transform: open ? "rotate(45deg)" : "rotate(0)" }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                  </span>
                </button>
                <AnimatePresence>
                  {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <div className="pb-7 leading-relaxed" style={{ color: "var(--text-muted)", fontSize: "1rem", paddingLeft: "44px", maxWidth: "720px" }}>{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
