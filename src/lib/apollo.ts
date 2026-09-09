/**
 * Apollo.io People Enrichment.
 *
 * When a lead is submitted we ask Apollo to match the email address to a
 * person, so the sales team sees a job title, company and LinkedIn alongside
 * the raw enquiry. It is strictly best-effort: enrichment must never delay or
 * fail a submission, so every path here is guarded and this module never
 * throws. It runs inside `after()` in the leads route, so the visitor has
 * already had their response before any of this executes.
 *
 * Cost control. The People Match endpoint spends one credit for a demographic
 * match and zero when nothing is found. It only bills for a mobile phone (+8
 * credits) when `reveal_phone_number` is set and for personal emails when
 * `reveal_personal_emails` is set — we send neither, so a call is at most one
 * credit and returns only firmographic/demographic data.
 *
 * Privacy. We send the email the visitor gave us to Apollo to look it up. That
 * third-party lookup is disclosed in the privacy policy. We do not request or
 * store personal phone numbers or scraped personal emails.
 *
 * Inert without APOLLO_API_KEY, so local development and previews make no
 * network calls and stamp nothing.
 */

const ENDPOINT = "https://api.apollo.io/api/v1/people/match";
const TIMEOUT_MS = 3000;

/** The subset of Apollo's person record we keep. Mirrors the Lead columns. */
export type LeadEnrichment = {
  jobTitle: string | null;
  linkedinUrl: string | null;
  companyName: string | null;
  companyDomain: string | null;
  companyIndustry: string | null;
  companySize: number | null;
  personLocation: string | null;
};

const EMPTY: LeadEnrichment = {
  jobTitle: null,
  linkedinUrl: null,
  companyName: null,
  companyDomain: null,
  companyIndustry: null,
  companySize: null,
  personLocation: null,
};

/** Trim to a non-empty string or null — Apollo returns "" and placeholders. */
function str(v: unknown): string | null {
  if (typeof v !== "string") return null;
  const t = v.trim();
  return t.length ? t : null;
}

function int(v: unknown): number | null {
  const n = typeof v === "string" ? Number(v) : v;
  return typeof n === "number" && Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

/** "Dubai, United Arab Emirates" from the person's city/state/country. */
function location(p: Record<string, unknown>): string | null {
  const parts = [str(p.city), str(p.state), str(p.country)].filter(Boolean) as string[];
  const seen = [...new Set(parts)];
  return seen.length ? seen.join(", ") : null;
}

/**
 * Look up `email` in Apollo.
 *
 * Returns an enrichment object when the lookup was actually attempted — its
 * fields hold whatever Apollo matched, or all-null when it matched nothing.
 * Returns `null` only when enrichment is disabled (no API key) or the call
 * could not complete, so the caller can tell "asked, found nothing" (stamp
 * enrichedAt) from "never asked" (leave it null).
 */
export async function enrichLead(email: string): Promise<LeadEnrichment | null> {
  const apiKey = process.env.APOLLO_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        // Apollo authenticates the request with this header. reveal_* flags are
        // deliberately omitted from the body so the call cannot bill for a
        // phone number or personal emails.
        "x-api-key": apiKey,
      },
      body: JSON.stringify({ email }),
      // Never let Next cache a POST to a third party, and never let a slow
      // Apollo response hold the function open past a few seconds.
      cache: "no-store",
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });

    if (!res.ok) {
      console.error(`[apollo] match failed: ${res.status} ${res.statusText}`);
      return null;
    }

    const data = (await res.json()) as { person?: Record<string, unknown> | null };
    const person = data.person;
    if (!person) return { ...EMPTY }; // asked, no match — stamp enrichedAt

    const org = (person.organization ?? null) as Record<string, unknown> | null;
    return {
      jobTitle: str(person.title),
      linkedinUrl: str(person.linkedin_url),
      companyName: org ? str(org.name) : null,
      companyDomain: org ? str(org.primary_domain) ?? str(org.website_url) : null,
      companyIndustry: org ? str(org.industry) : null,
      companySize: org ? int(org.estimated_num_employees) : null,
      personLocation: location(person),
    };
  } catch (err) {
    // Timeouts (AbortError), network failures, malformed JSON — all swallowed.
    console.error("[apollo] enrichment error:", err instanceof Error ? err.message : err);
    return null;
  }
}
