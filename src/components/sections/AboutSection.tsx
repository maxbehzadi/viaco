import { SectionReveal } from "@/components/ui/SectionReveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface AboutSectionProps {
  dict: Dictionary;
}

export function AboutSection({ dict }: AboutSectionProps) {
  return (
    <section
      id="ueber-uns"
      className="light-surface border-b border-[#DFDBD2] bg-[#FDFBF7] py-16 text-[#182622] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <SectionReveal className="lg:col-span-6">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#182622] sm:text-4xl">
              {dict.about.headline}
            </h2>

            <p className="mt-4 text-base leading-relaxed text-[#4A5A54] sm:text-lg">
              {dict.about.intro}
            </p>

            <p className="mt-4 text-base leading-relaxed text-[#4A5A54]">
              {dict.about.detail}
            </p>
          </SectionReveal>

          <SectionReveal delay={0.06} className="lg:col-span-6">
            <blockquote className="rounded-xl border border-[#DFDBD2] bg-white p-6 shadow-xs sm:p-8">
              <p className="font-display text-lg leading-relaxed font-medium text-[#182622] italic sm:text-xl">
                {dict.about.visionQuote}
              </p>
            </blockquote>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
