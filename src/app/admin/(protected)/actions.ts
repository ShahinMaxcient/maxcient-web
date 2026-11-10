"use server";

import { revalidatePath } from "next/cache";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { LEAD_STATUSES, type LeadStatusValue } from "@/lib/lead-query";

const inputSchema = z.object({
  id: z.string().trim().min(1).max(64),
  status: z.enum(LEAD_STATUSES),
});

export type UpdateLeadStatusResult =
  | { ok: true; status: LeadStatusValue }
  | { ok: false; error: string };

/**
 * Sets a lead's status.
 *
 * Returns a result instead of throwing. A thrown error from a Server Action is
 * caught by the nearest error boundary, which replaces the whole Leads page
 * with an error screen; a result lets the table show a notification and put
 * the row back as it was.
 *
 * Called with plain arguments rather than FormData. The previous version was
 * a <form> with a defaultValue select: after a successful save React 19 resets
 * the form, and an uncontrolled select resets to the option selected when it
 * first mounted, so the database changed while the dropdown snapped back to
 * the old status. The table now holds the status in React state instead.
 */
export async function updateLeadStatus(id: string, status: string): Promise<UpdateLeadStatusResult> {
  const session = await auth();
  if (!session?.user) {
    return { ok: false, error: "Your session has expired. Sign in again to change statuses." };
  }

  const parsed = inputSchema.safeParse({ id, status });
  if (!parsed.success) {
    return { ok: false, error: "That status is not valid." };
  }

  try {
    const lead = await prisma.lead.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
      select: { status: true },
    });
    // Refreshes the Leads page, including the status counts, in the same
    // round trip as this action.
    revalidatePath("/admin");
    return { ok: true, status: lead.status };
  } catch (err) {
    // P2025: no row with this id, typically deleted since the page loaded.
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
      revalidatePath("/admin");
      return { ok: false, error: "This lead no longer exists. The list has been refreshed." };
    }
    console.error("Failed to update lead status:", err);
    return { ok: false, error: "The status could not be saved. Please try again." };
  }
}
