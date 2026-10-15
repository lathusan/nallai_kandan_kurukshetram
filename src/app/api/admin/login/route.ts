import { NextResponse } from "next/server";
import { COOKIE, checkCredentials, clearFailures, createSessionToken, recordFailure, sameOrigin, tooManyAttempts } from "@/lib/auth";

export async function POST(req: Request) {
  if (!sameOrigin(req)) return NextResponse.json({ error: "Request blocked." }, { status: 403 });
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  if (tooManyAttempts(ip)) {
    return NextResponse.json({ error: "Too many wrong attempts. Wait 15 minutes and try again." }, { status: 429 });
  }
  const body = await req.json().catch(() => ({}));
  const username = String(body.username ?? "");
  const password = String(body.password ?? "");
  if (!checkCredentials(username, password)) {
    recordFailure(ip);
    return NextResponse.json({ error: "Wrong username or password." }, { status: 401 });
  }
  clearFailures(ip);
  const { token, maxAge } = createSessionToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" && req.url.startsWith("https"),
    path: "/",
    maxAge,
  });
  return res;
}
