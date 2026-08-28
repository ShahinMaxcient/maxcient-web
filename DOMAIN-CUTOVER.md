# Domain cutover: maxcient.com → this site

Checklist for pointing `maxcient.com` at the Vercel deployment. Written
against the live DNS and the WordPress sitemap as they stood on 2026-08-28;
re-check the record values before you act on it.

---

## ⚠️ The one that can actually hurt: email

`maxcient.com` runs company email on **Microsoft 365**:

```
maxcient.com.  MX  0  maxcient-com.mail.protection.outlook.com.
```

**If you move the nameservers to Vercel without recreating that record, all
company email stops** — including `hello@maxcient.com`, the address printed on
every page of this site.

**Do this instead:** leave the nameservers exactly where they are. At your
current DNS host, change only the records that point at the web server. Email
records are then untouched by definition and nothing can go wrong with them.

If you have a reason to move nameservers anyway, export the full zone file
first and recreate **every** record, paying particular attention to:

| Record | Why it matters |
|---|---|
| `MX` | Mail delivery. Without it, inbound email bounces. |
| `TXT` (SPF, e.g. `v=spf1 include:spf.protection.outlook.com -all`) | Without it your outbound mail lands in spam. |
| `TXT` / `CNAME` (DKIM, usually `selector1._domainkey`, `selector2._domainkey`) | Signing. Same consequence. |
| `TXT` (DMARC, `_dmarc`) | Policy. |
| `TXT` (`MS=...`) | Microsoft 365 domain verification. Removing it can un-verify the tenant. |
| Any other `CNAME` | `autodiscover`, plus anything for other services. |

---

## Before you switch

- [ ] **Push the pending commits and confirm the deploy is green.** The
      redirects, sitemap and metadata all need to be live *before* traffic
      arrives, not after.
- [ ] **Claim the Google Business Profile.** Searching the brand currently
      returns a knowledge panel reading "Software company in Bengaluru,
      Karnataka" with an 080 landline, and it shows "Own this business?" —
      i.e. nobody has verified it. Claim it at
      [business.google.com](https://business.google.com), set the primary
      location to the Dubai office with the +971 number, and add Muscat,
      Riyadh, Bengaluru, Kochi and Bradford as additional locations.
      Verification takes a few days, so start early.
- [ ] **Set the lead-notification environment variables in Vercel** —
      `RESEND_API_KEY`, `LEAD_NOTIFY_TO`, `LEAD_NOTIFY_FROM`. Without them the
      site still captures enquiries to the database, but nothing emails you.
      See "Lead notifications" below.
- [ ] **Set `NEXT_PUBLIC_SITE_URL`** to `https://www.maxcient.com` in Vercel,
      or leave it unset — it already defaults to that.
- [ ] **Record current rankings.** Take a Search Console export of the last 3
      months of queries and pages. Without a baseline you cannot tell a normal
      migration wobble from a real regression.

## The switch

- [ ] In Vercel → Project → Settings → Domains, add both `maxcient.com` and
      `www.maxcient.com`. Pick one as primary; Vercel redirects the other.
      The site currently uses `www`, and every canonical URL and the sitemap
      point at `https://www.maxcient.com` — so make **`www` the primary** or
      change `NEXT_PUBLIC_SITE_URL` to match whichever you choose.
- [ ] At your DNS host, update **only** the web records to the values Vercel
      shows. Typically the apex `A` record (currently `75.119.205.42`) and a
      `CNAME` for `www`.
- [ ] Leave TTL low (300s) for the first day so a mistake is quick to undo.
- [ ] Wait for propagation, then confirm HTTPS resolves on both hosts. Vercel
      issues the certificate automatically once DNS points at it.

## Immediately after

- [ ] **Send a test email to `hello@maxcient.com` from an outside account and
      confirm it arrives.** Do this first. Everything else can wait.
- [ ] Submit a form on the live site and confirm it appears in `/admin` *and*
      arrives by email.
- [ ] Spot-check redirects on the real domain:
      - `https://www.maxcient.com/contact-us` → `/request-a-consultation`
      - `https://www.maxcient.com/how-to-choose-an-offshore-software-development-company`
        → `/blog/how-to-choose-an-offshore-software-development-company`
      - `https://www.maxcient.com/category/blog` → `/blog`
- [ ] In Search Console, add the property if absent and submit
      `https://www.maxcient.com/sitemap.xml`.
- [ ] Use "URL Inspection → Request indexing" on the homepage to prompt a
      recrawl.
- [ ] Confirm `https://www.maxcient.com/robots.txt` resolves and names the
      sitemap.

## First fortnight

- [ ] Watch Search Console → **Pages** for a spike in "Not found (404)". A few
      are normal; a pattern means a URL was missed and needs a redirect adding
      to `LEGACY_REDIRECTS` in `next.config.ts`.
- [ ] Watch **Performance** against your baseline export. A dip for two to six
      weeks after a migration is expected and recovers on its own. A dip that
      is still deepening after six weeks is not.
- [ ] Check Vercel → Settings → **Cron Jobs** shows `/api/health` running
      daily. It keeps the free-tier Supabase database from pausing after seven
      idle days; a paused database makes the site quietly serve fallback
      content rather than fail visibly.

---

## Lead notifications

Enquiries always save to the database and appear on the `/admin` dashboard.
Email delivery is additional and only activates when all three variables are
present, so local and preview environments never send.

| Variable | Example | Notes |
|---|---|---|
| `RESEND_API_KEY` | `re_...` | From [resend.com](https://resend.com). Free tier covers 3,000 emails/month. |
| `LEAD_NOTIFY_TO` | `hello@maxcient.com` | Comma-separate for several recipients. |
| `LEAD_NOTIFY_FROM` | `website@maxcient.com` | **Must** be on a domain verified in Resend, or delivery is rejected. |

Verifying `maxcient.com` in Resend means adding DNS records — do that
*alongside* the existing Microsoft 365 records, never replacing them. Resend
uses its own subdomain and SPF include, so the two coexist. If you would
rather not touch DNS at all, use Resend's `onboarding@resend.dev` sender for
testing; it only delivers to the account owner's address.

A send failure never loses an enquiry: the lead is committed to the database
first, and a mail error is logged to the Vercel function log without failing
the visitor's request.

---

## What does not carry over

Honest list, so nothing is a surprise:

- **Rankings wobble for 2–6 weeks.** Normal for any migration.
- **The knowledge panel keeps saying Bengaluru** until the Google Business
  Profile is claimed. Structured data on the site declares Dubai as head
  office, but Google weights the Business Profile more heavily.
- **WordPress-specific URLs are redirected, not reproduced.** Author archives,
  category archives and the MetForm endpoints all point at sensible
  destinations rather than existing in their old form.
