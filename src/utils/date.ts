/**
 * Formats a Date object to YYYY-MM-DD string for the API.
 * Uses local time, so the date selected by the user in their timezone is preserved.
 */
export function formatApiDate(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Parses a YYYY-MM-DD string into a local Date object.
 */
export function parseApiDate(dateStr: string): Date {
  const [yyyy, mm, dd] = dateStr.split("-").map(Number);
  return new Date(yyyy, mm - 1, dd);
}

/**
 * Returns a user-friendly date string (e.g. "Mon, Sep 14")
 */
export function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

/**
 * Gets the date for the start of the week (Monday) for a given date.
 */
export function getStartOfWeek(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Adds or subtracts days from a date.
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Number of days in the given month.
 */
export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

/** Every calendar date in the given month, in order (1st through the last day). */
export function getDatesInMonth(year: number, month: number): Date[] {
  const total = getDaysInMonth(year, month);
  return Array.from(
    { length: total },
    (_, index) => new Date(year, month, index + 1),
  );
}

/**
 * Re-applies `date`'s day-of-month onto a different (year, month)
 */
export function clampDateToMonth(
  date: Date,
  year: number,
  month: number,
): Date {
  const lastDayOfMonth = getDaysInMonth(year, month);
  const day = Math.min(date.getDate(), lastDayOfMonth);
  return new Date(year, month, day);
}

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}
