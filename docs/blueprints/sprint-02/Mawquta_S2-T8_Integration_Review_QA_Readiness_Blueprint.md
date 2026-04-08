# ✅ Mawquta — S2-T8 Integration Review, QA & Readiness Blueprint

## Task ID
`S2-T8 — Integration Review, QA & Readiness`

## Purpose
This task introduces the **integration review, quality assurance, and readiness pass** for Mawquta after the core sections and runtime flows have already been connected to real data.

The goal is to verify that the current app behaves coherently as a whole, and to fix any small integration issues that may remain across:
- bootstrap flow
- location changes
- Prayer refresh and countdown
- Qibla refresh
- Ramadan refresh
- section fallbacks and resilience behavior

This task must remain intentionally limited to:
- integration review
- small QA-oriented fixes
- readiness confirmation
- small stability/consistency corrections

This task is about **integration quality and readiness only**.
It is **not** about introducing new features, redesigning the app, or opening a new architecture phase.

---

# 1) Primary Objective
Perform a final integration and QA pass across the currently implemented Mawquta runtime so the app can be considered functionally coherent, stable, and ready for the next phase.

At the end of this task, the project should have:
- coherent cross-section behavior
- consistent active-location-driven refresh behavior
- stable countdown/update lifecycle
- no obvious integration regressions between sections
- a cleaner readiness baseline for whatever comes next

This task is the quality bridge between:
- a connected runtime app
- and a more production-ready project baseline

---

# 2) In Scope

## Required work
- Review the full app flow holistically, including:
  - bootstrap
  - initial active-location resolution
  - Prayer refresh path
  - Prayer countdown/live featured updates
  - weekly table updates
  - Qibla refresh path
  - Ramadan refresh path
  - location change behavior
  - fallback/resilience states
- Identify and fix small integration issues such as:
  - stale intervals
  - duplicate refreshes
  - state mismatch between sections
  - incorrect label updates
  - missing fallback transitions
  - race-condition edge cases
  - re-render drift or stale state after location changes
  - UI text/state inconsistency between sections
- Keep fixes small, targeted, and architecture-safe
- Preserve current section ownership and app structure
- Confirm the app is internally coherent before moving on

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** introduce new user-facing features
- Do **not** redesign any section
- Do **not** create a new global state system
- Do **not** widen into analytics/logging infrastructure
- Do **not** redesign location flow UX
- Do **not** open large responsive work
- Do **not** perform broad refactors disguised as QA
- Do **not** start a deployment pipeline phase
- Do **not** turn this into a full end-to-end automated testing project

This task must remain strictly focused on **integration review, QA, and readiness** for the existing app.

---

# 4) Expected Review Scope

## Bootstrap & Initial Load
Review:
- app shell + section render order
- initial active-location resolution
- first successful runtime render
- loading-first states on first load
- graceful section independence when one runtime path fails

## Prayer Flow
Review:
- location-driven refresh
- featured prayer state consistency
- countdown lifecycle and rollover safety
- daily cards highlighting consistency
- weekly table alignment with current active location

## Qibla Flow
Review:
- active location reuse
- coords availability handling
- stable fallback when coords are absent
- renderer output consistency during location changes

## Ramadan Flow
Review:
- active location reuse
- truthful Ramadan day/imsak/iftar derivation
- partial/unavailable fallbacks
- stable refresh behavior when location changes

## Location Flow
Review:
- selected vs stored vs default resolution
- persistence stability
- header label truthfulness
- invalid stored location handling
- no-result / failed lookup / canceled selection behavior

## Cross-Section Consistency
Review:
- section states stay aligned after location change
- one section failure does not poison others
- fallback text tone remains calm and consistent
- no stale data from previous location remains visible

---

# 5) Likely Files Involved

## Update only as needed
- `src/js/app.js`
- `src/js/ui/sections/render-prayer-section.js`
- `src/js/ui/sections/render-qibla-section.js`
- `src/js/ui/sections/render-ramadan-section.js`
- `src/js/ui/widgets/render-prayers.js`
- `src/js/ui/widgets/render-week.js`
- minimal CSS files only if a tiny readability/state consistency fix is truly needed

## Important
Prefer fixing orchestration and small data-flow issues first.
Avoid broad renderer churn unless a clear integration issue requires it.

---

# 6) Architectural Intent
The architecture after this task should remain the same:

- `app.js` → orchestration, active-location resolution, refresh lifecycles
- Prayer/Qibla/Ramadan renderers → section presentation
- widget renderers → localized repeated-structure rendering
- current service/runtime flow → source of truth for section data

This task should **not** blur ownership.
It only verifies and stabilizes the current integrated app behavior.

---

# 7) Recommended Review Strategy

## Step 1 — Audit full runtime journey
Inspect the app from startup through steady-state usage:
- initial load
- location change
- countdown update
- partial failure paths
- section refresh sequence

## Step 2 — Identify concrete issues only
Do not speculate broadly.
Only fix integration issues that are:
- observable
- reproducible
- clearly harmful to correctness, stability, or trust

## Step 3 — Apply the smallest coherent fixes
For each issue:
- prefer local fixes
- preserve existing contracts where possible
- avoid “while we’re here” rewrites

## Step 4 — Re-test the full flow
After fixes:
- re-check bootstrap
- re-check location switching
- re-check section synchronization
- re-check fallback states
- re-check countdown stability

## Step 5 — Stop when the app feels coherent
Do not keep tweaking indefinitely.
This is a readiness pass, not an endless perfection spiral.

---

# 8) QA / Readiness Rules

## Truthfulness first
- no stale or misleading section data
- fallback states must remain honest
- header/location labels must reflect actual runtime state

## Stability first
- one failed runtime path should not break the app
- intervals/timers must remain controlled
- location switching should not leave orphaned live behavior

## Consistency first
- section states should feel aligned
- similar failure situations should be presented similarly
- UI should not contradict itself across sections

## Minimalism first
- fix what matters
- do not over-engineer QA infrastructure in this task

---

# 9) Specific Things to Watch Carefully
Pay special attention to:
- duplicate interval creation after repeated location changes
- race conditions between async location-driven refresh paths
- outdated section data persisting after a newer location selection
- header label updating before runtime state is actually confirmed
- partial success where one section updates and another silently stays stale
- mismatch between Prayer active location and Qibla/Ramadan derived location state
- incorrect fallback transitions after a failed lookup or invalid stored location

---

# 10) Implementation Notes for Copilot / Agent
When implementing this task:
- treat the app as already built and connected
- behave like an integration reviewer and QA engineer, not a feature builder
- preserve architecture boundaries
- prefer the smallest fix that resolves a real issue
- keep the app calm, stable, and truthful
- stop once the current runtime feels coherent and readiness-level solid

The result should feel like the app has been **stabilized and verified**, not expanded.

---

# 11) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 12) Definition of Done
S2-T8 is complete only when all of the following are true:

- [ ] bootstrap flow has been reviewed and any key integration issues fixed
- [ ] active-location-driven refresh behavior is coherent across Prayer, Qibla, and Ramadan
- [ ] countdown/live featured lifecycle remains stable after location changes
- [ ] no obvious stale-state or race-condition issue remains in the main user flows
- [ ] fallback and partial-data states remain truthful and calm
- [ ] one failed section/runtime path does not break unrelated sections
- [ ] no broad architectural rewrite was introduced
- [ ] the app feels functionally coherent and readiness-level stable

---

# 13) Final Instruction
Implement **S2-T8 — Integration Review, QA & Readiness** professionally and conservatively.

Use this task to verify and stabilize the already-connected Mawquta app so that the current runtime flows work together coherently and safely.

Do not overbuild.
Do not widen scope.
Do not redesign the app.
Fix only what is needed so the app feels stable, truthful, and ready for the next phase.
