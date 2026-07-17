import { prisma } from "./prisma";
import { COLLECTIONS } from "./collections";

// Minimal structural type so we can address Prisma models by name without `any`.
type PrismaDelegate = {
  findMany: (args?: unknown) => Promise<Record<string, unknown>[]>;
  findUnique: (args: unknown) => Promise<Record<string, unknown> | null>;
  create: (args: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
  count: (args?: unknown) => Promise<number>;
};

export function delegate(model: string): PrismaDelegate {
  return (prisma as unknown as Record<string, PrismaDelegate>)[model];
}

/**
 * Published items for a collection, ordered. Falls back to the collection's
 * default content if the table is empty or the DB is unreachable.
 */
export async function getCollectionItems<T = Record<string, unknown>>(key: string): Promise<T[]> {
  const cfg = COLLECTIONS[key];
  if (!cfg) return [];
  try {
    const rows = await delegate(cfg.model).findMany({
      where: { published: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });
    if (!rows || rows.length === 0) return cfg.defaults as T[];
    return rows as T[];
  } catch {
    return cfg.defaults as T[];
  }
}

/** All items (incl. unpublished) for the admin list. */
export async function getAllItems(key: string): Promise<Record<string, unknown>[]> {
  const cfg = COLLECTIONS[key];
  if (!cfg) return [];
  return delegate(cfg.model).findMany({ orderBy: [{ order: "asc" }, { createdAt: "asc" }] });
}
