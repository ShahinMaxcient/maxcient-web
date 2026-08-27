import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * Health check that doubles as the Supabase keep-alive.
 *
 * Supabase pauses a free-tier project after 7 days with no database activity,
 * and a paused database is worse than a loud failure here: every getter in
 * lib/settings.ts catches its error and returns the hardcoded defaults, so the
 * site would quietly serve the wrong hero copy and an empty blog rather than
 * showing anything is broken.
 *
 * That became a real risk once the public pages moved to ISR (see
 * app/layout.tsx). Before, every page view ran ~17 queries, so any visitor at
 * all kept the connection warm; now pages serve from the CDN and the database
 * is only touched when a request arrives after the revalidate window expires.
 * A quiet week means genuinely zero queries.
 *
 * A daily Vercel cron (vercel.json) hits this route, which is enough to reset
 * the 7-day timer with a wide margin.
 *
 * Deliberately unauthenticated: it exposes nothing but a row count that is
 * already public on the homepage, and requiring a secret would mean the cron
 * silently stops working if that env var is ever rotated — the exact failure
 * this route exists to prevent.
 */

// Never cached: a cached response would return without touching the database,
// which would defeat the entire purpose.
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  const startedAt = Date.now();
  try {
    // The cheapest query that still proves a live round trip to Postgres.
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json(
      { status: "ok", database: "reachable", latencyMs: Date.now() - startedAt },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (error) {
    // 503 so uptime monitors and the Vercel cron log surface this as a failure
    // rather than a success, which is the whole point of checking.
    console.error("[health] database unreachable:", error);
    return NextResponse.json(
      { status: "error", database: "unreachable", latencyMs: Date.now() - startedAt },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
