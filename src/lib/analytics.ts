import { track } from "@vercel/analytics";
import { SITE_CONFIG } from "../config/site.ts";
import type { Locale } from "../i18n/config.ts";

export type ConversionEventName =
  | "demo_form_view"
  | "demo_form_start"
  | "demo_form_submit_success"
  | "demo_form_submit_error"
  | "hero_primary_cta_click"
  | "module_section_view";

export type AnalyticsDeliveryStatus =
  | "submitted"
  | "integration_pending"
  | "rate_limited"
  | "duplicate_submission"
  | "validation_error"
  | "error";

export interface ConversionEventProps {
  locale?: Locale;
  section?: string;
  deliveryStatus?: AnalyticsDeliveryStatus;
  hasChallenge?: boolean;
  hasCompanySize?: boolean;
}

type SafeAnalyticsValue = string | boolean;

/**
 * Checks whether telemetry is disabled globally or the visitor explicitly opted out
 * via localStorage.
 */
export function isAnalyticsSuppressed(): boolean {
  if (!SITE_CONFIG.analytics.enabled) {
    return true;
  }

  if (typeof window === "undefined") {
    return true;
  }

  try {
    if (
      window.localStorage.getItem(SITE_CONFIG.analytics.optOutStorageKey) ===
      "true"
    ) {
      return true;
    }
  } catch {
    // Ignore restricted storage access
  }

  return false;
}

/**
 * Strips all non-allowlisted properties so PII (names, emails, companies, messages)
 * can never be included in analytics event payloads.
 */
export function sanitizeAnalyticsPayload(
  props: ConversionEventProps = {}
): Record<string, SafeAnalyticsValue> {
  const safe: Record<string, SafeAnalyticsValue> = {};

  if (props.locale === "de" || props.locale === "en") {
    safe.locale = props.locale;
  }

  if (typeof props.section === "string" && props.section.trim().length > 0) {
    safe.section = props.section.trim().slice(0, 64);
  }

  if (props.deliveryStatus) {
    safe.deliveryStatus = props.deliveryStatus;
  }

  if (typeof props.hasChallenge === "boolean") {
    safe.hasChallenge = props.hasChallenge;
  }

  if (typeof props.hasCompanySize === "boolean") {
    safe.hasCompanySize = props.hasCompanySize;
  }

  return safe;
}

/**
 * Emits a privacy-reviewed conversion event via Vercel Web Analytics when telemetry
 * is enabled and not suppressed by browser DNT/GPC or user opt-out.
 */
export function trackConversionEvent(
  eventName: ConversionEventName,
  props: ConversionEventProps = {}
): boolean {
  if (isAnalyticsSuppressed()) {
    return false;
  }

  const safePayload = sanitizeAnalyticsPayload(props);

  try {
    track(eventName, safePayload);
    return true;
  } catch {
    return false;
  }
}
