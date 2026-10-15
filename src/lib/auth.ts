/**
 * Admin login.
 *
 * Username and password come from the environment variables ADMIN_USERNAME and
 * ADMIN_PASSWORD (set them in a file called .env.local). Until you set them,
 * the login is admin / password — change it before the site goes online.
 */
import "server-only";
import crypto from "crypto";
import { cookies } from "next/headers";

export const COOKIE = "nkk_admin";
const MAX_AGE = 60 * 60 * 12; // stay logged in for 12 hours

const USERNAME = process.env.ADMIN_USERNAME || "admin";
const PASSWORD = process.env.ADMIN_PASSWORD || "password";
// Secret used to sign the login cookie. Set ADMIN_SECRET in .env.local for the live site.
const SECRET = process.env.ADMIN_SECRET || "change-me-" + PASSWORD + "-nallai-kandan";

const safeEqual = (a: string, b: string) => {
  const ha = crypto.createHash("sha256").update(a).digest();
  const hb = crypto.createHash("sha256").update(b).digest();
  return crypto.timingSafeEqual(ha, hb);
};

export function checkCredentials(username: string, password: string) {
  // check both, always, so timing doesn't reveal which one was wrong
  const u = safeEqual(username.trim(), USERNAME);
  const p = safeEqual(password, PASSWORD);
  return u && p;
}

const sign = (value: string) => crypto.createHmac("sha256", SECRET).update(value).digest("base64url");

export function createSessionToken() {
  const expires = Math.floor(Date.now() / 1000) + MAX_AGE;
  const value = `admin.${expires}`;
  return { token: `${value}.${sign(value)}`, maxAge: MAX_AGE };
}

export function verifySessionToken(token: string | undefined) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [who, expires, sig] = parts;
  const value = `${who}.${expires}`;
  if (!safeEqual(sig, sign(value))) return false;
  return who === "admin" && Number(expires) > Date.now() / 1000;
}

export async function isLoggedIn() {
  const store = await cookies();
  return verifySessionToken(store.get(COOKIE)?.value);
}

/** Blocks requests that come from other websites (protects against forged form posts). */
export function sameOrigin(req: Request) {
  const origin = req.headers.get("origin");
  if (!origin) return true; // same-origin fetches from some browsers omit it
  try {
    return new URL(origin).host === new URL(req.url).host || new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}

// Slow down password guessing: max 10 failed attempts per 15 minutes per address.
const attempts = new Map<string, { count: number; until: number }>();
export function tooManyAttempts(ip: string) {
  const a = attempts.get(ip);
  return !!a && a.count >= 10 && a.until > Date.now();
}
export function recordFailure(ip: string) {
  const now = Date.now();
  const a = attempts.get(ip);
  if (!a || a.until < now) attempts.set(ip, { count: 1, until: now + 15 * 60 * 1000 });
  else a.count += 1;
}
export function clearFailures(ip: string) {
  attempts.delete(ip);
}
