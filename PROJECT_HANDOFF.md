# PROJECT_HANDOFF

Generated on: **April 7, 2026** (Asia/Damascus)  
Repository root: `f:\Web Development\Pure Web\MuslimSalat`

## Confidence Legend
- **Confirmed**: Directly verified in repository files and/or command output.
- **Inferred**: Strong architectural inference from code shape, imports, and runtime scripts.
- **Needs verification**: Not directly provable from current files or depends on environment/deployment state.

---

## 1. Executive Summary

### What this project is
- **Mawquta** is an Arabic-first prayer-times web app with:
  - a static frontend under `src/`
  - one serverless API endpoint under `api/geocode.js`  
  **Status:** Confirmed

### Main business/technical purpose
- Provide prayer-related Islamic features: daily prayer times, weekly table, qibla, Ramadan view, city/location handling.  
  **Status:** Confirmed (feature intent in README + modules), but dynamic runtime wiring is partial.

### Apparent maturity level
- UI layer is visually mature and heavily styled.
- Data/domain layers exist but are largely not connected to the active bootstrap path.  
  **Status:** Confirmed

### Overall codebase health
- Positive:
  - clear section-first foldering
  - modular renderer/services split
  - serverless geocode route with validation/deduplication
- Gaps:
  - many scaffold modules are placeholders or unreferenced
  - active runtime is mostly static rendering
  - no tests/lint/typecheck CI pipeline  
  **Status:** Confirmed

### Main risks/uncertainties
- Runtime/README drift (documented dynamic behavior vs currently static app path). **Confirmed**
- Sensitive credential pattern mismatch (hardcoded `GEONAMES_USERNAME` in client config + env on serverless). **Confirmed**
- Unknown production behavior for currently unbound service flows. **Needs verification**

---

## 2. Project Snapshot

| Item | Value | Confidence |
|---|---|---|
| Project name | `mawquta` (`package.json`) | Confirmed |
| App type | Static SPA-style frontend + Vercel serverless function | Confirmed |
| Main languages | JavaScript, CSS, HTML | Confirmed |
| Frameworks | No SPA framework (vanilla ES modules) | Confirmed |
| UI libraries | Bootstrap 5.3.3 (CDN, RTL build) | Confirmed |
| HTTP client | Axios 1.13.6 (CDN + lockfile dep) | Confirmed |
| Package manager | npm (`package-lock.json`) | Confirmed |
| Build tools | No bundler; static serving (`npx serve`) and `vercel dev` | Confirmed |
| Runtime environments | Browser + Vercel Node serverless runtime | Confirmed |
| Frontend entry point | `src/index.html` → `src/js/app.js` | Confirmed |
| Backend entry point | `api/geocode.js` (`GET /api/geocode`) | Confirmed |
| Config approach | `src/js/config.js` constants + server env var `GEONAMES_USERNAME` | Confirmed |

Additional discovered environment keys from local `.env` file:
- `GEONAMES_USERNAME`
- `VERCEL_OIDC_TOKEN`  
**Status:** Confirmed (names only, no values exposed)

---

## 3. Repository / Folder Structure

```text
.
├─ api/
│  └─ geocode.js                        # Serverless city search proxy to GeoNames
├─ src/
│  ├─ index.html                        # HTML shell + CDN dependencies + app module load
│  ├─ css/
│  │  ├─ main.css                       # Single stylesheet entrypoint via @import
│  │  ├─ themes.css                     # Design tokens / CSS variables
│  │  ├─ base.css                       # Reset/base primitives
│  │  ├─ layout.css                     # Container/page shell layout helpers
│  │  ├─ components.css                 # Reusable primitive classes
│  │  ├─ sections.css                   # Section-specific styles (very large)
│  │  └─ utilities.css                  # Small utility classes
│  ├─ js/
│  │  ├─ app.js                         # Active bootstrap/orchestration
│  │  ├─ config.js                      # Static constants
│  │  ├─ api/                           # External API client wrappers (AlAdhan, GeoNames, BigDataCloud)
│  │  ├─ services/                      # Domain-level logic (currently mostly unbound)
│  │  ├─ ui/
│  │  │  ├─ layout/                     # Header/footer/app-shell renderers
│  │  │  ├─ sections/                   # Main section renderers
│  │  │  ├─ widgets/                    # Lower-level section widgets (week, qibla, ramadan...)
│  │  │  ├─ components/                 # Primitive renderer stubs (mostly placeholders)
│  │  │  └─ interactions/               # Navigation + placeholder interactions
│  │  ├─ utils/                         # validation/cache/date + empty util files
│  │  └─ state/legacy/                  # Legacy directory present, no active files
│  └─ assets/                           # Icons, imagery, lottie
├─ Postman/
│  └─ AlAdhan API-Mawquta Collection.json
├─ Sprint 01/02/03/                     # Blueprint/planning docs
├─ package.json
├─ package-lock.json
├─ vercel.json
├─ README.md
└─ lefthook.yml                         # Template comments only, no active hooks
```

### Structure relationship summary
- `app.js` renders the entire UI via `ui/layout` + `ui/sections`.
- `ui/sections` rely on `ui/widgets` for sub-markup.
- `services` and `api` are architected for dynamic data but are mostly not called by active bootstrap.
- `api/geocode.js` is the only backend code path.

**Status:** Confirmed

---

## 4. Architecture Overview

### Architectural style
- **Section-oriented, layered frontend architecture**:
  - Presentation: `ui/layout`, `ui/sections`, `ui/widgets`, `ui/components`
  - Domain/service logic: `services/*`
  - Integration clients: `api/*`
  - Utilities: `utils/*`
- **Serverless edge proxy** for city search in `api/geocode.js`.
**Status:** Confirmed

### Frontend/backend boundary
- Frontend calls same-origin `GET /api/geocode` (service exists).
- Backend proxy forwards to GeoNames with server-side env credential.
**Status:** Confirmed

### Major patterns in use
- Pure function renderers returning HTML strings and DOM injection.
- View-model normalization with fallback defaults in section/widget modules.
- Small utility validators throwing errors in integration layer.
- LocalStorage TTL cache utility implemented (not currently wired to active runtime path).
**Status:** Confirmed

### Architectural caveat
- Current active runtime (`app.js`) behaves like a static composition pipeline; dynamic services are mostly disconnected from bootstrap/update lifecycle.
**Status:** Confirmed

---

## 5. Detailed Module Breakdown

### Module: App Bootstrap
- **Responsibility:** Build DOM shell and render all top-level sections.
- **Key file:** `src/js/app.js`
- **Key functions:** `bootstrapApp()`, `bindRamadanTabs()`
- **Dependencies:** `renderAppShell`, `renderHeader`, `renderFooter`, hero/daily/weekly/qibla/ramadan renderers, `bindNavInteractions`
- **Inputs:** DOM root `#app`
- **Outputs:** Fully rendered static page sections
- **Side effects:** Writes `innerHTML`, attaches nav/tab listeners
- **Connections:** No service/API invocation in active path
- **Confidence:** Confirmed

### Module: UI Layout Renderers
- **Responsibility:** Header/footer/app-shell HTML.
- **Key files:** `ui/layout/render-app-shell.js`, `render-header.js`, `render-footer.js`
- **Inputs/outputs:** DOM element in → injected section markup out
- **Side effects:** static link/menu/button structure creation
- **Confidence:** Confirmed

### Module: Section Renderers
- **Responsibility:** Compose section-level markup and pass view models to widgets.
- **Key files:** `ui/sections/render-hero-section.js`, `render-daily-prayer-section.js`, `render-weekly-prayer-section.js`, `render-qibla-section.js`, `render-ramadan-section.js`
- **Key note:** Default/static data is embedded directly in several renderers.
- **Confidence:** Confirmed

### Module: Navigation Interactions
- **Responsibility:** Header nav active state, smooth scroll, mobile nav toggle, language dropdown interactions.
- **Key file:** `ui/interactions/nav.interactions.js`
- **Dependencies:** Header CSS classes, optional Bootstrap Collapse API
- **Side effects:** Event listeners on document/window/header
- **Confidence:** Confirmed

### Module: API Client Layer
- **Responsibility:** Encapsulate external HTTP calls.
- **Key files:** `api/aladhan.api.js`, `api/location.api.js`, `api/geonames.api.js`
- **Dependencies:** `window.axios`, validators, `config.js`
- **Inputs/outputs:** typed params → parsed response fragments
- **Side effects:** throws on missing `window.axios`; remote API traffic
- **Confidence:** Confirmed

### Module: Service Layer
- **Responsibility:** Domain aggregation/transforms (prayer overview, current week, qibla, Ramadan countdown, city suggestions).
- **Key files:** `services/prayer.service.js`, `week.service.js`, `qibla.service.js`, `ramadan.service.js`, `location-search.service.js`
- **Dependencies:** API client layer + utilities
- **Outputs:** normalized data models for UI
- **Side effects:** localStorage cache writes (`week.service.js` via `cache.util.js`)
- **Connection status to runtime:** mostly not imported by `app.js`
- **Confidence:** Confirmed

### Module: Serverless Geocode
- **Responsibility:** Controlled city search to GeoNames using server env key.
- **Key file:** `api/geocode.js`
- **Inputs:** query params `q`, `limit`, `lang`
- **Outputs:** `{ ok, results[] }` or error payload
- **Side effects:** outbound fetch, cache-control header
- **Confidence:** Confirmed

### Module: Styling System
- **Responsibility:** Global design token/theme + section styles.
- **Key files:** `css/themes.css`, `css/sections.css`, `css/main.css`
- **Notable:** `sections.css` is very large (~4669 lines), likely the main styling surface.
- **Confidence:** Confirmed

### Module: Planning/QA Artifacts
- **Responsibility:** sprint blueprints, readiness plans, API collection.
- **Key dirs/files:** `Sprint 01..03`, `Postman/AlAdhan API-Mawquta Collection.json`
- **Confidence:** Confirmed

---

## 6. File-Level Critical Analysis

| Path | Purpose | Key exports/functions | Why it matters | Related files |
|---|---|---|---|---|
| `src/js/app.js` | Active runtime bootstrap | `bootstrapApp`, `bindRamadanTabs` | Defines real execution path; currently static composition | section/layout renderers, nav interactions |
| `src/index.html` | Browser entry HTML | N/A | Loads CDN axios/bootstrap + app module; runtime dependency order lives here | `src/js/api/aladhan.api.js` |
| `api/geocode.js` | Only backend endpoint | default `handler(req,res)` | City search proxy, env handling, dedupe/sort logic | `services/location-search.service.js` |
| `src/js/config.js` | Shared constants | `CONFIG` | Contains API bases/defaults and hardcoded GeoNames username | `api/*.js`, `services/week.service.js` |
| `src/js/api/aladhan.api.js` | External prayer API integration | multiple async getters/converters | Foundation for dynamic prayer/qibla/ramadan logic; depends on `window.axios` | `services/prayer.service.js`, `services/week.service.js`, `services/qibla.service.js`, `services/ramadan.service.js` |
| `src/js/services/week.service.js` | Week slicing + cache | `getCurrentWeekByCity`, `getCurrentWeekByCoords` | Most substantial domain logic with month rollover/caching | `utils/cache.util.js`, `api/aladhan.api.js` |
| `src/js/ui/interactions/nav.interactions.js` | Nav/menu behavior | `bindNavInteractions` | Main active interactive behavior in current runtime | `render-header.js`, `sections.css` |
| `src/js/ui/widgets/render-ramadan.js` | Ramadan countdown/table widget | `renderRamadanCountdown`, `renderRamadanMonthTable` | Large UI logic; contains static override (`void viewModel`) | `render-ramadan-section.js` |
| `src/js/ui/widgets/render-qibla.js` | Qibla visual widget | `renderQibla` | Computes degree but does not rotate compass asset; potential behavior gap | `render-qibla-section.js`, qibla CSS |
| `src/css/sections.css` | Section-specific styling | N/A | Largest styling surface; high coupling/risk area | all UI renderers |
| `README.md` | Runtime assumptions doc | N/A | Declares shipped scope; useful baseline for drift checks | `app.js`, `vercel.json` |

---

## 7. Application Flow / Runtime Flow

### Startup flow
1. Browser loads `src/index.html`. **Confirmed**
2. CDN assets load:
   - Bootstrap RTL CSS
   - Axios CDN
   - Bootstrap JS bundle  
   **Confirmed**
3. ES module `src/js/app.js` executes `bootstrapApp()`. **Confirmed**
4. App shell and sections are rendered into `#app` via `innerHTML`. **Confirmed**
5. `bindNavInteractions()` binds menu, smooth scroll, language dropdown. **Confirmed**
6. Ramadan tab click handling is bound (`data-ramadan-tab`). **Confirmed**

### Config loading
- Frontend constants from `src/js/config.js`.
- Backend env var in `api/geocode.js`: `process.env.GEONAMES_USERNAME`.

### Request/render/execution lifecycle
- Current active lifecycle is **render static defaults once + user interaction handlers**.
- No active bootstrap calls to prayer/week/qibla/ramadan services in `app.js`.

### Authentication/authorization
- None present. **Confirmed**

### Error handling flow
- API layer throws validation/runtime errors.
- Service `location-search` and `cache` utilities swallow errors and return safe defaults (`[]` / `null`).
- Serverless endpoint returns structured JSON errors, mostly 500/502.

### Logging/monitoring
- Minimal (`console.warn` for missing root). No telemetry/instrumentation. **Confirmed**

### Background jobs/queues/schedulers
- None present. **Confirmed**

---

## 8. Data Flow

### Where data enters the system
- User page load and clicks (DOM events). **Confirmed**
- `GET /api/geocode` query params (`q`, `limit`, `lang`) for city suggestions. **Confirmed**
- External API responses (AlAdhan, GeoNames, BigDataCloud) through client wrappers. **Confirmed** (wrappers exist), **Inferred** for runtime usage in current build.

### Validation/parsing layers
- `utils/validation.util.js` enforces numeric/date/range checks in API/service layer.
- `api/geocode.js` validates query presence/min-length; clamps `limit`.

### Transformations
- `prayer.service.js`: timing map → ordered prayers + next prayer computation.
- `week.service.js`: monthly calendar cache + 7-day slicing with month rollover.
- `ramadan.service.js`: Gregorian↔Hijri conversion to derive countdown.
- `api/geocode.js`: sort by population + dedupe `city|country`.

### Storage/read paths
- No DB.
- localStorage TTL cache utility exists and used in `week.service.js`.
- Active app bootstrap does not currently call week service, so cache may be dormant in runtime.

### API boundaries
- Internal backend boundary: `/api/geocode`.
- External boundaries:
  - `https://api.aladhan.com/v1`
  - `https://secure.geonames.org`
  - `https://api.bigdatacloud.net/data`

### Frontend state updates
- Mostly direct DOM render (string templates).
- No global store; no reactive state framework.

### Caching
- `api/geocode.js` sets `Cache-Control: s-maxage=3600, stale-while-revalidate=86400`.
- `week.service.js` localStorage TTL (`CONFIG.CALENDAR_CACHE_TTL_MS` = 6h).

### Serialization/deserialization
- JSON parsing in fetch/axios handlers.
- localStorage JSON payload in `cache.util.js`.

### Simplified end-to-end flows

#### Flow A: Current live flow (static render path)
1. `index.html` loads JS/CDN deps.
2. `app.js` renders all sections with default/fallback models.
3. User interactions mostly affect nav/tab UI classes.
4. No automatic domain/API refresh pipeline in active bootstrap.

**Confidence:** Confirmed

#### Flow B: City suggestion flow (implemented but not wired into bootstrap)
1. UI (if wired) calls `searchCitySuggestions(query)` in `services/location-search.service.js`.
2. Service fetches `/api/geocode?q=...`.
3. Serverless endpoint queries GeoNames with env username.
4. Deduped city/country/lat/lon results return to UI suggestion widget.

**Confidence:** Confirmed for code path existence, **Needs verification** for current runtime invocation.

---

## 9. API / Interface Surface

### HTTP routes

| Interface | Purpose | Inputs | Outputs | Dependencies | Confidence |
|---|---|---|---|---|---|
| `GET /api/geocode` | City search proxy | `q` (min 3 chars), optional `limit`, `lang` | `{ ok: true, results[] }` or `{ ok: false, error }` | `process.env.GEONAMES_USERNAME`, GeoNames API | Confirmed |
| `/` (rewritten to `/src/index.html`) | Frontend entry | Browser request | HTML app shell | `vercel.json` rewrites | Confirmed |
| `/(.*)` (rewritten to `/src/$1`) | Static assets/routed files | Browser request | Static file response | `vercel.json` | Confirmed |

### Internal JS interfaces (discoverable exports)
- API functions in `src/js/api/aladhan.api.js`:
  - timings, calendars, qibla, asma al husna, date conversions
- Service functions in `src/js/services/*.js`
- Renderer functions in `src/js/ui/**/*`

**Confidence:** Confirmed

### CLI interfaces (developer commands)
- `npm run dev` → `npx serve src -l 3000`
- `npm run vercel:dev` → `vercel dev`
- `npm test` → placeholder failure

**Confidence:** Confirmed

### Webhooks / event consumers / RPC / GraphQL
- None found. **Confirmed**

---

## 10. Database / Persistence Layer

- No database technology, ORM, migrations, repositories, or seed scripts found.
- Persistence is limited to browser localStorage TTL cache utility (`src/js/utils/cache.util.js`).

**Status:** Confirmed

---

## 11. State Management

### Current state model
- **Global state store:** none
- **Local/UI state:** implicit in DOM + default view-model objects in renderer files
- **Server state/cache:** service-level memory + optional localStorage TTL (week service)
- **Form state:** not implemented beyond interactive controls

**Status:** Confirmed

### State-related risks
- High coupling between state and markup templates.
- No central source of truth for active location/prayer cycle in active runtime.
- Existing service layer suggests intended state orchestration that is currently disconnected.

**Status:** Confirmed

---

## 12. External Dependencies & Integrations

| Dependency/Service | Where used | Why used | Confidence |
|---|---|---|---|
| Axios (CDN + npm dep) | `index.html`, `api/*.js` wrappers | HTTP client for external APIs | Confirmed |
| Bootstrap 5 RTL + JS bundle | `index.html`, section/header markup, nav interactions | Base responsive UI + modal/collapse interactions | Confirmed |
| Google Fonts (`Amiri Quran`, `Noto Kufi Arabic`, `Reem Kufi`) | `index.html`, CSS token usage | Arabic-first typography | Confirmed |
| AlAdhan API | `api/aladhan.api.js` | Prayer times/calendar/qibla/hijri conversions | Confirmed |
| GeoNames API | `api/geocode.js`, `api/geonames.api.js` | City search/reverse lookup | Confirmed |
| BigDataCloud API | `api/location.api.js` | Reverse geocode lat/lon → city/country | Confirmed |
| Vercel runtime | `vercel.json`, `.vercel/project.json`, npm script | Rewrite routing + serverless API hosting | Confirmed |
| Postman collection | `Postman/*.json` | Manual API exploration/testing | Confirmed |

---

## 13. Configuration, Secrets, and Environments

### Config files
- `src/js/config.js` (frontend constants)
- `vercel.json` (routing)
- `.vercel/project.json` (linked Vercel project/org IDs)
- `.env` present locally (keys observed, values not exposed)

### Environment variables discovered
- `GEONAMES_USERNAME` (used by `api/geocode.js`)
- `VERCEL_OIDC_TOKEN` (present in local `.env`, usage not found in app code)

### Feature flags
- None identified. **Confirmed**

### Environment-specific behavior
- `npm run dev` serves static `src/` only (no serverless `/api` route).
- `npm run vercel:dev` expected to emulate rewrites + API function.

### Secrets handling pattern
- Serverless endpoint correctly expects env var for GeoNames.
- Client config currently includes hardcoded `GEONAMES_USERNAME` constant in `src/js/config.js`.

**Risk note:** hardcoded client username weakens secret boundary and can drift from server env config.  
**Status:** Confirmed

### Missing config risks
- If `GEONAMES_USERNAME` is absent in deployment env, `/api/geocode` returns 500.
- Since active app does not currently wire city-search flow, failures may be silent until that integration is enabled.

---

## 14. Build, Run, and Developer Workflow

### Install
```bash
npm install
```

### Run (frontend static only)
```bash
npm run dev
```
- Uses `npx serve src -l 3000`.
- Good for static UI checks.
- Does not include serverless `/api/geocode`.

### Run (full local runtime emulation)
```bash
npm run vercel:dev
```
- Uses `vercel dev`.
- Intended path for frontend + `/api/*`.

### Test
```bash
npm test
```
- Currently hardcoded to fail with `"Error: no test specified"`.

### Lint/format/typecheck
- No scripts configured. **Confirmed**

### Code generation/migrations/seeds
- None found. **Confirmed**

### Docker/devcontainer
- None found. **Confirmed**

---

## 15. Testing & Quality

### Test framework and organization
- No test framework configured.
- No `test/` directory or spec files found.

### Coverage impression
- No automated coverage pipeline.

### Static analysis and CI
- No ESLint/Prettier/TypeScript configs found.
- No `.github/workflows` CI files found.
- `lefthook.yml` contains only commented template examples.

### Quality posture
- Quality currently depends on manual review + visual checks.
- Postman collection exists for manual external API validation.

**Status:** Confirmed

---

## 16. Current Progress Assessment

### Appears complete
- Sectioned static UI rendering and responsive styling.
- Header navigation interaction system.
- Serverless geocode proxy endpoint implementation.
- API wrappers for key external services.

### Appears partially implemented
- Dynamic data binding from services into UI sections.
- Active location state lifecycle (selection → refresh all sections).
- Countdown/live updates in active runtime.

### TODO/FIXME markers
- No explicit `TODO`/`FIXME` markers found in code scan.

### Mocks/stubs/placeholders
- Multiple renderer/interaction files are explicit placeholders returning `''` or `undefined`.
- `src/js/utils/dom.util.js` and `src/js/utils/time.util.js` are empty files.

### Dead code/deprecated indicators
- Many service/API modules are unreferenced by active bootstrap.
- `ui/components/*` primitives mostly unreferenced placeholders.
- `render-prayer-section.js` exists but app renders daily/weekly directly.

### Technical debt concentrations
- `src/css/sections.css` monolithic size and mixed concerns.
- Feature-claim drift between README and current runtime wiring.

**Status:** Confirmed

---

## 17. Known Issues / Risks / Gaps

### Confirmed from code
1. **Active app path is mostly static rendering**  
   - `src/js/app.js` renders sections directly without invoking service layer.
2. **Ramadan countdown ignores incoming view model data**  
   - `renderRamadanCountdown` does `void viewModel` and uses hardcoded `FIRST_SECTION_STATIC`.
3. **Qibla degree value is computed but visual rotation is not applied**  
   - `render-qibla.js` computes `degree` but only uses it in aria-label/text.
4. **Hardcoded GeoNames username in frontend config**  
   - `src/js/config.js` includes `GEONAMES_USERNAME`, while backend also expects env var.
5. **High count of scaffold/orphan files**  
   - Multiple `return ''` component stubs, empty util files, unused interaction modules.
6. **No automated quality gates**  
   - `npm test` placeholder failure; no lint/typecheck/CI.

### Strongly inferred
1. **Documentation/runtime drift risk**  
   - README claims shipped dynamic behavior; active bootstrap does not currently wire these service flows.
2. **Maintenance risk from CSS centralization**  
   - Very large `sections.css` likely increases regression blast radius.
3. **Future integration risk**  
   - Service layer and UI layer interfaces may diverge further if not wired and tested soon.

### Needs verification
1. Whether production deployment currently uses additional untracked scripts to bind dynamic data.
2. Whether hardcoded client GeoNames username is intentional/public by policy.
3. Actual UX behavior for city change and live prayer updates in deployed environment.
4. End-to-end geocode function health in deployed Vercel project (env/key correctness).

---

## 18. AI Handoff Guidance

### What another AI should read first
1. `src/js/app.js`
2. `src/index.html`
3. `src/js/ui/sections/*.js`
4. `src/js/services/*.js`
5. `api/geocode.js`
6. `README.md`

### Most important files to inspect before changes
- `src/js/app.js`
- `src/js/ui/sections/render-hero-section.js`
- `src/js/ui/widgets/render-ramadan.js`
- `src/js/ui/widgets/render-qibla.js`
- `src/js/services/week.service.js`
- `src/js/api/aladhan.api.js`
- `src/css/sections.css`

### Dangerous areas
- `src/css/sections.css` (large shared style surface)
- Header/nav class contracts between `render-header.js`, `nav.interactions.js`, and mobile CSS
- Any change to `vercel.json` rewrite order (`/api/(.*)` must stay ahead of catch-all)

### Safe entry points for adding features
- Wire service layer incrementally in `app.js` without rewriting all renderers.
- Add dedicated updater functions per section before introducing global state.
- Keep `/api/geocode` contract stable and layer additional backend routes similarly.

### Likely next development steps
1. Connect `services/*` into bootstrap lifecycle (active location + initial fetch).
2. Replace hardcoded section defaults with fetched/normalized models.
3. Implement unified app state object for location + refresh orchestration.
4. Add smoke tests for key flows (bootstrap, geocode route, critical renderers).
5. Split `sections.css` into per-section files to reduce coupling.

### Questions AI should ask human before major changes
1. Is current deployment expected to remain static-first, or should full data-binding be restored now?
2. Should `GEONAMES_USERNAME` remain public client-side or be strictly server-only?
3. Which sections must be considered source-of-truth for location updates?
4. Is preserving current visual fidelity strict, or can markup/CSS be refactored for maintainability?

### Recommended continuation strategy
- Use a phased integration plan:
  1. Add non-breaking section update hooks.
  2. Wire one feature end-to-end (city search + daily prayers).
  3. Add tests around that slice.
  4. Repeat for weekly, qibla, and Ramadan.

---

## 19. Quick Reference

### Key entry points
- Frontend: `src/index.html`, `src/js/app.js`
- Backend: `api/geocode.js`

### Key modules
- Active render orchestration: `src/js/app.js`
- Navigation interactions: `src/js/ui/interactions/nav.interactions.js`
- Domain services: `src/js/services/*`
- API wrappers: `src/js/api/*`

### Important commands
- `npm install`
- `npm run dev`
- `npm run vercel:dev`
- `npm test` (currently fails intentionally)

### Important env vars
- `GEONAMES_USERNAME` (required for serverless geocode)
- `VERCEL_OIDC_TOKEN` (local env key observed; app usage not found)

### Important routes/services
- `GET /api/geocode`
- External: AlAdhan, GeoNames, BigDataCloud

### Database entities
- None (no DB layer)

### Key integrations
- Vercel rewrites
- Bootstrap + Axios CDN runtime dependencies
- Postman API collection for manual API exploration

---

## 20. Appendix: Important File Index

| Path | Role | Importance | Notes |
|---|---|---|---|
| `src/index.html` | Browser entrypoint | Critical | Loads CDN deps and app module |
| `src/js/app.js` | Runtime bootstrap | Critical | Real execution path |
| `src/js/config.js` | Config constants | High | Contains hardcoded GeoNames username |
| `api/geocode.js` | Serverless city endpoint | Critical | Only backend route |
| `vercel.json` | Rewrite routing | Critical | Controls `/api` and static file routing |
| `src/js/api/aladhan.api.js` | External prayer API wrapper | High | Core data integration layer |
| `src/js/api/location.api.js` | BigDataCloud wrapper | Medium | Not wired in active bootstrap |
| `src/js/api/geonames.api.js` | Direct GeoNames wrapper | Medium | Exists but not actively wired |
| `src/js/services/prayer.service.js` | Prayer domain logic | High | Unwired but important for dynamic features |
| `src/js/services/week.service.js` | Weekly calendar + cache | High | Best-developed service logic |
| `src/js/services/qibla.service.js` | Qibla domain logic | Medium | Unwired in active runtime |
| `src/js/services/ramadan.service.js` | Ramadan countdown logic | Medium | Unwired in active runtime |
| `src/js/services/location-search.service.js` | API route caller | High | Intended bridge to `/api/geocode` |
| `src/js/ui/interactions/nav.interactions.js` | Active interaction logic | High | Scroll, active nav, mobile menu, language UI |
| `src/js/ui/widgets/render-ramadan.js` | Ramadan widget renderer | High | Contains static override of input model |
| `src/js/ui/widgets/render-qibla.js` | Qibla widget renderer | High | Degree computed but not visually applied |
| `src/js/ui/sections/render-hero-section.js` | Hero section renderer | High | Exports updater currently unused |
| `src/js/ui/components/*.js` | Primitive component stubs | Medium | Mostly placeholders returning empty strings |
| `src/js/utils/cache.util.js` | localStorage TTL cache | Medium | Used by week service |
| `src/js/utils/validation.util.js` | Param validation | Medium | Shared across API/services |
| `src/js/utils/time.util.js` | Utility placeholder | Low | Empty file |
| `src/js/utils/dom.util.js` | Utility placeholder | Low | Empty file |
| `src/css/themes.css` | Token definitions | High | Color/typography/spacing source |
| `src/css/sections.css` | Section styling monolith | Critical | Largest and most coupled style file |
| `README.md` | Runtime docs | High | Useful but partially drift-prone |
| `package.json` | Scripts/deps | Critical | Defines dev/runtime commands |
| `package-lock.json` | Dependency lock | Medium | Confirms dependency graph |
| `lefthook.yml` | Hook config template | Low | Comment-only example |
| `Postman/AlAdhan API-Mawquta Collection.json` | API reference artifacts | Medium | Manual API endpoint inventory |
| `Sprint 01..03/*.md` | Historical blueprint docs | Medium | Valuable context; some drift from current code |

---

## Final Notes

- This handoff reflects repository state on **April 7, 2026**.
- It intentionally favors traceable findings over idealized architecture.
- Priority for next engineer/AI: close the gap between existing service layer and active runtime bootstrap.

