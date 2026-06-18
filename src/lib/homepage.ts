import { prisma } from "./prisma";

export type ServiceItem = {
  num: string;
  title: string;
  desc: string;
  href: string;
  span: string;
  variant: string;
};

export type TestimonialItem = {
  tag: string;
  quote: string;
  rating: number;
};

// Original hardcoded content — used as the fallback until rows are added.
const DEFAULT_SERVICES: ServiceItem[] = [
  { num: "01 — FLAGSHIP", title: "ERP & CRM Implementation on Microsoft Dynamics 365", desc: "Streamline operations and unify your customer view with end-to-end D365 implementations, configured for UAE compliance and tailored to your industry workflows.", href: "/erp-and-crm", span: "lg:col-span-3 lg:row-span-2", variant: "flagship" },
  { num: "02", title: "Intelligent Automation", desc: "Smart automation across Power Platform, AI agents, and IoT triggers.", href: "/intelligent-automation", span: "lg:col-span-3", variant: "accent" },
  { num: "03", title: "Data Analytics", desc: "Unified dashboards, real-time KPIs.", href: "/data-analytics", span: "lg:col-span-2", variant: "default" },
  { num: "04", title: "Application Development", desc: "Custom systems with React, .NET, and Azure.", href: "/application-development", span: "lg:col-span-2", variant: "dark" },
  { num: "05", title: "Application Management", desc: "24/7 managed services and SRE.", href: "/application-management", span: "lg:col-span-2", variant: "default" },
  { num: "06", title: "Smart Teams", desc: "Dedicated offshore engineering pods.", href: "/dedicated-development-team", span: "lg:col-span-3", variant: "default" },
  { num: "+", title: "Cloud & IoT", desc: "Azure architecture, edge compute, telemetry.", href: "/iot-internet-of-things", span: "lg:col-span-3", variant: "default" },
];

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  { tag: "Trusted by customers", quote: "To our happy customers, we are a technology partner — not just a vendor.", rating: 5 },
  { tag: "Customer success", quote: "Collaborative growth through trusted, mutually beneficial partnerships.", rating: 5 },
];

/** Published homepage service cards, ordered. Falls back to defaults. */
export async function getServices(): Promise<ServiceItem[]> {
  try {
    const rows = await prisma.service.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length === 0) return DEFAULT_SERVICES;
    return rows.map((s) => ({ num: s.num, title: s.title, desc: s.desc, href: s.href, span: s.span, variant: s.variant }));
  } catch {
    return DEFAULT_SERVICES;
  }
}

/** Published testimonial cards, ordered. Falls back to defaults. */
export async function getTestimonials(): Promise<TestimonialItem[]> {
  try {
    const rows = await prisma.testimonial.findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (rows.length === 0) return DEFAULT_TESTIMONIALS;
    return rows.map((t) => ({ tag: t.tag, quote: t.quote, rating: t.rating }));
  } catch {
    return DEFAULT_TESTIMONIALS;
  }
}
