import { describe, expect, it, beforeEach, afterEach } from "bun:test";
import { isBlockedNewUser, NEW_USER_CUTOFF } from "./new-user-gate";

describe("isBlockedNewUser", () => {
  const originalEnv = process.env.ENABLE_NEW_USER_WAITLIST;

  afterEach(() => {
    process.env.ENABLE_NEW_USER_WAITLIST = originalEnv;
  });

  it("returns false when ENABLE_NEW_USER_WAITLIST is false or undefined", () => {
    delete process.env.ENABLE_NEW_USER_WAITLIST;
    expect(isBlockedNewUser("2026-05-01T00:00:00.000Z")).toBe(false);

    process.env.ENABLE_NEW_USER_WAITLIST = "false";
    expect(isBlockedNewUser("2026-05-01T00:00:00.000Z")).toBe(false);
  });

  it("returns true when ENABLE_NEW_USER_WAITLIST is true and createdAt is on or after cutoff", () => {
    process.env.ENABLE_NEW_USER_WAITLIST = "true";
    expect(isBlockedNewUser("2026-05-01T00:00:00.000Z")).toBe(true);
    expect(isBlockedNewUser(NEW_USER_CUTOFF)).toBe(true);
  });

  it("returns false when ENABLE_NEW_USER_WAITLIST is true but createdAt is before cutoff", () => {
    process.env.ENABLE_NEW_USER_WAITLIST = "true";
    expect(isBlockedNewUser("2026-01-01T00:00:00.000Z")).toBe(false);
  });

  it("returns false when createdAt is missing", () => {
    process.env.ENABLE_NEW_USER_WAITLIST = "true";
    expect(isBlockedNewUser(null)).toBe(false);
    expect(isBlockedNewUser(undefined)).toBe(false);
  });
});
