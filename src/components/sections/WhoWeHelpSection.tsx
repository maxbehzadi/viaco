import { Check, Code2, Wrench } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface WhoWeHelpSectionProps {
  dict: Dictionary;
}

const GROUP_ICONS: Record<string, typeof Wrench> = {
  industrial: Wrench,
  engineering: Code2,
};

export function WhoWeHelpSection({ dict }: WhoWeHelpSectionProps) {
  return (
    <section
      id="zielgruppen"
      className="light-surface border-b border-[#DFDBD2] bg-[#FDFBF7] py-16 text-[#182622] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#182622] sm:text-4xl">
              {dict.whoWeHelp.headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#4A5A54] sm:text-lg">
              {dict.whoWeHelp.subheadline}
            </p>
          </div>
        </SectionReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {dict.whoWeHelp.groups.map((group, idx) => {
            const Icon = GROUP_ICONS[group.id] ?? Wrench;

            return (
              <SectionReveal key={group.id} delay={idx * 0.04}>
                <article className="card-surface flex h-full flex-col rounded-xl border border-[#DFDBD2] bg-white p-6 shadow-xs sm:p-7">
                  <div className="mb-4 flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D5A27] text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#2D5A27]">
                      {group.tag}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold leading-snug text-[#182622] sm:text-2xl">
                    {group.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#4A5A54] sm:text-base">
                    {group.description}
                  </p>

                  <ul className="mt-5 space-y-2 border-t border-[#DFDBD2] pt-4">
                    {group.points.map((point) => (
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
                </article>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
