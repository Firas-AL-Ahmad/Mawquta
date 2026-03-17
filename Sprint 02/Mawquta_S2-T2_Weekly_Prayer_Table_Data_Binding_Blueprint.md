# 📆 Mawquta — S2-T2 Weekly Prayer Table Data Binding Blueprint

## Task ID
`S2-T2 — Weekly Prayer Table Data Binding`

## Purpose
This task introduces the **second functional data-binding step** for the Mawquta page by connecting the already-implemented **weekly prayer table UI** to real runtime prayer data.

The goal is to move the weekly prayer table from:
- static placeholder rows
- to a live, data-backed weekly view

while keeping the task intentionally limited to:
- the weekly prayer table only
- the existing prayer runtime flow only
- careful table/data binding
- minimal architecture-safe adaptation where necessary

This task is about **binding the weekly prayer table UI to real data**.
It is **not** about countdown logic, not about city/location workflow refactor, and not about Qibla/Ramadan integration.

---

# 1) Primary Objective
Connect the already implemented weekly prayer table UI to the current prayer data/runtime flow so that the weekly view begins displaying real information instead of static placeholder rows.

At the end of this task, the project should have:
- the weekly prayer table populated with real week/day prayer data
- table rows derived from actual runtime output rather than hardcoded placeholder rows
- a visually unchanged table structure that now reflects real timing information
- no widening into unrelated integration work

This task is the functional bridge between:
- S2-T1 Prayer section data binding
- and later deeper prayer/runtime refinement tasks

---

# 2) In Scope

## Required work
- Review the current prayer-related runtime flow already present in the codebase
- Identify the existing source already responsible for weekly/day-by-day prayer timing data, if available
- Replace static weekly table placeholder rows with real runtime data binding where already supported by the current architecture
- Bind the weekly prayer table block only
- Preserve semantic table structure and current styling hooks
- Reuse existing runtime/service logic before creating anything new
- Keep all changes as small and architecture-safe as possible

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** begin countdown logic
- Do **not** begin city/location workflow refactor
- Do **not** begin Qibla data binding
- Do **not** begin Ramadan data binding
- Do **not** redesign the weekly table UI
- Do **not** rebuild the prayer service layer unless a very small adaptation is truly necessary
- Do **not** introduce unrelated refactors
- Do **not** add new product features outside the existing weekly table intent
- Do **not** begin full loading/error-state system work unless a tiny safe fallback is required
- Do **not** widen scope into full prayer integration cleanup

This task must remain strictly focused on **weekly prayer table data binding only**.

---

# 4) Expected Functional Scope
This task should bind only what is already naturally supported by the existing runtime flow.

## Likely targets
- weekday/day labels
- date labels/context per row
- prayer times per row:
  - Fajr
  - Sunrise if present in design/runtime
  - Dhuhr
  - Asr
  - Maghrib
  - Isha

## Not yet required unless already trivial and safe
- runtime “today row” logic polish
- interactive row selection
- advanced formatting layers
- countdown linkage
- location picker/state redesign

If a capability is not already clearly ready, do not force it into this task.

---

# 5) Required Files
The exact touched files may vary based on current code reality, but likely candidates include:

## Likely update targets
- `src/js/app.js`
- `src/js/ui/widgets/render-week.js`
- `src/js/ui/sections/render-prayer-section.js`
- existing prayer-related service/runtime files already responsible for week/day data
- a tiny local mapping helper only if truly needed

## Important
Prefer adapting existing runtime flow over creating new architectural layers.

Do not introduce broad structural rewrites unless a blocking issue makes a tiny local refactor necessary.

---

# 6) Architectural Intent
The architecture after this task should still preserve the current clean ownership model:

- `app.js` → bootstrap/orchestration
- prayer-related runtime/service flow → source of truth for weekly prayer data
- `render-prayer-section.js` → section composition
- `render-week.js` → weekly table rendering
- later tasks → countdown, location flow refinement, Qibla binding, Ramadan binding

This task should not blur responsibilities.
It should only connect already-existing weekly logic/data to the already-built table UI.

---

# 7) Recommended Binding Strategy

## Step 1 — Audit existing weekly runtime flow
Before changing UI binding, inspect the current code and determine:
- what weekly/day-by-day prayer data shape already exists
- whether the runtime already exposes a week preview / weekly rows / calendar slice
- what date/day labels are already available or can be composed safely
- what parts of the older runtime are still reusable after the static UI build

## Step 2 — Build a small weekly table view-model
Map the runtime output into a clean table row contract, for example:
- `dayLabel`
- `dateLabel`
- `fajr`
- `sunrise`
- `dhuhr`
- `asr`
- `maghrib`
- `isha`
- optional visual-only `isFeatured` if a safe presentational row highlight already exists or is trivially derived

Keep this mapping very small and local.

## Step 3 — Bind the weekly table renderer
Feed the real mapped rows into `render-week.js` so the table becomes data-backed while preserving:
- the existing semantic table structure
- class names
- RTL readability
- current visual design

## Step 4 — Keep unresolved complexity deferred
If any deeper feature is not yet safely ready (for example:
- determining “today row” from richer logic
- loading/error architecture
- city workflow changes
- countdown linkage
),
defer it to the next tasks instead of forcing it into this one.

---

# 8) Data/Binding Rules

## Reuse before rebuilding
- prefer existing service/runtime outputs
- prefer a tiny row-mapping helper over service rewrites
- prefer adapting renderers over changing architecture

## Truthfulness first
- once this task is complete, the weekly table must no longer imply placeholder data where real runtime data is available
- remove or replace placeholder rows accordingly

## Minimalism first
- bind only what is ready
- do not over-engineer adapters if a straightforward row mapping is enough

## Safety first
- if weekly data is temporarily unavailable, fail gracefully
- avoid crashing the page because one weekly row or one field is missing

---

# 9) UI Expectations After Binding
After this task, the Prayer section should feel:
- visually unchanged in structure
- but more functionally complete
- no longer placeholder-driven in the weekly table
- ready for deeper prayer-specific runtime refinement later

This task is not a redesign task.
It is a binding task.

---

# 10) Markup / Renderer Rules
If renderer updates are needed:
- preserve semantic table markup
- preserve current class naming and styling hooks
- avoid unnecessary markup churn
- keep renderer APIs clean and predictable
- ensure repeated row rendering remains easy to maintain

If `render-week.js` currently assumes placeholder rows, refactor it minimally so it accepts real mapped rows cleanly.

---

# 11) Implementation Notes for Copilot / Agent
When implementing this task:
- start by inspecting the current weekly runtime reality, not assumptions from the static table
- identify what existing week/day prayer logic already exists and what was bypassed during static UI build
- connect real data in the smallest coherent way
- avoid dramatic rewrites
- prefer small targeted edits
- preserve page stability
- stop once the weekly table is genuinely data-backed and the task scope is satisfied

The result should feel like the **weekly prayer surface** has become the next truly live part of the page.

---

# 12) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 13) Definition of Done
S2-T2 is complete only when all of the following are true:

- [ ] the weekly prayer table is no longer driven by placeholder rows where real runtime data is available
- [ ] weekly rows are populated from real prayer/runtime data
- [ ] the semantic table structure remains intact
- [ ] the implementation reuses existing runtime/service logic as much as reasonably possible
- [ ] no countdown logic was introduced
- [ ] no city/location workflow refactor was introduced
- [ ] no Qibla or Ramadan data binding was introduced
- [ ] no broad architectural rewrite was introduced
- [ ] the page remains stable and readable
- [ ] the task scope remained limited to weekly prayer table data binding

---

# 14) Final Instruction
Implement **S2-T2 — Weekly Prayer Table Data Binding** professionally and conservatively.

Use this task to connect the already-built weekly prayer table UI to the existing prayer runtime flow in the cleanest, smallest, most architecture-safe way possible.

Do not overbuild.
Do not widen scope.
Do not rebuild the project around this task.
Bind only what is ready so the weekly prayer table becomes the next truly live part of Mawquta.
