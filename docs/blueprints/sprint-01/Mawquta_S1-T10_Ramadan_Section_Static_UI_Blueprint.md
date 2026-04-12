# 🌙 Mawquta — S1-T10 Ramadan Section Static UI Blueprint

## Task ID
`S1-T10 — Ramadan Section Static UI`

## Purpose
This task introduces the **Ramadan section UI implementation** for the Mawquta page by building the Ramadan section as a static, visual, programmatically rendered UI block.

The goal is to implement the Ramadan section inside the existing `#ramadan-section` mount region created in S1-T4, while keeping the task intentionally limited to:
- static structure
- static visual content
- semantic markup
- CSS-compatible classes
- realistic placeholder Ramadan information
- future-ready structure for later Ramadan data/countdown binding

This task is about **Ramadan section UI only**.
It is **not** about real Ramadan API data, countdown logic, current-day logic, conditional visibility logic, or service integration.

---

# 1) Primary Objective
Render the **Ramadan section** into the `#ramadan-section` region using a dedicated renderer.

At the end of this task, the project should have a visible Ramadan section that:
- matches the approved Mawquta design direction
- is rendered from JS, not hardcoded in `index.html`
- includes the core static Ramadan section structure
- is compatible with the CSS foundation from S1-T3
- fits cleanly into the app shell created in S1-T4
- prepares the project for later Ramadan timetable/countdown/service integration

This task is the visual bridge between:
- static Qibla section implementation
- and future real Ramadan functionality

---

# 2) In Scope

## Required work
- Create a dedicated renderer, preferably:
  - `src/js/ui/sections/render-ramadan-section.js`
- Update the render flow so the Ramadan section renderer mounts into:
  - `section#ramadan-section`
- Render a static Ramadan section UI consistent with the approved Mawquta design
- Include the key visual regions expected in the Ramadan section:
  - section heading / intro area
  - contextual description
  - primary Ramadan summary card
  - static placeholder values for Ramadan-related information
  - optional secondary summary items if needed by the visual hierarchy
  - small explanatory/supporting note if needed
- Keep the output semantic, minimal, and future-friendly
- Ensure class names align with current CSS foundation naming direction
- Keep the Ramadan implementation static and presentation-only

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** fetch real Ramadan timetable data
- Do **not** implement countdown logic
- Do **not** calculate current Ramadan day
- Do **not** conditionally show/hide the section based on date
- Do **not** connect services or business logic
- Do **not** implement current-day row highlighting with runtime logic
- Do **not** implement interactive filtering or expansion
- Do **not** refactor services or state
- Do **not** implement Footer content in this task
- Do **not** introduce fake runtime behavior disguised as static UI

This task must remain strictly focused on **static Ramadan section UI**.

---

# 4) Required Files

## Create
- `src/js/ui/sections/render-ramadan-section.js`

## Update
- `src/js/app.js` or the minimal render flow used after S1-T9

Only make additional file changes if absolutely necessary for clean mounting or class-name compatibility.

---

# 5) Architectural Intent
The rendering architecture after this task should conceptually look like this:

- `index.html` → document shell only
- `app.js` → bootstrap/orchestrator entry
- `render-app-shell.js` → renders page shell
- `render-header.js` → renders Header
- `render-prayer-section.js` → renders Prayer section
- `render-qibla-section.js` → renders Qibla section
- `render-ramadan-section.js` → renders Ramadan section into `#ramadan-section`
- future tasks → render Footer and later bind real Ramadan logic

This preserves clean ownership:
- app shell owns structure
- section renderers own their own section markup
- future integration can bind into predictable Ramadan DOM structure

---

# 6) Expected Ramadan Renderer Responsibility

## `render-ramadan-section.js`
This file should be responsible only for:
- rendering the static Ramadan section markup
- mounting it into the Ramadan section region
- exposing predictable internal hooks for future tasks if useful

It should **not**:
- contain business logic
- fetch data
- call services
- manage countdown state
- manage date visibility logic
- implement final interactive behavior

Keep it focused and shallow.

---

# 7) Recommended Section Structure
The final markup does **not** need to match this literally line-for-line, but it should follow this structure closely:

```html
<div class="ramadan-section__inner container">
  <div class="ramadan-section__intro">
    <div class="section-heading ramadan-section__heading">
      <p class="section-heading__eyebrow">رمضان</p>
      <h2 class="section-heading__title">ملخص هادئ وواضح لمعلومات رمضان</h2>
      <p class="section-heading__subtitle">
        واجهة مهيأة لعرض اليوم الرمضاني، وقت الإمساك، ووقت الإفطار عند ربطها لاحقًا بالبيانات الفعلية.
      </p>
    </div>
  </div>

  <div class="ramadan-section__body">
    <article class="card ramadan-card" aria-label="Ramadan summary">
      <div class="ramadan-card__content">
        <p class="ramadan-card__label">اليوم الرمضاني</p>
        <h3 class="ramadan-card__day">اليوم 15</h3>
        <p class="ramadan-card__note">
          هذه القيم placeholder ثابتة وسيتم ربطها لاحقًا بالبيانات الفعلية والعدّاد الحقيقي.
        </p>
      </div>

      <div class="ramadan-card__meta">
        <div class="ramadan-card__meta-item">
          <span class="ramadan-card__meta-label">الإمساك</span>
          <span class="ramadan-card__meta-value">04:12</span>
        </div>

        <div class="ramadan-card__meta-item">
          <span class="ramadan-card__meta-label">الإفطار</span>
          <span class="ramadan-card__meta-value">18:31</span>
        </div>
      </div>
    </article>
  </div>
</div>
```

## Notes
- The exact wording can be adjusted if the approved design already defines stronger copy
- The values shown here are static placeholder content only
- Keep the section visually meaningful without pretending real Ramadan logic already exists
- Avoid over-nesting
- Keep future data/countdown-binding hooks obvious

---

# 8) Design Direction Requirements
The Ramadan section should visually align with the approved Mawquta page direction:
- Arabic-first
- RTL-first
- premium but calm
- clean card-led hierarchy
- strong readability
- restrained visual warmth
- clear emphasis on summary information
- no noisy dashboard feel

This section should feel like a refined seasonal information surface, not like a crowded timetable widget.

---

# 9) Content Direction
The content used in this task should be:
- static only
- realistic
- restrained
- clearly placeholder in nature where needed
- not misleadingly “live”

### Recommended content blocks
- section eyebrow/title/subtitle
- Ramadan day placeholder
- imsak placeholder
- iftar placeholder
- short explanatory note

Do not overload this task with full timetable depth unless the approved design explicitly requires it.

---

# 10) Markup Quality Rules

## Semantics
- use heading hierarchy correctly
- use `article` for the main Ramadan summary card if appropriate
- informational text should remain grouped and readable
- links/buttons should only appear if truly necessary at this stage

## Accessibility
- use `aria-label` where useful
- do not create fake controls pretending to be interactive
- keep text readable and meaningful
- decorative elements should use `aria-hidden="true"` where applicable

## Maintainability
- class names should be clear and future-friendly
- avoid deeply nested wrappers
- avoid ambiguous naming
- keep the renderer small and readable

## Styling Compatibility
- use class names that can be styled cleanly within the current CSS foundation
- align with `section-heading`, `card`, and similar primitive direction where useful
- do not assume final detailed section CSS already exists

---

# 11) Recommended API Shape
A simple and clean approach is recommended.

## Suggested file export
```js
export function renderRamadanSection(rootElement) {
  // render static ramadan section UI into rootElement
}
```

## Expected usage
- query `#ramadan-section`
- if missing, exit safely
- call `renderRamadanSection(ramadanRoot)` after app shell, header, Prayer section, and Qibla section mount

Keep the API obvious and minimal.

---

# 12) `app.js` / Mount Flow Expectations
At this stage, the render flow should become:
1. render app shell
2. render header
3. render Prayer section
4. render Qibla section
5. query `#ramadan-section`
6. render Ramadan section
7. stop cleanly

Do **not** begin Footer rendering yet.
Do **not** begin live Ramadan logic integration.

A good result is:
- app shell mounts
- header mounts
- Prayer section mounts
- Qibla section mounts
- Ramadan section mounts
- no Footer or integration logic is introduced yet

---

# 13) Implementation Notes for Copilot / Agent
When implementing this task:
- prioritize structural clarity over feature behavior
- make the Ramadan section visually meaningful even if still static
- avoid fake countdown behavior
- keep the summary surface simple and future-friendly
- prepare the renderer for future enhancement without coupling it to live Ramadan/date logic

The result should feel like the **next major product section** of the final page.

---

# 14) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 15) Definition of Done
S1-T10 is complete only when all of the following are true:

- [ ] `src/js/ui/sections/render-ramadan-section.js` exists
- [ ] the Ramadan section is rendered programmatically into `#ramadan-section`
- [ ] the section includes intro/heading, a main Ramadan summary card, and static placeholder Ramadan info
- [ ] the content is static only
- [ ] `app.js` (or the current render flow) mounts the Ramadan section cleanly after shell, header, Prayer section, and Qibla section rendering
- [ ] no business logic or service integration was added
- [ ] no countdown, current-day, or date-visibility logic was introduced
- [ ] no Footer implementation was introduced
- [ ] the markup remains semantic, readable, and RTL-friendly
- [ ] the result aligns with the approved Mawquta design direction

---

# 16) Final Instruction
Implement **S1-T10 — Ramadan Section Static UI** professionally and conservatively.

Build the Ramadan section as the next visible major section in Mawquta.

Do not overbuild.
Do not drift into Ramadan countdown logic, date-based visibility, or service integration.
Create a clean static Ramadan section that prepares the project for the next UI tasks and later real Ramadan binding.
