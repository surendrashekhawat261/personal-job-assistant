# Personal AI Job Search Assistant

Private, single-user job-search assistant built specifically around Surendra's two resumes: a full-time QA leadership profile and a contract/Toptal B2B profile.

## Implemented

- Two candidate profiles and automatic resume-profile selection
- Dynamic full-time and B2B search plans
- Search-based company/job discovery through a pluggable provider (Serper implementation)
- Greenhouse, Lever and Ashby public job-feed connectors
- Generic public job-page extraction
- Permanent/contract/B2B classification
- Worldwide/India eligibility and hard deal-breaker detection
- Resume/JD technical, responsibility, seniority and evidence matching
- Explainable shortlist-likelihood estimate
- Cross-source deduplication
- New/shortlisted/applied/interview/offer/rejected lifecycle
- Applied jobs removed from discovery and protected from rediscovery
- Gmail application-mail reader + application/status classification
- Action-required signals for interview scheduling and assessments
- Job-specific interview questions, answer structure and follow-ups
- Private responsive dashboard, applications tracker and interview-prep view
- Prisma schema for durable SQLite persistence (domain prototype currently uses the in-process repository; schema is ready for DB repository wiring)
- Unit tests for eligibility, matching, dedupe, lifecycle, email classification, search planning and interview generation

## Setup

```bash
cp .env.example .env
npm install
npm test
npm run dev
```

Open http://localhost:3000.

### Live discovery

Set `SERPER_API_KEY`, start the app and click **Run discovery now**. Search providers are adapters, so Bing/Google Custom Search or another provider can be added without changing matching logic.

### Gmail tracking

The prototype accepts a Gmail OAuth access token via `GMAIL_ACCESS_TOKEN`. For a long-running deployment, replace this with the normal Google OAuth authorization-code + refresh-token flow; never commit tokens.

## Commands

- `npm run dev` — local portal
- `npm test` — unit tests
- `npm run typecheck` — TypeScript validation
- `npm run build` — production build
- `npm run db:generate` — generate Prisma client
- `npm run db:push` — create/update local SQLite schema

## Important behavior

A high technical match does not override geographic ineligibility. An explicit US-only/work-authorization restriction caps the result and marks it not eligible. "Remote" by itself is never treated as "worldwide".

Shortlist likelihood is an explainable heuristic, not an employer probability. It is designed to be calibrated later from actual application outcomes.
