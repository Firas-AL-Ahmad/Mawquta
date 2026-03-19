# Mawquta

Mawquta is an Arabic-first prayer web application with a static frontend (`src/`) and one serverless endpoint (`api/geocode.js`) used for city search.

## Current Shipped Scope (Confirmed)

- Daily prayer times by selected city
- Live countdown for the next prayer
- 7-day prayer table (week view)
- Qibla direction by city coordinates
- Ramadan daily summary (day/imsak/iftar) from current week data
- City picker with search suggestions

## Runtime Topology (Confirmed)

- Frontend entry: `src/index.html`
- Frontend orchestrator: `src/js/app.js`
- Serverless geocode route: `GET /api/geocode` (`api/geocode.js`)

## Requirements

- Node.js + npm
- Internet access (external API calls)
- `GEONAMES_USERNAME` environment variable for serverless geocode

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

## Environment Variables

Set in local Vercel environment (or deployment environment):

- `GEONAMES_USERNAME` — required by `api/geocode.js`

If this variable is missing, city search endpoint returns an error response.

## Deployment Notes

- Routing assumptions are defined in `vercel.json`.
- The project behavior currently depends on Vercel-style rewrites for serving `src/index.html`, static assets under `src/`, and `/api/*` functions.

## Runtime Dependency Notes

- `src/js/api/aladhan.api.js` expects `window.axios` to exist at runtime.
- `src/index.html` loads Axios CDN before `app.js` to satisfy that requirement.

## Project Structure (High-level)

```text
.
├─ api/
│  └─ geocode.js
├─ src/
│  ├─ index.html
│  ├─ css/
│  ├─ assets/
│  └─ js/
│     ├─ app.js
│     ├─ config.js
│     ├─ api/
│     ├─ services/
│     ├─ ui/
│     ├─ utils/
│     └─ state/legacy/
├─ package.json
└─ vercel.json
```

## Engineering Reality (Current)

- No automated tests are currently configured.
- No lint/format/typecheck scripts are currently configured.
- Some files under `src/js/ui/components/*`, `src/js/ui/interactions/*`, and `src/js/state/legacy/*` are legacy/placeholder-oriented and not part of the active runtime path in `app.js`.

## Scope Clarification

This repository currently prioritizes runtime stability and documentation truthfulness over feature expansion.
