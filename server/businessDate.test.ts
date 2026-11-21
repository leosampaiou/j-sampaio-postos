import { describe, expect, it } from "vitest";
import { businessDateInSaoPaulo, shiftCalendarDate } from "../shared/businessDate";

describe("business calendar dates", () => {
  it("uses the São Paulo date before UTC midnight", () => {
    expect(businessDateInSaoPaulo(new Date("2026-12-01T01:30:00.000Z"))).toBe("2026-11-30");
  });

  it("shifts calendar days across month boundaries", () => {
    expect(shiftCalendarDate("2026-12-01", -1)).toBe("2026-11-30");
    expect(shiftCalendarDate("2026-11-30", 1)).toBe("2026-12-01");
  });
});
