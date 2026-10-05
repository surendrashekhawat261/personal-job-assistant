

## v2.1 fixes
- Hydration-safe local date rendering and browser-extension hydration warning suppression at the root.
- Discovery no longer requires Serper: SmartRecruiters public jobs API is used as a credential-free baseline.
- Serper is optional and adds broad web/ATS discovery.
- Discovery API reports active providers and warnings instead of silently returning an empty list.
- Empty-state copy now distinguishes no data from filtered-out data.

## v3 company-first discovery

Discovery now starts with a curated registry of exactly 100 companies relevant to senior QA, Quality Engineering, SDET, automation architecture and engineering leadership. The crawler visits the official career entry point for each company, expands supported ATS feeds when possible, and only keeps senior quality/testing roles. Serper is optional fallback coverage, not the primary source.

The Discover workspace separates opportunities into three tracks:

- India Full-Time — senior permanent roles located in India (including Bengaluru, Hyderabad, Pune, NCR/Noida/Gurugram, Chennai, Mumbai and other India locations).
- Global Full-Time — permanent remote/international roles with India eligibility signals.
- Global Contract / B2B — international contract, B2B, C2C or independent-contractor opportunities.

The `/companies` page shows the complete monitored registry and links to each official career site. Discovery reports how many target companies were scanned and how many produced extractable matching roles.

Some JavaScript-heavy career sites can block plain HTTP extraction. Those fail closed and are reported rather than fabricating jobs; ATS-specific adapters and optional search fallback expand coverage.

## v3.1 — strict 16+ year senior QA gate
Discovery now fails closed unless a vacancy is explicitly in the QA / Quality Engineering / Test Automation / SDET family and is senior-level (Senior, Lead, Staff, Principal, Architect, Manager, Head or Director). Generic software engineering, DevOps/SRE, data/product roles, junior/associate QA, ordinary QA Engineer/Analyst roles and manual-only testing roles are rejected before persistence. The same hard gate applies to official company crawlers and web-search fallback sources.

## v3.2 target-company expansion
- Merges the original registry with additional real employers supplied by the user.
- Normalizes company identities to avoid common India/global duplicate names.
- Explicitly excludes generated `TechCorp Systems Enterprise Ltd. Unit-*` placeholder rows.
- Keeps the Senior QA / QA Automation / QE / SDET hard gate before opportunities are stored.
- Company count is now dynamic; the portal no longer assumes exactly 100 targets.
