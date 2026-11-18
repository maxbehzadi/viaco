import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const { legal } = SITE_CONFIG;

  return (
    <footer className="border-t border-[#DFDBD2] bg-[#F5F3EE] text-[#182622]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Column 1: Branding & Direct Email */}
          <div className="md:col-span-5">
            <Link
              href={`/${locale}`}
              className="inline-flex items-center rounded-lg py-0.5 transition-opacity hover:opacity-90"
            >
              <Image
                src="/logo.png"
                alt={SITE_CONFIG.brandName}
                width={2172}
                height={724}
                sizes="(max-width: 639px) 120px, 132px"
                className="h-10 w-auto object-contain sm:h-11"
              />
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#4A5A54]">
              {dict.footer.tagline}
            </p>

            <div className="mt-6 rounded-xl border border-[#DFDBD2] bg-white p-4 text-sm text-[#4A5A54]">
              <p className="font-mono text-xs font-semibold text-[#2D5A27]">
                {SITE_CONFIG.platformDescriptor}
              </p>
              <p className="mt-1.5">
                <a
                  href={`mailto:${legal.contactEmail}`}
                  className="font-semibold text-[#182622] underline decoration-[#2D5A27]/60 underline-offset-4 hover:text-[#2D5A27]"
                >
                  {legal.contactEmail}
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Platform & Flow */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#2D5A27]">
              {dict.footer.columns.solutions}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href={`/${locale}#herausforderungen`}
                  className="text-[#4A5A54] transition-colors hover:text-[#2D5A27]"
                >
                  {dict.footer.links.problem}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#loesungen`}
                  className="text-[#4A5A54] transition-colors hover:text-[#2D5A27]"
                >
                  {dict.footer.links.modules}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#so-funktionierts`}
                  className="text-[#4A5A54] transition-colors hover:text-[#2D5A27]"
                >
                  {dict.footer.links.howItWorks}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Overview */}
          <div className="md:col-span-2">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#2D5A27]">
              {dict.footer.columns.company}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href={`/${locale}#zielgruppen`}
                  className="text-[#4A5A54] transition-colors hover:text-[#2D5A27]"
                >
                  {dict.footer.links.whoWeHelp}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#vertrauen-betrieb`}
                  className="text-[#4A5A54] transition-colors hover:text-[#2D5A27]"
                >
                  {dict.footer.links.trust}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}#ueber-uns`}
                  className="text-[#4A5A54] transition-colors hover:text-[#2D5A27]"
                >
                  {dict.footer.links.about}
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Contact */}
          <div className="md:col-span-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#2D5A27]">
              {dict.footer.columns.legalAndContact}
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link
                  href={`/${locale}#kontakt`}
                  className="font-semibold text-[#2D5A27] transition-colors hover:text-[#20342F]"
                >
                  {dict.footer.links.contact}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/impressum`}
                  className="text-[#4A5A54] transition-colors hover:text-[#2D5A27]"
                >
                  {dict.footer.links.impressum}
                </Link>
              </li>
              <li>
                <Link
                  href={`/${locale}/datenschutz`}
                  className="text-[#4A5A54] transition-colors hover:text-[#2D5A27]"
                >
                  {dict.footer.links.datenschutz}
                </Link>
              </li>
              {legal.linkedinUrl && (
                <li>
                  <a
                    href={legal.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[#182622] underline decoration-[#2D5A27]/60 underline-offset-4 hover:text-[#2D5A27]"
                  >
                    <span>{dict.footer.linkedinLabel}</span>
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Language Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[#DFDBD2] pt-8 text-xs text-[#4A5A54] sm:flex-row sm:items-center">
          <p>{dict.footer.statusNote}</p>
          <div className="flex items-center gap-4">
            <div className="inline-flex items-center gap-2">
              <Link
                href="/de"
                hrefLang="de"
                lang="de"
                className={`rounded px-2 py-1 font-semibold transition-colors ${
                  locale === "de"
                    ? "bg-[#2D5A27] text-white"
                    : "text-[#4A5A54] hover:text-[#182622]"
                }`}
              >
                Deutsch
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                href="/en"
                hrefLang="en"
                lang="en"
                className={`rounded px-2 py-1 font-semibold transition-colors ${
                  locale === "en"
                    ? "bg-[#2D5A27] text-white"
                    : "text-[#4A5A54] hover:text-[#182622]"
                }`}
              >
                English
              </Link>
            </div>
            <a
              href="#top"
              className="rounded px-2 py-1 font-semibold text-[#2D5A27] transition-colors hover:text-[#20342F]"
            >
              {dict.footer.backToTop}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
