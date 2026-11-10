import type { LeadStatusValue } from "@/lib/lead-query";

/**
 * One lead as the Leads table receives it from the server. Dates arrive
 * already formatted, so server and browser render identical text and the
 * table never hydrates with a different time zone than the server used.
 */
export type LeadRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string | null;
  source: string;
  sourceLabel: string;
  status: LeadStatusValue;
  receivedLabel: string;
  updatedLabel: string;
  enrichment: {
    jobTitle: string | null;
    companyName: string | null;
    companyDomain: string | null;
    companyIndustry: string | null;
    companySize: number | null;
    personLocation: string | null;
    linkedinUrl: string | null;
    enrichedLabel: string | null;
  } | null;
};
