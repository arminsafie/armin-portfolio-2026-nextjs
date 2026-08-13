import crypto from "crypto";

const SECRET = process.env.ADMIN_SECRET || "dev-only-secret-change-me";
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 12; // 12 hours

function sign(value: string): string {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function createSessionToken(): string {
  const expires = Date.now() + SESSION_MAX_AGE_MS;
  const payload = String(expires);
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = sign(payload);
  const valid =
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));

  if (!valid) return false;

  const expires = Number(payload);
  if (Number.isNaN(expires) || Date.now() > expires) return false;

  return true;
}

export function checkPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD || "changeme";
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export const SESSION_COOKIE = "admin_session";
export const SESSION_MAX_AGE_SECONDS = SESSION_MAX_AGE_MS / 1000;
