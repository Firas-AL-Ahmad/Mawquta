# 📍 Mawquta — S2-T4 City / Location Flow Binding Blueprint

## Task ID
`S2-T4 — City / Location Flow Binding`

## Purpose
This task introduces the **city/location flow binding step** for the Mawquta page by connecting the existing UI and runtime to a real, user-driven location source instead of relying only on the default configured location.

The goal is to move the Prayer section and its related runtime entry path from:
- default-config-driven location only
- to a user-driven city/location flow

while keeping the task intentionally limited to:
- location/city source selection
- existing city/runtime flow only
- prayer-related refresh behavior driven by location changes
- minimal architecture-safe adaptation where necessary

This task is about **binding the location/city flow to the current runtime**.
It is **not** about Qibla/Ramadan integration yet, not about redesigning the location UI from scratch, and not about building a full global state system.

---

# 1) Primary Objective
Connect the already-existing location/city path to the current Prayer runtime flow so that Mawquta can render prayer data based on:
- stored user city/location if available
- chosen city flow if already present
- default configured location only as a fallback

At the end of this task, the project should have:
- a meaningful location source hierarchy
- Prayer section runtime driven by actual selected/stored city when available
- location-trigger-related UI reflecting the current city/state more truthfully
- refresh behavior that responds cleanly to location changes without widening into unrelated sections

This task is the functional bridge between:
- a live Prayer section tied to default location
- and a more user-relevant Prayer experience driven by actual city selection

---

# 2) In Scope

## Required work
- Review the existing codebase for current location-related runtime pieces, such as:
  - `CONFIG.DEFAULT_LOCATION`
  - any stored location key (for example `ms_location` if already used)
  - city search/autocomplete flow if already present
  - geocode endpoint usage if already integrated into the runtime path
- Establish a clean location source priority for Prayer runtime, for example:
  1. stored/selected user location if valid
  2. current chosen city via UI flow if triggered
  3. default configured location as fallback
- Bind the Prayer runtime refresh path so location changes update:
  - meta location text
  - featured prayer state
  - daily cards
  - weekly table
- Keep render ownership clean:
  - `app.js` handles orchestration and location-driven refresh lifecycle
  - UI renderers remain responsible for presentation
- Preserve existing UI architecture and avoid redesigning the static sections
- Keep all changes as small and architecture-safe as possible
- Reuse existing geocode/location/runtime logic before creating anything new

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** begin Qibla location/data binding
- Do **not** begin Ramadan location/data binding
- Do **not** redesign the header/location UI from scratch
- Do **not** build a global state/store architecture
- Do **not** add unrelated feature work
- Do **not** rebuild geocode/service layers unless a very small adaptation is truly necessary
- Do **not** redesign the city picker flow if it already exists in a usable form
- Do **not** open full loading/error-state architecture work unless a tiny safe fallback is required
- Do **not** widen scope into full app location management

This task must remain strictly focused on **location/city flow binding for the Prayer runtime path**.

---

# 4) Expected Functional Scope
This task should bind only what is naturally needed to make the Prayer section respond to user-relevant location.

## Likely targets
- resolve the active city/location source
- update Prayer runtime queries based on that source
- re-render or refresh the Prayer section when location changes
- reflect the active location in visible Prayer section/meta UI
- optionally reflect the active city label in the Header/location trigger if that is already structurally present and safe

## Not yet required unless already trivial and safe
- Qibla re-binding to location
- Ramadan re-binding to location
- advanced “use my current GPS coordinates” flow if not already stable
- full error state system for geocode/location
- advanced persistence abstraction

If a capability is not already clearly ready, do not force it into this task.

---

# 5) Required Files
The exact touched files may vary based on current code reality, but likely candidates include:

## Likely update targets
- `src/js/app.js`
- header/location-related renderer if it already exposes a city trigger/label
- any existing city suggestion / location widget renderer already present in the codebase
- existing location/geocode/runtime helpers already used for city resolution
- small utility/helper functions only if truly needed

## Important
Prefer adapting existing runtime flow over creating new architectural layers.

Do not introduce broad structural rewrites unless a blocking issue makes a tiny local refactor necessary.

---

# 6) Architectural Intent
The architecture after this task should still preserve the current clean ownership model:

- `app.js` → orchestration, active location resolution, Prayer refresh lifecycle
- location/geocode/runtime flow → source of truth for the currently active location
- Prayer renderers → present location-driven Prayer UI
- later tasks → Qibla binding, Ramadan binding, broader app states if needed

This task should not blur responsibilities.
It should only connect already-existing location/city flow to the already-built Prayer runtime/UI.

---

# 7) Recommended Binding Strategy

## Step 1 — Audit existing location runtime path
Before changing binding behavior, inspect the current code and determine:
- where default location currently comes from
- whether stored location is already supported
- whether city suggestions/autocomplete flow already exists
- whether geocode endpoint integration already works in a reusable way
- whether old location logic was bypassed during static UI implementation

## Step 2 — Establish a clear active-location resolver
Create or confirm a small location resolution path that determines the active Prayer location from:
- stored location (if valid)
- newly selected city/location
- default configured location fallback

Keep this resolver small and local.
Do not invent a global location framework.

## Step 3 — Bind refresh behavior
When the active location changes, refresh the Prayer runtime data path so it updates:
- meta location text
- featured summary
- daily cards
- weekly table

Keep this refresh path controlled and easy to reason about.

## Step 4 — Keep UI updates honest
If the Header/location trigger or city label is already part of the UI:
- update it only if this can be done cleanly
- keep it truthful and minimal
- do not redesign the header interaction model in this task

## Step 5 — Defer unresolved complexity
If deeper features are not yet safely ready (for example:
- robust geolocation permission flow
- full location error state UX
- Qibla/Ramadan location dependency
),
defer them to later tasks instead of forcing them into this one.

---

# 8) Data/Binding Rules

## Reuse before rebuilding
- prefer existing geocode/service/runtime outputs
- prefer tiny helpers over architecture rewrites
- prefer adapting current UI hooks over inventing new layers

## Truthfulness first
- once this task is complete, the Prayer section should no longer pretend the default configured city is the active user city when a stored/selected city exists
- visible location labels should reflect the active runtime source truthfully

## Minimalism first
- bind only what is needed to make Prayer location-aware
- do not over-engineer persistence or state abstractions

## Safety first
- if a selected/stored city is invalid, fail gracefully back to default location
- avoid crashing the page due to one invalid location object or failed geocode response

---

# 9) UI Expectations After Binding
After this task, the Prayer section should feel:
- visually unchanged in structure
- but more relevant to the user
- no longer tied only to the default configured city
- ready for later reuse of the same active-location source in Qibla and Ramadan tasks

This task is not a redesign task.
It is a location-driven binding task.

---

# 10) Markup / Renderer Rules
If renderer updates are needed:
- preserve semantic structure
- preserve current class naming and styling hooks
- avoid unnecessary markup churn
- keep renderer APIs clean and predictable

If header/location UI receives a small update to reflect current city:
- keep it minimal
- avoid expanding interaction scope
- do not redesign the header for this task

---

# 11) Implementation Notes for Copilot / Agent
When implementing this task:
- start by inspecting the real location/city runtime path, not assumptions from old UI
- identify what location logic already exists and what was bypassed during static build
- connect active location to the Prayer runtime in the smallest coherent way
- avoid dramatic rewrites
- prefer small targeted edits
- preserve page stability
- stop once Prayer is genuinely driven by the resolved active location and the task scope is satisfied

The result should feel like the **Prayer section has become user-location-aware**, without the codebase becoming messy.

---

# 12) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 13) Definition of Done
S2-T4 is complete only when all of the following are true:

- [ ] the Prayer runtime no longer relies only on `CONFIG.DEFAULT_LOCATION` when a valid stored/selected location exists
- [ ] a clear active-location resolution path exists
- [ ] location changes refresh Prayer data cleanly
- [ ] Prayer UI location labels reflect the active location truthfully where applicable
- [ ] the implementation reuses existing geocode/location/runtime logic as much as reasonably possible
- [ ] no Qibla or Ramadan location/data binding was introduced
- [ ] no broad architectural rewrite was introduced
- [ ] the page remains stable and readable
- [ ] the task scope remained limited to city/location flow binding for Prayer

---

# 14) Final Instruction
Implement **S2-T4 — City / Location Flow Binding** professionally and conservatively.

Use this task to connect the already-built Prayer runtime/UI to the existing location/city flow in the cleanest, smallest, most architecture-safe way possible.

Do not overbuild.
Do not widen scope.
Do not rebuild the project around this task.
Bind only what is ready so the Prayer section becomes meaningfully driven by the active user location instead of default config alone.
