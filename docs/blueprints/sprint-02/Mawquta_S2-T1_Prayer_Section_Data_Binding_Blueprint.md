# 🔗 Mawquta — S2-T1 Prayer Section Data Binding Blueprint

## Task ID
`S2-T1 — Prayer Section Data Binding`

## Purpose
This task introduces the **first real data-binding and functional integration step** for the Mawquta page by connecting the Prayer section UI to the existing prayer-related runtime data flow.

The goal is to move the Prayer section from:
- static placeholder presentation
- to a live, data-backed section

while keeping the task intentionally limited to:
- Prayer section only
- current available prayer data flow only
- careful UI/data binding
- minimal architecture-safe adaptation where necessary

This task is about **binding existing Prayer section UI to real data**.
It is **not** about rebuilding services from scratch, not about Qibla/Ramadan integration, and not about opening all runtime features at once.

---

# 1) Primary Objective
Connect the already implemented Prayer section UI to the current prayer data/runtime flow so that the Prayer section begins displaying real information instead of static placeholders.

At the end of this task, the project should have:
- real location/date context displayed in the Prayer section
- real prayer names/times rendered into the existing UI
- the featured prayer summary card bound to real section data
- the daily prayer cards block populated from real prayer timing data
- the weekly table still deferred unless already trivial and safe to bind without widening scope

This task is the functional bridge between:
- Sprint 01 static UI completion
- and deeper live behavior/integration work in later tasks

---

# 2) In Scope

## Required work
- Review the current prayer-related runtime flow already present in the codebase
- Identify the existing sources responsible for:
  - prayer timings
  - date/context information
  - next-prayer or featured-prayer data if already available
- Replace static placeholder Prayer section values with real data binding where already supported by the current architecture
- Bind the following Prayer section regions to runtime data:
  - location/date meta row
  - featured prayer summary card
  - daily prayer cards block
- Keep render ownership clean:
  - section renderer owns section composition
  - cards renderer owns repeated prayer cards rendering if applicable
- Preserve semantic structure and current static UI architecture
- Keep all changes as small and architecture-safe as possible
- Reuse existing services/runtime logic before creating anything new

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** begin Qibla data binding
- Do **not** begin Ramadan data binding
- Do **not** implement geolocation flow from scratch if already separated into later tasks
- Do **not** rebuild the prayer service layer unless a very small adaptation is truly necessary
- Do **not** fully redesign the Prayer section UI
- Do **not** introduce unrelated refactors
- Do **not** add new product features not already implied by the existing runtime
- Do **not** begin comprehensive error-state design unless needed for safe execution
- Do **not** open responsive work
- Do **not** widen scope into a full “integration phase” mega-task

This task must remain strictly focused on **Prayer section data binding only**.

---

# 4) Expected Functional Scope
This task should bind only what is already naturally supported by the existing runtime flow.

## Likely targets
- city/location label shown in Prayer section
- Hijri/Gregorian/context date label shown in Prayer section
- featured prayer card values
- daily prayer card values

## Not yet required unless already trivial and safe
- weekly table real binding
- countdown behavior
- advanced next-prayer state logic polish
- loading/error state system
- city picker flow refactor

If a capability is not already clearly ready, do not force it into this task.

---

# 5) Required Files
The exact touched files may vary based on current code reality, but likely candidates include:

## Likely update targets
- `src/js/app.js`
- `src/js/ui/sections/render-prayer-section.js`
- `src/js/ui/widgets/render-prayers.js`
- existing prayer-related service/runtime files already responsible for timings/context
- small utility/runtime mapping helpers only if truly needed

## Important
Prefer adapting existing runtime flow over creating new architectural layers.

Do not introduce broad structural rewrites unless a blocking issue makes a tiny local refactor necessary.

---

# 6) Architectural Intent
The architecture after this task should still preserve the current clean ownership model:

- `app.js` → bootstrap/orchestration
- prayer-related runtime/service flow → source of truth for current prayer data
- `render-prayer-section.js` → section composition
- `render-prayers.js` → repeated prayer cards rendering
- later tasks → countdown, week binding, city/location workflow refinement, Qibla/Ramadan binding

This task should not blur responsibilities.
It should only connect already-existing logic to the already-built UI.

---

# 7) Recommended Binding Strategy

## Step 1 — Audit existing prayer runtime flow
Before changing UI binding, inspect the current code and determine:
- what prayer data shape already exists
- what current “next prayer” or featured-prayer information already exists
- what date/location strings are already available or can be composed safely
- what parts of the old runtime are still usable after the static UI refactor

## Step 2 — Bind section-level content first
Bind the section-level top content:
- location
- date/context
- featured prayer card title/time/note as appropriate

## Step 3 — Bind repeated daily prayer cards
Feed real prayer timing data into the daily cards block:
- Fajr
- Sunrise if present in design/runtime
- Dhuhr
- Asr
- Maghrib
- Isha

Map only the prayers that make sense for the current UI and data shape.

## Step 4 — Keep unresolved complexity deferred
If any deeper feature is not yet safely ready (for example:
- countdown timer accuracy
- week preview binding
- loading/error architecture
- city picker integration
),
defer it to the next tasks instead of forcing it into this one.

---

# 8) Data/Binding Rules

## Reuse before rebuilding
- prefer existing service/runtime outputs
- prefer small mapping helpers over service rewrites
- prefer adapting renderers over changing architecture

## Truthfulness first
- once this task is complete, the Prayer section must no longer imply static placeholders where real data is now available
- remove or update placeholder copy where it becomes misleading

## Minimalism first
- bind only what is ready
- do not over-engineer adapters if a straightforward mapping is enough

## Safety first
- if a required piece of data is temporarily unavailable, fail gracefully
- avoid crashing the page due to one missing binding field

---

# 9) UI Expectations After Binding
After this task, the Prayer section should feel:
- visually unchanged in structure
- but functionally more real
- no longer obviously placeholder-driven
- ready for deeper prayer-specific refinement in later tasks

The visual design should remain stable.
This task is not a redesign task.

---

# 10) Markup / Renderer Rules
If renderer updates are needed:
- preserve semantic structure
- preserve current class naming and styling hooks
- avoid unnecessary markup churn
- keep renderer APIs clean and predictable
- ensure repeated prayer card rendering remains easy to maintain

If a renderer currently assumes placeholder data, refactor it minimally so it accepts real mapped data cleanly.

---

# 11) Implementation Notes for Copilot / Agent
When implementing this task:
- start by inspecting the current runtime reality, not assumptions from older markup
- identify what existing prayer logic still works and what was temporarily bypassed during static UI build
- connect real data in the smallest coherent way
- avoid dramatic rewrites
- prefer small targeted edits
- preserve page stability
- stop once the Prayer section is genuinely data-backed and the task scope is satisfied

The result should feel like the **first true functional section** of the page.

---

# 12) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 13) Definition of Done
S2-T1 is complete only when all of the following are true:

- [ ] the Prayer section is no longer driven by placeholder content where real runtime data is available
- [ ] location/date context in the Prayer section is bound to real data
- [ ] the featured prayer summary card is bound to real data
- [ ] the daily prayer cards are populated from real prayer timing data
- [ ] the implementation reuses existing runtime/service logic as much as reasonably possible
- [ ] no Qibla or Ramadan data binding was introduced
- [ ] no broad architectural rewrite was introduced
- [ ] the page remains stable and readable
- [ ] the task scope remained limited to Prayer section data binding

---

# 14) Final Instruction
Implement **S2-T1 — Prayer Section Data Binding** professionally and conservatively.

Use this task to connect the already-built Prayer section UI to the existing prayer runtime flow in the cleanest, smallest, most architecture-safe way possible.

Do not overbuild.
Do not widen scope.
Do not rebuild the project around this task.
Bind only what is ready so the Prayer section becomes the first truly live part of Mawquta.
