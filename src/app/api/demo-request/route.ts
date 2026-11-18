import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/config/site";
import {
  checkAndRecordDuplicate,
  checkRateLimit,
  createSubmissionFingerprint,
  formatRedactedLogEntry,
  hashClientIdentifier,
  validateAndSanitizeDemoRequest,
  type RawDemoRequestBody,
} from "@/lib/demo-request";

function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const rawIp = forwardedFor?.split(",")[0]?.trim() || realIp?.trim() || "unknown";
  return hashClientIdentifier(rawIp);
}

function logOutcome(
  params: Parameters<typeof formatRedactedLogEntry>[0],
  isError = false
) {
  const line = JSON.stringify(formatRedactedLogEntry(params));
  if (isError) {
    console.error(line);
  } else {
    console.info(line);
  }
}

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const startedAt = Date.now();

  let body: RawDemoRequestBody;
  try {
    body = (await request.json()) as RawDemoRequestBody;
  } catch {
    logOutcome(
      {
        requestId,
        httpStatus: 400,
        durationMs: Date.now() - startedAt,
        causeCategory: "invalid_json",
      },
      true
    );
    return NextResponse.json(
      { ok: false, status: "validation_error", error: "invalid_json", requestId },
      { status: 400 }
    );
  }

  const clientKey = getClientKey(request);
  const rateCheck = checkRateLimit(clientKey);
  if (!rateCheck.allowed) {
    logOutcome({
      requestId,
      httpStatus: 429,
      durationMs: Date.now() - startedAt,
      causeCategory: "rate_limited",
    });
    return NextResponse.json(
      {
        ok: false,
        status: "rate_limited",
        retryAfterSeconds: rateCheck.retryAfterSeconds,
        requestId,
      },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateCheck.retryAfterSeconds ?? 600),
        },
      }
    );
  }

  const validation = validateAndSanitizeDemoRequest(body);
  if (!validation.ok) {
    const causeCategory =
      validation.status === "spam_rejected" ? "spam_rejected" : "validation_error";
    logOutcome({
      requestId,
      httpStatus: 400,
      durationMs: Date.now() - startedAt,
      causeCategory,
    });
    return NextResponse.json(
      {
        ok: false,
        status: validation.status,
        ...(validation.fieldErrors ? { fieldErrors: validation.fieldErrors } : {}),
        requestId,
      },
      { status: 400 }
    );
  }

  const payload = validation.data;
  const fingerprint = createSubmissionFingerprint(payload);
  if (checkAndRecordDuplicate(fingerprint)) {
    logOutcome({
      requestId,
      httpStatus: 409,
      durationMs: Date.now() - startedAt,
      causeCategory: "duplicate_submission",
      locale: payload.locale,
    });
    return NextResponse.json(
      {
        ok: false,
        status: "duplicate_submission",
        requestId,
      },
      { status: 409 }
    );
  }

  const webhookUrl = process.env.CRM_WEBHOOK_URL?.trim();

  if (!webhookUrl) {
    logOutcome({
      requestId,
      httpStatus: 200,
      durationMs: Date.now() - startedAt,
      causeCategory: "integration_pending",
      locale: payload.locale,
      hasChallenge: Boolean(payload.challenge),
      hasCompanySize: Boolean(payload.companySize),
      hasMessage: Boolean(payload.message),
    });
    return NextResponse.json(
      {
        ok: false,
        status: "integration_pending",
        contactEmail: SITE_CONFIG.legal.contactEmail,
        requestId,
      },
      { status: 200 }
    );
  }

  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    const authToken = process.env.CRM_WEBHOOK_AUTH_TOKEN?.trim();
    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...payload,
        recipientEmail: SITE_CONFIG.legal.contactEmail,
        requestId,
      }),
      signal: AbortSignal.timeout(8000),
    });

    if (!upstream.ok) {
      logOutcome(
        {
          requestId,
          httpStatus: 502,
          durationMs: Date.now() - startedAt,
          causeCategory: `upstream_http_${upstream.status}`,
          locale: payload.locale,
        },
        true
      );
      return NextResponse.json(
        { ok: false, status: "upstream_error", requestId },
        { status: 502 }
      );
    }

    logOutcome({
      requestId,
      httpStatus: 200,
      durationMs: Date.now() - startedAt,
      causeCategory: "submitted",
      locale: payload.locale,
      hasChallenge: Boolean(payload.challenge),
      hasCompanySize: Boolean(payload.companySize),
      hasMessage: Boolean(payload.message),
    });

    return NextResponse.json({
      ok: true,
      status: "submitted",
      requestId,
    });
  } catch (error) {
    const causeCategory =
      error instanceof Error && error.name === "TimeoutError"
        ? "upstream_timeout"
        : "upstream_network_error";
    logOutcome(
      {
        requestId,
        httpStatus: 502,
        durationMs: Date.now() - startedAt,
        causeCategory,
        locale: payload.locale,
      },
      true
    );
    return NextResponse.json(
      { ok: false, status: "upstream_error", requestId },
      { status: 502 }
    );
  }
}
