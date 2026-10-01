# Personal AI Job Search Assistant

Private, single-user job and B2B opportunity assistant tailored to two resume profiles: full-time and contract/B2B.

## Implemented in v0.1
- Two candidate profiles (full-time + contract)
- Permanent/contract/B2B classification
- Worldwide/India eligibility rules with US-only deal-breaker handling
- Resume-profile selection
- Technical/responsibility matching
- Shortlist-likelihood estimate with confidence
- Opportunity deduplication
- Application lifecycle: applied opportunities disappear from discovery
- Private dashboard + API routes
- Prisma data model for opportunities, applications and timeline events
- Unit tests for eligibility, profile selection, scoring, dedupe and lifecycle

## Run
1. `cp .env.example .env`
2. `npm install`
3. `npm test`
4. `npm run dev`
5. Open `http://localhost:3000`

The first dashboard uses two demo opportunities so behavior is visible immediately. Live search/ATS connectors are the next vertical slice.

## Design rule
A role labelled `Remote` is never assumed to be worldwide. Explicit geography/work-authorization restrictions override technical match.

## Next modules
- Search provider adapter
- Greenhouse / Lever / Ashby connectors
- Generic career page + Playwright connector
- Scheduled discovery worker
- Persistent Prisma repository replacing in-memory demo store
- Gmail application-status correlation
- Job-specific interview question generator
