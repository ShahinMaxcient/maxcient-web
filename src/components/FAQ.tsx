"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionReveal from "./SectionReveal";

const faqs = [
  { question: "What makes Maxcient a leader in driving digital transformation?", answer: "Maxcient stands at the forefront of digital transformation by leveraging Microsoft Dynamics 365, IoT, and AI with proven expertise delivering scalable solutions." },
  { question: "What are the core benefits of partnering with Maxcient?", answer: "Access to cutting-edge technology, bespoke solutions tailored to industry-specific needs, operational efficiency gains, enhanced analytics, robust cybersecurity, and dedicated support." },
  { question: "How does Maxcient empower businesses with technology?", answer: "We provide comprehensive solutions that simplify complex processes, automate routine tasks, and enhance data analytics, converting data into actionable insights." },
  { question: "What innovation does Maxcient bring to data-driven decision-making?", answer: "We integrate AI and machine learning into analytics, offering predictive and prescriptive insights for strategic advantage." },
  { question: "What strategies does Maxcient use to ensure data security?", answer: "Implementation includes encryption, secure access controls, and regular audits, adhering to international standards for compliance." },
  { question: "Can Maxcient support cloud service transitions?", answer: "We specialize in smooth transitions to cloud services, leveraging Microsoft Azure with meticulous planning and phased rollouts." },
  { question: "How does Maxcient utilize Blockchain technology?", answer: "We use Settlemint for decentralized applications that streamline supply chain management, smart contracts, and transactions." },
  { question: "Can Maxcient help with custom application development?", answer: "We excel in custom development, creating solutions tailor-made for your unique business challenges using cutting-edge technology." },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-20 relative" style={{ background: "var(--surface-alt)" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center mb-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--primary-light)" }}>FAQ</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h2>
          </div>
        </SectionReveal>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <SectionReveal key={index} delay={index * 0.05}>
              <div className={`rounded-2xl transition-all duration-500 ${openIndex === index ? "glass shadow-lg shadow-indigo-500/5" : "glass-light"}`} style={{ boxShadow: "var(--shadow)" }}>
                <button
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold transition-colors" style={{ color: openIndex === index ? "var(--primary-light)" : "var(--text-secondary)" }}>
                    {faq.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${openIndex === index ? "bg-[var(--primary)] text-white rotate-180" : ""}`}
                    style={openIndex !== index ? { background: "var(--surface)", color: "var(--text-muted)" } : undefined}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
