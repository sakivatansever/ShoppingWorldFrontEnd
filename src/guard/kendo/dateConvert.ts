import { DateTime } from "luxon";

export function toIstanbulISOString(date: Date): string | null {
  if (!(date instanceof Date) || (isNaN(date.getTime()) && date != null)) {
  }
  return DateTime.fromJSDate(date)
    .setZone("Europe/Istanbul", { keepLocalTime: true })
    .toFormat("yyyy-MM-dd'T'HH:mm:ss.SSS"); // Örnek: 2025-03-24T13:26:00.000+03:00
};