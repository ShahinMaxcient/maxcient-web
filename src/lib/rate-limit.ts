/**
 * Best-effort in-memory rate limiter for public endpoints.
 *
 * Deliberately modest in what it claims. Serverless functions scale out, and
 * each instance keeps its own map, so a determined attacker spreading requests
 * across instances gets more than the nominal limit. It still stops the common
 * case — a script or a stuck form hammering one warm instance — and costs
 * nothing to run. The database-side check in the leads route is what covers
 * the gap between instances.
 *
 * Keys are held in memory only and never written anywhere, so no new personal
 * data is stored: an IP used here disappears when the instance recycles.
 */

type Hit = { count: number; resetAt: number };

const buckets = new Map<string, Hit>();

/** Drop expired buckets so a long-lived instance cannot grow without bound. */
function sweep(now: number) {
  if (buckets.size < 500) return;
  for (const [key, hit] of buckets) if (hit.resetAt <= now) buckets.delete(key);
}

export function rateLimit(key: string, limit: number, windowMs: number): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  sweep(now);

  const hit = buckets.get(key);
  if (!hit || hit.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }

  hit.count += 1;
  if (hit.count > limit) {
    return { ok: false, retryAfter: Math.ceil((hit.resetAt - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/**
 * Caller IP as seen through Vercel's proxy.
 *
 * x-forwarded-for is client-controlled in general, but on Vercel the platform
 * appends the real peer address, so the LAST entry is trustworthy — taking the
 * first would let anyone spoof a fresh identity per request and bypass the
 * limit entirely.
 */
export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) {
    const parts = xff.split(",").map((s) => s.trim()).filter(Boolean);
    if (parts.length) return parts[parts.length - 1];
  }
  return req.headers.get("x-real-ip") ?? "unknown";
}
