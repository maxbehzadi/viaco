export type ProductConceptAssetKey =
  | "heroJourney"
  | "moduleCapture"
  | "moduleManagement";

export interface ProductConceptAsset {
  src: string;
  width: number;
  height: number;
  alt: {
    de: string;
    en: string;
  };
  caption: {
    de: string;
    en: string;
  };
  sampleNotice: {
    de: string;
    en: string;
  };
}

/**
 * Authoritative mapping to the three product concept assets in `/public/viaco/`.
 * Filenames preserve exact on-disk spelling and case sensitivity.
 */
export const PRODUCT_CONCEPT_ASSETS: Record<
  ProductConceptAssetKey,
  ProductConceptAsset
> = {
  heroJourney: {
    src: "/viaco/viaco-journy.png",
    width: 1671,
    height: 941,
    alt: {
      de: "Konzeptansicht von VIACO Journey: Strukturierter Einarbeitungspfad über sieben Schritte mit Lerninhalt und quellenverlinktem VIACO-AI-Assistenten.",
      en: "Concept view of VIACO Journey: Structured seven-step onboarding path with lesson content and a source-linked VIACO AI assistant.",
    },
    caption: {
      de: "Konzeptansicht: VIACO Journey (geplante Benutzeroberfläche)",
      en: "Concept view: VIACO Journey (planned user interface)",
    },
    sampleNotice: {
      de: "Illustrative Beispieldaten",
      en: "Illustrative sample data",
    },
  },
  moduleCapture: {
    src: "/viaco/viaco-knowledgeHUB.png",
    width: 1672,
    height: 941,
    alt: {
      de: "Konzeptansicht von VIACO Capture: Erfassung einer technischen Erfahrung per Sprache oder Text mit KI-Strukturierung und Bestätigung vor Freigabe.",
      en: "Concept view of VIACO Capture: Logging a technical experience via voice or text with AI structuring and human confirmation before approval.",
    },
    caption: {
      de: "Konzeptansicht: VIACO Capture (geplante Benutzeroberfläche)",
      en: "Concept view: VIACO Capture (planned user interface)",
    },
    sampleNotice: {
      de: "Illustrative Beispieldaten (Staging-Beispiel)",
      en: "Illustrative sample data (staging example)",
    },
  },
  moduleManagement: {
    src: "/viaco/viaco-managemnet.png",
    width: 1672,
    height: 941,
    alt: {
      de: "Konzeptansicht von VIACO Management: Administrative Übersicht zur Pfadzuweisung, Fortschrittsverfolgung, Mentor-Koordination und Zugriffsverwaltung.",
      en: "Concept view of VIACO Management: Administrative view for path assignment, progress tracking, mentor coordination, and access control.",
    },
    caption: {
      de: "Konzeptansicht: VIACO Management (geplante Benutzeroberfläche)",
      en: "Concept view: VIACO Management (planned user interface)",
    },
    sampleNotice: {
      de: "Administrative Ansicht mit Beispieldaten",
      en: "Administrative view with sample data",
    },
  },
};
