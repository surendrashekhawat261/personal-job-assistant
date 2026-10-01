# Personal AI Job Search Assistant — v1.1

Private, single-user job-search assistant built specifically around Surendra's two resumes: a full-time QA leadership profile and a contract/Toptal B2B profile.

## Current end-to-end flow

`Resume profile -> search plan -> web/ATS discovery -> JD extraction -> India/B2B eligibility -> matching -> shortlist estimate -> discovery dashboard -> shortlist/apply/ignore -> application tracker -> Gmail classification -> action center -> interview preparation`

## Implemented

- Two candidate profiles with automatic full-time vs contract resume selection
- Dynamic full-time and B2B search plans
- Search-based company/job discovery through a pluggable provider (Serper implementation)
- ATS-aware discovery: Greenhouse, Lever and Ashby feeds are expanded when search finds their URLs
- Generic public job-page extraction fallback
- Permanent/contract/B2B classification
- Worldwide/India eligibility and hard deal-breaker detection
- Generic `Remote` is deliberately **not** treated as worldwide/India eligible
- Resume/JD technical, responsibility, seniority and evidence matching
- Explainable shortlist-likelihood estimate with confidence
- Cross-source deduplication and last-seen refresh
- New/shortlisted/applied/interview/offer/rejected lifecycle
- Applied jobs removed from discovery and protected from rediscovery
- Durable private JSON persistence at `.data/state.json` (override with `JOB_ASSISTANT_DATA_FILE`)
- Prisma schema retained for migration to SQLite/Postgres when desired
- Gmail application-mail reader + application/status classification
- Relevant application emails are recorded once, preventing duplicate processing
- Action Center for interview scheduling, assessments and other detected follow-ups
- Job-specific interview questions, answer structure and follow-ups
- Discovery filters for text, job type, India eligibility and minimum match
- Private responsive dashboard and application tracker
- Unit tests for eligibility, matching, dedupe, lifecycle, email classification, search planning and interview generation

## Setup

```bash
cp .env.example .env
npm install
npm test
npm run dev
```

Open `http://localhost:3000`.

## Live discovery

Set `SERPER_API_KEY`, start the app and click **Run discovery now**. Search results that point at Greenhouse, Lever or Ashby are expanded through their public job feeds; other career/job URLs use the generic extractor.

## Gmail tracking

The local prototype accepts `GMAIL_ACCESS_TOKEN`. For a continuously running deployment use Google OAuth authorization-code + refresh-token flow; never commit tokens. After applications exist, use **Sync application email**. Matched mail can update application status and populate **Actions**.

## Commands

- `npm run dev` — local portal
- `npm test` — unit tests
- `npm run typecheck` — TypeScript validation
- `npm run build` — production build
- `npm run db:generate` — generate Prisma client
- `npm run db:push` — create/update local SQLite schema

## Important behavior

A high technical match never overrides explicit geographic ineligibility. An explicit US-only/work-authorization restriction caps the result and marks it not eligible. `Remote` alone is not evidence of worldwide eligibility.

Shortlist likelihood is an explainable heuristic, not an employer probability. It is designed to be calibrated later from actual application outcomes.

## Still requires credentials / external setup

The repository contains the integration code, but live search and mailbox access cannot operate until their credentials are supplied. The deterministic matching, lifecycle, dashboard and interview logic do not require those credentials.

## v2.0 completion pass

Added after v1.1:
- Gmail authorization-code OAuth + offline refresh-token support
- Protected cron endpoints for recurring discovery and mailbox synchronization
- Workday public CXS adapter with fail-closed behavior
- SmartRecruiters public jobs search adapter
- Optional LLM semantic JD enrichment with deterministic fallback
- Truthful job-specific resume-tailoring plans (no fabricated experience)
- Company-context retrieval for interview preparation
- Mock-interview question set and answer-readiness evaluator
- Outcome analytics and shortlist-model calibration from real application results
- Settings/integration page and analytics page
- Additional OAuth, calibration and mock-interview unit tests

### Scheduler
Call `POST /api/cron/discover` and `POST /api/cron/email` with `Authorization: Bearer $CRON_SECRET`. A 6-hour discovery cadence and 3-hour mail cadence are sensible defaults for a personal installation.

### Gmail offline authorization
Configure `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, and `GOOGLE_REDIRECT_URI`, visit `/api/gmail/auth`, grant read-only Gmail access, then store the returned refresh token as `GOOGLE_REFRESH_TOKEN`. Keep it private and never commit it.

### Optional AI
With `OPENAI_API_KEY`, `/api/ai-analysis?id=...` adds semantic analysis and `/api/resume-tailor?id=...` creates a truthful tailoring plan. Without a key, both return deterministic safe fallbacks.

### Deliberate boundary
The assistant does not auto-submit applications. It discovers, ranks, tailors, tracks and prepares; you remain in control of the final application submission.
