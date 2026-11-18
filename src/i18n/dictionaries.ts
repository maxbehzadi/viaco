import de from "./locales/de.json";
import en from "./locales/en.json";
import type { Locale } from "./config";

export type Dictionary = typeof de;

const dictionaries: Record<Locale, Dictionary> = {
  de,
  en,
};

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.de;
}
