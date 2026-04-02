/** Data YYYY-MM-DD no fuso America/Sao_Paulo (Brasília). */
export function hojeEmSaoPauloYmd(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function parseEntryDate(raw: string | null): string | null {
  if (raw == null || typeof raw !== "string") return null;
  const t = raw.trim();
  if (!ISO_DATE.test(t)) return null;
  return t;
}
