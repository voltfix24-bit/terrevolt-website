export const waTemplates = {
  application: (name: string) =>
    `Beste ${name || "kandidaat"}, bedankt voor je aanmelding bij TerreVolt. Ik neem graag kort contact met je op over je ervaring, beschikbaarheid en mogelijke projectinzet. Wanneer komt bellen jou uit?`,
  contact: (name: string) =>
    `Beste ${name || "relatie"}, bedankt voor uw aanvraag bij TerreVolt. Ik neem graag kort contact met u op om de projectscope, planning en gewenste ondersteuning te bespreken. Wanneer schikt het om te bellen?`,
};

/** Filter een datum-string op een tijdvenster. */
export type DateRange = "all" | "today" | "7d" | "30d";
export function inDateRange(iso: string, range: DateRange): boolean {
  if (range === "all") return true;
  const d = new Date(iso).getTime();
  const now = Date.now();
  if (range === "today") {
    const start = new Date(); start.setHours(0, 0, 0, 0);
    return d >= start.getTime();
  }
  const days = range === "7d" ? 7 : 30;
  return d >= now - days * 24 * 60 * 60 * 1000;
}
