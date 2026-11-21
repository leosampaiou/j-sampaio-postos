import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

describe("auth.logout", () => {
  it("rejects requests without an authenticated application session", async () => {
    const ctx = {
      user: null,
      session: null,
      req: { protocol: "https", headers: {} },
      res: { clearCookie: () => undefined },
    } as unknown as TrpcContext;
    const caller = appRouter.createCaller(ctx);

    await expect(caller.auth.logout()).rejects.toMatchObject({ code: "UNAUTHORIZED" });
  });
});
