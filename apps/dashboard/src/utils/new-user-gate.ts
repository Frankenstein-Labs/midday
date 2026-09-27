export const NEW_USER_CUTOFF = "2026-04-20T00:00:00.000Z";
const WAITLIST_ENABLED = process.env.ENABLE_NEW_USER_WAITLIST === "true";

export function isBlockedNewUser(createdAt: string | null | undefined) {
  if (!WAITLIST_ENABLED) return false;
  if (!createdAt) return false;
  return new Date(createdAt) >= new Date(NEW_USER_CUTOFF);
}
