Metadata
description
Audit, refine, validate, and prepare VIACO's German-first landing page for a controlled Vercel launch
VIACO Landing Page — Execution Workflow
Purpose and authority
Execute the VIACO landing-page redesign in a controlled, spec-driven sequence. TASKS.md is the authoritative scope, task order, and acceptance-criteria document. This workflow defines how to execute, not new features. If AGENTS.md exists, follow its repository-wide instructions too. If any instructions conflict, flag the conflict before making changes; do not silently choose.

Scope: The marketing website only. Do not build the VIACO employee workspace or production app. Public-facing product name is VIACO, not the historical name Revia.

Non-negotiable guardrails
Work in the existing Next.js repository; inspect it before edits. Preserve the established premium forest-green / ivory visual identity and working components unless a change is justified.
German (de-AT) is primary, English (en) secondary. Use truthful, professional, concise marketing language.
VIACO is in concept/market-validation stage. Distinguish a concept screenshot, planned capability, implementation target, and working feature. Never invent customers, traction, ROI, certifications, testimonials, company history, partnerships, or live deployment claims.
Source image assets are exactly public/viaco/viaco-journy.png, public/viaco/viaco-managemnet.png, and public/viaco/viaco-knowledgeHUB.png. Check actual existence and case. Do not rename, fabricate, or create replacement imagery without approval.
Journey, Capture, Memory, and Assistant are complementary capabilities of one product; Management is a cross-platform administrative experience. Do not present every screenshot or feature repeatedly.
Do not activate paid services, push production deployments, change DNS, alter Zoho email records, or expose credentials without explicit user approval.
Do not state that a check has passed, a preview exists, or a deployment succeeded unless verified.
Execution protocol
Start by reading: TASKS.md, any existing AGENTS.md, project documentation, package scripts, and the current source tree. Summarize the plan before editing.
Maintain task state: In TASKS.md, mark items completed only when implemented and verified; keep unfinished items unchecked. Keep an IMPLEMENTATION_LOG.md with date, work done, files changed, test results, and blockers. Record decisions needing owner input in OPEN_DECISIONS.md.
Small batches: Work one phase at a time. Prefer minimal, reversible changes and coherent commits. Do not install major dependencies or restructure the project without justification.
After each batch: Run available checks appropriate to the change (format/lint/typecheck/tests/build, links, translations, responsive views). Fix issues introduced by the batch and report any pre-existing failures separately.
Approval gates: Stop at each checkpoint described below and ask for a decision when required. Do not interpret silence as approval.
Honesty first: When factual product, legal, company, hosting, or feature availability is unclear, use accurate concept-stage wording or add a blocker to OPEN_DECISIONS.md.
Phase sequence and checkpoints
Phase 0 — Repository and content audit (no edits)
Follow TASKS.md Phase 0. Inspect page sections and actual design tokens, assets, content, i18n, forms, legal pages, and deployment config. Prepare:

Current-section inventory and duplicate-content audit.
Proposed remove/merge/keep list, including the final page outline.
Asset review and relevant open decisions.
STOP — approval gate A: Present audit findings and proposed structure to the owner. Do not begin redesign until approved.

Phase 1 — Messaging and information architecture
Follow TASKS.md Phase 1. Draft the final section hierarchy and DE/EN copy in a single content source. Preserve the strongest approved hero direction; present alternatives rather than arbitrarily switching slogans. Ensure one clear conversion objective: a genuine concept-demo inquiry.

STOP — approval gate B: Request approval for hero messaging, module order, and the chosen concept screenshot treatment before implementing the full page.

Phase 2 — Visual and content implementation
Follow the module/visual tasks in TASKS.md in page order: header and hero → problems → platform summary → Journey → Capture → Memory + Assistant → Management → concise workflow → audience → trust/deployment → about → contact/footer. Reuse shared layout/components. Keep each section responsible for a distinct message.

Apply only the three available screenshots. Hero should feature the Journey concept image; use the other images in their relevant sections. Label all product screens as concepts. Avoid placeholder galleries and duplicate feature grids.

After each meaningful section batch, check mobile/tablet/desktop presentation and local build validity.

Phase 3 — Contact funnel and product credibility
Follow TASKS.md contact, privacy, credibility, and accessibility requirements. Make the demo form actually deliver inquiries and show genuine success/error states; if no approved submission destination exists, STOP and request the owner to choose it. Avoid collecting unnecessary personal information. Keep legal text and business identity accurate and marked as pending verification where needed.

Phase 4 — Engineering cleanup and quality checks
Follow TASKS.md Next.js, i18n, SEO, image optimization, accessibility, and test tasks. Do not migrate frameworks unless unavoidable and approved. Run available lint, typecheck, tests and a production build; check links, German/English parity, keyboard use, and common viewport sizes.

Phase 5 — Vercel preview readiness
Follow TASKS.md Vercel requirements. Prepare Web Analytics and Speed Insights using current official integration guidance; document privacy/consent decisions and any required owner dashboard setup. Check build/environment separation, preview access protection, logs/alert limitations, uptime monitoring plan, and budget constraints. Keep all secrets server-side; avoid logging form PII.

STOP — approval gate C: Ask permission before connecting accounts, creating a preview deployment if credentials or external actions are needed, or enabling integrations that collect data or incur costs. Preview is not production approval.

Phase 6 — Preview review and final handoff
After an authorized preview, validate the complete site on desktop/tablet/mobile, check forms and analytics without exposing PII, and fix issues. Produce the final handoff specified in TASKS.md: changed files, removed/merged sections, actual test results, verified preview URL (if available), open questions, and launch checklist.

STOP — approval gate D: Production deployment, domain/DNS changes, paid plan activation, or publishing require separate explicit approval.

Definition of done
The task is complete only when the relevant TASKS.md acceptance criteria are verified, no material duplicated sections or fictitious claims remain, the three asset references are correct, DE/EN and the contact flow work, build/quality checks are reported, and the owner receives a documented reviewable preview or a clear explanation of blockers. Do not mark the launch complete merely because the page looks good.

How to invoke
Ask Antigravity: “Execute the VIACO landing-page workflow in .agent/workflows/landing-page.md. Start with Phase 0 only. Read TASKS.md, audit the existing project and three assets, then stop for my approval before making changes.”