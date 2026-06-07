"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle: string;
  image: string;
}

export default function PageHero({ title, subtitle, image }: PageHeroProps) {
  return (
    <section className="relative pt-20 lg:pt-24 overflow-hidden">
      <Image src={image} alt={title} fill className="object-cover opacity-20" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--primary-dark)]/90 via-[var(--primary)]/70 to-[var(--violet)]/50" />
      <div className="absolute inset-0" style={{ backgroundImage: `linear-gradient(rgba(99,102,241,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.05) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">{title}</h1>
          <p className="mt-6 text-lg text-white/60 leading-relaxed">{subtitle}</p>
          <div className="mt-8">
            <Link href="/request-a-consultation" className="inline-flex items-center justify-center bg-white text-[var(--primary-dark)] px-8 py-3.5 rounded-full text-base font-semibold hover:shadow-xl hover:shadow-white/20 transition-all hover:-translate-y-0.5">
              Get Started
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
