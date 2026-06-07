"use client";

import AnimatedCard from "./AnimatedCard";
import SectionReveal from "./SectionReveal";
import Link from "next/link";

const services = [
  { title: "ERP & CRM", description: "Streamline operations and customer relationships with integrated enterprise solutions.", href: "/erp-and-crm", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />, gradient: "from-blue-500 to-indigo-600" },
  { title: "Data Analytics", description: "Unlock insights and drive business growth with advanced data analytics and reporting.", href: "/data-analytics", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />, gradient: "from-cyan-500 to-blue-600" },
  { title: "Intelligent Automation", description: "Enhance efficiency with smart automation, reducing errors and boosting productivity.", href: "/intelligent-automation", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />, gradient: "from-violet-500 to-purple-600" },
  { title: "Application Development", description: "Custom application development to meet unique business needs with cutting-edge technology.", href: "/application-development", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />, gradient: "from-emerald-500 to-teal-600" },
  { title: "Application Management", description: "Reliable management services ensuring optimal performance and scalability.", href: "/application-management", icon: <><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></>, gradient: "from-amber-500 to-orange-600" },
  { title: "Smart Teams", description: "Empower your business with dedicated teams bringing expertise and innovation.", href: "/dedicated-development-team", icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />, gradient: "from-pink-500 to-rose-600" },
];

export default function Services() {
  return (
    <section id="services" className="py-16 lg:py-20 relative" style={{ background: "var(--surface-alt)" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--primary-light)" }}>What We Do</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>Our Services</h2>
            <p className="mt-6 text-lg" style={{ color: "var(--text-muted)" }}>Comprehensive technology solutions to accelerate your digital transformation.</p>
          </div>
        </SectionReveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <AnimatedCard key={service.title} delay={i * 0.1}>
              <Link href={service.href} className="block h-full">
                <div className="glass-light rounded-2xl p-8 h-full group" style={{ boxShadow: "var(--shadow)" }}>
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">{service.icon}</svg>
                  </div>
                  <h3 className="mt-6 text-xl font-bold group-hover:text-[var(--primary)] transition-colors" style={{ color: "var(--text-primary)" }}>{service.title}</h3>
                  <p className="mt-3 leading-relaxed text-sm" style={{ color: "var(--text-muted)" }}>{service.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--primary)" }}>
                    Learn more <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </Link>
            </AnimatedCard>
          ))}
        </div>
      </div>
    </section>
  );
}
