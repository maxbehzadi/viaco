import { notFound } from "next/navigation";
import { AboutSection } from "@/components/sections/AboutSection";
import { DemoContactSection } from "@/components/sections/DemoContactSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection";
import { SolutionModulesSection } from "@/components/sections/SolutionModulesSection";
import { TrustDeploymentSection } from "@/components/sections/TrustDeploymentSection";
import { WhoWeHelpSection } from "@/components/sections/WhoWeHelpSection";
import { isValidLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function LocaleHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isValidLocale(locale)) {
    notFound();
  }

  const dict = getDictionary(locale);

  return (
    <>
      <HeroSection locale={locale} dict={dict} />
      <ProblemSolutionSection dict={dict} />
      <SolutionModulesSection locale={locale} dict={dict} />
      <HowItWorksSection dict={dict} />
      <WhoWeHelpSection dict={dict} />
      <TrustDeploymentSection dict={dict} />
      <AboutSection dict={dict} />
      <DemoContactSection locale={locale} dict={dict} />
    </>
  );
}
