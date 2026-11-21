import { and, eq, gt, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { appSessions, appUsers, type AppSession, type AppUser, users, type InsertUser } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try { _db = drizzle(process.env.DATABASE_URL); }
    catch (error) { console.warn("[Database] Failed to initialize:", error instanceof Error ? error.message : "unknown error"); }
  }
  if (!_db) throw new Error("Database is unavailable");
  return _db;
}

// Retained only for the untouched template OAuth table; application accounts use appUsers.
export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) throw new Error("User openId is required");
  const db = await getDb();
  await db.insert(users).values({ ...user, lastSignedIn: user.lastSignedIn ?? new Date() }).onDuplicateKeyUpdate({ set: { lastSignedIn: new Date() } });
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  const [user] = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
  return user;
}

export async function findAppUserById(id: number): Promise<AppUser | undefined> {
  const db = await getDb();
  const [user] = await db.select().from(appUsers).where(eq(appUsers.id, id)).limit(1);
  return user;
}

export async function findAppUserByUsername(username: string): Promise<AppUser | undefined> {
  const db = await getDb();
  const [user] = await db.select().from(appUsers).where(eq(appUsers.username, username.toLowerCase())).limit(1);
  return user;
}

export async function findSession(tokenHash: string): Promise<{ session: AppSession; user: AppUser } | undefined> {
  const db = await getDb();
  const [row] = await db.select({ session: appSessions, user: appUsers }).from(appSessions)
    .innerJoin(appUsers, eq(appSessions.userId, appUsers.id))
    .where(and(eq(appSessions.tokenHash, tokenHash), isNull(appSessions.revokedAt), gt(appSessions.expiresAt, new Date()), eq(appUsers.active, true)))
    .limit(1);
  return row;
}

export async function createSession(userId: number, tokenHash: string, csrfToken: string, expiresAt: Date) {
  const db = await getDb();
  await db.insert(appSessions).values({ userId, tokenHash, csrfToken, expiresAt });
}

export async function revokeSession(tokenHash: string) {
  const db = await getDb();
  await db.update(appSessions).set({ revokedAt: new Date() }).where(eq(appSessions.tokenHash, tokenHash));
}

export async function touchLogin(userId: number) {
  const db = await getDb();
  await db.update(appUsers).set({ lastLoginAt: new Date() }).where(eq(appUsers.id, userId));
}
