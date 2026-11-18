import { CheckCircle2, Globe, Laptop, Server, ShieldCheck } from "lucide-react";
import { SectionReveal } from "@/components/ui/SectionReveal";
import type { Dictionary } from "@/i18n/dictionaries";

interface TrustDeploymentSectionProps {
  dict: Dictionary;
}

const DEPLOYMENT_ICONS = [Globe, Server, Laptop] as const;

export function TrustDeploymentSection({ dict }: TrustDeploymentSectionProps) {
  const { trustDeployment } = dict;

  return (
    <section
      id="vertrauen-betrieb"
      className="light-surface border-b border-[#DFDBD2] bg-white py-16 text-[#182622] sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionReveal>
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#182622] sm:text-4xl">
              {trustDeployment.headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#4A5A54] sm:text-lg">
              {trustDeployment.subheadline}
            </p>
          </div>
        </SectionReveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Governance & Security Principles */}
          <SectionReveal delay={0.04}>
            <div className="card-surface h-full rounded-xl border border-[#DFDBD2] bg-[#FDFBF7] p-6 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[#DFDBD2] pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2D5A27] text-white">
                  <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold text-[#182622]">
                  {trustDeployment.governanceTitle}
                </h3>
              </div>

              <ul className="mt-5 space-y-4">
                {trustDeployment.governanceItems.map((item) => (
                  <li key={item.title} className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-5 w-5 shrink-0 text-[#2D5A27]"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="text-sm font-semibold text-[#182622] sm:text-base">
                        {item.title}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-[#4A5A54]">
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          {/* Planned Hosting & Client Access */}
          <SectionReveal delay={0.08}>
            <div className="card-surface h-full rounded-xl border border-[#DFDBD2] bg-[#F5F3EE] p-6 sm:p-7">
              <div className="flex items-center gap-3 border-b border-[#DFDBD2] pb-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#20342F] text-white">
                  <Server className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-xl font-semibold text-[#182622]">
                  {trustDeployment.deploymentTitle}
                </h3>
              </div>

              <ul className="mt-5 space-y-4">
                {trustDeployment.deploymentItems.map((item, idx) => {
                  const Icon = DEPLOYMENT_ICONS[idx] ?? Server;
                  return (
                    <li
                      key={item.title}
                      className="rounded-lg border border-[#DFDBD2] bg-white p-4"
                    >
                      <div className="flex items-start gap-3">
                        <Icon
                          className="mt-0.5 h-5 w-5 shrink-0 text-[#176B60]"
                          aria-hidden="true"
                        />
                        <div>
                          <p className="text-sm font-semibold text-[#182622] sm:text-base">
                            {item.title}
                          </p>
                          <p className="mt-1 text-sm leading-relaxed text-[#4A5A54]">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
