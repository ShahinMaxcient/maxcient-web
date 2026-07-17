"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { COLLECTIONS, type Field } from "@/lib/collections";
import { delegate } from "@/lib/content";

export type ContentFormState = { error?: string } | undefined;

function coerce(field: Field, formData: FormData): string | number | string[] {
  const raw = formData.get(field.name);
  if (field.type === "number") {
    const n = parseInt(String(raw ?? ""), 10);
    return Number.isFinite(n) ? n : 0;
  }
  if (field.type === "tags") {
    return String(raw ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return String(raw ?? "").trim();
}

export async function saveItem(
  key: string,
  id: string | null,
  _prev: ContentFormState,
  formData: FormData,
): Promise<ContentFormState> {
  const session = await auth();
  if (!session?.user) return { error: "Unauthorized" };

  const cfg = COLLECTIONS[key];
  if (!cfg) return { error: "Unknown collection." };

  const data: Record<string, unknown> = {};
  for (const f of cfg.fields) {
    const v = coerce(f, formData);
    if (f.required && (v === "" || (Array.isArray(v) && v.length === 0))) {
      return { error: `${f.label} is required.` };
    }
    data[f.name] = v;
  }
  data.order = parseInt(String(formData.get("order") ?? "0"), 10) || 0;
  data.published = formData.get("published") === "on";

  const db = delegate(cfg.model);
  if (id) await db.update({ where: { id }, data });
  else await db.create({ data });

  revalidatePath(`/admin/content/${key}`);
  revalidatePath("/", "layout");
  redirect(`/admin/content/${key}`);
}

export async function deleteItem(formData: FormData) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const key = String(formData.get("key"));
  const id = String(formData.get("id"));
  const cfg = COLLECTIONS[key];
  if (!cfg) throw new Error("Unknown collection.");

  await delegate(cfg.model).delete({ where: { id } });
  revalidatePath(`/admin/content/${key}`);
  revalidatePath("/", "layout");
}
