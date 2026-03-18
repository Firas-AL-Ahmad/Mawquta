# 🧭 Mawquta — S2-T5 Qibla Section Data Binding Blueprint

## Task ID
`S2-T5 — Qibla Section Data Binding`

## Purpose
This task introduces the **Qibla data-binding step** for the Mawquta page by connecting the already-implemented static Qibla section UI to the current active-location runtime flow.

The goal is to move the Qibla section from:
- static placeholder presentation
- to a real, location-driven section

while keeping the task intentionally limited to:
- Qibla section only
- existing active-location/runtime flow only
- careful UI/data binding
- minimal architecture-safe adaptation where necessary

This task is about **binding the Qibla section UI to real data**.
It is **not** about Ramadan binding, not about redesigning the Qibla UI from scratch, and not about building device-orientation/interactive compass behavior if that is not already safely ready.

---

# 1) Primary Objective
Connect the already implemented Qibla section UI to the current active-location/runtime flow so that the Qibla section begins displaying real information instead of static placeholders.

At the end of this task, the project should have:
- real Qibla degree information rendered into the existing Qibla UI
- Qibla data driven by the same active location source already established in S2-T4
- the main Qibla card reflecting true runtime information
- no widening into unrelated integration work

This task is the functional bridge between:
- active Prayer/location flow
- and a genuinely location-aware Qibla section

---

# 2) In Scope

## Required work
- Review the current Qibla-related runtime flow already present in the codebase
- Identify the existing source already responsible for:
  - Qibla degree calculation or retrieval
  - location input shape currently expected by the Qibla logic
- Replace static placeholder Qibla values with real data binding where already supported by the current architecture
- Bind the following Qibla section regions to runtime data:
  - degree value
  - supporting note/content where needed
  - visual Qibla surface state if the existing UI supports simple presentational alignment
- Reuse the active location source established in S2-T4 instead of creating a separate location path
- Keep render ownership clean:
  - `app.js` handles orchestration and location-driven refresh lifecycle
  - Qibla renderer remains responsible for presentation
- Preserve semantic structure and current static UI architecture
- Keep all changes as small and architecture-safe as possible
- Reuse existing services/runtime logic before creating anything new

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** begin Ramadan data binding
- Do **not** redesign the Qibla section UI
- Do **not** build interactive compass/device-orientation behavior unless such support already exists and is trivially safe
- Do **not** add a new global location/state system
- Do **not** refactor the active-location architecture established in S2-T4 unless a very small adaptation is truly necessary
- Do **not** introduce unrelated refactors
- Do **not** add new product features outside the existing Qibla section intent
- Do **not** open full loading/error-state architecture work unless a tiny safe fallback is required
- Do **not** widen scope into a full “Qibla feature phase”

This task must remain strictly focused on **Qibla section data binding only**.

---

# 4) Expected Functional Scope
This task should bind only what is naturally supported by the existing runtime flow.

## Likely targets
- Qibla degree value
- Qibla summary note/content
- presentational compass/needle alignment only if the current UI already supports a simple visual transform safely

## Not yet required unless already trivial and safe
- device orientation events
- live compass interaction
- animated calibration flows
- advanced fallback states
- Ramadan dependencies

If a capability is not already clearly ready, do not force it into this task.

---

# 5) Required Files
The exact touched files may vary based on current code reality, but likely candidates include:

## Likely update targets
- `src/js/app.js`
- `src/js/ui/sections/render-qibla-section.js`
- existing Qibla-related service/runtime files already responsible for degree calculation
- tiny local mapping/helper functions only if truly needed

## Important
Prefer adapting existing runtime flow over creating new architectural layers.

Do not introduce broad structural rewrites unless a blocking issue makes a tiny local refactor necessary.

---

# 6) Architectural Intent
The architecture after this task should still preserve the current clean ownership model:

- `app.js` → orchestration, active-location-driven runtime refresh
- existing Qibla service/runtime flow → source of truth for Qibla data
- `render-qibla-section.js` → section presentation
- later tasks → Ramadan binding, app states, deeper enhancements if needed

This task should not blur responsibilities.
It should only connect already-existing Qibla logic to the already-built UI.

---

# 7) Recommended Binding Strategy

## Step 1 — Audit existing Qibla runtime flow
Before changing UI binding, inspect the current code and determine:
- where Qibla degree currently comes from
- what service or utility already computes or fetches it
- what location shape it expects
- what old Qibla logic was bypassed during static UI build

## Step 2 — Reuse active location from S2-T4
Do not create a new Qibla-specific location path.
Use the active location source already established for Prayer in S2-T4, adapting only as much as necessary to satisfy the Qibla runtime input shape.

## Step 3 — Build a small Qibla view-model
Map the runtime output into a clean section contract, for example:
- `degree`
- `note`
- optional `needleRotation` or equivalent presentational value if the UI safely supports it

Keep this mapping very small and local.

## Step 4 — Bind the Qibla renderer
Feed the real mapped Qibla data into `render-qibla-section.js` so the section becomes data-backed while preserving:
- the existing semantic structure
- class names
- RTL readability
- current visual design

## Step 5 — Keep unresolved complexity deferred
If any deeper feature is not yet safely ready (for example:
- device orientation
- live compass interactivity
- richer fallback states
- Ramadan/location cross-coupling
),
defer it to later tasks instead of forcing it into this one.

---

# 8) Data/Binding Rules

## Reuse before rebuilding
- prefer existing Qibla service/runtime outputs
- prefer a tiny local mapping helper over service rewrites
- prefer adapting renderers over changing architecture

## Truthfulness first
- once this task is complete, the Qibla section must no longer imply placeholder degree data where real runtime data is available
- remove or replace placeholder-only text accordingly

## Minimalism first
- bind only what is ready
- do not over-engineer compass abstractions if a simple degree-based UI binding is enough

## Safety first
- if Qibla data is temporarily unavailable, fail gracefully
- avoid crashing the page because one Qibla field is missing
- keep the section stable and readable even if real data is partially unavailable

---

# 9) UI Expectations After Binding
After this task, the Qibla section should feel:
- visually almost unchanged in structure
- but more truthful and functional
- no longer obviously placeholder-driven
- ready for any later enhancement without requiring structural rebuild

This task is not a redesign task.
It is a binding task.

---

# 10) Markup / Renderer Rules
If renderer updates are needed:
- preserve semantic structure
- preserve current class naming and styling hooks
- avoid unnecessary markup churn
- keep renderer APIs clean and predictable

If the UI already has a visual compass surface and a simple transform-based alignment is safe, bind it minimally.
If not, bind the degree text first and stop there.

Do not turn this task into a full compass-interaction implementation.

---

# 11) Implementation Notes for Copilot / Agent
When implementing this task:
- start by inspecting the real Qibla runtime reality, not assumptions from the static UI
- identify what existing Qibla logic still works and what was temporarily bypassed during static UI build
- connect real data in the smallest coherent way
- avoid dramatic rewrites
- prefer small targeted edits
- preserve page stability
- stop once the Qibla section is genuinely data-backed and the task scope is satisfied

The result should feel like the **Qibla section has become the next truly live part of the page**, without the codebase becoming messy.

---

# 12) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 13) Definition of Done
S2-T5 is complete only when all of the following are true:

- [ ] the Qibla section is no longer driven by placeholder data where real runtime data is available
- [ ] Qibla degree is bound to real data from the existing runtime flow
- [ ] the implementation reuses the active-location source established in S2-T4
- [ ] the renderer/UI remains stable, readable, and structurally intact
- [ ] no Ramadan data binding was introduced
- [ ] no broad architectural rewrite was introduced
- [ ] the page remains stable and readable
- [ ] the task scope remained limited to Qibla section data binding

---

# 14) Final Instruction
Implement **S2-T5 — Qibla Section Data Binding** professionally and conservatively.

Use this task to connect the already-built Qibla section UI to the existing active-location and Qibla runtime flow in the cleanest, smallest, most architecture-safe way possible.

Do not overbuild.
Do not widen scope.
Do not rebuild the project around this task.
Bind only what is ready so the Qibla section becomes meaningfully driven by real location-based data instead of static placeholder values.
