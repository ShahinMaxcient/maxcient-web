"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FramedImage from "./FramedImage";

export type Industry = { name: string; heading: string; body: string; features: string[]; image: string };

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-[var(--accent)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

export default function IndustryTabs({ industries }: { industries: Industry[] }) {
  const [active, setActive] = useState(0);
  const ind = industries[active] ?? industries[0];

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap justify-center gap-2.5 mb-12" role="tablist" aria-label="Industries">
        {industries.map((it, i) => {
          const on = i === active;
          return (
            <button
              key={it.name}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(i)}
              className="px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5"
              style={
                on
                  ? { background: "var(--primary)", color: "#fff", boxShadow: "0 10px 24px -12px rgba(124,58,237,0.6)" }
                  : { background: "var(--surface)", color: "var(--text-secondary)", border: "1px solid var(--border-strong)" }
              }
            >
              {it.name}
            </button>
          );
        })}
      </div>

      {/* Active panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={ind.name}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          role="tabpanel"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">{ind.name}</span>
            <h3 className="mt-2 text-2xl sm:text-3xl font-bold t-heading leading-snug">{ind.heading}</h3>
            <p className="mt-4 t-body leading-relaxed">{ind.body}</p>
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ind.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm t-label">
                  <CheckIcon />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <FramedImage src={ind.image} alt={ind.name} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
