"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const pathname = usePathname() || `/${locale}`;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const switchLocalePath = (targetLocale: Locale) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return `/${targetLocale}`;
    if (segments[0] === "de" || segments[0] === "en") {
      segments[0] = targetLocale;
      return `/${segments.join("/")}`;
    }
    return `/${targetLocale}/${segments.join("/")}`;
  };

  const navItems = [
    { href: `/${locale}#loesungen`, label: dict.header.nav.solutions },
    { href: `/${locale}#so-funktionierts`, label: dict.header.nav.howItWorks },
    { href: `/${locale}#zielgruppen`, label: dict.header.nav.audience },
    { href: `/${locale}#ueber-uns`, label: dict.header.nav.about },
    { href: `/${locale}#kontakt`, label: dict.header.nav.contact },
  ];

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-[#DFDBD2] bg-white/95 shadow-sm shadow-[#20342F]/8 backdrop-blur-md"
          : "border-b border-[#DFDBD2] bg-[#FDFBF7]/92 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-3 rounded-lg py-1 text-[#182622] transition-colors hover:text-[#2D5A27]"
        >
          <span
            aria-hidden="true"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#2D5A27] text-white shadow-xs transition-colors group-hover:bg-[#20342F]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 6l7 12 7-12" />
              <path d="M9 6l3 5.5L15 6" opacity="0.65" />
            </svg>
          </span>
          <span className="text-lg font-semibold tracking-tight text-[#182622]">
            {dict.header.brand}
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          aria-label={dict.a11y.primaryNav}
          className="hidden items-center gap-6 lg:flex"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-1 py-1 text-sm font-medium whitespace-nowrap text-[#4A5A54] transition-colors hover:text-[#2D5A27]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions: Language Switcher & Primary CTA */}
        <div className="hidden items-center gap-3.5 lg:flex">
          <div
            role="group"
            aria-label={dict.a11y.languageSwitcher}
            className="inline-flex items-center rounded-lg border border-[#DFDBD2] bg-[#F5F3EE] p-0.5"
          >
            <Link
              href={switchLocalePath("de")}
              hrefLang="de"
              lang="de"
              aria-current={locale === "de" ? "true" : undefined}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                locale === "de"
                  ? "bg-[#2D5A27] text-white"
                  : "text-[#4A5A54] hover:text-[#182622]"
              }`}
            >
              {dict.header.langDe}
            </Link>
            <Link
              href={switchLocalePath("en")}
              hrefLang="en"
              lang="en"
              aria-current={locale === "en" ? "true" : undefined}
              className={`rounded-md px-2.5 py-1 text-xs font-semibold transition-colors ${
                locale === "en"
                  ? "bg-[#2D5A27] text-white"
                  : "text-[#4A5A54] hover:text-[#182622]"
              }`}
            >
              {dict.header.langEn}
            </Link>
          </div>

          <Link
            href={`/${locale}#kontakt`}
            className="inline-flex min-h-[42px] items-center justify-center rounded-lg bg-[#2D5A27] px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-sm shadow-[#2D5A27]/20 transition-all hover:bg-[#20342F]"
          >
            {dict.header.cta}
          </Link>
        </div>

        {/* Mobile & Tablet Controls */}
        <div className="flex items-center gap-2 lg:hidden">
          <div
            role="group"
            aria-label={dict.a11y.languageSwitcher}
            className="inline-flex items-center rounded-lg border border-[#DFDBD2] bg-[#F5F3EE] p-0.5"
          >
            <Link
              href={switchLocalePath("de")}
              hrefLang="de"
              lang="de"
              aria-current={locale === "de" ? "true" : undefined}
              className={`rounded-md px-2 py-1 text-xs font-semibold ${
                locale === "de"
                  ? "bg-[#2D5A27] text-white"
                  : "text-[#4A5A54]"
              }`}
            >
              DE
            </Link>
            <Link
              href={switchLocalePath("en")}
              hrefLang="en"
              lang="en"
              aria-current={locale === "en" ? "true" : undefined}
              className={`rounded-md px-2 py-1 text-xs font-semibold ${
                locale === "en"
                  ? "bg-[#2D5A27] text-white"
                  : "text-[#4A5A54]"
              }`}
            >
              EN
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileOpen ? dict.a11y.closeMenu : dict.a11y.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#DFDBD2] bg-white text-[#182622] transition-colors hover:border-[#2D5A27] hover:text-[#2D5A27]"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Navigation Panel */}
      {mobileOpen && (
        <nav
          id="mobile-navigation"
          aria-label={dict.a11y.mobileNav}
          className="border-t border-[#DFDBD2] bg-white px-4 py-5 shadow-lg lg:hidden"
        >
          <ul className="space-y-1.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-[#182622] transition-colors hover:bg-[#F5F3EE] hover:text-[#2D5A27]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-[#DFDBD2] pt-4">
            <Link
              href={`/${locale}#kontakt`}
              onClick={() => setMobileOpen(false)}
              className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-[#2D5A27] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#20342F]"
            >
              {dict.header.cta}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
