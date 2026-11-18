import {
  Check,
  Compass,
  Mic,
  SlidersHorizontal,
} from "lucide-react";
import { PRODUCT_CONCEPT_ASSETS } from "@/config/assets";
import { ConceptImageFrame } from "@/components/ui/ConceptImageFrame";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionViewTracker } from "@/components/ui/SectionViewTracker";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface SolutionModulesSectionProps {
  locale: Locale;
  dict: Dictionary;
}

export function SolutionModulesSection({
  locale,
  dict,
}: SolutionModulesSectionProps) {
  const { journey, capture, management } = dict.solution;

  return (
    <section
      id="loesungen"
      className="light-surface border-b border-[#DFDBD2] bg-[#FDFBF7] py-16 text-[#182622] sm:py-20"
    >
      <SectionViewTracker
        eventName="module_section_view"
        locale={locale}
        section="loesungen"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Platform Intro */}
        <SectionReveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#182622] sm:text-4xl">
              {dict.solution.headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#4A5A54] sm:text-lg">
              {dict.solution.subheadline}
            </p>
          </div>
        </SectionReveal>

        <div className="mt-12 space-y-16 lg:mt-16 lg:space-y-20">
          {/* VIACO Journey */}
          <SectionReveal delay={0.03}>
            <article
              id="modul-journey"
              className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5">
                <div className="mb-3 flex items-center gap-2.5 text-sm leading-none font-semibold text-[#2D5A27]">
                  <Compass className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{journey.name}</span>
                </div>

                <h3 className="font-display text-2xl font-semibold leading-snug text-[#182622] sm:text-[1.75rem]">
                  {journey.headline}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-[#4A5A54]">
                  {journey.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {journey.benefits.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[#182622]"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-[#2D5A27]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7">
                <ConceptImageFrame
                  asset={PRODUCT_CONCEPT_ASSETS.heroJourney}
                  locale={locale}
                  expandLabel={dict.hero.expandButton}
                  closeLabel={dict.a11y.closeLightbox}
                  dialogTitle={dict.a11y.lightboxTitle}
                  sizes="(max-width: 1023px) 100vw, 58vw"
                />
              </div>
            </article>
          </SectionReveal>

          {/* VIACO Capture */}
          <SectionReveal delay={0.03}>
            <article
              id="modul-capture"
              className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:order-2 lg:col-span-5">
                <div className="mb-3 flex items-center gap-2.5 text-sm leading-none font-semibold text-[#2D5A27]">
                  <Mic className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{capture.name}</span>
                </div>

                <h3 className="font-display text-2xl font-semibold leading-snug text-[#182622] sm:text-[1.75rem]">
                  {capture.headline}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-[#4A5A54]">
                  {capture.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {capture.benefits.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[#182622]"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-[#2D5A27]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:order-1 lg:col-span-7">
                <ConceptImageFrame
                  asset={PRODUCT_CONCEPT_ASSETS.moduleCapture}
                  locale={locale}
                  expandLabel={dict.hero.expandButton}
                  closeLabel={dict.a11y.closeLightbox}
                  dialogTitle={dict.a11y.lightboxTitle}
                  sizes="(max-width: 1023px) 100vw, 58vw"
                />
              </div>
            </article>
          </SectionReveal>

          {/* VIACO Management */}
          <SectionReveal delay={0.03}>
            <article
              id="modul-management"
              className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5">
                <div className="mb-3 flex items-center gap-2.5 text-sm leading-none font-semibold text-[#2D5A27]">
                  <SlidersHorizontal
                    className="h-4 w-4 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{management.name}</span>
                </div>

                <h3 className="font-display text-2xl font-semibold leading-snug text-[#182622] sm:text-[1.75rem]">
                  {management.headline}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-[#4A5A54]">
                  {management.description}
                </p>

                <ul className="mt-5 space-y-2">
                  {management.benefits.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-[#182622]"
                    >
                      <Check
                        className="mt-1 h-4 w-4 shrink-0 text-[#2D5A27]"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="lg:col-span-7">
                <ConceptImageFrame
                  asset={PRODUCT_CONCEPT_ASSETS.moduleManagement}
                  locale={locale}
                  expandLabel={dict.hero.expandButton}
                  closeLabel={dict.a11y.closeLightbox}
                  dialogTitle={dict.a11y.lightboxTitle}
                  sizes="(max-width: 1023px) 100vw, 58vw"
                />
              </div>
            </article>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
