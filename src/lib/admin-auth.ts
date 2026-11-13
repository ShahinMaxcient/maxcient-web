import { cache } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

/**
 * The sign-in check for admin pages. Every page under
 * src/app/admin/(protected)/ calls this first, before it loads any data.
 *
 * The (protected) layout's own check is not enough. Next renders a layout and
 * its page side by side, so a layout's redirect does not stop the page's
 * output from being sent: a signed-out request for a page's RSC payload (the
 * request the router makes on navigation) used to receive the page's data,
 * the full lead list included, next to the redirect. Layouts are also not
 * re-run on client-side navigation between pages that share them. The Next
 * docs warn about both (guides/authentication.md, "Layouts and auth checks").
 *
 * Server actions and the admin API routes check auth() themselves.
 *
 * cache() shares one session lookup between the layout and the page within a
 * request.
 */
export const requireAdmin = cache(async () => {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");
  return session;
});
