"use client";

import { useEffect, useRef } from "react";
import {
  trackConversionEvent,
  type ConversionEventName,
} from "@/lib/analytics";
import type { Locale } from "@/i18n/config";

interface SectionViewTrackerProps {
  eventName: ConversionEventName;
  locale: Locale;
  section: string;
}

/**
 * Fires a privacy-safe conversion event at most once per page load when a section
 * enters the viewport.
 */
export function SectionViewTracker({
  eventName,
  locale,
  section,
}: SectionViewTrackerProps) {
  const sentinelRef = useRef<HTMLSpanElement>(null);
  const firedRef = useRef(false);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || firedRef.current || typeof IntersectionObserver === "undefined") {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting) && !firedRef.current) {
          firedRef.current = true;
          trackConversionEvent(eventName, { locale, section });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [eventName, locale, section]);

  return (
    <span
      ref={sentinelRef}
      aria-hidden="true"
      className="pointer-events-none block h-px w-px opacity-0"
    />
  );
}
