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
  { num: "02", title: "Intelligent Automation", desc: "Automate the work that slows teams down — Power Automate flows, AI agents, and IoT triggers that connect your systems and act on data in real time.", href: "/intelligent-automation", span: "lg:col-span-3", variant: "accent" },
  { num: "03", title: "Data Analytics", desc: "Turn scattered data into decisions with unified Power BI dashboards, real-time KPIs, and predictive models that surface what matters, the moment it changes.", href: "/data-analytics", span: "lg:col-span-2", variant: "default" },
  { num: "04", title: "Application Development", desc: "Custom web and mobile systems built on React, .NET, and Azure — engineered to your exact workflows, secure by design, and ready to scale with the business.", href: "/application-development", span: "lg:col-span-2", variant: "dark" },
  { num: "05", title: "Application Management", desc: "Keep every system running with 24/7 managed services, proactive monitoring, and SRE practices, so issues are resolved before they ever reach your users.", href: "/application-management", span: "lg:col-span-2", variant: "default" },
  { num: "06", title: "Smart Teams", desc: "Extend your engineering capacity with dedicated offshore pods — senior specialists who plug into your stack, your tools, and your delivery rhythm from day one.", href: "/dedicated-development-team", span: "lg:col-span-3", variant: "default" },
  { num: "+", title: "Cloud & IoT", desc: "Azure architecture, edge compute, and telemetry pipelines that bring real-time visibility and control from device to dashboard across your operations.", href: "/iot-internet-of-things", span: "lg:col-span-3", variant: "default" },
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
