import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
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
    title: dict.meta.impressumTitle,
    description: dict.meta.impressumDescription,
    alternates: {
      canonical: `/${locale}/impressum`,
      languages: {
        de: "/de/impressum",
        en: "/en/impressum",
      },
    },
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);
  const { legal } = SITE_CONFIG;

  const resolveFieldValue = (key: string): string => {
    switch (key) {
      case "companyLegalName":
        return legal.companyLegalName[locale];
      case "legalForm":
        return legal.legalForm[locale];
      case "address":
        return `${legal.streetAddress[locale]}, ${legal.postalCodeAndCity[locale]}`;
      case "country":
        return legal.country[locale];
      case "email":
        return legal.contactEmail;
      case "phone":
        return legal.phone[locale];
      case "commercialRegister":
        return legal.commercialRegister[locale];
      case "vatId":
        return legal.vatId[locale];
      case "chamber":
        return legal.chamberMembership[locale];
      case "authority":
        return legal.regulatoryAuthority[locale];
      default:
        return "";
    }
  };

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
            {dict.legal.impressum.title}
          </h1>
          <p className="mt-3 text-base leading-relaxed text-[#4A5A54]">
            {dict.legal.impressum.subtitle}
          </p>
        </header>

        {/* Project Stage & Pending Registration Notice */}
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

        <div className="mt-10 space-y-8">
          {dict.legal.impressum.sections.map((section) => (
            <section
              key={section.heading}
              className="rounded-xl border border-[#DFDBD2] bg-white p-6 sm:p-8"
            >
              <h2 className="font-display text-xl font-semibold text-[#182622]">
                {section.heading}
              </h2>

              {"items" in section && section.items ? (
                <dl className="mt-5 divide-y divide-[#DFDBD2]">
                  {section.items.map((item) => (
                    <div
                      key={item.key}
                      className="grid grid-cols-1 gap-1 py-3.5 sm:grid-cols-3 sm:gap-4"
                    >
                      <dt className="text-sm font-medium text-[#4A5A54]">
                        {item.label}
                      </dt>
                      <dd className="text-sm font-semibold text-[#182622] sm:col-span-2">
                        {item.key === "email" ? (
                          <a
                            href={`mailto:${legal.contactEmail}`}
                            className="text-[#2D5A27] underline underline-offset-4 hover:text-[#176B60]"
                          >
                            {legal.contactEmail}
                          </a>
                        ) : (
                          resolveFieldValue(item.key)
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-3 text-sm leading-relaxed text-[#4A5A54]">
                  {"body" in section ? section.body : ""}
                </p>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
