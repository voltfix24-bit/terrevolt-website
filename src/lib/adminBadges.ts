// Helpers voor admin status-/opvolgingsbadges. Niet voor publieke weergave.
export function isFollowUpOverdue(iso: string | null | undefined): boolean {
  if (!iso) return false;
  const t = new Date(iso).getTime();
  if (Number.isNaN(t)) return false;
  return t < Date.now();
}

export function isUncontactedStale(
  createdAt: string | null | undefined,
  lastContactedAt: string | null | undefined,
  days = 2,
): boolean {
  if (lastContactedAt) return false;
  if (!createdAt) return false;
  const t = new Date(createdAt).getTime();
  if (Number.isNaN(t)) return false;
  return Date.now() - t > days * 24 * 60 * 60 * 1000;
}
