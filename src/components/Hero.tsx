"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#050511" }}>
      {/* Grid background */}
      <div className="absolute inset-0" style={{
        backgroundImage: `linear-gradient(rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.15) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Gradient orbs */}
      <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px]"
        style={{ background: "rgba(99,102,241,0.15)" }}
      />
      <motion.div animate={{ x: [0, -40, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]"
        style={{ background: "rgba(99,102,241,0.15)" }}
      />
      <motion.div animate={{ x: [0, 20, 0], y: [0, 40, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full blur-[100px] opacity-50"
        style={{ background: "rgba(99,102,241,0.15)" }}
      />

      {/* Hero overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4338ca]/90 via-[#4f46e5]/70 to-[#7c3aed]/50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 mb-8"
              style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/80">Trusted by UAE&apos;s Leading Enterprises</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight"
            >
              <span className="text-white">Maximize</span><br />
              <span className="text-white">Tech ROI </span>
              <span className="gradient-text">with Maxcient</span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-8 text-lg text-white/60 leading-relaxed max-w-lg"
            >
              Unlock business value with enterprise-grade solutions tailored for UAE and GCC markets. Deep Microsoft Dynamics expertise at your service.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <Link href="/request-a-consultation" className="group inline-flex items-center justify-center bg-white text-[var(--primary-dark)] px-8 py-4 rounded-full text-base font-semibold hover:shadow-2xl hover:shadow-white/20 transition-all hover:-translate-y-0.5">
                Get Started
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
              <Link href="#services" className="inline-flex items-center justify-center border border-white/20 text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-white/10 transition-all">
                Explore Services
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.8 }} className="mt-16 grid grid-cols-3 gap-8">
              {[{ value: "100%", label: "On-Time Delivery" }, { value: "50+", label: "Years Experience" }, { value: "5/5", label: "Client Rating" }].map((stat) => (
                <div key={stat.label}>
                  <div className="text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/40 mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3D floating card */}
          <motion.div initial={{ opacity: 0, x: 60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.4 }} className="hidden lg:block">
            <div className="relative perspective-1000">
              <motion.div animate={{ rotateY: [0, 5, 0, -5, 0], rotateX: [0, -3, 0, 3, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="relative" style={{ transformStyle: "preserve-3d" }}>
                <div className="rounded-3xl p-8 shadow-2xl" style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--violet)] flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">Enterprise Solutions</div>
                        <div className="text-xs text-white/40">Microsoft Dynamics 365</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {["ERP & CRM", "Data Analytics", "AI & Automation", "Cloud & IoT"].map((item) => (
                        <div key={item} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                          <div className="text-xs text-white/60">{item}</div>
                        </div>
                      ))}
                    </div>
                    <div className="h-32 rounded-xl overflow-hidden p-4" style={{ background: "rgba(255,255,255,0.05)" }}>
                      <div className="flex items-end gap-2 h-full">
                        {[40, 65, 50, 80, 60, 90, 70, 95].map((h, i) => (
                          <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ duration: 1, delay: 1 + i * 0.1 }}
                            className="flex-1 rounded-t-sm bg-gradient-to-t from-[var(--primary)] to-[var(--violet)] opacity-80" />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 border-2 border-white/10 flex items-center justify-center text-[10px] text-white font-bold">
                            {String.fromCharCode(65 + i)}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -right-6 rounded-2xl p-4 shadow-xl"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.2)", transform: "translateZ(40px)" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    </div>
                    <span className="text-xs text-white/80 font-medium">Microsoft Gold Partner</span>
                  </div>
                </motion.div>

                <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-4 -left-6 rounded-2xl p-4 shadow-xl"
                  style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(20px)", border: "1px solid rgba(255,255,255,0.2)", transform: "translateZ(30px)" }}
                >
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-xs text-white/50">Client Satisfaction</div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
