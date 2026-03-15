# PROJECT_HANDOFF

## 1) Executive Summary

Mawquta is a client-first Islamic prayer times web app (Arabic-first UI) built with modular vanilla JavaScript and Bootstrap, deployed as static assets plus a single Vercel serverless endpoint for city autocomplete (`/api/geocode`). The app currently delivers core daily value (today’s prayer times, next-prayer countdown, weekly preview, Qibla direction, and Ramadan countdown) and is structurally organized into API/service/UI/util layers.

The codebase is **functional but mid-maturity**: core flows are implemented and readable, but testing is absent, some documented features are not implemented, and there are legacy/dead artifacts (unused state module, empty util files, README drift, and minor CSS/config issues). Another engineer can safely continue from this point with a short hardening pass.

---

## 2) What the Project Does

**Confirmed:**

- Displays prayer times for today using either:
  - browser coordinates (`navigator.geolocation`) or
  - user-picked city/country (from autocomplete suggestions).
- Shows next prayer and a live HH:MM:SS countdown.
- Shows current week prayer preview (7-day slice, crossing month boundary when needed).
- Shows Qibla direction (degrees + compass needle).
- Shows countdown to next Ramadan using Hijri/Gregorian conversion endpoints.
- Persists selected location in `localStorage`.

**Inferred/needs verification against product intent:**

- README claims broader feature set (theme toggle UI, Asma Al-Husna screens, date converter UI, etc.) than current rendered UI provides.

---

## 3) Current Implementation Status and Maturity

**Maturity assessment:** Early production / advanced prototype.

**Implemented and wired end-to-end:**

- Prayer timings retrieval + rendering.
- Countdown timer with interval cleanup.
- Weekly calendar slicing and rendering.
- Qibla retrieval + render.
- Ramadan countdown service + render.
- City autocomplete via backend proxy endpoint.

**Partially implemented / present but unused:**

- Extended AlAdhan API wrappers for Asma Al-Husna, additional calendar/date conversion endpoints.
- `src/js/state/app.state.js` observer-based state store (not imported by runtime).

**Not implemented in current UI (despite docs mentioning):**

- 99 Names UI.
- Date conversion UI.
- Explicit theme toggle button/controls.
- Test suite.

---

## 4) Full Tech Stack

| Layer                   | Technology                                       | Status                       |
| ----------------------- | ------------------------------------------------ | ---------------------------- |
| Frontend                | HTML5, CSS3, Vanilla ES Modules                  | Confirmed                    |
| UI framework            | Bootstrap 5.3.3 RTL (CDN)                        | Confirmed (`src/index.html`) |
| HTTP client             | Axios (via global `window.axios` from CDN)       | Confirmed                    |
| Runtime APIs            | Browser Geolocation API, `fetch`, `localStorage` | Confirmed                    |
| Primary external API    | AlAdhan v1 (`https://api.aladhan.com/v1`)        | Confirmed                    |
| Reverse geocoding       | BigDataCloud reverse-geocode endpoint            | Confirmed                    |
| City search provider    | GeoNames (`secure.geonames.org`)                 | Confirmed                    |
| Backend edge/serverless | Vercel function (`api/geocode.js`)               | Confirmed                    |
| Deployment routing      | `vercel.json` rewrites                           | Confirmed                    |
| Package manager         | npm                                              | Confirmed                    |
| Tests                   | None configured (`npm test` placeholder)         | Confirmed                    |

---

## 5) Important Folder and File Structure

```text
.
├─ api/
│  └─ geocode.js                # Vercel serverless autocomplete proxy to GeoNames
├─ src/
│  ├─ index.html                # Main page shell + script/style includes
│  ├─ css/
│  │  ├─ main.css               # App component styling
│  │  └─ themes.css             # Theme tokens (light/dark variable sets)
│  ├─ js/
│  │  ├─ app.js                 # Runtime orchestrator / entry module
│  │  ├─ config.js              # App constants and external endpoints
│  │  ├─ api/                   # Low-level API adapters
│  │  ├─ services/              # Domain logic
│  │  ├─ ui/                    # Renderers
│  │  ├─ utils/                 # Helpers/validation/cache
│  │  └─ state/app.state.js     # Legacy/unused centralized store
│  └─ assets/                   # icons/lottie/etc. (light usage currently)
├─ Postman/
│  └─ AlAdhan API-Mawquta Collection.json
├─ vercel.json
├─ package.json
└─ README.md
```

---

## 6) Architecture Overview

The active architecture is a **thin UI shell + orchestrator (`app.js`) + service layer + API adapters** pattern.

- `app.js` is effectively the controller and state owner (`activeLocation`, modal state).
- Services encapsulate business logic (prayer view model creation, week slicing, Ramadan calculations, qibla normalization).
- API adapters isolate external endpoint details and input validation.
- UI modules are mostly pure renderers.
- Persistence/caching rely on `localStorage` directly (plus TTL wrapper in `cache.util.js`).

**Note:** A separate observer-based `AppState` architecture exists in code but is not used by the running app.

---

## 7) Feature / Module Breakdown

### A. Location selection

- `btnLocate` → geolocation → reverse geocode city/country → save location.
- `btnPickCity` modal → typeahead suggestions via `/api/geocode` → pick one suggestion → save location.

### B. Today prayer timings + next prayer

- By coords: `getTodayPrayerOverviewByCoords`.
- By city: `getTodayPrayerOverviewByCity`.
- Renders list + next prayer card.

### C. Next prayer countdown

- `render-countdown.js` maintains a module-level single interval.
- Auto-calls `init(activeLocation)` when countdown reaches zero.

### D. Week preview

- `week.service.js` fetches monthly calendar and returns 7 days from today.
- Handles month rollover by fetching next month.
- Uses local cache with TTL.

### E. Qibla

- `qibla.service.js` validates and normalizes direction.
- UI shows compass arrow and degree.

### F. Ramadan countdown

- Converts today Gregorian → Hijri month/year.
- Computes next Ramadan Hijri start (`01-09-YYYY`).
- Converts to Gregorian and computes remaining days.

---

## 8) Critical Files and Their Purpose

| File                                 | Purpose                                                                 | Criticality |
| ------------------------------------ | ----------------------------------------------------------------------- | ----------- |
| `src/js/app.js`                      | Main bootstrap + event wiring + orchestrated data loading and rendering | High        |
| `src/js/config.js`                   | External endpoint/base URLs, defaults, cache TTL, GeoNames config       | High        |
| `src/js/api/aladhan.api.js`          | AlAdhan API client wrappers                                             | High        |
| `src/js/api/location.api.js`         | Browser geolocation + reverse geocoding adapter                         | High        |
| `src/js/services/prayer.service.js`  | Prayer model transformation + next prayer logic                         | High        |
| `src/js/services/week.service.js`    | 7-day slicing, cache-aware calendar fetch                               | High        |
| `src/js/services/ramadan.service.js` | Ramadan countdown domain logic                                          | Medium-High |
| `src/js/ui/*`                        | Render logic for each widget                                            | High        |
| `api/geocode.js`                     | Serverless proxy for city autocomplete + env-based GeoNames auth        | High        |
| `vercel.json`                        | Runtime routing for static frontend + API function                      | High        |

---

## 9) Application Runtime Flow

1. `src/index.html` loads Bootstrap/Axios CDNs and `js/app.js` (module).
2. `bootstrap()` in `app.js`:
   - resolves location from `localStorage` or `CONFIG.DEFAULT_LOCATION`;
   - binds modal DOM + input listeners;
   - calls `init(activeLocation)`.
3. `init()` performs independent safe blocks:
   - today prayers + next prayer;
   - qibla;
   - week preview;
   - Ramadan countdown.
4. UI interaction triggers re-init:
   - Refresh button (with cache bypass for week).
   - Use my location.
   - Pick city and save.
   - Countdown expiry callback.

The code is resilient: each section in `init()` is in its own `try/catch` to degrade gracefully if one upstream call fails.

---

## 10) Data Flow

### Prayer times path

User location -> `prayer.service` -> `aladhan.api` -> AlAdhan endpoint -> normalized prayer array + next prayer -> `render-prayers` + `render-countdown`.

### Week path

Location + current date -> `week.service` -> monthly calendar (cached per city/coords+month) -> 7-day slice -> `render-week` -> day select -> rebuild today panel from selected day timings.

### City suggestions path

Input text -> `location-search.service` -> `/api/geocode` (Vercel) -> GeoNames -> filtered/deduped city list -> `render-city-suggestions`.

### Qibla path

Coords -> `qibla.service` -> AlAdhan qibla endpoint -> degree -> `render-qibla`.

### Ramadan path

Current date -> AlAdhan conversion endpoints -> computed day delta -> `render-ramadan`.

---

## 11) APIs / Routes / Interfaces

### Public frontend route behavior (`vercel.json`)

- `/api/(.*)` -> `/api/$1`
- `/` -> `/src/index.html`
- `/(.*)` -> `/src/$1`

### Internal app API adapters

**AlAdhan (`src/js/api/aladhan.api.js`)**

- Timings: `/timings`, `/timingsByCity`, `/timingsByAddress`
- Calendar: `/calendar`, `/calendarByCity`, `/calendarByAddress`
- Qibla: `/qibla/{lat}/{lon}` (+ `/compass` variant)
- Asma: `/asmaAlHusna`, `/asmaAlHusna/{index}`
- Date conversion: `/gToH`, `/hToG`, `/gToHCalendar`, `/hToGCalendar`

**Location (`src/js/api/location.api.js`)**

- Browser geolocation (`navigator.geolocation.getCurrentPosition`)
- BigDataCloud `/reverse-geocode-client`

### Serverless endpoint

`api/geocode.js`

- Input query: `q`, `limit`, `lang`
- Env dependency: `GEONAMES_USERNAME`
- Output: `{ ok, results[] }`
- Includes sort by population, validation, dedupe, and cache headers.

---

## 12) Database / Storage Layer

There is **no database**.

Storage used:

- `localStorage` for user-selected location (`CONFIG.STORAGE_KEY` = `ms_location`).
- `localStorage` TTL cache for monthly calendar payloads (`cache.util.js`).

Cache key strategy (`week.service.js`):

- coords: rounded lat/lon to 4 decimals + year-month.
- city: `city|country` + year-month.

---

## 13) State Management

### Active runtime state (confirmed)

- Local mutable module variables in `app.js`:
  - `activeLocation`
  - modal/autocomplete variables (`pickedCitySuggestion`, DOM refs)

### Legacy state module (confirmed but unused)

- `src/js/state/app.state.js` defines observer-based centralized store.
- Not imported anywhere in current runtime.
- Contains references likely incompatible with current config (`CONFIG.DEFAULT_THEME`, `CONFIG.API.DEFAULT_METHOD`, `DateUtil`) and would likely fail if executed as-is.

---

## 14) External Services and Integrations

| Service       | Purpose                                                      | Integration mode              |
| ------------- | ------------------------------------------------------------ | ----------------------------- |
| AlAdhan API   | Prayer timings, calendar, Qibla, Hijri/Gregorian conversions | Client-side Axios             |
| BigDataCloud  | Reverse geocoding lat/lon -> city/country                    | Client-side Axios             |
| GeoNames      | City autocomplete search                                     | Through Vercel `/api/geocode` |
| Bootstrap CDN | UI framework                                                 | Static CDN include            |
| Axios CDN     | HTTP client global                                           | Static CDN include            |

---

## 15) Config / Env / Deployment Assumptions

### Config (`src/js/config.js`)

- `BASE_URL`, `BIG_DATA_CLOUD_API`
- prayer `METHOD` (default `2`)
- cache TTL (6h)
- GeoNames base + username
- storage key and default location.

### Env (`.env` and serverless)

- Serverless function expects `GEONAMES_USERNAME` in environment.
- `.env` currently contains Vercel OIDC token and GeoNames username locally.

### Deployment

- Designed for Vercel static + serverless deployment via rewrites.

**Risk:** `GEONAMES_USERNAME` is also hardcoded in frontend config, which reduces secrecy benefits of server-side env.

---

## 16) Build / Run / Test / Developer Workflow

From `package.json`:

- `npm run dev` -> `npx serve src -l 3000`
- `npm run vercel:dev` -> `vercel dev`
- `npm test` -> placeholder that exits with error.

Expected local workflows:

1. Static-only preview: `npm run dev` (but `/api/geocode` won’t exist unless separately proxied).
2. Full local parity with serverless route: `npm run vercel:dev`.

---

## 17) Testing and Quality Signals

**Confirmed:**

- No automated tests.
- No lint config present.
- No CI config in tracked files.

**Quality positives:**

- Layered separation is readable.
- Input validation helpers used in API adapters.
- `init()` is fault-isolated by feature block.
- Countdown renderer prevents timer accumulation.

**Quality gaps:**

- Behavior correctness depends on manual testing.
- Some drift between docs and implementation.
- Some dead/empty files and stale module references.

---

## 18) TODOs, Incomplete Areas, Dead Code, Technical Debt

### Confirmed technical debt

1. **Unused legacy state module:** `src/js/state/app.state.js` not integrated.
2. **Empty utility files:** `src/js/utils/dom.util.js`, `src/js/utils/time.util.js`.
3. **Unused API wrappers:** several functions in `aladhan.api.js` are exported but not consumed in runtime.
4. **README drift:** documented architecture/feature list and file tree do not fully match current source behavior.
5. **Theme token bug in CSS:** `src/css/themes.css` uses `-bg-:` instead of `--bg:` in light theme root; this likely breaks intended light background variable fallback.
6. **Secrets hygiene issue:** sensitive token present in local `.env`; ensure it is rotated if exposed and never committed.

### Inferred incomplete product areas

- Asma Al-Husna and date converter likely planned but currently not surfaced.
- Theme toggle UX appears planned but absent in active markup/event flow.

---

## 19) Risks, Gaps, and Unknowns

### Risks

- Upstream API dependency risk (AlAdhan/BigDataCloud/GeoNames availability/rate limits).
- Credential exposure risk if env handling remains lax.
- Runtime inconsistency if app is served without Vercel function support.

### Gaps

- No test coverage.
- No explicit error telemetry.
- No schema contracts/types.

### Unknowns / Needs verification

- Intended production hosting model beyond Vercel (if any).
- Whether hardcoded GeoNames username in `config.js` is temporary.
- Whether legacy `AppState` should be revived or deleted.

---

## 20) Guidance for Another AI Continuing Development

1. **Stabilize before feature expansion:**
   - Fix CSS variable typo (`--bg`).
   - Decide single source of truth for state (`app.js` local state vs `AppState`).
   - Remove or integrate unused modules.
2. **Security/config hardening:**
   - Move all GeoNames credentials to server env only.
   - Ensure `.env` secrets are rotated and not exposed.
3. **Align docs with reality:**
   - Update README to actual current features and structure.
4. **Add baseline quality gates:**
   - Add lint + formatter + minimal smoke tests (at least service-level unit tests).
5. **Then implement missing promised features:**
   - Asma Al-Husna UI, date converters, explicit theme toggle, notifications/offline as roadmap items.

---

## 21) Quick Reference Tables

### Entry points

| Type             | File             | Notes                                         |
| ---------------- | ---------------- | --------------------------------------------- |
| Frontend entry   | `src/index.html` | Loads Bootstrap/Axios CDN and `src/js/app.js` |
| JS runtime entry | `src/js/app.js`  | Bootstraps app and binds all interactions     |
| Backend endpoint | `api/geocode.js` | Vercel serverless city autocomplete proxy     |

### Core feature to module mapping

| Feature               | Service                      | API adapter      | UI renderer                  |
| --------------------- | ---------------------------- | ---------------- | ---------------------------- |
| Today prayers         | `prayer.service.js`          | `aladhan.api.js` | `render-prayers.js`          |
| Next prayer countdown | `prayer.service.js`          | `aladhan.api.js` | `render-countdown.js`        |
| Week preview          | `week.service.js`            | `aladhan.api.js` | `render-week.js`             |
| Qibla                 | `qibla.service.js`           | `aladhan.api.js` | `render-qibla.js`            |
| Ramadan countdown     | `ramadan.service.js`         | `aladhan.api.js` | `render-ramadan.js`          |
| City autocomplete     | `location-search.service.js` | `/api/geocode`   | `render-city-suggestions.js` |

### Local storage keys in active runtime

| Key           | Source                              | Purpose                                 |
| ------------- | ----------------------------------- | --------------------------------------- |
| `ms_location` | `CONFIG.STORAGE_KEY`                | Persist selected location object        |
| `cal:*` keys  | `week.service.js` + `cache.util.js` | TTL cache of monthly calendar responses |

---

## 22) Important File Index

### High-priority read order for onboarding

1. `src/js/app.js`
2. `src/js/config.js`
3. `src/js/services/prayer.service.js`
4. `src/js/services/week.service.js`
5. `src/js/services/qibla.service.js`
6. `src/js/services/ramadan.service.js`
7. `src/js/api/aladhan.api.js`
8. `src/js/api/location.api.js`
9. `api/geocode.js`
10. `src/index.html`
11. `src/js/ui/*.js`

### Additional context files

- `vercel.json`
- `README.md` (use cautiously; partially outdated relative to current code)
- `Postman/AlAdhan API-Mawquta Collection.json`

---

## Appendix: Confirmed vs Inferred Summary

### Confirmed from source

- App is modular vanilla JS + Bootstrap + Axios CDN.
- Runtime features currently active: today timings, countdown, week, qibla, Ramadan, city autocomplete.
- Vercel rewrites and serverless geocode function are configured.
- No tests; placeholder `npm test`.
- Legacy `AppState` exists but is not used.

### Inferred

- Product scope broader than currently delivered UI (from README + extra API wrappers).
- Current branch appears in transition from older architecture to lean orchestrator model.

### Needs verification

- Intended final architecture direction (retain local orchestrator vs revive centralized store).
- Production secret management policy and whether any leaked token has been rotated.
