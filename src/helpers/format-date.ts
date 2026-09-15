const MONTH_ABBREVIATIONS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/** Formats a date as "Sep 6, 2026" — deliberately not using `Intl`/`toLocaleDateString` so the format is identical on every device regardless of locale. */
export function formatDate(date: Date): string {
  const month = MONTH_ABBREVIATIONS[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
}