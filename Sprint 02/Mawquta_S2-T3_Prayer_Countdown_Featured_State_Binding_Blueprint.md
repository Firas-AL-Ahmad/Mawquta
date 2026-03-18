# ⏳ Mawquta — S2-T3 Prayer Countdown & Featured State Live Binding Blueprint

## Task ID
`S2-T3 — Prayer Countdown & Featured State Live Binding`

## Purpose
This task introduces the **live countdown and featured prayer state binding** for the Mawquta Prayer section.

The goal is to evolve the Prayer section from:
- data-backed but still partially static in temporal behavior
- to a live, time-aware section that reflects the current upcoming prayer more truthfully

while keeping the task intentionally limited to:
- the featured prayer state
- countdown/live timing behavior related to the Prayer section only
- small architecture-safe orchestration updates where necessary
- no widening into unrelated integrations

This task is about **making the featured prayer summary truly live**.
It is **not** about Qibla/Ramadan, not about city workflow refactor, and not about a full app-wide real-time state system.

---

# 1) Primary Objective
Bind the Prayer section’s featured summary card and related state to live countdown behavior so the section reflects:
- the current upcoming prayer
- the remaining time until it
- its visual featured state in a truthful way

At the end of this task, the project should have:
- a live countdown shown in the featured prayer summary area
- featured prayer data that stays synchronized with the current runtime prayer state
- daily prayer cards still aligned with the featured state where appropriate
- no misleading static countdown placeholder remaining in the live Prayer section

This task is the functional bridge between:
- data-backed prayer content
- and a truly time-aware Prayer section experience

---

# 2) In Scope

## Required work
- Review the current prayer runtime flow already present in the codebase
- Identify the existing runtime source already responsible for:
  - next prayer information
  - countdown or time-until-next-prayer information, if available
  - time-based prayer state refresh behavior, if any
- Replace any remaining static countdown/featured placeholder behavior with live runtime-driven behavior
- Bind the following Prayer section behavior to runtime state:
  - featured prayer title/name
  - featured prayer time
  - countdown text/value
  - featured visual emphasis where applicable
- Keep render ownership clean:
  - `app.js` handles orchestration/timing lifecycle if needed
  - Prayer section renderer owns section composition
  - prayer cards renderer owns repeated card rendering
- Keep all changes as small and architecture-safe as possible
- Reuse existing runtime/service logic before creating anything new

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** begin Qibla live binding
- Do **not** begin Ramadan live binding
- Do **not** refactor city/location workflow
- Do **not** redesign the Prayer section UI
- Do **not** rebuild the prayer service layer unless a very small adaptation is truly necessary
- Do **not** introduce unrelated refactors
- Do **not** implement a global app-wide timer/state architecture
- Do **not** redesign loading/error systems
- Do **not** open responsive work
- Do **not** widen scope into full app live-state management

This task must remain strictly focused on **Prayer countdown and featured state live binding only**.

---

# 4) Expected Functional Scope
This task should bind only what is naturally needed to make the Prayer section time-aware.

## Likely targets
- featured prayer card title
- featured prayer time
- countdown note/value
- featured card highlighting
- optional featured prayer highlighting inside daily prayer cards if already visually present and safe

## Not yet required unless already trivial and safe
- app-wide ticking system abstraction
- advanced expired-countdown animations
- secondary status labels beyond what already fits the UI
- Qibla or Ramadan timers
- advanced visibility state changes

If a capability is not already clearly ready, do not force it into this task.

---

# 5) Required Files
The exact touched files may vary based on current code reality, but likely candidates include:

## Likely update targets
- `src/js/app.js`
- `src/js/ui/sections/render-prayer-section.js`
- `src/js/ui/widgets/render-prayers.js`
- existing prayer-related runtime/service files already responsible for next-prayer/countdown information
- a tiny local timing/helper function only if truly needed

## Important
Prefer adapting existing runtime flow over creating new architectural layers.

Do not introduce broad structural rewrites unless a blocking issue makes a tiny local refactor necessary.

---

# 6) Architectural Intent
The architecture after this task should still preserve the current clean ownership model:

- `app.js` → bootstrap/orchestration + small timing lifecycle if necessary
- prayer-related runtime/service flow → source of truth for next-prayer/countdown data
- `render-prayer-section.js` → section composition
- `render-prayers.js` → repeated prayer cards rendering
- later tasks → city flow refinement, Qibla binding, Ramadan binding, app states

This task should not blur responsibilities.
It should only connect already-existing runtime timing/state to the already-built Prayer UI.

---

# 7) Recommended Binding Strategy

## Step 1 — Audit existing next-prayer/countdown runtime
Before changing UI behavior, inspect the current code and determine:
- what next-prayer information already exists
- whether countdown/time-until-next-prayer is already computed somewhere
- whether any old timer/update loop exists from before the static UI refactor
- what can be safely reused without reviving old DOM assumptions

## Step 2 — Build/confirm a small Prayer live state contract
Keep the Prayer section contract clean and explicit, for example:
- `meta`
- `featured`
  - `key`
  - `name`
  - `time`
  - `countdownText`
- `dailyPrayers`
- `weeklyRows` (already existing from S2-T2, passed through unchanged here)

Use existing runtime outputs as much as possible.

## Step 3 — Bind the featured prayer UI
Connect the featured prayer card so it reflects runtime state:
- prayer name
- prayer time
- countdown text/value

Remove or replace any placeholder copy that would become misleading once live data is active.

## Step 4 — Keep card highlighting aligned
If the current UI supports a visual featured prayer card among the daily prayer cards:
- keep highlighting tied to the current featured prayer key
- keep it lightweight and purely UI-facing
- do not invent complex state rules

## Step 5 — Add minimal live refresh lifecycle if needed
If countdown/featured state requires ticking:
- implement the smallest safe interval/update lifecycle necessary
- keep it local and easy to reason about
- ensure stale intervals are not created repeatedly
- avoid introducing a large reactive system

---

# 8) Data/Binding Rules

## Reuse before rebuilding
- prefer existing service/runtime outputs
- prefer tiny local helpers over service rewrites
- prefer adapting renderers over changing architecture

## Truthfulness first
- once this task is complete, the featured Prayer section must no longer imply a static countdown or static upcoming prayer if runtime data is available
- remove or update placeholder copy where it becomes misleading

## Minimalism first
- bind only what is needed for truthful live featured state
- do not over-engineer timing abstractions if a simple interval/update path is enough

## Safety first
- if countdown data is temporarily unavailable, fail gracefully
- avoid crashing the page because one timing field is missing
- keep the page stable even if live refresh falls back to a safe static snapshot

---

# 9) UI Expectations After Binding
After this task, the Prayer section should feel:
- visually almost unchanged in structure
- but noticeably more alive
- no longer static in the featured summary area
- more trustworthy as the main functional section of the page

This task is not a redesign task.
It is a live-state binding task.

---

# 10) Markup / Renderer Rules
If renderer updates are needed:
- preserve semantic structure
- preserve current class naming and styling hooks
- avoid unnecessary markup churn
- keep renderer APIs clean and predictable
- ensure repeated prayer card rendering remains easy to maintain

If `render-prayer-section.js` currently assumes fixed featured text, refactor it minimally so it accepts live featured data cleanly.

If `render-prayers.js` already accepts featured key or prayer-state information, adapt it minimally rather than redesigning it.

---

# 11) Timing Lifecycle Rules
If a live countdown/update loop is necessary:
- keep it small and local
- initialize it once in a controlled way
- avoid duplicate intervals on repeated render paths
- ensure interval cleanup or reset is handled sanely if re-render occurs
- prefer clarity over cleverness

This is not the place to invent a generalized state/timer engine.

---

# 12) Implementation Notes for Copilot / Agent
When implementing this task:
- start by inspecting the real next-prayer/countdown runtime path, not assumptions from the static UI
- identify what old timing logic still exists and what was bypassed during static UI build
- reconnect live state in the smallest coherent way
- avoid dramatic rewrites
- prefer small targeted edits
- preserve page stability
- stop once the featured prayer area is genuinely live and the task scope is satisfied

The result should feel like the **Prayer section has become truly alive**, without the codebase becoming messy.

---

# 13) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 14) Definition of Done
S2-T3 is complete only when all of the following are true:

- [ ] the featured Prayer summary card is no longer driven by static countdown/placeholder state where runtime data is available
- [ ] featured prayer name and time are bound to live runtime state
- [ ] countdown text/value is live and truthful
- [ ] daily prayer card highlighting remains aligned with the featured prayer state where applicable
- [ ] the implementation reuses existing runtime/service logic as much as reasonably possible
- [ ] no Qibla or Ramadan live binding was introduced
- [ ] no broad architectural rewrite was introduced
- [ ] the page remains stable and readable
- [ ] the task scope remained limited to Prayer countdown and featured state live binding

---

# 15) Final Instruction
Implement **S2-T3 — Prayer Countdown & Featured State Live Binding** professionally and conservatively.

Use this task to connect the already-built Prayer section featured summary and related state to the existing prayer runtime flow in the cleanest, smallest, most architecture-safe way possible.

Do not overbuild.
Do not widen scope.
Do not rebuild the project around this task.
Bind only what is ready so the Prayer section becomes the first truly live, time-aware part of Mawquta.
