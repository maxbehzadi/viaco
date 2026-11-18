"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  trackConversionEvent,
  type ConversionEventName,
} from "@/lib/analytics";
import type { Locale } from "@/i18n/config";

interface TrackedCtaLinkProps {
  href: string;
  locale: Locale;
  eventName: ConversionEventName;
  section?: string;
  className?: string;
  children: ReactNode;
}

export function TrackedCtaLink({
  href,
  locale,
  eventName,
  section,
  className,
  children,
}: TrackedCtaLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackConversionEvent(eventName, { locale, section });
      }}
    >
      {children}
    </Link>
  );
}
