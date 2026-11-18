VIACO — Landing Page Audit, Redesign & Vercel Launch Tasks
Status: Implementation brief for Antigravity · Date: 2026-11-18
Priority: Convert an early-stage concept into a credible, polished, German-first B2B validation website.
Scope: Marketing website only. Do not implement the VIACO application or add a generic employee workspace.
Reference: Existing Next.js project and its existing visual design are the source of truth for code and palette. Audit the code before changing it. The 12 supplied screenshots reflect the currently visible landing page; use them to identify and remove duplication. Historical documents may refer to Revia: the CURRENT product brand is VIACO. Replace all public-facing Revia terminology.
Operating rules (non-negotiable)
- [x] Do not rewrite blindly. Inspect the repository, current routes/components/content, public/viaco, package.json, Next.js configuration, and design tokens first. Inventory current content before modifying it.
- [x] Maintain the existing understated warm-white/forest-green aesthetic, typography hierarchy, restrained borders, and editorial feel. Refactor layout and spacing only where it improves clarity. Avoid a flashy AI-startup aesthetic, neon gradients, excessive animations, generic stock photos, and oversized dashboards.
- [x] Make German (de-AT) the default and English (en) secondary. Keep page sections, forms, metadata, and privacy copy semantically equivalent; implement accessible language switching and proper lang attributes. Do not machine-mix languages inside a section.
- [x] Truthfulness: VIACO is at concept/validation stage. Label generated images Konzeptansicht / Geplante Benutzeroberfläche. Do not claim shipped products, paying customers, market traction, exact efficiency improvements, certifications, integrations, production uptime, enterprise deployments, or secured funding without written verification.
- [x] Product truth: One platform, with Journey (structured onboarding), Capture (text/voice experience collection), Memory (governed, searchable company knowledge), and Assistant (permission-aware, source-linked Q&A). Onboarding management is a role-specific administrative view, not a fifth product. A screenshot may show multiple capabilities, but copy must not double count them as separate products.
- [x] Deployment truth: State clearly which delivery models are planned/being evaluated versus actually available. Web, desktop, mobile and on-premise are product direction, not established current availability; do not say “available on” unless verified. Distinguish the public landing page hosted on Vercel from the future customer application, which might support dedicated hosting / on-premise.
- [x] Use only the three existing product images; preserve exact filenames. Do not invent additional screenshots, company photos, fake testimonials, or analytics. All examples should be clearly demonstrative.
- [x] No dead links, filler sections, unverified client logos, vanity metrics, empty social buttons, or irrelevant product claims. A future feature should not appear as a current product capability.
- [x] Preserve current working behavior; implement small verifiable changes and commit logically. Do not deploy to production without owner's approval.
Phase 0 — Audit and define boundaries (P0; do this FIRST)
- [x] Inventory sections in page order, relevant source components/files, active links, form handler, translations, fonts, asset paths and any existing analytics.
- [x] List current design tokens directly from the code. Preserve actual CSS values, rather than treating colors approximated from screenshots as authoritative.
- [x] Check whether form submissions have a working destination and success/failure handling. Identify where demo inquiries will be received, stored, and answered. Do not build a fake submit success state.
- [x] Verify paths and actual dimensions/content of:
  - public/viaco/viaco-journy.png (exact spelling: journy)
  - public/viaco/viaco-managemnet.png (exact spelling: managemnet)
  - public/viaco/viaco-knowledgeHUB.png (case-sensitive)
- [x] Inspect image content for incorrect historical labels (Revia), fabricated corporate history, excessive claims, visual text errors, and privacy-sensitive data. Display only as illustrative mockups, and do not misrepresent images as live customer deployments. If corrections are required, ask for approved replacement assets; avoid modifying filenames or generating new assets without permission.
- [x] Create a before/after section map and a short decision log in project documentation. Do not delete legal pages or working integrations without checking impact.
- [x] Clarify any genuinely blocked assumptions in a concise OPEN_DECISIONS.md (e.g., authorized contact destination, whether business entity is already registered, approved contact email, scope of mobile/on-premise promises). Make safe provisional choices for layout, but do not invent business facts.
Screenshot audit — observations and required action
Existing visible section	Decision	Reason / change
Header navigation (Lösungen, So funktioniert’s, Über uns, Kontakt; DE/EN; Demo)	KEEP / REFINE	Clean and appropriate; ensure all anchors, language switch and CTA work; sticky header with subtle border; mobile menu.
Hero: “Wertvolles Wissen. Für die Zukunft bewahrt.” and abstract 3-step flow graphic	KEEP HEADLINE DIRECTION, REPLACE VISUAL	Strong emotional positioning, but placeholder flow graphic hides the actual product. Use the Journey screenshot as the hero product visual, honestly marked as a concept.
Four problem/solution comparison cards	CONDENSE	Good buyer-oriented problem framing; reduce to three distinct pains covering lost expertise, repeated troubleshooting, and long/mentor-dependent onboarding. One short answer each.
“Eine Plattform. Wissen, das bleibt.” + long module feature explainers	RESTRUCTURE	Retain one concise introduction to the platform, then exactly four module-focused sections with clear outcomes, no repeated explanations.
Separate module mockup placeholders and later module tab showcase	MERGE	Same product demonstration is repeated in multiple places. Remove placeholders and redundant tabs. Show each existing screenshot once in the appropriate section (or reuse hero Journey intentionally only if doing so serves a distinct purpose).
“Aus Erfahrung wird nachhaltiges Wissen” interactive 4-card flow	KEEP AS ONE COMPACT HOW-IT-WORKS SECTION	Explains workflow more clearly than another feature catalog. Reduce to four connected steps, one concrete example, and no extra marketing cards.
“Entdecken Sie unsere Vision in Aktion” with screenshots/placeholder tabs	REMOVE as separate section	Duplicates module presentation; do not introduce a second product gallery.
Target market section: four cards	CONDENSE	Lead with initial industry/service technicians and maintenance teams; software team scenario can be secondary example. Do not imply all verticals are already supported. Prefer two clear audience groups to four overlapping cards.
“Technologie mit Verantwortung” / value cards	REDUCE / INTEGRATE	Keep concise trust principles within deployment/security section; remove generic company-value card grid unless facts can be supported.
About VIACO with team/founder photo placeholder	REWORK	Honest founder-led positioning and purpose; no fake team photo, fake offices, or invented company age/metrics. Include real founder/company specifics only after approval.
Contact / Konzeptdemo form	KEEP / IMPROVE	Primary conversion path; data collection should be minimal and meaningful. Functional delivery, consent/privacy, anti-spam, confirmations and analytics.
Footer	KEEP / CORRECT	Real links, accurate contact address, Impressum, Datenschutzerklärung and truthful concept status. Remove placeholders before launch.


Phase 1 — Define messaging and page architecture (P0)
Positioning
- [x] Primary promise: preserve operational experience and make it useful for today's teams and tomorrow's employees. Onboarding + knowledge preservation + source-grounded AI are one joined story.
- [x] Position it as KI-gestützte Wissenssicherung und strukturierte Einarbeitung rather than a generic LMS, intranet, chatbot, or HR suite.
- [x] Keep the existing hero's elegant German line if preferred: “Wertvolles Wissen. Für die Zukunft bewahrt.” Add a succinct practical subheading. Alternative for review, not simultaneous display: “Wissen, das bleibt. Menschen, die wachsen.” Select one headline rather than stacking slogans.
- [x] Approved-style English brand line, usable in English locale: “Knowledge that stays. People who grow.” Avoid presenting this next to a German hero with a third redundant tagline.
- [x] Recommended DE hero body (edit for accuracy): “VIACO verbindet die einfache Erfassung von Praxiserfahrungen mit strukturiertem Onboarding und einem KI-Assistenten, der relevantes Unternehmenswissen mit Quellen zugänglich macht.”
- [x] CTA hierarchy: primary “Konzeptdemo anfragen” → contact form; secondary “VIACO entdecken” → modules. Use one primary CTA label across the site; an occasional repeat near contact is acceptable.
- [x] Use Konzeptdemo and Konzeptansicht, not a misleading interactive/live product demo. Explicitly say the platform is in development and early customer conversations are underway.
Final homepage flow — ONE instance of each narrative job
1. Header: logo, Lösungen, So funktioniert’s, Für wen, Über VIACO, Kontakt, language toggle, CTA. On smaller screens simplify rather than squeeze.
2. Hero: distinct promise + supporting paragraph + two CTAs + real conceptual screenshot of VIACO Journey with explicit label. Present screenshot as a crisp, tasteful UI frame on the right (desktop) / below (mobile). Avoid tiny unreadable screens, giant dark background, or decorative laptop devices. Optional very small line “In Entwicklung · Austausch mit Pilotunternehmen gesucht.”
3. Problem → Value: three compact, clearly distinct customer pains; avoid re-explaining each product module here. Show stakes without invented statistics.
4. The platform, briefly: one short intro defining the connected knowledge lifecycle and access-aware use. No row of duplicate feature cards.
5. Modules / solutions: four focused sections with distinct action, business benefit, and associated image where available:
   - VIACO Journey — role-specific, step-by-step learning and actual progress tracking. Show viaco-journy.png as the hero image; its dedicated section may reference the same visual via a small link/thumbnail only if it adds value, otherwise use an elegant text-only narrative to avoid visible repeat.
   - VIACO Capture — employees submit real work experience via voice or text; AI produces structured draft for human review before submission/publication. Show viaco-knowledgeHUB.png in the dedicated Capture section. This screenshot includes the draft/confirmation view; do not claim automatic unrestricted publishing.
   - VIACO Memory & AI Assistant — one combined visual narrative: after review and appropriate governance, approved experiences become access-controlled, searchable knowledge, and AI can answer with references. Do not invent another screenshot: explain Memory and Assistant as distinct capabilities within the same section layout (clearly labeled subsections, not an extra full-width feature section) and use the assistant visible in the existing product images as visual evidence. Prefer compact source-card illustration built in CSS if necessary; do not present it as a fourth product screenshot.
   - VIACO Management — assign paths by role/department, see people progressing, coordinate mentor/reviews, manage access. Show viaco-managemnet.png; distinguish admin-only features from new-joiner permissions.
   - Editorial constraint: This yields four product concepts but three image assets. Do not add another long gallery or tabs. If the layout cannot show Assistant well, label a small illustrative UI detail as schematic instead of claiming a missing image exists.
6. How it works: single compact horizontal/vertical flow: Erfahrung teilen → KI-Entwurf prüfen → Wissen freigeben → Im Alltag und Onboarding nutzen. Include one realistic, short illustrative issue/solution (e.g., wrong Redis DB index in staging causes cache misses; initial attempts restarted Redis/cleared cache; corrected config resolved) or an industrial maintenance example. Explicitly label as example. Do not imply unreviewed content becomes trusted knowledge.
7. For whom: initial validation target (Austrian industrial maintenance/service operations) and adaptable software-team scenario; focus on real use cases, avoid overclaiming market breadth. Consider a compact two-column block not four categories.
8. Trust & Deployment Choices: concise, factual and careful. Explain planned EU-hosted/dedicated/on-prem options, subject to architecture and customer requirements; role-based access, source-linked answers, human approvals, GDPR-by-design approach as design principles, not certifications or completed technical guarantees. Website on Vercel ≠ customer data required to be hosted on Vercel. Highlight deployment flexibility without claiming it is implemented. Mention planned browser/web, desktop and mobile access only as roadmap; if on-prem and mobile are not shipping yet, label clearly planned/under evaluation.
9. About VIACO: short founder/product mission and product status; optional real founder note after authorization. No placeholder founder image on published site. No fake client logos, testimonials, awards, accelerator badges, or funding.
10. Demo / feedback: clearly visible, low-friction consultation form and useful expectation-setting: exploratory 20–30 min concept discussion, not a production access promise. Include optional feedback prompt about the company’s biggest challenge.
11. Footer: real legal/contact links and accurate concept-stage status.
Do not add pricing tiers, blog, careers, FAQs, partner grids, ROI calculator, case studies, claims of successful deployments, arbitrary KPI bars, app login/signup, or newsletter unless they have an actual current purpose and owner-approved content.
Phase 2 — Detailed visual implementation (P0)
Hero and screens
- [x] Preserve brand header and calm typography. Use a balanced 2-column desktop hero (~48% text, ~52% visual, adjust to suit screenshot); vertically center copy, crisp breathing room, no crammed labels.
- [x] Hero screenshot source must be /viaco/viaco-journy.png. Check real aspect ratio and use next/image with intrinsic width/`height` or fill plus a stable aspect-ratio wrapper, responsive sizes, and priority only for the above-the-fold hero. Never crop away the core UI; allow contain inside a lightly framed surface. Optimize without destroying legibility.
- [x] Remove text under images such as internal development paths, “replace in src/config/assets.ts”, “Screenshot-Platzhalter”, local/internal URLs, and debug overlays. Images themselves may contain text: assess these before publish.
- [x] Prefer genuine app UI crops at sufficient size, not nested screenshots inside fake browsers. Do not mix three UI images into an unreadable hero collage.
- [x] Use one visual pattern for module sections: section number/eyebrow → 1 benefit-driven headline → one short paragraph → 2–3 distinct benefits → relevant mockup. Alternate layouts sparingly; keep visual rhythm.
- [x] Keep image-specific captions: “Konzeptansicht · Geplante VIACO Benutzeroberfläche”. Alt text should describe the workflow (not promise a live product).
- [ ] Ensure proper focus-visible states, WCAG AA contrast, readable 16px+ content, keyboard navigation, reduced-motion preference, and full responsive testing. No justified tiny mono text or ultra-light gray content.
- [x] Animations: restrained fade/slide only where useful; avoid scroll hijacking, parallax that hurts readability, continuous animations, or animating key information. Support prefers-reduced-motion.
- [x] Navigation sections should have stable IDs, correct sticky header offsets and correct DE/EN paths; CTA always reaches form.
Distinct module storylines (no duplication)
Section	Only claim it owns	Do not repeat here
Journey	role-tailored onboarding path, lesson steps, progress, mentor support	capture pipeline, manager KPIs, generic AI product claims
Capture	low-friction voice/text logging, AI draft, employee confirmation	entire search/chat feature catalog, management analytics
Memory + Assistant	approved knowledge, lifecycle/source/access, question answering with sources	voice recording UI, generic onboarding course features
Management	assignment, team progress, mentors, role/department paths, permissions	consumer onboarding page contents and Capture workflow
How it works	relationship between steps (one short story)	full descriptions of the four modules


Mobile treatment
- [x] Make the landing page itself excellent on mobile. Images can become edge-to-edge scrollable/previews with an accessible “View concept” lightbox if implemented; don't downscale complex UI to unreadable postage-stamps.
- [ ] Optional future task: commission/design a genuine mobile Knowledge Capture concept (one task: microphone or text → transcript → review/confirm). This is a new asset request, not available in public/viaco and not a blocker for initial release. Do not fabricate the file or promise a complete mobile app.
Phase 3 — Conversion and validation (P0)
- [x] Make “Konzeptdemo anfragen” the main conversion. Form fields (minimum): name, business email, company, one optional primary challenge choice, optional message. Request organization size only if it will meaningfully inform outreach. Avoid excessive required fields.
- [x] Clear response expectation: “Wir melden uns persönlich, um Ihre Anforderungen und das VIACO-Konzept zu besprechen.” Do not promise response time unless operationally achievable.
- [ ] Integrate actual server-side delivery/storage: choose an owner-approved inbox or secure CRM / database; avoid fake API endpoints or writing inquiries only to console. Since business email already exists (office@viaco.at), ask before configuring it as delivery/recipient; do not hard-code a secret or assume SMTP availability. Validate email, sanitization, errors, bot protection, sensible rate limits, duplicate-submit safeguards, and success/failure feedback. (Validation, sanitization, rate limiting, duplicate protection, webhook delivery & mailto fallback implemented; live `CRM_WEBHOOK_URL` secret awaiting owner configuration — see `OPEN_DECISIONS.md` OD-02.)
- [x] Consent: include an accessible link to privacy notice and distinguish required processing of an inquiry from optional marketing subscriptions. Don't bundle a newsletter opt-in by default. Avoid unnecessary sensitive personal information.
- [x] Conversion events (privacy reviewed): demo_form_view, demo_form_start (optional), demo_form_submit_success, demo_form_submit_error, hero_primary_cta_click, module_section_view (optional); no names, emails, message contents, IP or other personal data in event payloads. Use aggregated measures; verify analytics-specific consent requirements in EU/AT rather than assuming all tracking is exempt.
- [x] Funnel metrics for market validation: concept-demo requests, quality of company fit, category of pain point, completed introductory calls (tracked by owner in a simple private sheet/CRM), recurring objections, and demand signals. No public “trusted by X companies” until supported.
Phase 4 — Credibility, Austrian legal/privacy and accessibility (P0)
- [ ] Impressum: accurate identity and legal disclosures for the real publisher under applicable Austrian requirements; don't invent an Austrian legal entity or a registration number. Seek legal verification before publishing. (Truthful pre-incorporation disclosures & `office@viaco.at` implemented; awaiting final Austrian registration & legal sign-off — see `OPEN_DECISIONS.md` OD-01.)
- [ ] Datenschutzerklärung: identify actual hosting (Vercel), contact processing providers, analytics, retention, legal basis, data subject rights, possible transfers, processors and appropriate agreements. Obtain legal review for Austrian/EU GDPR context. (Updated for Vercel hosting, cookieless Vercel analytics & form processing; awaiting owner legal review — see `OPEN_DECISIONS.md` OD-05.)
- [x] Consent mechanism only if needed based on actual tracking/cookies, correctly configured before non-essential trackers load; honor DNT/GPC where applicable and provide settings access where required.
- [x] Security claims must describe intended policies (data isolation, permission-sensitive answers, approval workflow), not untested certifications such as ISO 27001 / SOC 2 or “100% GDPR compliant”.
- [x] Explain realistic differentiation: not only an LMS, not only a chat assistant; company-specific experience capture, governed reuse and onboarding. Avoid unsupported “first”, “unique”, “best”, “guaranteed reduction” claims.
- [x] Accessibility audit: semantic headings, 4.5:1 normal-text contrast, alt text, keyboard interaction, accessible forms/errors, mobile navigation, proper language attribute and reduced-motion support. (Verified in code, CSS, and built HTML; live browser/device visual sweep pending Vercel preview.)
Phase 5 — Next.js cleanup / implementation requirements (P0)
- [x] Verify project truly runs on a supported current Next.js version and React version; use App Router patterns if it is already an App Router project. Do not migrate framework/router without need or explicit plan.
- [x] Deduplicate repeated content using a single typed content model for DE/EN; prefer a simple locale-aware structure and shared components; do not add a heavyweight CMS just for a static landing page.
- [x] Keep component boundaries clean: Header, Hero, ProblemSolution, PlatformIntro, ModuleSection, KnowledgeFlow, Audience, TrustDeployment, About, DemoForm, Footer. They should be functional sections, not duplicate content containers.
- [x] Use next/image for existing assets; check image weight, proper dimensions, AVIF/WebP support where compatible, CLS, loading strategy. Confirm actual image filenames on case-sensitive deployment.
- [x] Add metadata in DE/EN (unique title/descriptions, canonical URL only once real production domain is confirmed, hreflang, Open Graph/Twitter metadata with approved image, favicon/icons, robots rules, XML sitemap). Do not accidentally index staging/preview URLs. Avoid claiming unimplemented features in SEO content.
- [x] Optimize font loading (next/font when appropriate), static assets, code splitting and remove unnecessary dependencies/scripts and unused marketing animations.
- [x] Set and verify basic security headers: CSP appropriate for Next.js/Vercel + form/analytics dependencies, HSTS on HTTPS production, X-Content-Type-Options, Referrer-Policy, frame-ancestors as appropriate; do not apply a breaking CSP blindly.
- [x] Use repository lint/format/typecheck, unit tests for content helpers and form validation, and at least smoke/E2E checks for navigation, translations, CTA and submission. No dependency updates unrelated to launch.
Phase 6 — Vercel readiness, analytics and monitoring (P0)
Do not deploy without the owner's explicit permission. Prepare the code and provide a deploy checklist. Vercel account setup and dashboard activation may require manual owner actions.
- [ ] Connect repository to Vercel project; confirm Next.js auto-detection, build commands, package manager, Node version, install and lockfile. Verify build locally before preview. (Local `next build --webpack` and lockfile verified; Vercel project link awaiting Gate C approval.)
- [ ] Maintain Vercel environments: Development / Preview / Production with separate environment variables and no secrets in code or NEXT_PUBLIC_* accidentally. Create .env.example with names only; do not embed real credentials. (`.env.example` created with names only; Vercel dashboard env vars pending owner setup.)
- [ ] Add and verify Vercel Web Analytics integration via current official @vercel/analytics Next.js support; ensure it is enabled in the Vercel project and meets actual consent/privacy decisions. (`@vercel/analytics` integrated with PII-stripping `beforeSend` & DNT/GPC/opt-out; dashboard toggle pending owner action.)
- [ ] Add and verify Vercel Speed Insights via @vercel/speed-insights and the Vercel dashboard; check Core Web Vitals (LCP, INP, CLS), particularly image-heavy hero and mobile layouts. (`@vercel/speed-insights` integrated with `beforeSend`; dashboard toggle & real-user vitals pending preview.)
- [ ] Review Vercel Observability / Runtime Logs and available Alerts. Configure error notification routes and available alert thresholds within plan; do not promise paid Observability Plus or Log Drains if not enabled. For longer retention / exception reporting, propose an appropriate budgeted tool (e.g., Sentry) only after approval. (Plan documented in `IMPLEMENTATION_LOG.md`; owner alert setup pending.)
- [x] Instrument form route errors with structured logs: request ID, status, duration, cause category; redact PII and secret values. Verify that inquiries are not logged in full.
- [ ] Set up periodic health monitoring of the marketing endpoint and form flow (simple synthetic probe if practical) with notifications. Configure alerts for form submission failures and deployment incidents where supported. (`/api/health` implemented & verified; external synthetic uptime probe pending owner setup.)
- [ ] Enable preview deployment protection as appropriate, prevent preview indexing, and validate preview builds before production. Configure domain in Vercel only when approved; keep Helloly domain registrar and Zoho email DNS records (MX, SPF, DKIM, DMARC) intact. Changing web DNS must not silently disrupt company mail. (Code-level preview `noindex` implemented; Vercel protection & Helloly/Zoho DNS checklist documented in `IMPLEMENTATION_LOG.md`.)
- [ ] Review Vercel spend/usage thresholds, build/analytics quotas and any plan restrictions before turning on paid monitoring features. (Checklist item for owner in `IMPLEMENTATION_LOG.md`.)
- [ ] Run Lighthouse and real-device responsive review; suggested targets: accessible WCAG AA, no critical accessibility/SEO issues, green Core Web Vitals where practical, no unexpected layout shifts, and hero screenshot readable at desktop/mobile widths. (Pending authorized preview / browser environment; Lighthouse CLI & Chrome not installed locally.)
- [ ] Check production prerequisites: SSL/HTTPS, correct redirects (www/non-www), no form secrets in client bundle, CSP works, 404 page, robots/sitemap, contact emails and legal routes resolve, event tracking does not capture PII. (Local CSP, 404, robots/sitemap, legal routes, contact emails & PII checks verified; SSL/redirects pending Vercel deployment.)
- [x] Prepare rollback plan (last good Vercel deployment) and launch ownership checklist. Production deploy and domain switch require explicit user approval.
Phase 7 — Acceptance criteria and final handoff (P0)
- [x] On first screen, German-language visitors understand (1) what VIACO solves, (2) whom it serves, (3) that it is in development, and (4) how to request a discussion. Existing Journey concept image is clearly visible and labeled.
- [x] The final homepage has no repeated module explanations, duplicate product galleries, duplicate 4-card feature grids, nonworking UI placeholders or giant feature inventories.
- [x] All three existing assets are used thoughtfully, not stretched: viaco-journy.png, viaco-managemnet.png, viaco-knowledgeHUB.png.
- [x] Each capability is differentiated accurately: employees capture → people review/approve → knowledge is governed → assistant retrieves with sources → onboarding applies knowledge → managers coordinate progress. No implied bypass of approval or permissions.
- [x] Site is honest about concept status, planned mobile/desktop and deployment choices, and lacks fabricated company proof.
- [x] German and English pages, navigation, form, links, metadata and responsive layouts function correctly.
- [ ] Vercel Analytics, Speed Insights, logging/alert plan and privacy decisions are documented and validated in preview; no unnecessary tracking or paid service enabled without approval. (Documented and locally built/tested; preview validation awaiting Gate C approval.)
- [ ] Produce a handoff report: (a) removed/merged/added sections, (b) affected files, (c) screenshots at desktop/tablet/mobile, (d) tests run/results, (e) lighthouse results, (f) blockers/owner approvals, (g) preview URL if actually deployed, and (h) exact final production deployment steps. Do not say deployed unless deployment happened. (Code/test handoff report recorded in `IMPLEMENTATION_LOG.md`; preview screenshots, Lighthouse, and preview URL remain open pending Gate C preview approval.)
Defer until after first market feedback (not launch blockers)
- [ ] New dedicated mobile Knowledge Capture mockup.
- [ ] Real interactive product demo or gated sandbox.
- [ ] Multi-industry landing pages, newsletters, blog and comparison pages.
- [ ] Case studies, numerical ROI claims, social proof, pricing plans and accelerator/funding logos—only with evidence and permission.
- [ ] Full desktop/mobile/on-premise product implementation; these are product roadmap tasks, not landing page tasks.
Final instruction to Antigravity
1. Audit the real repository and the three real image files.
2. Provide a concise proposed section order and change list for review.
3. Implement phases in order without rewriting working functionality unnecessarily.
4. Document any blocked decisions and use safe, truthful copy.
5. Run all checks and prepare a preview; do not switch production DNS or publish without explicit approval.

Phase 7: Final UI/UX Refinement

Include actionable tasks such as:
- [x] Remove decorative badges.
- [x] Rewrite the hero headline and description.
- [x] Remove redundant text and sections.
- [x] Correct screenshot alignment and sizing.
- [x] Improve desktop, tablet, and mobile layouts.
- [x] Review both German and English content.
- [ ] Verify accessibility and responsive behavior. (Automated HTML heading, `lang`, contrast, anchor, image, and server route checks passed; live Chrome visual inspection at 390px/768px/1440px blocked because Chrome remote debugging `DevToolsActivePort` was unavailable.)