import crypto from "node:crypto";
import { isValidLocale, type Locale } from "../i18n/config.ts";

export interface RawDemoRequestBody {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  companySize?: unknown;
  challenge?: unknown;
  message?: unknown;
  privacyAccepted?: unknown;
  locale?: unknown;
  website?: unknown;
}

export interface SanitizedDemoRequest {
  name: string;
  email: string;
  company: string;
  companySize?: string;
  challenge?: string;
  message?: string;
  privacyAccepted: true;
  locale: Locale;
  source: "viaco-website-concept-demo";
  submittedAt: string;
}

export type DemoRequestValidationResult =
  | {
      ok: true;
      data: SanitizedDemoRequest;
    }
  | {
      ok: false;
      status: "spam_rejected" | "validation_error";
      fieldErrors?: Record<string, string>;
    };

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const ALLOWED_COMPANY_SIZES = new Set([
  "1-19",
  "20-49",
  "50-249",
  "250-999",
  "1000+",
]);

export const ALLOWED_CHALLENGES = new Set([
  "knowledge-loss",
  "onboarding",
  "documentation",
  "maintenance-efficiency",
  "other",
]);

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const DUPLICATE_WINDOW_MS = 2 * 60 * 1000; // 2 minutes

const rateLimitStore = new Map<string, number[]>();
const duplicateStore = new Map<string, number>();

function stripControlChars(value: string, allowNewlines = false): string {
  return allowNewlines
    ? value.replace(/[\u0000-\u0008\u000B-\u001F\u007F]/g, "")
    : value.replace(/[\u0000-\u001F\u007F]/g, "");
}

export function validateAndSanitizeDemoRequest(
  body: RawDemoRequestBody,
  now: Date = new Date()
): DemoRequestValidationResult {
  if (typeof body.website === "string" && body.website.trim().length > 0) {
    return { ok: false, status: "spam_rejected" };
  }

  const name =
    typeof body.name === "string" ? stripControlChars(body.name).trim() : "";
  const email =
    typeof body.email === "string"
      ? stripControlChars(body.email).trim().toLowerCase()
      : "";
  const company =
    typeof body.company === "string"
      ? stripControlChars(body.company).trim()
      : "";
  const rawCompanySize =
    typeof body.companySize === "string"
      ? stripControlChars(body.companySize).trim()
      : "";
  const rawChallenge =
    typeof body.challenge === "string"
      ? stripControlChars(body.challenge).trim()
      : "";
  const message =
    typeof body.message === "string"
      ? stripControlChars(body.message, true).trim().slice(0, 2000)
      : "";
  const privacyAccepted = body.privacyAccepted === true;
  const locale: Locale =
    typeof body.locale === "string" && isValidLocale(body.locale)
      ? body.locale
      : "de";

  const fieldErrors: Record<string, string> = {};
  if (name.length < 2 || name.length > 120) fieldErrors.name = "invalid";
  if (!EMAIL_PATTERN.test(email) || email.length > 160)
    fieldErrors.email = "invalid";
  if (company.length < 2 || company.length > 160)
    fieldErrors.company = "invalid";
  if (rawCompanySize && !ALLOWED_COMPANY_SIZES.has(rawCompanySize))
    fieldErrors.companySize = "invalid";
  if (rawChallenge && !ALLOWED_CHALLENGES.has(rawChallenge))
    fieldErrors.challenge = "invalid";
  if (!privacyAccepted) fieldErrors.privacyAccepted = "invalid";

  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, status: "validation_error", fieldErrors };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      company,
      ...(rawCompanySize ? { companySize: rawCompanySize } : {}),
      ...(rawChallenge ? { challenge: rawChallenge } : {}),
      ...(message ? { message } : {}),
      privacyAccepted: true,
      locale,
      source: "viaco-website-concept-demo",
      submittedAt: now.toISOString(),
    },
  };
}

export function hashClientIdentifier(rawIp: string): string {
  return crypto.createHash("sha256").update(rawIp).digest("hex").slice(0, 16);
}

export function checkRateLimit(
  clientKey: string,
  nowMs: number = Date.now()
): { allowed: boolean; retryAfterSeconds?: number } {
  const cutoff = nowMs - RATE_LIMIT_WINDOW_MS;

  // Prune expired buckets opportunistically
  if (rateLimitStore.size > 500) {
    for (const [key, timestamps] of rateLimitStore.entries()) {
      const fresh = timestamps.filter((ts) => ts > cutoff);
      if (fresh.length === 0) {
        rateLimitStore.delete(key);
      } else {
        rateLimitStore.set(key, fresh);
      }
    }
  }

  const existing = (rateLimitStore.get(clientKey) ?? []).filter(
    (ts) => ts > cutoff
  );

  if (existing.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldest = existing[0] ?? nowMs;
    const retryAfterSeconds = Math.max(
      1,
      Math.ceil((oldest + RATE_LIMIT_WINDOW_MS - nowMs) / 1000)
    );
    rateLimitStore.set(clientKey, existing);
    return { allowed: false, retryAfterSeconds };
  }

  existing.push(nowMs);
  rateLimitStore.set(clientKey, existing);
  return { allowed: true };
}

export function createSubmissionFingerprint(
  payload: Pick<SanitizedDemoRequest, "email" | "company" | "challenge" | "message">
): string {
  const canonical = [
    payload.email.toLowerCase(),
    payload.company.toLowerCase(),
    payload.challenge ?? "",
    (payload.message ?? "").toLowerCase(),
  ].join("|");
  return crypto.createHash("sha256").update(canonical).digest("hex");
}

export function checkAndRecordDuplicate(
  fingerprint: string,
  nowMs: number = Date.now()
): boolean {
  const cutoff = nowMs - DUPLICATE_WINDOW_MS;

  if (duplicateStore.size > 500) {
    for (const [key, ts] of duplicateStore.entries()) {
      if (ts <= cutoff) duplicateStore.delete(key);
    }
  }

  const lastSeen = duplicateStore.get(fingerprint);
  if (typeof lastSeen === "number" && lastSeen > cutoff) {
    return true;
  }

  duplicateStore.set(fingerprint, nowMs);
  return false;
}

export function resetDemoRequestGuards(): void {
  rateLimitStore.clear();
  duplicateStore.clear();
}

export interface DemoRequestLogEntry {
  event: "demo_request";
  requestId: string;
  timestamp: string;
  httpStatus: number;
  durationMs: number;
  causeCategory: string;
  locale?: string;
  hasChallenge?: boolean;
  hasCompanySize?: boolean;
  hasMessage?: boolean;
}

/**
 * Formats a strictly PII-free structured log record (never includes name, email,
 * company, message, IP address, or secrets).
 */
export function formatRedactedLogEntry(
  entry: Omit<DemoRequestLogEntry, "event" | "timestamp">
): DemoRequestLogEntry {
  return {
    event: "demo_request",
    timestamp: new Date().toISOString(),
    requestId: entry.requestId,
    httpStatus: entry.httpStatus,
    durationMs: Math.max(0, Math.round(entry.durationMs)),
    causeCategory: entry.causeCategory,
    ...(entry.locale ? { locale: entry.locale } : {}),
    ...(typeof entry.hasChallenge === "boolean"
      ? { hasChallenge: entry.hasChallenge }
      : {}),
    ...(typeof entry.hasCompanySize === "boolean"
      ? { hasCompanySize: entry.hasCompanySize }
      : {}),
    ...(typeof entry.hasMessage === "boolean"
      ? { hasMessage: entry.hasMessage }
      : {}),
  };
}
