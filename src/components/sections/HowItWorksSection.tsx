import { ArrowRight, BookOpenCheck, CheckSquare, Mic, Sparkles } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface HowItWorksSectionProps {
  dict: Dictionary;
}

const STEP_ICONS = [Mic, Sparkles, CheckSquare, BookOpenCheck] as const;

export function HowItWorksSection({ dict }: HowItWorksSectionProps) {
  return (
    <section
      id="so-funktionierts"
      className="light-surface border-b border-[#DFDBD2] bg-white py-16 text-[#182622] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#182622] sm:text-4xl">
              {dict.howItWorks.headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#4A5A54] sm:text-lg">
              {dict.howItWorks.subheadline}
            </p>
          </div>
        </SectionReveal>

        <ol className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {dict.howItWorks.steps.map((step, index) => {
            const Icon = STEP_ICONS[index] ?? Mic;

            return (
              <li key={step.number} className="flex">
                <SectionReveal delay={index * 0.04} className="flex w-full">
                  <div className="card-surface flex w-full flex-col rounded-xl border border-[#DFDBD2] bg-[#FDFBF7] p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D5A27] text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-xs font-semibold text-[#2D5A27]">
                          {step.number}
                        </span>
                        {index < dict.howItWorks.steps.length - 1 && (
                          <ArrowRight
                            className="hidden h-4 w-4 text-[#2D5A27]/60 lg:inline-block"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                    </div>

                    <h3 className="text-base font-semibold text-[#182622]">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-relaxed text-[#4A5A54]">
                      {step.description}
                    </p>
                  </div>
                </SectionReveal>
              </li>
            );
          })}
        </ol>

        <SectionReveal delay={0.08}>
          <div className="mt-8 rounded-xl border border-[#DFDBD2] bg-[#F5F3EE] p-6 sm:p-7">
            <h3 className="text-base font-semibold text-[#182622] sm:text-lg">
              {dict.howItWorks.exampleTitle}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#4A5A54] sm:text-base">
              {dict.howItWorks.exampleBody}
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
