/** Read only the explicit request location; general contact stays unfilled. */
export function getContactLocation(searchParams: URLSearchParams): string {
  const place = (searchParams.get("plaats") || "").trim().slice(0, 150);
  return place.toLowerCase() === "amsterdam" ? "Amsterdam" : place;
}