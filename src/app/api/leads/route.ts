import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { notifyNewLead } from "@/lib/notify";
import { rateLimit, clientIp } from "@/lib/rate-limit";

// Public endpoint — accepts submissions from the consultation form and the
// product-page demo cards.
const leadSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("A valid email is required").max(200),
  phone: z.string().trim().max(50).optional().or(z.literal("")),
  company: z.string().trim().max(200).optional().or(z.literal("")),
  service: z.string().trim().max(200).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  // Allowlisted rather than free text: this lands in the admin lead list, so
  // the client must not be able to write arbitrary values into it.
  source: z.enum(["consultation-form", "product-demo"]).optional(),
});

// Two limits, because neither alone is enough. The in-memory one is fast and
// catches a flood against a single warm instance, but serverless scales out so
// it cannot see the whole picture. The database check closes that gap using
// data already stored — no IPs are persisted for this.
const IP_LIMIT = 5;                 // submissions per IP
const IP_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes
const SAME_EMAIL_COOLDOWN_MS = 60 * 1000;

export async function POST(request: Request) {
  const ip = clientIp(request);
  const limited = rateLimit(`leads:${ip}`, IP_LIMIT, IP_WINDOW_MS);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly." },
      { status: 429, headers: { "Retry-After": String(limited.retryAfter) } },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the form and try again.", issues: parsed.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const d = parsed.data;
  const email = d.email.toLowerCase();

  try {
    // Cross-instance guard: the same address cannot submit twice inside a
    // minute. Uses the existing createdAt index, and a failure here must never
    // block a genuine submission, so it is wrapped rather than allowed to throw.
    const recent = await prisma.lead
      .findFirst({
        where: { email, createdAt: { gt: new Date(Date.now() - SAME_EMAIL_COOLDOWN_MS) } },
        select: { id: true },
      })
      .catch(() => null);

    if (recent) {
      return NextResponse.json(
        { error: "We already have your request. We'll be in touch shortly." },
        { status: 429, headers: { "Retry-After": "60" } },
      );
    }

    const lead = await prisma.lead.create({
      data: {
        name: d.name,
        email,
        phone: d.phone || null,
        company: d.company || null,
        service: d.service || null,
        message: d.message || null,
        source: d.source ?? "consultation-form",
      },
      select: {
        id: true, name: true, email: true, phone: true,
        company: true, service: true, message: true, source: true,
      },
    });

    // Awaited, not fire-and-forget: a serverless function can be frozen the
    // moment it responds, which would drop a pending send. notifyNewLead
    // never throws and is inert without its env vars, so this cannot fail the
    // request — the lead is already committed either way.
    await notifyNewLead(lead);

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    console.error("Failed to create lead:", err);
    return NextResponse.json(
      { error: "We couldn't submit your request. Please try again shortly." },
      { status: 500 },
    );
  }
}
