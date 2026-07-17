import { PrismaClient } from "@prisma/client";
import { COLLECTIONS } from "../src/lib/collections";

const prisma = new PrismaClient();
const db = prisma as unknown as Record<
  string,
  { count: () => Promise<number>; createMany: (a: { data: unknown[] }) => Promise<{ count: number }> }
>;

async function main() {
  for (const cfg of Object.values(COLLECTIONS)) {
    const existing = await db[cfg.model].count();
    if (existing > 0) {
      console.log(`• skip ${cfg.key} — already has ${existing} rows`);
      continue;
    }
    const res = await db[cfg.model].createMany({ data: cfg.defaults });
    console.log(`✔ seeded ${cfg.key}: ${res.count} rows`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
