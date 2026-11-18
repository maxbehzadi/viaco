"use client";

import { useSyncExternalStore } from "react";
import { ShieldCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface OptOutControlCopy {
  title: string;
  description: string;
  statusActive: string;
  statusDisabled: string;
  statusDnt: string;
  disableButton: string;
  enableButton: string;
}

interface AnalyticsOptOutToggleProps {
  copy: OptOutControlCopy;
}

const OPT_OUT_CHANGE_EVENT = "viaco:analytics-opt-out-change";

function emptySubscribe() {
  return () => {};
}

function subscribeOptOut(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(OPT_OUT_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(OPT_OUT_CHANGE_EVENT, onStoreChange);
  };
}

function getOptOutSnapshot(): boolean {
  try {
    return (
      window.localStorage.getItem(SITE_CONFIG.analytics.optOutStorageKey) ===
      "true"
    );
  } catch {
    return false;
  }
}

function getDntSnapshot(): boolean {
  if (typeof navigator === "undefined") return false;
  const nav = navigator as Navigator & {
    globalPrivacyControl?: boolean;
    msDoNotTrack?: string;
  };
  return (
    nav.doNotTrack === "1" ||
    nav.doNotTrack === "yes" ||
    nav.msDoNotTrack === "1" ||
    nav.globalPrivacyControl === true
  );
}

export function AnalyticsOptOutToggle({ copy }: AnalyticsOptOutToggleProps) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
  const optedOut = useSyncExternalStore(
    subscribeOptOut,
    getOptOutSnapshot,
    () => false
  );
  const dntActive = useSyncExternalStore(
    emptySubscribe,
    getDntSnapshot,
    () => false
  );

  const toggleOptOut = () => {
    const next = !optedOut;
    try {
      if (next) {
        window.localStorage.setItem(
          SITE_CONFIG.analytics.optOutStorageKey,
          "true"
        );
      } else {
        window.localStorage.removeItem(SITE_CONFIG.analytics.optOutStorageKey);
      }
      window.dispatchEvent(new Event(OPT_OUT_CHANGE_EVENT));
    } catch {
      // Ignore storage errors in restricted browsing contexts
    }
  };

  return (
    <section
      aria-labelledby="analytics-opt-out-heading"
      className="rounded-xl border border-[#2D5A27]/30 bg-[#F5F3EE] p-6 sm:p-8"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#2D5A27] text-white">
          <ShieldCheck className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="flex-1">
          <h2
            id="analytics-opt-out-heading"
            className="font-display text-xl font-semibold text-[#182622]"
          >
            {copy.title}
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#4A5A54] sm:text-base">
            {copy.description}
          </p>

          <p
            role="status"
            aria-live="polite"
            className="mt-4 rounded-lg border border-[#DFDBD2] bg-white px-4 py-2.5 font-mono text-xs font-semibold text-[#20342F]"
          >
            {!mounted
              ? copy.statusActive
              : dntActive
                ? copy.statusDnt
                : optedOut
                  ? copy.statusDisabled
                  : copy.statusActive}
          </p>

          {mounted && !dntActive && (
            <button
              type="button"
              onClick={toggleOptOut}
              aria-pressed={optedOut}
              className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#2D5A27] bg-white px-4 py-2 text-sm font-semibold text-[#2D5A27] transition-colors hover:bg-[#2D5A27] hover:text-white"
            >
              {optedOut ? copy.enableButton : copy.disableButton}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
