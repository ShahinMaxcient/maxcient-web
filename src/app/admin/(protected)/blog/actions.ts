"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { slugify } from "@/lib/slug";

const postSchema = z.object({
  title: z.string().trim().min(1, "Title is required."),
  slug: z.string().trim().optional(),
  excerpt: z.string().trim().optional(),
  content: z.string().optional(),
  category: z.string().trim().optional(),
  coverImage: z.string().trim().optional(),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

async function ensureAuth() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
}

/** Make sure the slug is unique, ignoring the row we're editing. */
async function uniqueSlug(base: string, ignoreId?: string): Promise<string> {
  const root = slugify(base) || "post";
  let candidate = root;
  let n = 1;
  // Loop until no other row holds this slug.
  // (Small blog volume — a simple lookup loop is fine.)
  while (true) {
    const existing = await prisma.post.findUnique({ where: { slug: candidate } });
    if (!existing || existing.id === ignoreId) return candidate;
    n += 1;
    candidate = `${root}-${n}`;
  }
}

export type PostFormState = { error?: string } | undefined;

export async function createPost(
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await ensureAuth();
  const parsed = postSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data." };
  }
  const d = parsed.data;
  const slug = await uniqueSlug(d.slug || d.title);

  await prisma.post.create({
    data: {
      title: d.title,
      slug,
      excerpt: d.excerpt || null,
      content: d.content || null,
      category: d.category || null,
      coverImage: d.coverImage || null,
      status: d.status,
      publishedAt: d.status === "PUBLISHED" ? new Date() : null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath("/", "layout");
  redirect("/admin/blog");
}

export async function updatePost(
  id: string,
  _prevState: PostFormState,
  formData: FormData,
): Promise<PostFormState> {
  await ensureAuth();
  const parsed = postSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid data." };
  }
  const d = parsed.data;
  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { error: "Post not found." };

  const slug = await uniqueSlug(d.slug || d.title, id);

  await prisma.post.update({
    where: { id },
    data: {
      title: d.title,
      slug,
      excerpt: d.excerpt || null,
      content: d.content || null,
      category: d.category || null,
      coverImage: d.coverImage || null,
      status: d.status,
      // Stamp publishedAt the first time it goes live; keep it otherwise.
      publishedAt:
        d.status === "PUBLISHED" ? existing.publishedAt ?? new Date() : null,
    },
  });

  revalidatePath("/admin/blog");
  revalidatePath(`/blog/${slug}`);
  revalidatePath("/", "layout");
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  await ensureAuth();
  const id = formData.get("id");
  if (typeof id !== "string") throw new Error("Missing id.");
  await prisma.post.delete({ where: { id } });
  revalidatePath("/admin/blog");
  revalidatePath("/", "layout");
}
