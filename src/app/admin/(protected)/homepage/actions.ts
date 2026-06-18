"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export type FormState = { error?: string } | undefined;

async function ensureAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

function revalidateHome() {
  revalidatePath("/admin/homepage");
  revalidatePath("/");
}

/* ---------------- Services ---------------- */

const serviceSchema = z.object({
  num: z.string().trim().optional(),
  title: z.string().trim().min(1, "Title is required."),
  desc: z.string().trim().min(1, "Description is required."),
  href: z.string().trim().optional(),
  span: z.string().trim().optional(),
  variant: z.enum(["default", "flagship", "accent", "dark"]),
  order: z.coerce.number().int().min(0).optional(),
});

export async function saveService(id: string | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await ensureAuth();
  const parsed = serviceSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const d = parsed.data;
  const data = {
    num: d.num || "",
    title: d.title,
    desc: d.desc,
    href: d.href || "#",
    span: d.span || "lg:col-span-2",
    variant: d.variant,
    order: d.order ?? 0,
  };
  if (id) await prisma.service.update({ where: { id }, data });
  else await prisma.service.create({ data });
  revalidateHome();
  redirect("/admin/homepage");
}

export async function deleteService(formData: FormData) {
  await ensureAuth();
  const id = formData.get("id");
  if (typeof id !== "string") throw new Error("Missing id.");
  await prisma.service.delete({ where: { id } });
  revalidateHome();
}

/* ---------------- Testimonials ---------------- */

const testimonialSchema = z.object({
  tag: z.string().trim().min(1, "Tag is required."),
  quote: z.string().trim().min(1, "Quote is required."),
  rating: z.coerce.number().int().min(1).max(5),
  order: z.coerce.number().int().min(0).optional(),
});

export async function saveTestimonial(id: string | null, _prev: FormState, formData: FormData): Promise<FormState> {
  await ensureAuth();
  const parsed = testimonialSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.issues[0]?.message ?? "Invalid data." };
  const d = parsed.data;
  const data = { tag: d.tag, quote: d.quote, rating: d.rating, order: d.order ?? 0 };
  if (id) await prisma.testimonial.update({ where: { id }, data });
  else await prisma.testimonial.create({ data });
  revalidateHome();
  redirect("/admin/homepage");
}

export async function deleteTestimonial(formData: FormData) {
  await ensureAuth();
  const id = formData.get("id");
  if (typeof id !== "string") throw new Error("Missing id.");
  await prisma.testimonial.delete({ where: { id } });
  revalidateHome();
}
