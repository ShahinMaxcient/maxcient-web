import { Resend } from "resend";
import type { LeadEnrichment } from "@/lib/apollo";

/**
 * Email notification for new leads.
 *
 * The old WordPress site used MetForm, which emailed every submission. This
 * site only wrote them to the database, where they were visible on the admin
 * dashboard but nowhere else — so an enquiry could sit unread for days. This
 * restores the notification without changing where the record of truth lives.
 *
 * Configured entirely by environment variables and silently inert when they
 * are absent, so local development and preview deploys never try to send.
 */

type LeadEmail = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  message?: string | null;
  source: string;
  // Apollo lookup result, or null when enrichment was disabled or found nothing.
  enrichment?: LeadEnrichment | null;
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function row(label: string, value?: string | null) {
  if (!value) return "";
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#6E6880;font:600 13px system-ui,sans-serif;vertical-align:top;white-space:nowrap">${label}</td>
    <td style="padding:6px 0;color:#14101F;font:400 14px system-ui,sans-serif">${escapeHtml(value)}</td>
  </tr>`;
}

/** A row whose value is a clickable link (used for LinkedIn / company domain). */
function linkRow(label: string, href?: string | null, text?: string | null) {
  if (!href) return "";
  const url = /^https?:\/\//i.test(href) ? href : `https://${href}`;
  return `<tr>
    <td style="padding:6px 14px 6px 0;color:#6E6880;font:600 13px system-ui,sans-serif;vertical-align:top;white-space:nowrap">${label}</td>
    <td style="padding:6px 0;font:400 14px system-ui,sans-serif"><a href="${escapeHtml(url)}" style="color:#7c3aed">${escapeHtml(text || href)}</a></td>
  </tr>`;
}

const num = (n: number) => new Intl.NumberFormat("en-GB").format(n);

/**
 * Send the notification. Never throws: the caller has already saved the lead,
 * and a mail outage must not turn a captured enquiry into a 500 for the
 * visitor. Failures are logged for the Vercel function log instead.
 */
export async function notifyNewLead(lead: LeadEmail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_TO;
  // Must be an address on a domain verified in Resend, or delivery is rejected.
  const from = process.env.LEAD_NOTIFY_FROM;

  if (!apiKey || !to || !from) return;

  const label = lead.source === "product-demo" ? "Demo request" : "Consultation request";
  const subject = `${label}: ${lead.name}${lead.service ? ` — ${lead.service}` : ""}`;

  // Apollo enrichment, rendered only when it actually returned something.
  const e = lead.enrichment;
  const hasEnrichment = !!e && Object.values(e).some((v) => v != null);
  const enrichmentHtml = hasEnrichment
    ? `<div style="margin-top:18px;padding-top:16px;border-top:1px solid rgba(20,16,31,0.10)">
      <p style="margin:0 0 8px;color:#6E6880;font:600 13px system-ui,sans-serif">Apollo enrichment</p>
      <table style="border-collapse:collapse;width:100%">
        ${row("Role", e!.jobTitle)}
        ${row("Company", e!.companyName)}
        ${row("Industry", e!.companyIndustry)}
        ${row("Size", e!.companySize != null ? `${num(e!.companySize)} employees` : null)}
        ${row("Location", e!.personLocation)}
        ${linkRow("Website", e!.companyDomain)}
        ${linkRow("LinkedIn", e!.linkedinUrl, "View profile")}
      </table>
    </div>`
    : "";
  const enrichmentText = hasEnrichment
    ? [
        "\nApollo enrichment:",
        e!.jobTitle ? `Role: ${e!.jobTitle}` : "",
        e!.companyName ? `Company: ${e!.companyName}` : "",
        e!.companyIndustry ? `Industry: ${e!.companyIndustry}` : "",
        e!.companySize != null ? `Size: ${num(e!.companySize)} employees` : "",
        e!.personLocation ? `Location: ${e!.personLocation}` : "",
        e!.companyDomain ? `Website: ${e!.companyDomain}` : "",
        e!.linkedinUrl ? `LinkedIn: ${e!.linkedinUrl}` : "",
      ].filter(Boolean).join("\n")
    : "";

  const html = `<div style="background:#F7F7F8;padding:28px">
  <div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid rgba(20,16,31,0.10);border-radius:10px;padding:26px 28px">
    <p style="margin:0 0 4px;font:600 12px system-ui,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#7c3aed">${escapeHtml(label)}</p>
    <h1 style="margin:0 0 18px;font:700 20px system-ui,sans-serif;color:#14101F">${escapeHtml(lead.name)}</h1>
    <table style="border-collapse:collapse;width:100%">
      ${row("Email", lead.email)}
      ${row("Phone", lead.phone)}
      ${row("Company", lead.company)}
      ${row("Interest", lead.service)}
    </table>
    ${enrichmentHtml}
    ${lead.message ? `<div style="margin-top:18px;padding-top:16px;border-top:1px solid rgba(20,16,31,0.10)">
      <p style="margin:0 0 6px;color:#6E6880;font:600 13px system-ui,sans-serif">Message</p>
      <p style="margin:0;color:#14101F;font:400 14px/1.6 system-ui,sans-serif;white-space:pre-wrap">${escapeHtml(lead.message)}</p>
    </div>` : ""}
    <p style="margin:22px 0 0;color:#6E6880;font:400 12px system-ui,sans-serif">
      Saved to the admin dashboard. Reference ${escapeHtml(lead.id)}.
    </p>
  </div>
</div>`;

  const text = [
    label,
    `Name: ${lead.name}`,
    `Email: ${lead.email}`,
    lead.phone ? `Phone: ${lead.phone}` : "",
    lead.company ? `Company: ${lead.company}` : "",
    lead.service ? `Interest: ${lead.service}` : "",
    enrichmentText,
    lead.message ? `\nMessage:\n${lead.message}` : "",
    `\nReference ${lead.id}`,
  ].filter(Boolean).join("\n");

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from,
      to: to.split(",").map((a) => a.trim()).filter(Boolean),
      // Replying in the mail client goes straight back to the enquirer.
      replyTo: lead.email,
      subject,
      html,
      text,
    });
    if (error) console.error("[notify] Resend rejected lead email:", error);
  } catch (err) {
    console.error("[notify] Failed to send lead email:", err);
  }
}
