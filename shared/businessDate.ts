const BUSINESS_TIME_ZONE = "America/Sao_Paulo";

export function businessDateInSaoPaulo(date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: "year" | "month" | "day") => parts.find(part => part.type === type)?.value ?? "";
  return `${value("year")}-${value("month")}-${value("day")}`;
}

export function shiftCalendarDate(date: string, days: number): string {
  const shifted = new Date(`${date}T00:00:00.000Z`);
  if (Number.isNaN(shifted.getTime())) throw new RangeError("Data de calendário inválida.");
  shifted.setUTCDate(shifted.getUTCDate() + days);
  return shifted.toISOString().slice(0, 10);
}
