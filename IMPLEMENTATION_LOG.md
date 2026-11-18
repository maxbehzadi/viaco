# VIACO Landing Page — Implementation Log

This document records the phase-by-phase execution, files changed, validation results, and open blockers for the VIACO marketing website redesign.

---

## Phase 0 — Repository, Content & Asset Audit
- **Date**: 2026-11-18
- **Status**: Completed & Approved (Approval Gate A)
- **Summary of Audit Findings**:
  - Tech stack verified: Next.js `^16.4.6` (App Router), React `^19.3.1`, TypeScript `^6.0.2`, Tailwind CSS `^4.3.5`, `motion` `^14.14.0`, `lucide-react` `^1.74.0`.
  - Baseline checks passed: `npm run typecheck` and `npm run lint` both exited `0`.
  - Historical brand check: Zero occurrences of `Revia` in codebase or assets.
  - Asset verification in `public/viaco/`:
    - `viaco-journy.png` (`1671×941`, 1.6 MB) — Journey + VIACO AI sidebar; contains illustrative "2018 Gründung" sample timeline.
    - `viaco-knowledgeHUB.png` (`1672×941`, 1.8 MB) — Capture + AI draft confirmation (`Bestätigen` / `Bearbeiten`) + Redis `REDIS_DB` example; minor typo `Rediis-Caching` in image text.
    - `viaco-managemnet.png` (`1672×941`, 1.6 MB) — Onboarding Hub manager view + access control banner; minor typo `ihnzufügen` in button inside image.
  - Duplication & placeholder audit:
    - Identified `ProductExperienceSection` as a duplicate 4-tab gallery repeating `SolutionModulesSection`.
    - Identified developer-only strings in `src/config/assets.ts` and placeholders (`"Ersetzbar in src/config/assets.ts"`, `"Screenshot-Platzhalter"`, `konzept.viaco.internal/...`).
    - Identified `TeamVisualPlaceholder` showing an empty 4:3 placeholder box.
    - Identified `ProductExperienceSection` and `SolutionModulesSection` not using the 3 existing PNGs (`src: undefined` on all slots).
- **Files Created / Updated**:
  - `OPEN_DECISIONS.md` (created)
  - `IMPLEMENTATION_LOG.md` (created)
  - `TASKS.md` (Phase 0 items checked off)

---

## Phase 1 — Messaging, Content Model & Asset Wiring
- **Date**: 2026-11-18
- **Status**: Completed & Validated
- **Work Done**:
  - Updated `src/config/site.ts` to configure `office@viaco.at` as the public contact email, represent pre-incorporation legal disclosures truthfully without invented corporate numbers, and expose privacy-aware analytics controls.
  - Replaced placeholder-based `src/config/assets.ts` with `PRODUCT_CONCEPT_ASSETS` pointing exclusively to the three exact PNG files (`/viaco/viaco-journy.png`, `/viaco/viaco-knowledgeHUB.png`, `/viaco/viaco-managemnet.png`) with accurate intrinsic dimensions, workflow alt texts, and honest `Konzeptansicht` captions.
  - Rewrote `src/i18n/locales/de.json` and `src/i18n/locales/en.json` as the single typed DE/EN content source for the streamlined 11-section architecture:
    - Removed stacked hero motto slogan and unified primary CTA (`Konzeptdemo anfragen` / `Request Concept Demo`).
    - Condensed `problem` to 3 distinct pains (departure loss, repeated troubleshooting, mentor-dependent onboarding).
    - Structured `solution` into one concise platform intro + 4 distinct capability sections (`Journey`, `Capture`, `Memory & AI Assistant`, `Management`), avoiding cross-module repetition.
    - Updated `howItWorks` to 4 sequential steps with the explicit staging Redis (`REDIS_DB`) concept example.
    - Condensed `whoWeHelp` to 2 focused audience groups (Austrian industrial maintenance/service & adaptable software engineering scenario).
    - Added `trustDeployment` covering governance/security principles and planned hosting/access roadmap without unverified claims.
    - Refined `about`, `contact`, `footer`, and `legal` (`Impressum` + `Datenschutzerklärung`) for accuracy and low friction.
- **Validation Results**:
  - DE/EN JSON structural shape parity script passed (`DE/EN dictionary shape parity verified OK`).
  - Content purity & asset existence check passed (`Phase 1 content and asset reference checks passed` — zero `Revia` or developer placeholder hints; all 3 PNG files verified on disk).
- **Files Changed**:
  - `src/config/site.ts`
  - `src/config/assets.ts`
  - `src/i18n/locales/de.json`
  - `src/i18n/locales/en.json`
  - `TASKS.md`

---

## Phase 2 — Visual & Content Implementation
- **Date**: 2026-11-18
- **Status**: Completed & Validated
- **Work Done**:
  - Created `src/components/ui/ConceptImageFrame.tsx` using `next/image` with intrinsic dimensions, `object-contain` inside a restrained editorial border, honest `Konzeptansicht` captions, and an accessible `<dialog>` lightbox for expanding concept screenshots on mobile, tablet, and desktop.
  - Updated `src/components/layout/Header.tsx` with the 5 streamlined anchors (`Lösungen`, `So funktioniert’s`, `Für wen`, `Über VIACO`, `Kontakt`), DE/EN toggle, `lg:` responsive drawer breakpoint (preventing header crowding on tablet), and unified `Konzeptdemo anfragen` CTA.
  - Refactored `src/components/sections/HeroSection.tsx` into a 5/7 column layout displaying `/viaco/viaco-journy.png` (`priority`) without stacked slogans or developer placeholder chrome.
  - Condensed `src/components/sections/ProblemSolutionSection.tsx` to 3 distinct pain/value cards.
  - Rebuilt `src/components/sections/SolutionModulesSection.tsx` into a concise platform lifecycle intro plus 4 distinct capability sections (`Journey` schematic + Hero link, `Capture` with `/viaco/viaco-knowledgeHUB.png`, combined `Memory & AI Assistant` with schematic source-citation card, and `Management` with `/viaco/viaco-managemnet.png`).
  - Updated `src/components/sections/HowItWorksSection.tsx` to a 4-step visible horizontal/responsive track plus the single Redis `REDIS_DB` staging concept example.
  - Condensed `src/components/sections/WhoWeHelpSection.tsx` to 2 focused audience columns.
  - Added `src/components/sections/TrustDeploymentSection.tsx` covering governance/privacy design principles and planned hosting/access roadmap.
  - Refined `src/components/sections/AboutSection.tsx` for founder-led honesty without empty team photo placeholders or generic 4-card value grids.
  - Updated `src/components/layout/Footer.tsx` (`office@viaco.at`, updated anchors, removed fake LinkedIn placeholder badge) and `src/app/[locale]/page.tsx`.
  - Updated `src/app/[locale]/impressum/page.tsx` and `src/components/sections/DemoContactSection.tsx` to match updated config/dictionary types.
  - Removed obsolete files: `ProductExperienceSection.tsx`, `HeroVisualPlaceholder.tsx`, `ProductScreenshotPlaceholder.tsx`, and `TeamVisualPlaceholder.tsx`.
- **Validation Results**:
  - `npm run typecheck` (`tsc --noEmit`): Passed (exit code `0`).
  - `npm run lint` (`eslint .`): Passed (exit code `0`).
- **Files Changed**:
  - `src/components/ui/ConceptImageFrame.tsx` (created)
  - `src/components/sections/TrustDeploymentSection.tsx` (created)
  - `src/components/layout/Header.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/components/sections/HeroSection.tsx`
  - `src/components/sections/ProblemSolutionSection.tsx`
  - `src/components/sections/SolutionModulesSection.tsx`
  - `src/components/sections/HowItWorksSection.tsx`
  - `src/components/sections/WhoWeHelpSection.tsx`
  - `src/components/sections/AboutSection.tsx`
  - `src/components/sections/DemoContactSection.tsx`
  - `src/app/[locale]/page.tsx`
  - `src/app/[locale]/impressum/page.tsx`
  - Deleted `ProductExperienceSection.tsx`, `HeroVisualPlaceholder.tsx`, `ProductScreenshotPlaceholder.tsx`, `TeamVisualPlaceholder.tsx`
  - `TASKS.md`

---

## Phase 3 — Contact Funnel, Privacy-Safe Conversion Events & Server Hardening
- **Date**: 2026-11-18
- **Status**: Completed (Server secret `CRM_WEBHOOK_URL` remains open for owner configuration in `OPEN_DECISIONS.md` OD-02)
- **Work Done**:
  - Created `src/lib/analytics.ts` with strict allowlist sanitization (`sanitizeAnalyticsPayload`), browser DNT/GPC and localStorage opt-out checks (`isAnalyticsSuppressed`), and non-PII `trackConversionEvent`.
  - Created `src/components/ui/TrackedCtaLink.tsx` and `src/components/ui/SectionViewTracker.tsx`, wiring `hero_primary_cta_click` (`HeroSection`), `module_section_view` (`SolutionModulesSection`), and `demo_form_view` / `demo_form_start` / `demo_form_submit_success` / `demo_form_submit_error` (`DemoContactSection`).
  - Created `src/lib/demo-request.ts` containing validation & sanitization (making `companySize` and `challenge` optional while allowlist-checking provided values), honeypot filtering, SHA-256 client-key rate limiting (5 req / 10 min), duplicate submission suppression (120 s window), and strictly PII-redacted log formatting (`formatRedactedLogEntry`).
  - Updated `src/app/api/demo-request/route.ts` to use `src/lib/demo-request.ts`, forward `recipientEmail: "office@viaco.at"` when `CRM_WEBHOOK_URL` is set, return `429` / `409` / `502` accurately, avoid echoing PII in `integration_pending` responses, and emit structured PII-redacted JSON logs.
  - Updated `src/components/sections/DemoContactSection.tsx` so only `name`, `email`, `company`, and `privacyAccepted` are required; displays `"Wir melden uns persönlich, um Ihre Anforderungen und das VIACO-Konzept zu besprechen."` and direct `mailto:office@viaco.at` fallback.
- **Validation Results**:
  - `npm run typecheck`: Passed (exit code `0`).
  - `npm run lint`: Passed (exit code `0`).
- **Files Changed**:
  - `src/lib/analytics.ts` (created)
  - `src/lib/demo-request.ts` (created)
  - `src/components/ui/TrackedCtaLink.tsx` (created)
  - `src/components/ui/SectionViewTracker.tsx` (created)
  - `src/app/api/demo-request/route.ts`
  - `src/components/sections/HeroSection.tsx`
  - `src/components/sections/SolutionModulesSection.tsx`
  - `src/components/sections/DemoContactSection.tsx`
  - `TASKS.md`

---

## Phase 4 — Credibility, Austrian Legal/Privacy & Accessibility
- **Date**: 2026-11-18
- **Status**: Completed (Austrian legal sign-off and final entity details tracked in `OPEN_DECISIONS.md` OD-01 & OD-05)
- **Work Done**:
  - Created `src/components/ui/AnalyticsOptOutToggle.tsx` using React 19 `useSyncExternalStore` (hydration-safe, zero `setState` in `useEffect`) so visitors can disable/enable telemetry in their browser while honoring Do Not Track (`DNT`) and Global Privacy Control (`GPC`).
  - Updated `src/app/[locale]/datenschutz/page.tsx` to document Vercel hosting, cookieless Vercel Web Analytics & Speed Insights, contact form processing (`office@viaco.at`), legal bases, DSB complaint rights, and embed `AnalyticsOptOutToggle`.
  - Audited semantic headings across all routes (updated `Footer.tsx` column headings from `<h3>` to `<h2>` to prevent skipped heading levels on `/impressum` and `/datenschutz`), updated `html lang` in `src/app/[locale]/layout.tsx` to `de-AT` / `en`, and raised input placeholder contrast in `DemoContactSection.tsx` from `#6D7C76` to `#596862` (>= 4.5:1 WCAG AA).
- **Validation Results**:
  - `npm run typecheck`: Passed (exit code `0`).
  - `npm run lint`: Passed (exit code `0`).
- **Files Changed**:
  - `src/components/ui/AnalyticsOptOutToggle.tsx` (created)
  - `src/app/[locale]/datenschutz/page.tsx`
  - `src/components/layout/Footer.tsx`
  - `src/components/sections/DemoContactSection.tsx`
  - `src/app/[locale]/layout.tsx`
  - `TASKS.md`

---

## Phase 5 & Phase 6 — Engineering Cleanup, Security Headers, Vercel Readiness & Monitoring
- **Date**: 2026-11-18
- **Status**: Code & Local Production Build Completed; Awaiting Owner Approval Gate C for Vercel Account Connection & Preview Deployment
- **Work Done**:
  - Installed `@vercel/analytics@1.5.0` and `@vercel/speed-insights@1.2.0` from verified local npm cache tarballs and updated `package.json` & `package-lock.json` (`test` script added: `node --test tests/*.test.ts`).
  - Updated `src/lib/analytics.ts` to emit conversion events via `track` from `@vercel/analytics` while honoring DNT/GPC, localStorage opt-out, and strict non-PII allowlisting.
  - Created `src/components/layout/VercelTelemetry.tsx` wrapping `<Analytics />` and `<SpeedInsights />` with `beforeSend` hooks that reject `/api` paths, strip all query parameters/hashes, and suppress events when opted out.
  - Updated `src/app/[locale]/layout.tsx` to include `<VercelTelemetry />`, Open Graph & Twitter image metadata (`/viaco/viaco-journy.png`), and non-production `robots: { index: false, follow: false }` when `VERCEL_ENV !== "production"`.
  - Updated `src/app/robots.ts` to disallow all crawlers on non-production Vercel preview environments (`VERCEL_ENV !== "production"`).
  - Configured HTTP security headers in `next.config.ts`: `Content-Security-Policy` (allowing `'self'`, Vercel Analytics/Speed Insights endpoints, `'unsafe-inline'` for Next.js/Tailwind styles, `frame-ancestors 'none'`, `object-src 'none'`), `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, and `Permissions-Policy`.
  - Created `src/app/api/health/route.ts` (`GET /api/health`) for synthetic uptime monitoring without exposing PII or credentials.
  - Updated `.env.example` with environment variable names only (`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_LINKEDIN_URL`, `NEXT_PUBLIC_ENABLE_ANALYTICS`, `CRM_WEBHOOK_URL`, `CRM_WEBHOOK_AUTH_TOKEN`).
  - Added `tests/landing-page.test.ts` (9 tests covering i18n parity, forbidden strings, `office@viaco.at`, case-sensitive asset integrity, non-duplication of Hero image, form validation, honeypot trap, rate limiting, duplicate protection, and PII redaction).
- **Validation Results**:
  - `npm run typecheck`: Passed (exit code `0`).
  - `npm run lint`: Passed (exit code `0`).
  - `npm test`: 9/9 tests passed across 3 suites.
  - `npm run build` (`next build --webpack`, executed outside sandbox due to ancestor `/Users/Max/node_modules/process/index.js` EPERM): Compiled and generated all 12 static/SSG/dynamic routes cleanly.
  - Built HTML audit script: Verified `lang="de-AT"` / `lang="en"`, single `h1`, non-skipped heading hierarchies, valid anchor IDs, OG/Twitter tags, `robots.txt`, and `sitemap.xml` across all generated HTML pages.
  - Live production server (`npx next start -p 3142 -H 127.0.0.1`) HTTP smoke test: Verified `/api/health` (`200`), security headers (`CSP`, `HSTS`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`), `/` -> `307 /de`, `200` on `/de`, `/en`, `/de/impressum`, `/de/datenschutz`, `404` on unknown path, and `POST /api/demo-request` (`400` invalid, `200` `integration_pending` with `office@viaco.at`, `409` duplicate submission).

---

## Phase 7 — Final Handoff, Vercel Setup Checklist & Rollback Plan
- **Not Yet Executed (Requires Owner Approval / External Accounts — Gates C & D)**:
  - Connecting Git repository to Vercel project and toggling Web Analytics & Speed Insights in Vercel Dashboard.
  - Configuring `CRM_WEBHOOK_URL` / `CRM_WEBHOOK_AUTH_TOKEN` in Vercel Preview & Production environment variables.
  - Setting up external synthetic uptime ping against `/api/health` and Vercel alert thresholds / optional budgeted error tracker (e.g., Sentry) within plan quotas.
  - Running Lighthouse and real-device responsive inspection against the authorized Vercel Preview URL (Chrome/Lighthouse CLI not installed locally).
  - Final Austrian legal entity registration details (`Impressum`) and GDPR legal review (`Datenschutzerklärung`).
- **Vercel Preview & Production Launch Checklist (for Owner)**:
  1. Connect repository in Vercel (Next.js auto-detected, Node 24, `npm install`, `npm run build`).
  2. Set Preview environment variables (`NEXT_PUBLIC_CONTACT_EMAIL=office@viaco.at`, `NEXT_PUBLIC_ENABLE_ANALYTICS=true`, optional `CRM_WEBHOOK_URL` / `CRM_WEBHOOK_AUTH_TOKEN`); enable **Vercel Deployment Protection** on Preview builds.
  3. Enable **Web Analytics** and **Speed Insights** in Vercel Project Dashboard; review Hobby/Pro quota limits before enabling paid Observability Plus or Log Drains.
  4. Deploy **Preview** (Approval Gate C), validate `/de`, `/en`, `/de/impressum`, `/de/datenschutz`, `/api/health`, mobile/tablet/desktop viewports, Lighthouse scores, and test form delivery without logging PII.
  5. Only after explicit **Production approval (Gate D)**: set `NEXT_PUBLIC_SITE_URL=https://viaco.at` (confirmed production domain) in Vercel Production env, verify `MX`, `SPF`, `DKIM`, and `DMARC` Zoho Mail records at Helloly remain untouched before adding `A`/`CNAME` web DNS records, verify SSL/HTTPS & `www` redirect, and confirm rollback readiness via Vercel Dashboard (`Deployments -> Instant Rollback` to last healthy production deployment).

---

## Phase 7 (Refinement Pass) — Final UI/UX & Copy Refinement
- **Date**: 2026-11-18
- **Status**: Local Implementation, Tests & Production Build Completed; Live Chrome Visual Inspection Blocked (No Active Chrome `DevToolsActivePort`)
- **Audit Issues Resolved**:
  - Removed all stylistic em dashes (`—`, `\u2014`) and en dashes (`–`, `\u2013`) across `de.json`, `en.json`, `src/config/site.ts`, and `src/components/sections/DemoContactSection.tsx`.
  - Removed all decorative `<Badge>` components (deleted `src/components/ui/Badge.tsx`), eyebrow badges, `"In Entwicklung · Austausch mit Pilotunternehmen gesucht"`, `"Konzeptphase"`, `"Fähigkeit 01/02/03"`, defensive meta-labels, and blurred hero background orbs.
  - Updated Hero copy in [de.json](src/i18n/locales/de.json) and [en.json](src/i18n/locales/en.json) to `"Wissen, das bleibt. Menschen, die wachsen."` / `"Knowledge that stays. People who grow."` with a concise functional summary, plain-text development sentence, `Konzeptdemo anfragen` / `Plattform ansehen` CTAs, and aligned 5/7 grid pairing with `/viaco/viaco-journy.png`.
  - Simplified `ProblemSolutionSection` into 3 equal-height challenge cards without repeating module descriptions ahead of `SolutionModulesSection`.
  - Standardized `SolutionModulesSection` to a uniform 5/7 grid across all four capabilities (`VIACO Journey`, `VIACO Capture`, `VIACO Memory & AI Assistant`, `VIACO Management`) with consistent `rounded-xl border-[#DFDBD2]` visual cards and discreet captions.
  - Tightened `HowItWorksSection`, `WhoWeHelpSection`, `TrustDeploymentSection`, `AboutSection`, `DemoContactSection`, `impressum/page.tsx`, `datenschutz/page.tsx`, and `AnalyticsOptOutToggle.tsx` to consistent `py-16 sm:py-20` spacing and `rounded-xl` cards.
  - Optimized `ConceptImageFrame.tsx` to mount the modal lightbox `<Image>` only when opened (`open === true`), reducing initial rendered `<img>` tags on `/de` and `/en` to 3 (one per product image).
- **Files Changed**:
  - Deleted `src/components/ui/Badge.tsx`
  - `src/config/site.ts`, `src/config/assets.ts`
  - `src/i18n/locales/de.json`, `src/i18n/locales/en.json`
  - `src/components/ui/ConceptImageFrame.tsx`, `src/components/ui/AnalyticsOptOutToggle.tsx`
  - `src/components/sections/HeroSection.tsx`, `ProblemSolutionSection.tsx`, `SolutionModulesSection.tsx`, `HowItWorksSection.tsx`, `WhoWeHelpSection.tsx`, `TrustDeploymentSection.tsx`, `AboutSection.tsx`, `DemoContactSection.tsx`
  - `src/app/[locale]/impressum/page.tsx`, `src/app/[locale]/datenschutz/page.tsx`
  - `tests/landing-page.test.ts`, `TASKS.md`, `IMPLEMENTATION_LOG.md`
- **Validation & Blockers**:
  - `npm run typecheck`, `npm run lint`, `npm test` (10/10 passing), and `npm run build` executed after final code edit.
  - Browser subagent could not inspect live Chrome viewports (`Could not find DevToolsActivePort for chrome at /Users/Max/Library/Application Support/Google/Chrome/DevToolsActivePort`).
