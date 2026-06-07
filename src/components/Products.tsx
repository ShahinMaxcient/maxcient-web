"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionReveal from "./SectionReveal";

const products = [
  { title: "RealtyAI", description: "Manage properties, tenants, and maintenance seamlessly with real-time analytics and AI insights.", features: ["Property Management", "Tenant Portal", "Real-time Analytics", "UAE Compliance"], href: "/realtyai-property-management-solution", gradient: "from-blue-500 via-indigo-500 to-violet-600" },
  { title: "SmartFees", description: "Centralizes financial operations including invoicing, expenses, and payroll for schools.", features: ["Invoicing", "Expense Tracking", "Payroll", "Financial Reports"], href: "/smartfees-school-admin-solution", gradient: "from-cyan-500 via-teal-500 to-emerald-600" },
  { title: "MaxPayroll", description: "Advanced HR functionalities ensuring smooth operations and workforce satisfaction.", features: ["HR Management", "Payroll Processing", "Employee Portal", "Compliance"], href: "/maxpayroll-hr-management-solution-2", gradient: "from-violet-500 via-purple-500 to-fuchsia-600" },
];

export default function Products() {
  return (
    <section id="products" className="py-16 lg:py-20 relative" style={{ background: "var(--surface-alt)" }}>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--violet)" }}>Solutions</span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>Our Products</h2>
            <p className="mt-6 text-lg" style={{ color: "var(--text-muted)" }}>Purpose-built solutions for real business challenges.</p>
          </div>
        </SectionReveal>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div key={product.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.15 }}>
              <Link href={product.href} className="block h-full">
                <div className="glass-light rounded-2xl p-8 h-full group overflow-hidden relative" style={{ boxShadow: "var(--shadow)" }}>
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${product.gradient}`} />
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center shadow-lg text-white font-bold text-lg`}>{product.title[0]}</div>
                  <h3 className="mt-6 text-2xl font-bold" style={{ color: "var(--text-primary)" }}>{product.title}</h3>
                  <p className="mt-4 leading-relaxed" style={{ color: "var(--text-muted)" }}>{product.description}</p>
                  <ul className="mt-6 space-y-2">
                    {product.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                        <svg className="w-4 h-4 shrink-0" style={{ color: "var(--accent)" }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: "var(--primary)" }}>
                    Learn More <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
