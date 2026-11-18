import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCT_CONCEPT_ASSETS } from "@/config/assets";
import { ConceptImageFrame } from "@/components/ui/ConceptImageFrame";
import { TrackedCtaLink } from "@/components/ui/TrackedCtaLink";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface HeroSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  return (
    <section
      id="top"
      className="light-surface border-b border-[#DFDBD2] bg-[#FDFBF7] pt-28 pb-16 text-[#182622] sm:pt-32 sm:pb-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Narrative Column */}
          <div className="lg:col-span-5">
            <h1 className="font-display text-4xl leading-[1.1] font-semibold tracking-tight text-[#182622] sm:text-5xl">
              {dict.hero.headline}
            </h1>

            <p className="mt-5 text-base leading-relaxed text-[#4A5A54] sm:text-lg">
              {dict.hero.subheadline}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <TrackedCtaLink
                href={`/${locale}#kontakt`}
                locale={locale}
                eventName="hero_primary_cta_click"
                section="hero"
                className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-lg bg-[#2D5A27] px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-[#2D5A27]/20 transition-colors hover:bg-[#20342F]"
              >
                <span>{dict.hero.primaryCta}</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </TrackedCtaLink>

              <Link
                href={`/${locale}#loesungen`}
                className="inline-flex min-h-[48px] items-center justify-center rounded-lg border border-[#DFDBD2] bg-white px-6 py-3 text-sm font-semibold text-[#20342F] transition-colors hover:border-[#2D5A27] hover:bg-[#F5F3EE]"
              >
                {dict.hero.secondaryCta}
              </Link>
            </div>

            <p className="mt-6 border-t border-[#DFDBD2] pt-4 text-sm leading-relaxed text-[#4A5A54]">
              {dict.hero.stageNote}
            </p>
          </div>

          {/* VIACO Journey Concept Screenshot */}
          <div className="lg:col-span-7">
            <ConceptImageFrame
              asset={PRODUCT_CONCEPT_ASSETS.heroJourney}
              locale={locale}
              expandLabel={dict.hero.expandButton}
              closeLabel={dict.a11y.closeLightbox}
              dialogTitle={dict.a11y.lightboxTitle}
              priority
              sizes="(max-width: 1023px) 100vw, 58vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
