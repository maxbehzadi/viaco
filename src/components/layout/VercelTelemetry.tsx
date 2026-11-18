"use client";

import type { ComponentProps } from "react";
import { Analytics, type BeforeSendEvent } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_CONFIG } from "@/config/site";
import { isAnalyticsSuppressed } from "@/lib/analytics";

type SpeedInsightsBeforeSend = NonNullable<
  ComponentProps<typeof SpeedInsights>["beforeSend"]
>;

function stripQueryAndHash(rawUrl: string): string | null {
  try {
    const base =
      typeof window !== "undefined" ? window.location.origin : "https://viaco.at";
    const parsed = new URL(rawUrl, base);
    if (parsed.pathname.startsWith("/api")) {
      return null;
    }
    parsed.search = "";
    parsed.hash = "";
    return parsed.toString();
  } catch {
    return null;
  }
}

function handleAnalyticsBeforeSend(
  event: BeforeSendEvent
): BeforeSendEvent | null {
  if (isAnalyticsSuppressed()) {
    return null;
  }
  const cleanUrl = stripQueryAndHash(event.url);
  if (!cleanUrl) {
    return null;
  }
  return {
    ...event,
    url: cleanUrl,
  };
}

const handleSpeedInsightsBeforeSend: SpeedInsightsBeforeSend = (event) => {
  if (isAnalyticsSuppressed()) {
    return null;
  }
  const cleanUrl = stripQueryAndHash(event.url);
  if (!cleanUrl) {
    return null;
  }
  return {
    ...event,
    url: cleanUrl,
  };
};

/**
 * Loads cookieless Vercel Web Analytics and Speed Insights when enabled,
 * stripping query strings/hashes and enforcing DNT, GPC, and user opt-out.
 */
export function VercelTelemetry() {
  if (!SITE_CONFIG.analytics.enabled) {
    return null;
  }

  return (
    <>
      <Analytics beforeSend={handleAnalyticsBeforeSend} />
      <SpeedInsights beforeSend={handleSpeedInsightsBeforeSend} />
    </>
  );
}
