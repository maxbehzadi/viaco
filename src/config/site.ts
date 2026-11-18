import type { Locale } from "@/i18n/config";

export interface LegalConfig {
  companyLegalName: {
    de: string;
    en: string;
  };
  legalForm: {
    de: string;
    en: string;
  };
  streetAddress: {
    de: string;
    en: string;
  };
  postalCodeAndCity: {
    de: string;
    en: string;
  };
  country: {
    de: string;
    en: string;
  };
  contactEmail: string;
  phone: {
    de: string;
    en: string;
  };
  commercialRegister: {
    de: string;
    en: string;
  };
  vatId: {
    de: string;
    en: string;
  };
  chamberMembership: {
    de: string;
    en: string;
  };
  regulatoryAuthority: {
    de: string;
    en: string;
  };
  linkedinUrl: string | null;
}

export const SITE_CONFIG = {
  brandName: "VIACO",
  platformDescriptor: "AI Knowledge & Onboarding Platform",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "http://localhost:3000",
  defaultLocale: "de" as Locale,
  /**
   * Central configuration for business, contact, and Austrian legal details.
   * Pending entity registration items remain explicitly marked until finalized.
   */
  legal: {
    companyLegalName: {
      de: "VIACO (Projekt- und Konzeptphase, finale Firmenbezeichnung in Vorbereitung)",
      en: "VIACO (Concept and validation stage, final registered entity name pending)",
    },
    legalForm: {
      de: "Software- & KI-Konzeptentwicklung (Gesellschaftsgründung / Rechtsform in Vorbereitung)",
      en: "Software & AI Concept Development (Legal entity registration pending)",
    },
    streetAddress: {
      de: "[Ausstehend: Geschäftsadresse vor kommerziellem Launch ergänzen]",
      en: "[Pending: Street address to be added before commercial launch]",
    },
    postalCodeAndCity: {
      de: "Österreich (Standortangabe in Vorbereitung)",
      en: "Austria (Exact location details pending)",
    },
    country: {
      de: "Österreich",
      en: "Austria",
    },
    contactEmail:
      process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || "office@viaco.at",
    phone: {
      de: "Anfragen bevorzugt per E-Mail an office@viaco.at (Telefonnummer folgt zum Marktstart)",
      en: "Inquiries preferred via email at office@viaco.at (telephone number to follow at launch)",
    },
    commercialRegister: {
      de: "[Ausstehend: Firmenbuchnummer & Firmenbuchgericht nach Eintragung ergänzen]",
      en: "[Pending: Austrian Commercial Register number (Firmenbuchnummer) & court upon registration]",
    },
    vatId: {
      de: "[Ausstehend: UID-Nummer gemäß § 27a UStG, falls zutreffend]",
      en: "[Pending: VAT Identification Number (UID-Nummer), if applicable]",
    },
    chamberMembership: {
      de: "[Ausstehend: WKO-Mitgliedschaft / Fachgruppe & Gewerbeberechtigung nach Anmeldung]",
      en: "[Pending: Austrian Chamber of Commerce (WKO) membership & trade license details]",
    },
    regulatoryAuthority: {
      de: "[Ausstehend: Zuständige Gewerbebehörde nach Standortfestlegung]",
      en: "[Pending: Competent Austrian trade authority once registered address is finalized]",
    },
    linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL?.trim() || null,
  } satisfies LegalConfig,
  analytics: {
    /**
     * Cookieless Vercel Web Analytics and Speed Insights can be controlled via
     * NEXT_PUBLIC_ENABLE_ANALYTICS and always respect browser DNT/GPC and user opt-out.
     */
    enabled: process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== "false",
    optOutStorageKey: "viaco-analytics-opt-out",
  },
} as const;
