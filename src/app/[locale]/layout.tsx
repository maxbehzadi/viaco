import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { VercelTelemetry } from "@/components/layout/VercelTelemetry";
import { MotionProvider } from "@/components/ui/SectionReveal";
import { SITE_CONFIG } from "@/config/site";
import { isValidLocale, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import "../globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = isValidLocale(rawLocale) ? rawLocale : "de";
  const dict = getDictionary(locale);
  const isNonProductionDeployment =
    Boolean(process.env.VERCEL_ENV) &&
    process.env.VERCEL_ENV !== "production";

  return {
    metadataBase: new URL(SITE_CONFIG.siteUrl),
    title: {
      default: dict.meta.title,
      template: "%s",
    },
    description: dict.meta.description,
    ...(isNonProductionDeployment
      ? {
          robots: {
            index: false,
            follow: false,
          },
        }
      : {}),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        de: "/de",
        en: "/en",
        "x-default": "/de",
      },
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      url: `${SITE_CONFIG.siteUrl}/${locale}`,
      siteName: SITE_CONFIG.brandName,
      locale: locale === "de" ? "de_AT" : "en_US",
      alternateLocale: locale === "de" ? ["en_US"] : ["de_AT"],
      type: "website",
      images: [
        {
          url: "/viaco/viaco-journy.png",
          width: 1671,
          height: 941,
          alt: dict.meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.title,
      description: dict.meta.description,
      images: ["/viaco/viaco-journy.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isValidLocale(rawLocale)) {
    notFound();
  }

  const locale: Locale = rawLocale;
  const dict = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.brandName,
    description: dict.meta.description,
    url: `${SITE_CONFIG.siteUrl}/${locale}`,
    areaServed: "AT",
  };

  return (
    <html
      lang={locale === "de" ? "de-AT" : "en"}
      className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#FDFBF7] text-[#182622] antialiased selection:bg-[#2D5A27] selection:text-[#FDFBF7]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <a href="#main-content" className="skip-link visually-hidden">
          {dict.a11y.skipToContent}
        </a>
        <MotionProvider>
          <div className="flex min-h-screen flex-col">
            <Header locale={locale} dict={dict} />
            <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
              {children}
            </main>
            <Footer locale={locale} dict={dict} />
          </div>
        </MotionProvider>
        <VercelTelemetry />
      </body>
    </html>
  );
}
