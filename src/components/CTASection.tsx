"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function CTASection({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="py-14 lg:py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-dark)] via-[var(--primary)] to-[var(--violet)]" />
      <motion.div animate={{ x: [0, 30, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">{title}</h2>
        <p className="mt-6 text-lg text-white/60">{subtitle}</p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/request-a-consultation" className="inline-flex items-center justify-center bg-white text-[var(--primary-dark)] px-8 py-3.5 rounded-full text-base font-semibold hover:shadow-xl transition-all hover:-translate-y-0.5">
            Request a Consultation
          </Link>
          <a href="tel:+97143293710" className="inline-flex items-center justify-center border-2 border-white/30 text-white px-8 py-3.5 rounded-full text-base font-semibold hover:bg-white/10 transition-all">
            Call +971 4 329 3710
          </a>
        </div>
      </div>
    </section>
  );
}
