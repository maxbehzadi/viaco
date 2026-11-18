import { SectionReveal } from "@/components/ui/SectionReveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface ProblemSolutionSectionProps {
  dict: Dictionary;
}

export function ProblemSolutionSection({ dict }: ProblemSolutionSectionProps) {
  return (
    <section
      id="herausforderungen"
      className="light-surface border-b border-[#DFDBD2] bg-white py-16 text-[#182622] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#182622] sm:text-4xl">
              {dict.problem.headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#4A5A54] sm:text-lg">
              {dict.problem.subheadline}
            </p>
          </div>
        </SectionReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {dict.problem.items.map((item, idx) => (
            <SectionReveal key={item.id} delay={idx * 0.04}>
              <article className="card-surface flex h-full flex-col rounded-xl border border-[#DFDBD2] bg-[#FDFBF7] p-6">
                <h3 className="text-lg font-semibold leading-snug text-[#182622]">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-[#4A5A54] sm:text-base">
                  {item.description}
                </p>
              </article>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
