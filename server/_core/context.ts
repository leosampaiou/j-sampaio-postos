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
  const authenticated = await authenticateRequest(opts.req);
  const user: AppUser | null = authenticated?.user ?? null;
  const session: AppSession | null = authenticated?.session ?? null;
  return { req: opts.req, res: opts.res, user, session };
}
