# VIACO Landing Page — Open Decisions & Approval Gates

Last updated: 2026-11-18

## Confirmed Decisions (Resolved)

1. **Phase 0 Audit & 11-Section Structure (Approval Gate A)** — Approved by owner.
   - Streamlined 11-section German-first (`de-AT` default, `en` secondary) homepage without duplicated module galleries or CSS placeholder galleries.
2. **Product Concept Assets (`public/viaco/`)** — Approved.
   - Use the three existing files with exact case-sensitive filenames:
     - `public/viaco/viaco-journy.png` (1671×941) — shown exclusively in the Hero section (not duplicated in the Journey module section).
     - `public/viaco/viaco-knowledgeHUB.png` (1672×941) — shown in the VIACO Capture module section.
     - `public/viaco/viaco-managemnet.png` (1672×941) — shown in the VIACO Management module section.
   - All product screens must be labeled as concept views (`Konzeptansicht · Geplante VIACO Benutzeroberfläche`) containing illustrative sample data.
   - Minor visual text artifacts in the supplied screenshots (`ihnzufügen` in `viaco-managemnet.png`, `Rediis-Caching` and illustrative "2018 Gründung" timeline in `viaco-journy.png`) are noted as illustrative mockup artifacts; filenames remain unchanged.
3. **Public Contact Email** — Approved.
   - `office@viaco.at` is configured as the public contact email across `SITE_CONFIG`, Footer, Impressum, Datenschutzerklärung, and email fallback drafts.

---

## Remaining Decisions / Blockers Requiring Owner Input Before Production Launch

| ID | Category | Blocker / Decision Needed | Current Safe Provisional Behavior | Target Gate |
| :--- | :--- | :--- | :--- | :--- |
| **OD-01** | Austrian Legal (`Impressum`) | Final legal entity name/form (e.g., pre-incorporation founder project vs. registered GmbH/FlexCo/e.U.), physical Austrian street address, `Firmenbuchnummer` & court, `UID-Nummer`, and WKO/authority details. | Displayed truthfully as pre-commercial concept-stage disclosures with clear placeholders in `/impressum` (`src/config/site.ts`); no invented registration numbers. | Before Production Launch (Gate D) |
| **OD-02** | Contact Form Delivery Backend | Configure production webhook or transactional email service forwarding `/api/demo-request` submissions to `office@viaco.at` (`CRM_WEBHOOK_URL` + optional `CRM_WEBHOOK_AUTH_TOKEN`, or approved SMTP/API relay). | Route validates input, applies honeypot + rate limit + deduplication, logs PII-redacted metadata, forwards if `CRM_WEBHOOK_URL` is set, and otherwise transparently presents an email draft (`mailto:office@viaco.at`) + copy-summary fallback without faking delivery. | Before Preview / Production (Gate C/D) |
| **OD-03** | Production Domain & DNS | Confirm final production domain (e.g., `viaco.at`) for `NEXT_PUBLIC_SITE_URL` canonical/sitemap/OG URLs and approve Vercel DNS configuration while preserving Helloly registrar and Zoho Mail DNS records (`MX`, `SPF`, `DKIM`, `DMARC`). | `NEXT_PUBLIC_SITE_URL` defaults safely to `http://localhost:3000`; preview environments output `noindex, nofollow`. | Gate C / Gate D |
| **OD-04** | LinkedIn & Social URL | Provide official VIACO LinkedIn company URL (`NEXT_PUBLIC_LINKEDIN_URL`) if desired. | Omitted cleanly when unset (no fake placeholder social pills). | Optional |
| **OD-05** | Legal Review of `Datenschutzerklärung` | Have an Austrian legal advisor review final GDPR privacy disclosures (Vercel hosting, Vercel Web Analytics / Speed Insights telemetry, and the chosen form delivery processor/DPA) prior to commercial launch. | Accurate draft documenting Vercel hosting, cookieless Vercel telemetry with browser DNT/GPC + opt-out toggle, and contact form processing. | Before Production Launch (Gate D) |
| **OD-06** | Vercel Account, Dashboard & Spend Controls | Owner must connect the repo in Vercel, toggle Web Analytics & Speed Insights in the Vercel Project dashboard, enable Preview Deployment Protection, and verify Hobby/Pro plan limits and email alerts. | Code integration and checklist prepared (`@vercel/analytics`, `@vercel/speed-insights`, `/api/health`, `.env.example`), awaiting owner dashboard actions and deployment approval. | Gate C / Gate D |
