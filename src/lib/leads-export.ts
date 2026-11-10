import writeExcelFile, { type Column } from "write-excel-file/node";
import type { Lead } from "@prisma/client";
import { LEAD_SOURCE_LABELS, LEAD_STATUS_LABELS, type LeadSourceValue } from "@/lib/lead-query";

/**
 * Builds the Excel (.xlsx) workbook for the Leads export.
 *
 * Every value is written as a typed cell, never as a formula. That matters
 * because leads are typed by the public: a "name" of =HYPERLINK(...) is a
 * classic spreadsheet-injection payload in CSV exports, but an .xlsx string
 * cell is only ever displayed, never evaluated.
 */

// The UAE has no daylight saving, so a fixed offset is exact. Excel dates carry
// no time zone, so each date is shifted to UAE wall-clock time before writing;
// the column headers say so, and the admin table shows the same times.
const UAE_OFFSET_MS = 4 * 60 * 60 * 1000;
const DATE_FORMAT = "dd mmm yyyy hh:mm";

// Excel's hard limit for the text in one cell. Messages are capped at 5,000
// characters on submission, so this only guards against rows written some
// other way.
const EXCEL_CELL_LIMIT = 32_767;

// Cells take undefined, not null, for "empty".
function uaeTime(date: Date | null): Date | undefined {
  return date ? new Date(date.getTime() + UAE_OFFSET_MS) : undefined;
}

function text(value: string | null | undefined): string | undefined {
  if (!value) return undefined;
  return value.length > EXCEL_CELL_LIMIT ? `${value.slice(0, EXCEL_CELL_LIMIT - 1)}…` : value;
}

const header = (title: string) => ({
  value: title,
  fontWeight: "bold" as const,
  backgroundColor: "#EDE9FE",
  alignVertical: "center" as const,
});

const top = { alignVertical: "top" as const };

const columns: Column<Lead>[] = [
  {
    header: header("Received (UAE time)"),
    cell: (l) => ({ value: uaeTime(l.createdAt), type: Date, format: DATE_FORMAT, ...top }),
    width: 18,
  },
  { header: header("Status"), cell: (l) => ({ value: LEAD_STATUS_LABELS[l.status], ...top }), width: 12 },
  { header: header("Name"), cell: (l) => ({ value: text(l.name), ...top }), width: 24 },
  { header: header("Email"), cell: (l) => ({ value: text(l.email), ...top }), width: 30 },
  // Text format, so Excel keeps a leading + and does not turn digits into a number.
  { header: header("Phone"), cell: (l) => ({ value: text(l.phone), type: String, format: "@", ...top }), width: 18 },
  { header: header("Company"), cell: (l) => ({ value: text(l.company), ...top }), width: 24 },
  { header: header("Service"), cell: (l) => ({ value: text(l.service), ...top }), width: 20 },
  {
    header: header("Source"),
    cell: (l) => ({ value: LEAD_SOURCE_LABELS[l.source as LeadSourceValue] ?? l.source, ...top }),
    width: 18,
  },
  // The complete message, wrapped. Excel caps the visible row height, but the
  // whole text is in the cell and in the formula bar.
  { header: header("Message"), cell: (l) => ({ value: text(l.message), wrap: true, ...top }), width: 80 },
  { header: header("Job title (Apollo)"), cell: (l) => ({ value: text(l.jobTitle), ...top }), width: 22 },
  { header: header("Company (Apollo)"), cell: (l) => ({ value: text(l.companyName), ...top }), width: 24 },
  { header: header("Company domain (Apollo)"), cell: (l) => ({ value: text(l.companyDomain), ...top }), width: 22 },
  { header: header("Industry (Apollo)"), cell: (l) => ({ value: text(l.companyIndustry), ...top }), width: 22 },
  {
    header: header("Company size (Apollo)"),
    cell: (l) => ({ value: l.companySize ?? undefined, type: Number, format: "#,##0", ...top }),
    width: 14,
  },
  { header: header("Location (Apollo)"), cell: (l) => ({ value: text(l.personLocation), ...top }), width: 24 },
  { header: header("LinkedIn (Apollo)"), cell: (l) => ({ value: text(l.linkedinUrl), ...top }), width: 36 },
  {
    header: header("Enriched (UAE time)"),
    cell: (l) => ({ value: uaeTime(l.enrichedAt), type: Date, format: DATE_FORMAT, ...top }),
    width: 18,
  },
  {
    header: header("Last updated (UAE time)"),
    cell: (l) => ({ value: uaeTime(l.updatedAt), type: Date, format: DATE_FORMAT, ...top }),
    width: 18,
  },
  { header: header("Lead ID"), cell: (l) => ({ value: l.id, ...top }), width: 28 },
];

export async function buildLeadsWorkbook(leads: Lead[]): Promise<Buffer> {
  return writeExcelFile(leads, {
    columns,
    sheet: "Leads",
    stickyRowsCount: 1,
  }).toBuffer();
}
