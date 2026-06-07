"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const STATUSES = ["NEW", "CONTACTED", "QUALIFIED", "WON", "LOST"] as const;
type LeadStatus = (typeof STATUSES)[number];

export async function updateLeadStatus(formData: FormData) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");

  if (!id || !STATUSES.includes(status as LeadStatus)) {
    throw new Error("Invalid input");
  }

  await prisma.lead.update({
    where: { id },
    data: { status: status as LeadStatus },
  });

  revalidatePath("/admin");
}
