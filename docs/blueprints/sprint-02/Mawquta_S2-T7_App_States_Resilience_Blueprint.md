# 🛡️ Mawquta — S2-T7 App States & Resilience Blueprint

## Task ID
`S2-T7 — App States & Resilience`

## Purpose
This task introduces the **application states and resilience layer** for Mawquta after the core sections have already been connected to real runtime data.

The goal is to make the app more trustworthy and stable by handling non-ideal runtime situations clearly and gracefully, including:
- loading states
- partial data availability
- missing location data
- failed fetches
- empty/unavailable runtime results
- safe fallback rendering

This task must remain intentionally limited to:
- state handling
- resilience behavior
- honest UI fallbacks
- stability improvements around already-existing sections and flows

This task is about **app states and resilience only**.
It is **not** about introducing new features, redesigning the app, or creating a large app-wide state management framework.

---

# 1) Primary Objective
Add clear, minimal, truthful handling for runtime states across the existing Mawquta flows so that the app behaves safely and understandably when data is loading, missing, partial, or unavailable.

At the end of this task, the project should have:
- graceful fallback behavior for Prayer, Qibla, and Ramadan sections
- truthful rendering when some runtime data is unavailable
- safer handling around location/geocode/runtime failures
- better user-facing resilience without changing the overall UI architecture
- a stronger base for later refinement and deployment readiness

This task is the stability bridge between:
- a functionally connected app
- and a more production-ready user experience

---

# 2) In Scope

## Required work
- Review the current runtime paths already implemented for:
  - Prayer section
  - Qibla section
  - Ramadan section
  - location/city flow
- Identify places where the app currently relies on:
  - optimistic success assumptions
  - silent runtime failure
  - placeholder fallback that may now be misleading
- Introduce a minimal resilience layer for states such as:
  - loading
  - unavailable
  - partial data
  - invalid stored location
  - failed city lookup / no suggestions
  - failed Qibla lookup
  - failed Ramadan derivation
  - failed Prayer day/week runtime fetch
- Keep changes architecture-safe and local
- Reuse existing renderers/components where possible
- Preserve the current page structure and ownership boundaries

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** redesign the page structure
- Do **not** create a global state/store framework
- Do **not** add unrelated new features
- Do **not** add large loading skeleton systems unless clearly justified
- Do **not** rebuild services from scratch
- Do **not** widen into analytics, logging infrastructure, or observability systems
- Do **not** redesign the location picker flow
- Do **not** open responsive work
- Do **not** introduce broad UI rewrites disguised as resilience work

This task must remain strictly focused on **state handling and resilience improvements** for the already-built app.

---

# 4) Expected Functional Scope

## Likely targets
- Prayer section:
  - loading-safe first render
  - honest fallback if daily/week data is missing
  - stable featured fallback if countdown/next prayer data is unavailable
- Qibla section:
  - honest fallback if coordinates or Qibla degree are unavailable
- Ramadan section:
  - honest fallback if day/imsak/iftar data is unavailable
- City/location flow:
  - invalid stored location handling
  - safe fallback to default location
  - empty/no-result suggestion handling
  - canceled selection flow stability

## Not yet required unless already trivial and safe
- fancy animated loading states
- a dedicated toast/notification system
- app-wide retry UI framework
- section-specific retry buttons unless already easy and aligned
- telemetry/logging systems

If a resilience improvement is not clearly needed now, do not force it into this task.

---

# 5) Required Files
The exact touched files may vary based on current code reality, but likely candidates include:

## Likely update targets
- `src/js/app.js`
- `src/js/ui/sections/render-prayer-section.js`
- `src/js/ui/sections/render-qibla-section.js`
- `src/js/ui/sections/render-ramadan-section.js`
- `src/js/ui/widgets/render-prayers.js`
- `src/js/ui/widgets/render-week.js`
- `src/css/components.css`
- `src/css/sections.css`

## Optional only if clearly helpful
- a tiny shared state-block helper if one already fits the current renderer/component direction

## Important
Prefer adapting the current architecture over introducing a new state framework.

---

# 6) Architectural Intent
The architecture after this task should still preserve the current clean ownership model:

- `app.js` → orchestration, safe refresh paths, resilience decisions
- section renderers → present data or fallback state truthfully
- widget renderers → handle empty/unavailable repeated data safely
- later tasks → deployment readiness, polish, or further UX refinement if needed

This task should not blur responsibilities.
It should make the existing app more trustworthy, not more architecturally complicated.

---

# 7) Recommended Resilience Strategy

## Step 1 — Audit existing failure and partial-data paths
Before implementing changes, inspect the current runtime and identify:
- where fetches can fail
- where data can be partial
- where location can be invalid
- where the app currently falls back silently
- where placeholders are no longer appropriate because the app is now runtime-driven

## Step 2 — Define truthful fallback contracts per section
For each major section, define a minimal safe fallback contract:

### Prayer
- missing featured data
- missing daily prayers
- missing weekly rows

### Qibla
- no usable coords
- no Qibla degree response

### Ramadan
- no usable Ramadan day
- no imsak/iftar data

### Location
- invalid stored location
- no suggestions returned
- city lookup failure

Keep these fallback contracts small and readable.

## Step 3 — Use UI states that fit the current architecture
Prefer:
- short truthful text
- existing cards/containers
- empty rows/messages inside current structures
- light state blocks if already supported by current CSS/components

Avoid introducing entirely new UI systems unless absolutely necessary.

## Step 4 — Make bootstrap and refresh flows safe
Ensure:
- bootstrap does not crash if one section fails
- one failed section does not break the others
- location fallback remains stable
- live countdown does not fail the Prayer section if countdown data disappears temporarily

## Step 5 — Keep resilience local and explicit
Where possible:
- handle failures close to the orchestration path that knows the context
- pass clear fallback-friendly data into renderers
- keep renderers deterministic and readable

---

# 8) State/Resilience Rules

## Truthfulness first
- no fake “real-looking” placeholder data when runtime fetch failed
- if data is unavailable, say so simply and clearly

## Calm UX first
- fallbacks should be short and restrained
- no alarming or overly technical messages
- no unnecessary blame/error drama

## Stability first
- the page should remain readable and functional even if one section fails
- fallback paths should not create JS crashes or UI corruption

## Minimalism first
- use the smallest UI/state treatment that solves the problem
- do not build a state design system bigger than the app needs right now

---

# 9) UI Expectations After This Task
After this task, the app should feel:
- more honest
- more stable
- less fragile
- more production-minded

The user should not feel that one missing API response causes the whole page to become confusing or misleading.

This task is not a redesign task.
It is a reliability/trust task.

---

# 10) Markup / Renderer Rules
If renderer updates are needed:
- preserve semantic structure
- preserve current class naming and styling hooks
- avoid unnecessary markup churn
- keep renderer APIs clean and predictable
- keep fallback rendering localized and readable

If a section needs a fallback block:
- keep it visually compatible with the existing UI
- do not add noisy custom wrappers unless clearly necessary

If a table/list has no runtime rows:
- prefer an honest inline fallback inside the existing structure

---

# 11) CSS / Visual Rules
If CSS updates are needed:
- keep them small
- align with current `card`, `meta-row`, `table-shell`, and section surface patterns
- keep error/unavailable states visually calm
- preserve readability and contrast
- avoid turning state UI into bright warning panels unless the design truly requires it

A resilient app can still look composed and premium.

---

# 12) Implementation Notes for Copilot / Agent
When implementing this task:
- start by identifying the real unstable points in the current app
- fix the smallest high-value resilience gaps first
- preserve the current architecture and section ownership
- avoid dramatic rewrites
- prefer small targeted updates
- preserve page stability
- stop once the app can fail gracefully in the most realistic runtime cases

The result should feel like the app has become **safer and more trustworthy**, not heavier.

---

# 13) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 14) Definition of Done
S2-T7 is complete only when all of the following are true:

- [ ] Prayer, Qibla, and Ramadan sections handle missing/unavailable runtime data truthfully
- [ ] invalid or missing stored location does not break the app
- [ ] city lookup/suggestion failure paths are handled safely
- [ ] one failed runtime path does not break unrelated sections
- [ ] fallback UI remains readable, calm, and structurally compatible
- [ ] no broad architectural rewrite was introduced
- [ ] the page remains stable and readable
- [ ] the task scope remained limited to app states and resilience improvements

---

# 15) Final Instruction
Implement **S2-T7 — App States & Resilience** professionally and conservatively.

Use this task to make the already-built Mawquta app more stable, truthful, and trustworthy in non-ideal runtime conditions.

Do not overbuild.
Do not widen scope.
Do not redesign the app.
Add only the resilience and fallback behavior needed so the current app can handle realistic failure and partial-data scenarios gracefully.
