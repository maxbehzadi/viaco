"use client";

import Link from "next/link";
import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import {
  AlertCircle,
  CheckCircle2,
  Copy,
  Info,
  Mail,
  Send,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { SectionReveal } from "@/components/ui/SectionReveal";
import { SectionViewTracker } from "@/components/ui/SectionViewTracker";
import { trackConversionEvent } from "@/lib/analytics";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

interface DemoContactSectionProps {
  locale: Locale;
  dict: Dictionary;
}

type FieldName = "name" | "email" | "company" | "privacyAccepted";

interface FormValues {
  name: string;
  email: string;
  company: string;
  companySize: string;
  challenge: string;
  message: string;
  privacyAccepted: boolean;
  website: string; // Honeypot
}

type SubmissionState =
  | "idle"
  | "submitting"
  | "submitted"
  | "integration_pending"
  | "rate_limited"
  | "duplicate_submission"
  | "error";

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  company: "",
  companySize: "",
  challenge: "",
  message: "",
  privacyAccepted: false,
  website: "",
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function DemoContactSection({ locale, dict }: DemoContactSectionProps) {
  const formCopy = dict.contact.form;
  const baseId = useId();
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>(
    {}
  );
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [status, setStatus] = useState<SubmissionState>("idle");
  const [announcement, setAnnouncement] = useState("");
  const [copied, setCopied] = useState(false);

  const formStartedRef = useRef(false);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const companyRef = useRef<HTMLInputElement>(null);
  const privacyRef = useRef<HTMLInputElement>(null);

  const handleFormStart = () => {
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      trackConversionEvent("demo_form_start", { locale, section: "kontakt" });
    }
  };

  const validateField = (
    field: FieldName,
    nextValues: FormValues
  ): string | undefined => {
    switch (field) {
      case "name":
        return nextValues.name.trim().length >= 2
          ? undefined
          : formCopy.validation.nameRequired;
      case "email": {
        const trimmed = nextValues.email.trim();
        if (!trimmed) return formCopy.validation.emailRequired;
        return EMAIL_REGEX.test(trimmed)
          ? undefined
          : formCopy.validation.emailInvalid;
      }
      case "company":
        return nextValues.company.trim().length >= 2
          ? undefined
          : formCopy.validation.companyRequired;
      case "privacyAccepted":
        return nextValues.privacyAccepted
          ? undefined
          : formCopy.validation.privacyRequired;
      default:
        return undefined;
    }
  };

  const validateAll = (
    nextValues: FormValues
  ): Partial<Record<FieldName, string>> => {
    const fields: FieldName[] = [
      "name",
      "email",
      "company",
      "privacyAccepted",
    ];
    const nextErrors: Partial<Record<FieldName, string>> = {};
    for (const field of fields) {
      const err = validateField(field, nextValues);
      if (err) nextErrors[field] = err;
    }
    return nextErrors;
  };

  const handleBlur = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, values);
    setErrors((prev) => {
      const updated = { ...prev };
      if (err) {
        updated[field] = err;
        setAnnouncement(err);
      } else {
        delete updated[field];
      }
      return updated;
    });
  };

  const handleChange =
    (field: keyof FormValues) =>
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const nextValue =
        event.target instanceof HTMLInputElement &&
        event.target.type === "checkbox"
          ? event.target.checked
          : event.target.value;

      const updatedValues = { ...values, [field]: nextValue };
      setValues(updatedValues);

      if (
        field === "name" ||
        field === "email" ||
        field === "company" ||
        field === "privacyAccepted"
      ) {
        const err = validateField(field, updatedValues);
        setErrors((prev) => {
          const updated = { ...prev };
          if (!err) {
            delete updated[field];
          } else if (touched[field] || submitAttempted) {
            if (field === "privacyAccepted") {
              updated[field] = err;
            }
          }
          return updated;
        });
      }
    };

  const focusFirstInvalid = (nextErrors: Partial<Record<FieldName, string>>) => {
    const orderedRefs: Array<[FieldName, { focus: () => void } | null]> = [
      ["name", nameRef.current],
      ["email", emailRef.current],
      ["company", companyRef.current],
      ["privacyAccepted", privacyRef.current],
    ];
    for (const [field, el] of orderedRefs) {
      if (nextErrors[field] && el) {
        el.focus();
        break;
      }
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitAttempted(true);

    const nextErrors = validateAll(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstError = Object.values(nextErrors)[0] ?? "";
      setAnnouncement(`${formCopy.validation.summaryPrefix} ${firstError}`);
      trackConversionEvent("demo_form_submit_error", {
        locale,
        section: "kontakt",
        deliveryStatus: "validation_error",
      });
      focusFirstInvalid(nextErrors);
      return;
    }

    setStatus("submitting");
    setAnnouncement(formCopy.submitting);

    const hasChallenge = Boolean(values.challenge);
    const hasCompanySize = Boolean(values.companySize);

    try {
      const response = await fetch("/api/demo-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          locale,
        }),
      });

      const data = (await response.json()) as {
        ok?: boolean;
        status?: string;
      };

      if (response.ok && data.ok && data.status === "submitted") {
        setStatus("submitted");
        setAnnouncement(formCopy.states.configuredSuccessTitle);
        trackConversionEvent("demo_form_submit_success", {
          locale,
          section: "kontakt",
          deliveryStatus: "submitted",
          hasChallenge,
          hasCompanySize,
        });
        return;
      }

      if (response.ok && data.status === "integration_pending") {
        setStatus("integration_pending");
        setAnnouncement(formCopy.states.pendingIntegrationTitle);
        trackConversionEvent("demo_form_submit_success", {
          locale,
          section: "kontakt",
          deliveryStatus: "integration_pending",
          hasChallenge,
          hasCompanySize,
        });
        return;
      }

      if (response.status === 429 || data.status === "rate_limited") {
        setStatus("rate_limited");
        setAnnouncement(formCopy.states.rateLimitTitle);
        trackConversionEvent("demo_form_submit_error", {
          locale,
          section: "kontakt",
          deliveryStatus: "rate_limited",
        });
        return;
      }

      if (response.status === 409 || data.status === "duplicate_submission") {
        setStatus("duplicate_submission");
        setAnnouncement(formCopy.states.duplicateTitle);
        trackConversionEvent("demo_form_submit_error", {
          locale,
          section: "kontakt",
          deliveryStatus: "duplicate_submission",
        });
        return;
      }

      setStatus("error");
      setAnnouncement(formCopy.states.errorTitle);
      trackConversionEvent("demo_form_submit_error", {
        locale,
        section: "kontakt",
        deliveryStatus: "error",
      });
    } catch {
      setStatus("error");
      setAnnouncement(formCopy.states.errorTitle);
      trackConversionEvent("demo_form_submit_error", {
        locale,
        section: "kontakt",
        deliveryStatus: "error",
      });
    }
  };

  const buildSummaryText = () => {
    const sizeLabel = values.companySize
      ? (formCopy.companySizes.find((s) => s.value === values.companySize)
          ?.label ?? values.companySize)
      : "";
    const challengeLabel = values.challenge
      ? (formCopy.challenges.find((c) => c.value === values.challenge)
          ?.label ?? values.challenge)
      : "";

    return [
      `VIACO: ${formCopy.formHeading}`,
      `${formCopy.nameLabel}: ${values.name}`,
      `${formCopy.emailLabel}: ${values.email}`,
      `${formCopy.companyLabel}: ${values.company}`,
      sizeLabel ? `${formCopy.companySizeLabel}: ${sizeLabel}` : "",
      challengeLabel ? `${formCopy.challengeLabel}: ${challengeLabel}` : "",
      values.message ? `${formCopy.messageLabel}: ${values.message}` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const buildMailtoHref = () => {
    const recipient = SITE_CONFIG.legal.contactEmail;
    const subject = encodeURIComponent(
      `VIACO ${formCopy.formHeading} (${values.company})`
    );
    const body = encodeURIComponent(buildSummaryText());
    return `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  const handleCopySummary = async () => {
    try {
      await navigator.clipboard.writeText(buildSummaryText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setTouched({});
    setSubmitAttempted(false);
    setErrors({});
    setStatus("idle");
    setCopied(false);
    setAnnouncement("");
    formStartedRef.current = false;
  };

  const formHeadingId = `${baseId}-heading`;
  const emailHintId = `${baseId}-email-hint`;
  const messageHintId = `${baseId}-message-hint`;

  const fieldErrorId = (field: FieldName) => `${baseId}-${field}-error`;
  const isFieldInvalid = (field: FieldName) => Boolean(errors[field]);

  return (
    <section
      id="kontakt"
      className="light-surface bg-white py-16 sm:py-20"
    >
      <SectionViewTracker
        eventName="demo_form_view"
        locale={locale}
        section="kontakt"
      />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Context & Expectations Column */}
          <SectionReveal className="lg:col-span-5">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#182622] sm:text-4xl">
              {dict.contact.headline}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-[#4A5A54] sm:text-lg">
              {dict.contact.subheadline}
            </p>

            <ul className="mt-6 space-y-2.5">
              {dict.contact.expectations.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[#182622]"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5A27]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3 rounded-xl border border-[#DFDBD2] bg-[#F5F3EE] p-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#20342F]">
                <Info className="h-4 w-4 text-[#176B60]" aria-hidden="true" />
                <span>{dict.contact.transparencyBoxTitle}</span>
              </div>
              <p className="text-sm leading-relaxed text-[#4A5A54]">
                {dict.contact.transparencyBoxBody}
              </p>
              <div className="border-t border-[#DFDBD2] pt-3 text-sm">
                <span className="font-medium text-[#4A5A54]">
                  {dict.contact.directEmailLabel}:{" "}
                </span>
                <a
                  href={`mailto:${SITE_CONFIG.legal.contactEmail}`}
                  className="font-semibold text-[#2D5A27] underline underline-offset-4 hover:text-[#176B60]"
                >
                  {SITE_CONFIG.legal.contactEmail}
                </a>
              </div>
            </div>
          </SectionReveal>

          {/* Right Form Card */}
          <SectionReveal delay={0.06} className="lg:col-span-7">
            <div className="card-surface rounded-xl border border-[#DFDBD2] bg-white p-6 shadow-sm sm:p-8">
              <h3
                id={formHeadingId}
                className="font-display text-2xl font-semibold text-[#182622]"
              >
                {formCopy.formHeading}
              </h3>
              <p className="mt-2 text-sm text-[#4A5A54]">
                {dict.contact.expectationNote}
              </p>

              {/* Centralized single polite live region */}
              <div
                aria-live="polite"
                role="status"
                className="visually-hidden"
              >
                {announcement}
              </div>

              {status === "submitted" ? (
                <div className="mt-6 rounded-xl border border-[#2D5A27]/35 bg-[#F5F3EE] p-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle2
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#2D5A27]"
                      aria-hidden="true"
                    />
                    <div>
                      <h4 className="text-base font-semibold text-[#182622]">
                        {formCopy.states.configuredSuccessTitle}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#4A5A54]">
                        {formCopy.states.configuredSuccessBody}
                      </p>
                      <button
                        type="button"
                        onClick={handleReset}
                        className="mt-5 inline-flex min-h-[44px] items-center rounded-lg border border-[#20342F]/25 bg-white px-4 py-2 text-sm font-semibold text-[#20342F] transition-colors hover:bg-[#FDFBF7]"
                      >
                        {formCopy.states.resetButton}
                      </button>
                    </div>
                  </div>
                </div>
              ) : status === "integration_pending" ? (
                <div className="mt-6 rounded-xl border border-[#C2A785] bg-[#FDFBF7] p-6">
                  <div className="flex items-start gap-3">
                    <Info
                      className="mt-0.5 h-6 w-6 shrink-0 text-[#176B60]"
                      aria-hidden="true"
                    />
                    <div className="w-full">
                      <h4 className="text-base font-semibold text-[#182622]">
                        {formCopy.states.pendingIntegrationTitle}
                      </h4>
                      <p className="mt-2 text-sm leading-relaxed text-[#4A5A54]">
                        {formCopy.states.pendingIntegrationBody}
                      </p>

                      <pre className="mt-4 overflow-x-auto rounded-lg border border-[#DFDBD2] bg-[#F5F3EE] p-3 font-mono text-xs whitespace-pre-wrap text-[#182622]">
                        {buildSummaryText()}
                      </pre>

                      <div className="mt-5 flex flex-wrap gap-3">
                        <a
                          href={buildMailtoHref()}
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg bg-[#2D5A27] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#20342F]"
                        >
                          <Mail className="h-4 w-4" aria-hidden="true" />
                          <span>{formCopy.states.pendingFallbackAction}</span>
                        </a>

                        <button
                          type="button"
                          onClick={handleCopySummary}
                          className="inline-flex min-h-[44px] items-center gap-2 rounded-lg border border-[#5D6D67] bg-white px-4 py-2.5 text-sm font-semibold text-[#182622] transition-colors hover:bg-[#F5F3EE]"
                        >
                          <Copy className="h-4 w-4" aria-hidden="true" />
                          <span>
                            {copied
                              ? formCopy.states.copiedConfirmation
                              : formCopy.states.pendingCopySummary}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={handleReset}
                          className="inline-flex min-h-[44px] items-center rounded-lg px-3 py-2 text-sm font-medium text-[#4A5A54] underline underline-offset-4 hover:text-[#182622]"
                        >
                          {formCopy.states.resetButton}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form
                  method="POST"
                  action="/api/demo-request"
                  noValidate
                  aria-labelledby={formHeadingId}
                  onFocus={handleFormStart}
                  onSubmit={handleSubmit}
                  className="mt-6 space-y-5"
                >
                  {(status === "error" ||
                    status === "rate_limited" ||
                    status === "duplicate_submission") && (
                    <div
                      role="alert"
                      className="flex items-start gap-3 rounded-xl border border-[#9E1C1C]/40 bg-[#FDF2F2] p-4 text-sm text-[#9E1C1C]"
                    >
                      <AlertCircle
                        className="mt-0.5 h-5 w-5 shrink-0"
                        aria-hidden="true"
                      />
                      <div>
                        <p className="font-semibold">
                          {status === "rate_limited"
                            ? formCopy.states.rateLimitTitle
                            : status === "duplicate_submission"
                              ? formCopy.states.duplicateTitle
                              : formCopy.states.errorTitle}
                        </p>
                        <p className="mt-1">
                          {status === "rate_limited"
                            ? formCopy.states.rateLimitBody
                            : status === "duplicate_submission"
                              ? formCopy.states.duplicateBody
                              : formCopy.states.errorBody}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Honeypot field hidden from screen readers and keyboard focus */}
                  <div className="visually-hidden" aria-hidden="true">
                    <label htmlFor={`${baseId}-website`}>Website</label>
                    <input
                      id={`${baseId}-website`}
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={values.website}
                      onChange={handleChange("website")}
                    />
                  </div>

                  {/* Name (Required) */}
                  <div>
                    <label
                      htmlFor={`${baseId}-name`}
                      className="mb-1.5 block text-sm font-semibold text-[#182622]"
                    >
                      {formCopy.nameLabel}{" "}
                      <span aria-hidden="true" className="text-[#9E1C1C]">
                        *
                      </span>
                    </label>
                    <input
                      ref={nameRef}
                      id={`${baseId}-name`}
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      enterKeyHint="next"
                      aria-invalid={isFieldInvalid("name") ? "true" : "false"}
                      aria-describedby={
                        isFieldInvalid("name") ? fieldErrorId("name") : undefined
                      }
                      placeholder={formCopy.namePlaceholder}
                      value={values.name}
                      onChange={handleChange("name")}
                      onBlur={() => handleBlur("name")}
                      className="form-control w-full rounded-xl border bg-white px-4 py-3 text-[#182622] placeholder:text-[#596862]"
                    />
                    {errors.name && (
                      <p
                        id={fieldErrorId("name")}
                        className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[#9E1C1C]"
                      >
                        <AlertCircle
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Business Email (Required) */}
                  <div>
                    <label
                      htmlFor={`${baseId}-email`}
                      className="mb-1 block text-sm font-semibold text-[#182622]"
                    >
                      {formCopy.emailLabel}{" "}
                      <span aria-hidden="true" className="text-[#9E1C1C]">
                        *
                      </span>
                    </label>
                    <p
                      id={emailHintId}
                      className="mb-1.5 text-xs text-[#4A5A54]"
                    >
                      {formCopy.emailHint}
                    </p>
                    <input
                      ref={emailRef}
                      id={`${baseId}-email`}
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      autoCorrect="off"
                      autoCapitalize="none"
                      spellCheck={false}
                      enterKeyHint="next"
                      aria-invalid={isFieldInvalid("email") ? "true" : "false"}
                      aria-describedby={
                        isFieldInvalid("email")
                          ? `${emailHintId} ${fieldErrorId("email")}`
                          : emailHintId
                      }
                      placeholder={formCopy.emailPlaceholder}
                      value={values.email}
                      onChange={handleChange("email")}
                      onBlur={() => handleBlur("email")}
                      className="form-control w-full rounded-xl border bg-white px-4 py-3 text-[#182622] placeholder:text-[#596862]"
                    />
                    {errors.email && (
                      <p
                        id={fieldErrorId("email")}
                        className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[#9E1C1C]"
                      >
                        <AlertCircle
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  {/* Company (Required) */}
                  <div>
                    <label
                      htmlFor={`${baseId}-company`}
                      className="mb-1.5 block text-sm font-semibold text-[#182622]"
                    >
                      {formCopy.companyLabel}{" "}
                      <span aria-hidden="true" className="text-[#9E1C1C]">
                        *
                      </span>
                    </label>
                    <input
                      ref={companyRef}
                      id={`${baseId}-company`}
                      name="company"
                      type="text"
                      required
                      autoComplete="organization"
                      enterKeyHint="next"
                      aria-invalid={
                        isFieldInvalid("company") ? "true" : "false"
                      }
                      aria-describedby={
                        isFieldInvalid("company")
                          ? fieldErrorId("company")
                          : undefined
                      }
                      placeholder={formCopy.companyPlaceholder}
                      value={values.company}
                      onChange={handleChange("company")}
                      onBlur={() => handleBlur("company")}
                      className="form-control w-full rounded-xl border bg-white px-4 py-3 text-[#182622] placeholder:text-[#596862]"
                    />
                    {errors.company && (
                      <p
                        id={fieldErrorId("company")}
                        className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[#9E1C1C]"
                      >
                        <AlertCircle
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{errors.company}</span>
                      </p>
                    )}
                  </div>

                  {/* Optional Selects Grid */}
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {/* Optional Primary Challenge */}
                    <div>
                      <label
                        htmlFor={`${baseId}-challenge`}
                        className="mb-1.5 block text-sm font-semibold text-[#182622]"
                      >
                        {formCopy.challengeLabel}
                      </label>
                      <select
                        id={`${baseId}-challenge`}
                        name="challenge"
                        value={values.challenge}
                        onChange={handleChange("challenge")}
                        className="form-control w-full rounded-xl border bg-white px-4 py-3 text-[#182622]"
                      >
                        <option value="">{formCopy.challengePlaceholder}</option>
                        {formCopy.challenges.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Optional Company Size */}
                    <div>
                      <label
                        htmlFor={`${baseId}-companySize`}
                        className="mb-1.5 block text-sm font-semibold text-[#182622]"
                      >
                        {formCopy.companySizeLabel}
                      </label>
                      <select
                        id={`${baseId}-companySize`}
                        name="companySize"
                        value={values.companySize}
                        onChange={handleChange("companySize")}
                        className="form-control w-full rounded-xl border bg-white px-4 py-3 text-[#182622]"
                      >
                        <option value="">
                          {formCopy.companySizePlaceholder}
                        </option>
                        {formCopy.companySizes.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Optional Message / Feedback */}
                  <div>
                    <label
                      htmlFor={`${baseId}-message`}
                      className="mb-1 block text-sm font-semibold text-[#182622]"
                    >
                      {formCopy.messageLabel}
                    </label>
                    <p
                      id={messageHintId}
                      className="mb-1.5 text-xs text-[#4A5A54]"
                    >
                      {formCopy.messageHint}
                    </p>
                    <textarea
                      id={`${baseId}-message`}
                      name="message"
                      rows={3}
                      maxLength={2000}
                      aria-describedby={messageHintId}
                      placeholder={formCopy.messagePlaceholder}
                      value={values.message}
                      onChange={handleChange("message")}
                      className="form-control w-full rounded-xl border bg-white px-4 py-3 text-[#182622] placeholder:text-[#596862]"
                    />
                  </div>

                  {/* GDPR Privacy Consent (Required) */}
                  <div className="pt-1">
                    <div className="flex items-start gap-3">
                      <input
                        ref={privacyRef}
                        id={`${baseId}-privacy`}
                        name="privacyAccepted"
                        type="checkbox"
                        required
                        aria-invalid={
                          isFieldInvalid("privacyAccepted") ? "true" : "false"
                        }
                        aria-describedby={
                          isFieldInvalid("privacyAccepted")
                            ? fieldErrorId("privacyAccepted")
                            : undefined
                        }
                        checked={values.privacyAccepted}
                        onChange={handleChange("privacyAccepted")}
                        onBlur={() => handleBlur("privacyAccepted")}
                        className="mt-0.5 h-5 w-5 shrink-0 rounded border border-[#5D6D67] accent-[#2D5A27]"
                      />
                      <label
                        htmlFor={`${baseId}-privacy`}
                        className="text-sm leading-relaxed text-[#4A5A54]"
                      >
                        {formCopy.privacyLabel}{" "}
                        <Link
                          href={`/${locale}/datenschutz`}
                          className="font-semibold text-[#2D5A27] underline underline-offset-4 hover:text-[#176B60]"
                        >
                          {formCopy.privacyLinkText}
                        </Link>
                        <span aria-hidden="true" className="ml-1 text-[#9E1C1C]">
                          *
                        </span>
                      </label>
                    </div>
                    {errors.privacyAccepted && (
                      <p
                        id={fieldErrorId("privacyAccepted")}
                        className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-[#9E1C1C]"
                      >
                        <AlertCircle
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                        <span>{errors.privacyAccepted}</span>
                      </p>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-xl bg-[#2D5A27] px-6 py-3.5 text-sm font-semibold text-white shadow-md shadow-[#2D5A27]/20 transition-colors hover:bg-[#20342F] disabled:cursor-wait disabled:opacity-75"
                    >
                      <Send className="h-4 w-4" aria-hidden="true" />
                      <span>
                        {status === "submitting"
                          ? formCopy.submitting
                          : formCopy.submit}
                      </span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
