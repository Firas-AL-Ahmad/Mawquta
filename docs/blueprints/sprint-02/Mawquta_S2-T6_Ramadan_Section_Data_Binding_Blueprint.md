# 🌙 Mawquta — S2-T6 Ramadan Section Data Binding Blueprint

## Task ID
`S2-T6 — Ramadan Section Data Binding`

## Purpose
This task introduces the **Ramadan data-binding step** for the Mawquta page by connecting the already-implemented static Ramadan section UI to the current active-location runtime flow.

The goal is to move the Ramadan section from:
- static placeholder presentation
- to a real, location-driven and date-aware section

while keeping the task intentionally limited to:
- Ramadan section only
- existing active-location/runtime flow only
- careful UI/data binding
- minimal architecture-safe adaptation where necessary

This task is about **binding the Ramadan section UI to real data**.
It is **not** about redesigning the Ramadan UI from scratch, not about building a large Ramadan feature system, and not about widening scope into full app states or unrelated sections.

---

# 1) Primary Objective
Connect the already implemented Ramadan section UI to the current active-location/runtime flow so that the Ramadan section begins displaying real information instead of static placeholders.

At the end of this task, the project should have:
- real Ramadan day information rendered into the existing Ramadan UI
- real imsak and iftar values rendered into the existing Ramadan summary surface
- Ramadan data driven by the same active location source already established in S2-T4
- the Ramadan summary card reflecting true runtime information
- no widening into unrelated integration work

This task is the functional bridge between:
- active Prayer/Qibla/location flow
- and a genuinely location-aware Ramadan section

---

# 2) In Scope

## Required work
- Review the current Ramadan-related runtime flow already present in the codebase
- Identify the existing source already responsible for:
  - Ramadan day information
  - imsak and iftar timing information
  - location/date input shape currently expected by the Ramadan logic
- Replace static placeholder Ramadan values with real data binding where already supported by the current architecture
- Bind the following Ramadan section regions to runtime data:
  - Ramadan day value
  - imsak value
  - iftar value
  - supporting note/content where needed
- Reuse the active location source established in S2-T4 instead of creating a separate location path
- Keep render ownership clean:
  - `app.js` handles orchestration and location-driven refresh lifecycle
  - Ramadan renderer remains responsible for presentation
- Preserve semantic structure and current static UI architecture
- Keep all changes as small and architecture-safe as possible
- Reuse existing services/runtime logic before creating anything new

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** redesign the Ramadan section UI
- Do **not** build a full Ramadan timetable/table feature unless it is already part of the current UI and trivially safe
- Do **not** add advanced Ramadan countdown behavior unless already clearly supported and trivially safe
- Do **not** add a new global location/state system
- Do **not** refactor the active-location architecture established in S2-T4 unless a very small adaptation is truly necessary
- Do **not** introduce unrelated refactors
- Do **not** add new product features outside the existing Ramadan section intent
- Do **not** open full loading/error-state architecture work unless a tiny safe fallback is required
- Do **not** widen scope into a full “Ramadan feature phase”

This task must remain strictly focused on **Ramadan section data binding only**.

---

# 4) Expected Functional Scope
This task should bind only what is naturally supported by the existing runtime flow.

## Likely targets
- Ramadan day text/value
- imsak value
- iftar value
- supporting summary note/content where needed

## Not yet required unless already trivial and safe
- advanced Ramadan countdown
- full Ramadan table/timetable expansion
- conditional section visibility redesign
- richer current-day logic polish beyond what is already easily available
- app-wide Ramadan state management

If a capability is not already clearly ready, do not force it into this task.

---

# 5) Required Files
The exact touched files may vary based on current code reality, but likely candidates include:

## Likely update targets
- `src/js/app.js`
- `src/js/ui/sections/render-ramadan-section.js`
- existing Ramadan-related service/runtime files already responsible for Ramadan day / imsak / iftar data
- tiny local mapping/helper functions only if truly needed

## Important
Prefer adapting existing runtime flow over creating new architectural layers.

Do not introduce broad structural rewrites unless a blocking issue makes a tiny local refactor necessary.

---

# 6) Architectural Intent
The architecture after this task should still preserve the current clean ownership model:

- `app.js` → orchestration, active-location-driven runtime refresh
- existing Ramadan service/runtime flow → source of truth for Ramadan data
- `render-ramadan-section.js` → section presentation
- later tasks → broader app states, polish, or deeper enhancements if needed

This task should not blur responsibilities.
It should only connect already-existing Ramadan logic to the already-built UI.

---

# 7) Recommended Binding Strategy

## Step 1 — Audit existing Ramadan runtime flow
Before changing UI binding, inspect the current code and determine:
- where Ramadan day / imsak / iftar currently come from
- what service or utility already computes or fetches them
- what location shape it expects
- whether date context is already provided in a usable way
- what old Ramadan logic was bypassed during static UI build

## Step 2 — Reuse active location from S2-T4
Do not create a new Ramadan-specific location path.
Use the active location source already established for Prayer in S2-T4, adapting only as much as necessary to satisfy the Ramadan runtime input shape.

## Step 3 — Build a small Ramadan view-model
Map the runtime output into a clean section contract, for example:
- `dayText`
- `imsakText`
- `iftarText`
- `note`

Keep this mapping very small and local.

## Step 4 — Bind the Ramadan renderer
Feed the real mapped Ramadan data into `render-ramadan-section.js` so the section becomes data-backed while preserving:
- the existing semantic structure
- class names
- RTL readability
- current visual design

## Step 5 — Keep unresolved complexity deferred
If any deeper feature is not yet safely ready (for example:
- advanced countdown
- timetable expansion
- richer visibility/state logic
- broader Ramadan UX flow
),
defer it to later tasks instead of forcing it into this one.

---

# 8) Data/Binding Rules

## Reuse before rebuilding
- prefer existing Ramadan service/runtime outputs
- prefer a tiny local mapping helper over service rewrites
- prefer adapting renderers over changing architecture

## Truthfulness first
- once this task is complete, the Ramadan section must no longer imply placeholder Ramadan day/imsak/iftar data where real runtime data is available
- remove or replace placeholder-only text accordingly

## Minimalism first
- bind only what is ready
- do not over-engineer Ramadan abstractions if a simple summary binding is enough

## Safety first
- if Ramadan data is temporarily unavailable, fail gracefully
- avoid crashing the page because one Ramadan field is missing
- keep the section stable and readable even if real data is partially unavailable

---

# 9) UI Expectations After Binding
After this task, the Ramadan section should feel:
- visually almost unchanged in structure
- but more truthful and functional
- no longer obviously placeholder-driven
- ready for later enhancement without requiring structural rebuild

This task is not a redesign task.
It is a binding task.

---

# 10) Markup / Renderer Rules
If renderer updates are needed:
- preserve semantic structure
- preserve current class naming and styling hooks
- avoid unnecessary markup churn
- keep renderer APIs clean and predictable

If the current Ramadan UI can only safely bind text values, bind those and stop there.
Do not turn this task into a full Ramadan experience redesign.

---

# 11) Implementation Notes for Copilot / Agent
When implementing this task:
- start by inspecting the real Ramadan runtime reality, not assumptions from the static UI
- identify what existing Ramadan logic still works and what was temporarily bypassed during static UI build
- connect real data in the smallest coherent way
- avoid dramatic rewrites
- prefer small targeted edits
- preserve page stability
- stop once the Ramadan section is genuinely data-backed and the task scope is satisfied

The result should feel like the **Ramadan section has become the next truly live part of the page**, without the codebase becoming messy.

---

# 12) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 13) Definition of Done
S2-T6 is complete only when all of the following are true:

- [ ] the Ramadan section is no longer driven by placeholder data where real runtime data is available
- [ ] Ramadan day is bound to real data from the existing runtime flow
- [ ] imsak and iftar values are bound to real data from the existing runtime flow
- [ ] the implementation reuses the active-location source established in S2-T4
- [ ] the renderer/UI remains stable, readable, and structurally intact
- [ ] no broad architectural rewrite was introduced
- [ ] the page remains stable and readable
- [ ] the task scope remained limited to Ramadan section data binding

---

# 14) Final Instruction
Implement **S2-T6 — Ramadan Section Data Binding** professionally and conservatively.

Use this task to connect the already-built Ramadan section UI to the existing active-location and Ramadan runtime flow in the cleanest, smallest, most architecture-safe way possible.

Do not overbuild.
Do not widen scope.
Do not rebuild the project around this task.
Bind only what is ready so the Ramadan section becomes meaningfully driven by real location-based/runtime data instead of static placeholder values.
