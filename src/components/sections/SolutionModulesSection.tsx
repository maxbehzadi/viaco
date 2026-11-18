import Link from "next/link";
import {
  ArrowUp,
  Check,
  CheckCircle2,
  Compass,
  Database,
  FileCheck2,
  Lock,
  MessageSquareText,
  Mic,
  SlidersHorizontal,
  UserCheck,
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
  const { journey, capture, memoryAssistant, management } = dict.solution;

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
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5">
                <div className="mb-3 flex items-center gap-2.5 text-sm font-semibold text-[#2D5A27]">
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

                <div className="mt-5">
                  <Link
                    href={`/${locale}#top`}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D5A27] underline decoration-[#2D5A27]/45 underline-offset-4 transition-colors hover:text-[#176B60]"
                  >
                    <span>{journey.heroLinkLabel}</span>
                    <ArrowUp className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-xl border border-[#DFDBD2] bg-white p-6 shadow-md shadow-[#20342F]/6 sm:p-7">
                  <h4 className="text-base font-semibold text-[#182622]">
                    {journey.schematicTitle}
                  </h4>

                  <ol className="mt-4 space-y-2.5">
                    {journey.schematicSteps.map((item, idx) => (
                      <li
                        key={item.step}
                        className={`flex items-center justify-between gap-3 rounded-lg border px-4 py-3 text-sm ${
                          idx === 1
                            ? "border-[#176B60] bg-[#FDFBF7]"
                            : "border-[#DFDBD2] bg-[#F5F3EE]/70"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-semibold ${
                              idx === 0
                                ? "bg-[#2D5A27] text-white"
                                : idx === 1
                                  ? "bg-[#176B60] text-white"
                                  : "border border-[#5D6D67] bg-white text-[#4A5A54]"
                            }`}
                          >
                            {item.step}
                          </span>
                          <span className="font-medium text-[#182622]">
                            {item.label}
                          </span>
                        </div>
                        <span className="font-mono text-xs font-semibold text-[#4A5A54]">
                          {item.status}
                        </span>
                      </li>
                    ))}
                  </ol>

                  <div className="mt-4 flex items-center gap-3 rounded-lg border border-[#DFDBD2] bg-[#F5F3EE] px-4 py-3 text-xs text-[#182622]">
                    <UserCheck
                      className="h-4 w-4 shrink-0 text-[#2D5A27]"
                      aria-hidden="true"
                    />
                    <div>
                      <span className="font-semibold text-[#20342F]">
                        {journey.mentorLabel}:{" "}
                      </span>
                      <span className="text-[#4A5A54]">
                        {journey.mentorRole}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </SectionReveal>

          {/* VIACO Capture */}
          <SectionReveal delay={0.03}>
            <article
              id="modul-capture"
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:order-2 lg:col-span-5">
                <div className="mb-3 flex items-center gap-2.5 text-sm font-semibold text-[#2D5A27]">
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

          {/* VIACO Memory & AI Assistant */}
          <SectionReveal delay={0.03}>
            <article
              id="modul-memory-assistant"
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:col-span-5">
                <div className="mb-3 flex items-center gap-2.5 text-sm font-semibold text-[#2D5A27]">
                  <Database className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{memoryAssistant.name}</span>
                </div>

                <h3 className="font-display text-2xl font-semibold leading-snug text-[#182622] sm:text-[1.75rem]">
                  {memoryAssistant.headline}
                </h3>

                <p className="mt-3 text-base leading-relaxed text-[#4A5A54]">
                  {memoryAssistant.description}
                </p>

                <div className="mt-5 space-y-3">
                  <div className="rounded-lg border border-[#DFDBD2] bg-white p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#182622]">
                      <Database
                        className="h-4 w-4 shrink-0 text-[#2D5A27]"
                        aria-hidden="true"
                      />
                      <h4>{memoryAssistant.memoryTitle}</h4>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[#4A5A54]">
                      {memoryAssistant.memoryDesc}
                    </p>
                  </div>

                  <div className="rounded-lg border border-[#DFDBD2] bg-white p-4">
                    <div className="flex items-center gap-2 text-sm font-semibold text-[#182622]">
                      <MessageSquareText
                        className="h-4 w-4 shrink-0 text-[#176B60]"
                        aria-hidden="true"
                      />
                      <h4>{memoryAssistant.assistantTitle}</h4>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-[#4A5A54]">
                      {memoryAssistant.assistantDesc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-xl border border-[#DFDBD2] bg-white p-6 shadow-md shadow-[#20342F]/6 sm:p-7">
                  <h4 className="text-base font-semibold text-[#182622]">
                    {memoryAssistant.schematicTitle}
                  </h4>

                  <div className="mt-4 rounded-lg border border-[#DFDBD2] bg-[#F5F3EE] p-4 text-sm font-medium text-[#182622]">
                    {memoryAssistant.schematicQuestion}
                  </div>

                  <div className="mt-3 rounded-lg border border-[#2D5A27]/30 bg-[#FDFBF7] p-4">
                    <p className="text-sm leading-relaxed text-[#182622]">
                      {memoryAssistant.schematicAnswer}
                    </p>

                    <div className="mt-3.5 flex flex-wrap items-center gap-2 border-t border-[#DFDBD2] pt-3 text-xs">
                      <FileCheck2
                        className="h-4 w-4 shrink-0 text-[#2D5A27]"
                        aria-hidden="true"
                      />
                      <span className="font-semibold text-[#4A5A54]">
                        {memoryAssistant.schematicSourceLabel}:
                      </span>
                      <span className="font-medium text-[#2D5A27]">
                        {memoryAssistant.schematicSourceValue}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-medium text-[#4A5A54]">
                    <Lock
                      className="h-3.5 w-3.5 text-[#2D5A27]"
                      aria-hidden="true"
                    />
                    <span>{memoryAssistant.schematicAccessNote}</span>
                    <CheckCircle2
                      className="ml-auto h-4 w-4 text-[#2D5A27]"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </article>
          </SectionReveal>

          {/* VIACO Management */}
          <SectionReveal delay={0.03}>
            <article
              id="modul-management"
              className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
            >
              <div className="lg:order-2 lg:col-span-5">
                <div className="mb-3 flex items-center gap-2.5 text-sm font-semibold text-[#2D5A27]">
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

              <div className="lg:order-1 lg:col-span-7">
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
