import crypto from "crypto";
import { cookies } from "next/headers";

// Renamed from "myelin_admin_session" so logins remembered under the old 30-day
// rule stop working and editors sign in again.
const COOKIE_NAME = "myelin_admin_session_v2";
// The session ends after this much inactivity. Every bit of editing activity
// renews it (see issueSessionCookie), and it is a browser-session cookie too, so
// closing the browser ends it sooner.
const SESSION_TTL_MS = 30 * 60 * 1000; // 30 minutes

function sign(payload) {
  return crypto
    .createHmac("sha256", process.env.ADMIN_SESSION_SECRET)
    .update(payload)
    .digest("hex");
}

export function createSessionToken() {
  const expires = Date.now() + SESSION_TTL_MS;
  const payload = String(expires);
  return `${payload}.${sign(payload)}`;
}

export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return false;

  const expires = Number(payload);
  return Number.isFinite(expires) && Date.now() < expires;
}

export async function isAdminSession() {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(COOKIE_NAME)?.value);
}

// Sets (or renews) the editor session cookie: a session cookie with a fresh
// 30-minute expiry. Call from route handlers only (login, status).
export function issueSessionCookie(cookieStore) {
  cookieStore.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    // No maxAge: closing the browser logs the editor out.
  });
}

export function verifyPassword(candidate) {
  const expected = process.env.ADMIN_EDIT_PASSWORD || "";
  if (!expected || typeof candidate !== "string") return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export const ADMIN_SESSION_COOKIE = COOKIE_NAME;
