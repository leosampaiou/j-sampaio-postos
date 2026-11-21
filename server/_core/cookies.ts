import type { CookieOptions } from "express";

export function getSessionCookieOptions(): CookieOptions {
  // Preview is public HTTPS in a cross-site frame even when the upstream request is HTTP.
  return { httpOnly: true, path: "/", sameSite: "none", secure: true };
}
