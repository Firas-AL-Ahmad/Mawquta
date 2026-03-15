# Mawquta — Sprint 01 / Task 01
## File Structure Blueprint

### Goal
Establish a clean, scalable, section-first structure for implementing the approved UI while preserving the existing architecture:
- API
- Services
- UI
- Utils

This task does **not** include data integration yet.

---

## Approved Top-Level Structure

```text
.
├─ api/
│  └─ geocode.js
├─ src/
│  ├─ index.html
│  ├─ assets/
│  │  ├─ icons/
│  │  ├─ patterns/
│  │  ├─ illustrations/
│  │  ├─ images/
│  │  └─ lottie/
│  ├─ css/
│  │  ├─ themes.css
│  │  ├─ base.css
│  │  ├─ layout.css
│  │  ├─ components.css
│  │  ├─ sections.css
│  │  ├─ utilities.css
│  │  └─ main.css
│  └─ js/
│     ├─ app.js
│     ├─ config.js
│     ├─ api/
│     ├─ services/
│     ├─ ui/
│     │  ├─ layout/
│     │  │  ├─ render-app-shell.js
│     │  │  ├─ render-header.js
│     │  │  ├─ render-footer.js
│     │  │  └─ render-navigation.js
│     │  ├─ sections/
│     │  │  ├─ render-prayer-section.js
│     │  │  ├─ render-qibla-section.js
│     │  │  ├─ render-ramadan-section.js
│     │  │  └─ render-location-modal.js
│     │  ├─ widgets/
│     │  │  ├─ render-prayers.js
│     │  │  ├─ render-countdown.js
│     │  │  ├─ render-week.js
│     │  │  ├─ render-qibla.js
│     │  │  ├─ render-ramadan.js
│     │  │  └─ render-city-suggestions.js
│     │  ├─ components/
│     │  │  ├─ render-section-heading.js
│     │  │  ├─ render-card.js
│     │  │  ├─ render-chip.js
│     │  │  ├─ render-meta-row.js
│     │  │  ├─ render-button.js
│     │  │  ├─ render-table-shell.js
│     │  │  ├─ render-loading-state.js
│     │  │  ├─ render-error-state.js
│     │  │  └─ render-empty-state.js
│     │  └─ interactions/
│     │     ├─ nav.interactions.js
│     │     ├─ modal.interactions.js
│     │     └─ section.interactions.js
│     ├─ utils/
│     └─ state/
│        └─ legacy/
│           └─ app.state.js
├─ Postman/
├─ vercel.json
├─ package.json
└─ README.md
```

---

## Migration Map

### Keep as-is
- `api/geocode.js`
- `src/index.html`
- `src/js/app.js`
- `src/js/config.js`
- `src/js/api/*`
- `src/js/services/*`
- `src/js/utils/*`
- `vercel.json`
- `package.json`

### Reclassify inside UI
- Existing feature renderers move under `src/js/ui/widgets/`
- New page-level composition files go under `src/js/ui/layout/` and `src/js/ui/sections/`
- Reusable visual building blocks go under `src/js/ui/components/`
- DOM-only behavior goes under `src/js/ui/interactions/`

### Reclassify state
- Move `src/js/state/app.state.js` to `src/js/state/legacy/app.state.js`
- Do **not** wire it back into runtime during Sprint 01

### Expand CSS
- Keep `themes.css`
- Split current styling into:
  - `base.css`
  - `layout.css`
  - `components.css`
  - `sections.css`
  - `utilities.css`
  - `main.css` as entry aggregator

### Expand assets
- Icons to `assets/icons/`
- Decorative ornaments/patterns to `assets/patterns/`
- Any hero/section illustrations to `assets/illustrations/`
- Generic images to `assets/images/`
- Lottie files to `assets/lottie/`

---

## File Responsibilities

### `src/index.html`
Minimal app root only.
No heavy static section markup.

### `src/js/app.js`
Bootstraps the app, mounts page shell, binds high-level interactions, later coordinates integration.

### `src/js/ui/layout/*`
Owns page-level structure:
- app shell
- header
- footer
- global navigation

### `src/js/ui/sections/*`
Owns major content sections:
- prayer times
- qibla
- ramadan
- location modal shell

### `src/js/ui/widgets/*`
Owns feature-level UI renderers already present in the project.
These will later plug real data into section shells.

### `src/js/ui/components/*`
Owns reusable visual subparts:
- headings
- cards
- chips
- meta rows
- buttons
- table shells
- loading/error/empty blocks

### `src/js/ui/interactions/*`
Owns DOM event behavior not tied to fetching data:
- nav toggles
- modal open/close
- local visual interactions

---

## Naming Rules

- Use `render-*` for pure UI rendering modules.
- Use `*.interactions.js` for DOM behavior wiring.
- Use kebab-case for filenames.
- Use section-first naming when the file owns a full section.
- Keep services untouched unless integration later forces a small adapter change.

---

## Completion Criteria for S1-T1

Task S1-T1 is considered complete when:
1. The target folder structure is approved.
2. The migration map is fixed.
3. Responsibilities for each folder are explicit.
4. No runtime integration changes are introduced yet.
5. The next task can start immediately: `S1-T2 — App Shell setup`.

---

## Important Constraints

- Vanilla architecture stays intact.
- No framework migration.
- No data integration in this task.
- No revival of `AppState`.
- No premature refactor of service logic.
