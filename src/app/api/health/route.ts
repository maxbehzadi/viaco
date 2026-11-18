import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/config/site";
import { locales } from "@/i18n/config";

export const dynamic = "force-dynamic";

/**
 * Lightweight synthetic health check endpoint for uptime monitoring.
 * Reports delivery integration readiness without exposing secret values or PII.
 */
export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      status: "healthy",
      brand: SITE_CONFIG.brandName,
      stage: "concept-validation",
      locales: [...locales],
      webhookConfigured: Boolean(process.env.CRM_WEBHOOK_URL?.trim()),
      analyticsEnabled: SITE_CONFIG.analytics.enabled,
      timestamp: new Date().toISOString(),
    },
    {
      status: 200,
      headers: {
        "Cache-Control": "no-store",
      },
    }
  );
}
