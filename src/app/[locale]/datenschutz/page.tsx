import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { AnalyticsOptOutToggle } from "@/components/ui/AnalyticsOptOutToggle";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : "de";
  const dict = getDictionary(locale);

  return {
    title: dict.meta.datenschutzTitle,
    description: dict.meta.datenschutzDescription,
    alternates: {
      canonical: `/${locale}/datenschutz`,
      languages: {
        de: "/de/datenschutz",
        en: "/en/datenschutz",
      },
    },
  };
}

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <div className="light-surface bg-[#FDFBF7] pt-28 pb-24 sm:pt-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-[#2D5A27] transition-colors hover:text-[#176B60]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>{dict.legal.backHome}</span>
        </Link>

        <header className="mt-8 border-b border-[#DFDBD2] pb-8">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-[#182622] sm:text-4xl">
            {dict.legal.datenschutz.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#4A5A54]">
            {dict.legal.datenschutz.subtitle}
          </p>
        </header>

        <div className="mt-8 rounded-xl border border-[#C2A785] bg-[#F5F3EE] p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-[#20342F]"
              aria-hidden="true"
            />
            <div>
              <h2 className="text-sm font-semibold text-[#182622]">
                {dict.legal.placeholderWarningTitle}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-[#4A5A54]">
                {dict.legal.placeholderWarningBody}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {dict.legal.datenschutz.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-xl border border-[#DFDBD2] bg-white p-6 sm:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-[#182622]">
                {section.heading}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-[#4A5A54] sm:text-base">
                {section.body}
              </p>
            </section>
          ))}

          <AnalyticsOptOutToggle copy={dict.legal.datenschutz.optOutControl} />
        </div>
      </div>
    </div>
  );
}
