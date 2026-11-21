import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { AppSession, AppUser } from "../../drizzle/schema";
import { authenticateRequest } from "./appAuth";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: AppUser | null;
  session: AppSession | null;
};

export async function createContext(opts: CreateExpressContextOptions): Promise<TrpcContext> {
  let user: AppUser | null = null;
  let session: AppSession | null = null;
  try {
    const authenticated = await authenticateRequest(opts.req);
    if (authenticated) {
      user = authenticated.user;
      session = authenticated.session;
    }
  } catch (error) {
    console.error("[Auth] Request authentication failed:", error instanceof Error ? error.message : "unknown error");
  }
  return { req: opts.req, res: opts.res, user, session };
}
