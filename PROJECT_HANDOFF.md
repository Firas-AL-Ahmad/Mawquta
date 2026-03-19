# PROJECT_HANDOFF

## 1. Executive Summary

**What this project is (Confirmed):** Mawquta is an Arabic-first Islamic prayer web application built as a static frontend (`src/`) plus one Vercel serverless API function (`api/geocode.js`).

**Main purpose (Confirmed):** Provide city-based prayer times, next-prayer countdown, weekly prayer table, qibla direction, and Ramadan daily summary/countdown data.

**Maturity level (Inferred):** Early production-ready prototype. Core user flow works, architecture is modular, but engineering hardening is incomplete.

**Codebase health (Confirmed/Inferred):**

- **Strengths:** Clean folder layering (`api/services/ui/utils`), defensive fallbacks in runtime, strong input guards in API wrappers.
- **Weaknesses:** No tests, no CI/lint setup, multiple placeholder/legacy files, and documentation drift versus actual implementation.

**Main risks/uncertainties:**

- **Confirmed:** reliance on external APIs and browser runtime (`window.axios`, `fetch`, `localStorage`, geolocation).
- **Confirmed:** serverless endpoint requires `GEONAMES_USERNAME`.
- **Needs verification:** intended long-term architecture direction (current orchestrator approach vs legacy centralized state pattern).

---

## 2. Project Snapshot

| Item                 | Value                                                               | Confidence |
| -------------------- | ------------------------------------------------------------------- | ---------- |
| Project name         | `mawquta` (`package.json`)                                          | Confirmed  |
| App type             | Static SPA-like frontend + serverless API endpoint                  | Confirmed  |
| Main languages       | JavaScript (ES Modules), HTML, CSS                                  | Confirmed  |
| Frameworks           | No JS framework; custom modular vanilla JS                          | Confirmed  |
| Libraries            | `axios` dependency; runtime expects `window.axios`                  | Confirmed  |
| Package manager      | npm (`package-lock.json`)                                           | Confirmed  |
| Build tools          | No bundler configured; static serving via `serve` / Vercel rewrites | Confirmed  |
| Runtime environments | Browser + Vercel Serverless Function runtime                        | Confirmed  |
| Frontend entry point | `src/index.html` -> `src/js/app.js`                                 | Confirmed  |
| Backend entry point  | `api/geocode.js`                                                    | Confirmed  |
| Config/environment   | `src/js/config.js` + Vercel env (`process.env.GEONAMES_USERNAME`)   | Confirmed  |

---

## 3. Repository / Folder Structure

```text
.
├─ api/
│  └─ geocode.js                 # Vercel function for city autocomplete proxy
├─ src/
│  ├─ index.html                 # HTML shell and JS/CSS entry loading
│  ├─ css/                       # Tokenized styles and section/component layout
│  ├─ js/
│  │  ├─ app.js                  # Main runtime orchestrator
│  │  ├─ config.js               # Constants/endpoints/defaults
│  │  ├─ api/                    # External API adapters (AlAdhan/GeoNames/Location)
│  │  ├─ services/               # Domain logic (prayer/qibla/week/ramadan/search)
│  │  ├─ ui/                     # Renderers (layout, sections, widgets)
│  │  ├─ utils/                  # Validation/cache/date helpers
│  │  └─ state/legacy/           # Legacy state store (not active runtime)
│  └─ assets/                    # Icons/lottie/illustration assets
├─ Postman/                      # API collection artifact
├─ Sprint 01/, Sprint 02/        # Planning/blueprint documentation
├─ package.json
├─ vercel.json
└─ README.md
```

Relationship summary:

- `app.js` coordinates service calls and delegates rendering to `ui/*`.
- `services/*` depend on `api/*` and `utils/*`.
- `api/geocode.js` supports frontend location search (`location-search.service.js`).

---

## 4. Architecture Overview

**Architectural style (Confirmed):** Layered modular frontend (orchestrator + service + adapter + renderer), with one BFF-like edge endpoint for geocoding.

**Main subsystems:**

1. **UI composition subsystem** (`ui/layout`, `ui/sections`, `ui/widgets`).
2. **Runtime orchestration subsystem** (`src/js/app.js`) controlling lifecycle and refresh cycles.
3. **Domain/service subsystem** (`services/*`) for prayer/week/qibla/ramadan/search logic.
4. **External integration subsystem** (`api/*`, `api/geocode.js`).
5. **Utility/persistence subsystem** (`utils/*`, localStorage caching).

**Boundaries:**

- Frontend calls third-party APIs directly for prayer/qibla/calendar.
- Frontend calls internal `/api/geocode` for GeoNames autocomplete.

**Patterns in use (Confirmed/Inferred):**

- Functional modules with pure-ish mappers.
- Defensive fallback rendering states (`loading/ready/partial/unavailable`).
- Soft cancellation by refresh cycle IDs in `app.js`.
- Legacy observer state-store exists but is not wired.

---

## 5. Detailed Module Breakdown

### `src/js/app.js` (Runtime Controller)

- **Responsibility:** bootstrap app shell, manage location selection, orchestrate concurrent data refresh, and update sections.
- **Key dependencies:** layout/section renderers, prayer/week/qibla/location services, `CONFIG`.
- **Inputs:** user actions (location trigger/search), stored location, default config.
- **Outputs:** DOM updates for header/prayer/qibla/ramadan sections.
- **Side effects:** localStorage writes (`ms_location`), timers (`setInterval`, `setTimeout`), network calls via services.

### `src/js/services/prayer.service.js`

- **Responsibility:** convert API timings into ordered prayer view model and compute next prayer.
- **Dependencies:** `api/aladhan.api.js`.
- **Side effects:** none (except delegated network in API adapter).

### `src/js/services/week.service.js`

- **Responsibility:** produce fixed 7-day week data, including month rollover handling.
- **Dependencies:** monthly calendar API wrappers + cache util + config TTL.
- **Side effects:** localStorage cache set/get/remove via `cache.util.js`.

### `src/js/services/qibla.service.js`

- **Responsibility:** retrieve and validate qibla direction from API.

### `src/js/services/ramadan.service.js`

- **Responsibility:** derive days until next Ramadan via Gregorian/Hijri conversion APIs.
- **Note:** currently imported helper `getLocalISODate` appears unused.

### `src/js/services/location-search.service.js`

- **Responsibility:** call internal `/api/geocode` endpoint and normalize suggestions.

### `api/geocode.js` (Serverless)

- **Responsibility:** secure GeoNames lookup with env-backed username, filter/map/dedupe results.
- **Side effects:** external HTTP request + response cache headers.

---

## 6. File-Level Critical Analysis

| Path                              | Purpose                                          | Why it matters                              | Related files                               |
| --------------------------------- | ------------------------------------------------ | ------------------------------------------- | ------------------------------------------- |
| `src/index.html`                  | App shell mount and module script import         | Hard runtime entrypoint                     | `src/js/app.js`, `src/css/main.css`         |
| `src/js/app.js`                   | Central lifecycle and rendering orchestrator     | Most behavioral risk concentrated here      | all services and section renderers          |
| `src/js/config.js`                | Endpoints/default city/method/cache/storage keys | Controls runtime behavior and integrations  | API/service modules                         |
| `src/js/api/aladhan.api.js`       | AlAdhan adapter surface                          | External dependency contract and validation | prayer/week/qibla/ramadan services          |
| `src/js/services/week.service.js` | Weekly data extraction + TTL cache               | Primary data transformation complexity      | `cache.util.js`, `aladhan.api.js`           |
| `api/geocode.js`                  | Autocomplete backend proxy                       | Required for city search in deployed mode   | `location-search.service.js`, `vercel.json` |
| `vercel.json`                     | Route rewrites for static+API behavior           | Determines prod routing correctness         | `src/`, `api/`                              |

---

## 7. Application Flow / Runtime Flow

1. **Startup (Confirmed):** `src/index.html` mounts `#app` and loads `app.js` (ES module).
2. **Initialization (Confirmed):** `bootstrapApp()` renders app shell/header, binds location trigger, renders sections with loading/fallback transitions.
3. **Config loading (Confirmed):** static import from `config.js`.
4. **Execution lifecycle (Confirmed):** `refreshRuntimeByLocation()` runs prayer/qibla/ramadan builders in parallel (`Promise.allSettled`).
5. **Location flow (Confirmed):** dialog search -> `/api/geocode` suggestions -> choose city -> persist -> refresh all sections.
6. **Error handling (Confirmed):** per-module `try/catch` with graceful fallback view models; warnings via `console.warn`.
7. **Logging/monitoring (Confirmed):** console logging only; no telemetry provider.
8. **Auth/background jobs (Confirmed):** no auth, no queues, no schedulers.

---

## 8. Data Flow

**Entry points:**

- User input (city query, city selection click).
- Browser localStorage (stored location + cached calendars).
- External APIs (AlAdhan, GeoNames, BigDataCloud).

**Validation/parsing layers (Confirmed):**

- `validation.util.js` guards API adapter inputs.
- `app.js` includes strict city/coord normalization.

**Transformations:**

- Timings -> normalized `HH:MM` prayer rows.
- Month calendar arrays -> fixed 7-day subset.
- API qibla response -> degree text + compass rotation.

**Storage/read path:** `localStorage` for `ms_location`; cache payloads with `expiryTimestamp`.

**Caching:** local, TTL-based, keyed by city/coords + year-month.

**Simplified E2E flow A (city selection):**
User clicks location button -> search query debounced -> `/api/geocode` -> pick suggestion -> store city -> run prayer/qibla/ramadan/week fetch -> render all sections -> start live countdown updates.

**Simplified E2E flow B (runtime tick):**
Loaded prayers -> `startPrayerLiveBinding()` interval every 1s -> recompute next prayer -> update featured card/countdown text -> refresh prayer cards when featured prayer changes.

---

## 9. API / Interface Surface

### HTTP Routes

| Interface          | Purpose                  | Inputs               | Outputs             | Dependencies                   |
| ------------------ | ------------------------ | -------------------- | ------------------- | ------------------------------ |
| `GET /api/geocode` | City autocomplete proxy  | `q`, `limit`, `lang` | `{ ok, results[] }` | GeoNames + `GEONAMES_USERNAME` |
| `/` (rewrite)      | Frontend entry           | None                 | `src/index.html`    | `vercel.json`                  |
| `/(.*)` (rewrite)  | Static asset passthrough | Path                 | `src/*` files       | `vercel.json`                  |

### Client API wrappers (`src/js/api/aladhan.api.js`)

- Timings: `getTimingsByCityAndCountry`, `getTimingsByCoords`, etc.
- Calendar: `getMonthlyCalendarByCity`, `getMonthlyCalendarByCoords`, etc.
- Qibla: `getQiblaDirectionByCoords`, `getQiblaCompassBlobByCoords`.
- Additional wrappers (Asma/date conversion) exist but are not currently wired in active UI.

### CLI Interface

- No first-class CLI app; npm scripts: `dev`, `vercel:dev`, `test` placeholder.

---

## 10. Database / Persistence Layer

**Database technology:** None.

**Persistence model (Confirmed):** Browser localStorage only.

- `ms_location` (selected city/country/coords when available).
- Calendar cache entries with TTL metadata.

**Migrations/ORM/entities:** Not applicable.

---

## 11. State Management

**Active state approach (Confirmed):**

- Local module state in `app.js` (root references, interval IDs, refresh cycle IDs).
- DOM as primary rendered state source.

**Legacy state approach (Confirmed):**

- `src/js/state/legacy/app.state.js` defines an observer store but is unused and references outdated config keys.

**State risks (Inferred):**

- Potential divergence if legacy store is partially reintroduced without full refactor.

---

## 12. External Dependencies & Integrations

| Dependency   | Where used                            | Why used                                  |
| ------------ | ------------------------------------- | ----------------------------------------- |
| AlAdhan API  | `src/js/api/aladhan.api.js`           | Prayer/calendar/qibla/hijri conversions   |
| GeoNames     | `api/geocode.js`                      | City autocomplete search                  |
| BigDataCloud | `src/js/api/location.api.js`          | Reverse geocoding lat/lon to city/country |
| Axios        | API modules via `window.axios.create` | HTTP abstraction                          |
| Vercel       | `vercel.json`, `api/geocode.js`       | Hosting + serverless route                |

**Integration risk (Confirmed):** frontend assumes `window.axios` exists at runtime.

---

## 13. Configuration, Secrets, and Environments

**Config files:** `src/js/config.js`, `vercel.json`, `package.json`.

**Environment variables discovered:**

- `GEONAMES_USERNAME` in `api/geocode.js` (required for serverless autocomplete).

**Secrets handling pattern:**

- Backend endpoint checks env var.
- Frontend config also contains hardcoded GeoNames username (`CONFIG.GEONAMES_USERNAME`) for direct `geonames.api.js` usage.

**Risk classification:**

- **Confirmed:** secret-like username appears in client config and server env path simultaneously.
- **Needs verification:** whether direct frontend GeoNames integration is intentionally deprecated in favor of `/api/geocode`.

---

## 14. Build, Run, and Developer Workflow

**Install:** `npm install`

**Run (static):** `npm run dev` -> serves `src` on port 3000.

**Run (with serverless):** `npm run vercel:dev`.

**Build command:** none configured.

**Test command:** `npm test` currently fails intentionally (`"no test specified"`).

**Lint/format/typecheck:** no scripts/config discovered.

**Docker/devcontainer:** none discovered.

---

## 15. Testing & Quality

**Test frameworks:** none in project code.

**Test organization/coverage:** no test directories or CI test jobs.

**Static analysis:** no ESLint/Prettier config at repository root.

**Quality impression (Inferred):** runtime logic is thoughtfully defensive but relies on manual verification.

---

## 16. Current Progress Assessment

**Appears complete (Confirmed):**

- Main user flow for city selection and runtime section refresh.
- Prayer feature card + live countdown updates.
- Qibla and Ramadan section runtime data mapping.

**Partially implemented (Confirmed/Inferred):**

- Architecture includes extra modules/features not wired in active flow (legacy state, some widgets/services).

**TODO/FIXME markers:**

- No meaningful TODO/FIXME markers found in `src/` application code.

**Mocks/stubs/placeholders (Confirmed):**

- Many UI component/interactions files return empty strings/undefined.
- Legacy state module likely stale vs current config shape.

**Dead/deprecated code risk (Inferred):** medium; placeholders and legacy artifacts can mislead future changes.

---

## 17. Known Issues / Risks / Gaps

### Confirmed from code

- No automated testing or CI gates.
- Runtime depends on external APIs and global `window.axios` availability.
- Placeholder modules exist in `ui/components`, `ui/interactions`, and `ui/sections/render-location-modal.js`.
- Legacy state store is disconnected from current runtime.

### Strongly inferred

- Documentation (`README.md`) overstates currently active features relative to wired runtime.
- Team is mid-transition from earlier architecture artifacts to current orchestrator-centric model.

### Needs verification

- Whether Asma/date-conversion interfaces are planned for near-term UI delivery.
- Whether frontend GeoNames direct client should be removed completely.
- Production non-Vercel deployment path and expected behavior for `/api/geocode` in local static mode.

---

## 18. AI Handoff Guidance

**Read first (in order):**

1. `src/js/app.js`
2. `src/js/services/*`
3. `src/js/api/aladhan.api.js`
4. `api/geocode.js`
5. `src/js/config.js`

**Danger zones:**

- `refreshRuntimeByLocation()` concurrency/cycle logic in `app.js`.
- Time normalization and next-prayer logic in `prayer.service.js`.
- Week slicing and cache key strategy in `week.service.js`.

**Safe entry points for new features:**

- Add new section renderer under `ui/sections` + corresponding service.
- Extend `services/*` with pure data mappers before touching orchestration.

**Likely next development steps:**

1. Add baseline tests (service-level unit tests first).
2. Remove or formalize placeholder/legacy modules.
3. Unify GeoNames strategy (serverless-only recommended).
4. Align README to shipped behavior.

**Questions to ask human before major changes:**

- Should legacy state store be revived or deleted?
- Should direct client API usage be moved behind backend for consistency/security?
- Which roadmap features are priority: Asma/date conversion/theme toggle?

**Recommended strategy:** small, behavior-preserving refactors + tests before new feature breadth.

---

## 19. Quick Reference

### Key entry points

- Frontend: `src/index.html`, `src/js/app.js`
- Backend: `api/geocode.js`

### Key modules

- Prayer: `services/prayer.service.js`, `ui/sections/render-prayer-section.js`
- Week: `services/week.service.js`, `ui/widgets/render-week.js`
- Qibla: `services/qibla.service.js`, `ui/sections/render-qibla-section.js`
- Ramadan: `services/ramadan.service.js`, `ui/sections/render-ramadan-section.js`

### Important commands

- `npm install`
- `npm run dev`
- `npm run vercel:dev`

### Important env vars

- `GEONAMES_USERNAME` (serverless geocode function)

### Important routes/services

- `GET /api/geocode`
- AlAdhan API wrappers in `src/js/api/aladhan.api.js`

### Important database entities

- Not applicable (no DB).

---

## 20. Appendix: Important File Index

| Path                                           | Role                                       | Importance | Notes                                         |
| ---------------------------------------------- | ------------------------------------------ | ---------- | --------------------------------------------- |
| `src/index.html`                               | Frontend mount and asset loading           | High       | Must provide `#app` and module import         |
| `src/js/app.js`                                | Runtime orchestration                      | Critical   | Handles all core flows and state transitions  |
| `src/js/config.js`                             | Runtime constants                          | High       | Endpoint/method/default location/storage keys |
| `src/js/api/aladhan.api.js`                    | External prayer/qibla/calendar API adapter | High       | Largest integration surface                   |
| `src/js/services/prayer.service.js`            | Prayer VM + next-prayer logic              | High       | Time-sensitive behavior                       |
| `src/js/services/week.service.js`              | Week slicing + cache integration           | High       | Key transformation logic                      |
| `src/js/services/qibla.service.js`             | Qibla business validation                  | Medium     | Depends on API response quality               |
| `src/js/services/ramadan.service.js`           | Ramadan countdown computation              | Medium     | Date conversion chain                         |
| `src/js/services/location-search.service.js`   | City suggestions API consumer              | High       | Directly tied to user location flow           |
| `src/js/ui/sections/render-prayer-section.js`  | Prayer section renderer                    | High       | Includes featured updates                     |
| `src/js/ui/sections/render-qibla-section.js`   | Qibla section renderer                     | High       | State-sensitive rendering                     |
| `src/js/ui/sections/render-ramadan-section.js` | Ramadan section renderer                   | High       | State-sensitive rendering                     |
| `src/js/utils/validation.util.js`              | Input contract enforcement                 | High       | Prevents invalid API calls                    |
| `src/js/utils/cache.util.js`                   | TTL cache wrapper for localStorage         | Medium     | Used by weekly calendar flow                  |
| `api/geocode.js`                               | Serverless geocode proxy                   | Critical   | Production city search dependency             |
| `vercel.json`                                  | Rewrite/routing behavior                   | Critical   | Determines app/API serving topology           |
| `README.md`                                    | Project documentation                      | Medium     | Partially out-of-sync with runtime            |
| `src/js/state/legacy/app.state.js`             | Legacy observer state store                | Medium     | Not active; likely stale                      |
