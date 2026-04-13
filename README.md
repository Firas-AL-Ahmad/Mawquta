# Mawquta

Mawquta is an Arabic-first prayer web application with a static frontend (`src/`) and one serverless endpoint (`api/geocode.js`) used for city search.

## Current Shipped Scope (Confirmed)

- Static Prayer / Qibla / Ramadan section rendering in the current runtime path
- Static content view models for hero, daily, weekly, qibla, and ramadan sections
- Serverless city-search endpoint (`GET /api/geocode`) available for API-side verification
- UI interaction scaffolding (navigation, tab toggles, modal triggers) without API hydration

## Runtime Topology (Confirmed)

- Frontend entry: `src/index.html`
- Frontend orchestrator: `src/js/app/main.js`
- Serverless geocode route: `GET /api/geocode` (`api/geocode.js`)

## UI Architecture (Current)

- Vanilla JS module architecture (no React/framework runtime).
- Section-owned rendering and interactions live under `src/js/ui/sections/<section>/`.
- Cross-section reusable UI is limited to `src/js/ui/shared/components/*`.
- Cross-section rendering helpers are limited to `src/js/ui/shared/primitives/*`.
- Styles are organized by ownership:
  - section styles: `src/styles/sections/<section>/`
  - shared styles: `src/styles/shared/*`
  - top-level style entry: `src/styles/index.css`

## Current Phase Policy (Static UI + Separate API)

- UI runtime path (`src/js/app/main.js` + `src/js/ui/*`) must remain static-content driven.
- No `fetch`/`axios`, no `api/services` imports, and no `localStorage` hydration inside UI runtime files.
- API and services (`api/*`, `src/js/api/*`, `src/js/services/*`) can evolve independently.
- UI-API wiring is intentionally deferred to a dedicated future phase: **UI-API Integration**.
- No dedicated UI static-boundary guard script is currently configured in `package.json`; enforce this via code review.

## Requirements

- Node.js + npm
- Internet access (external API calls)
- `GEONAMES_USERNAME` - required by `api/geocode.js`

## Local Development

Install dependencies:

```bash
npm install
```

### 1) Static frontend only

```bash
npm run dev
```

This serves `src/` on port `3000`. It is useful for static/frontend checks, but **does not provide** `/api/geocode`.

### 2) Full local runtime (recommended)

```bash
npm run vercel:dev
```

This provides Vercel-like routing and the `/api/geocode` serverless function, and is the recommended mode for validating real runtime behavior.

### 3) UI static boundary

No dedicated boundary-check script is currently configured in `package.json`; keep enforcement at review time.

## Environment Variables

Set in local Vercel environment (or deployment environment):

- `GEONAMES_USERNAME` - required by `api/geocode.js`

If this variable is missing, city search endpoint returns an error response.

## Deployment Notes

- Routing assumptions are defined in `vercel.json`.
- The project behavior currently depends on Vercel-style rewrites for serving `src/index.html`, static assets under `src/`, and `/api/*` functions.
- The active city-search runtime path is `GET /api/geocode` (serverless), not direct client calls to GeoNames.
- `GEONAMES_USERNAME` should be configured in the server/deployment environment only for `api/geocode.js`.

## Runtime Dependency Notes

- `src/js/api/aladhan.api.js` expects `window.axios` to exist at runtime.
- `src/index.html` loads Axios CDN before `src/js/app/main.js` to satisfy that requirement.

## Project Structure (High-level)

```text
.
├─ api/
│  └─ geocode.js
├─ docs/
│  ├─ blueprints/
│  ├─ design/
│  └─ api/
├─ src/
│  ├─ index.html
│  ├─ js/
│  │  ├─ app/
│  │  ├─ ui/
│  │  │  ├─ sections/
│  │  │  └─ shared/
│  ├─ styles/
│  │  ├─ sections/
│  │  └─ shared/
│  └─ assets/
├─ package.json
└─ vercel.json
```

## Engineering Reality (Current)

- No automated tests are currently configured.
- No lint/format/typecheck scripts are currently configured.
- Legacy stubs were removed from `src/js/legacy`; active runtime now lives entirely under `src/js/app`, `src/js/ui`, `src/js/api`, `src/js/services`, and `src/js/utils`.
- UI/API separation for this phase is currently enforced by structure and code review (no npm guard script is configured).

## Scope Clarification

This repository currently prioritizes runtime stability and documentation truthfulness over feature expansion.

## Contributing

- Commit grouping policy source of truth: [`GIT_CHANGE_GROUPING.md`](./GIT_CHANGE_GROUPING.md)
- Contributor workflow and examples: [`CONTRIBUTING.md`](./CONTRIBUTING.md)

Use small, isolated commits grouped by intent, with commit messages in this format:

`<type>(scope): message`



