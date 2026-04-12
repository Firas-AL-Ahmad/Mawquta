# 🧭 Mawquta — S1-T9 Qibla Section Static UI Blueprint

## Task ID
`S1-T9 — Qibla Section Static UI`

## Purpose
This task introduces the **Qibla section UI implementation** for the Mawquta page by building the Qibla section as a static, visual, programmatically rendered UI block.

The goal is to implement the Qibla section inside the existing `#qibla-section` mount region created in S1-T4, while keeping the task intentionally limited to:
- static structure
- static visual content
- semantic markup
- CSS-compatible classes
- realistic placeholder directional information
- future-ready structure for later Qibla logic binding

This task is about **Qibla section UI only**.
It is **not** about real Qibla calculation, geolocation, compass rotation logic, or service integration.

---

# 1) Primary Objective
Render the **Qibla section** into the `#qibla-section` region using a dedicated renderer.

At the end of this task, the project should have a visible Qibla section that:
- matches the approved Mawquta design direction
- is rendered from JS, not hardcoded in `index.html`
- includes the core static Qibla section structure
- is compatible with the CSS foundation from S1-T3
- fits cleanly into the app shell created in S1-T4
- prepares the project for later Qibla degree/rotation/service integration

This task is the visual bridge between:
- static prayer section implementation
- and future real Qibla functionality

---

# 2) In Scope

## Required work
- Create a dedicated renderer, preferably:
  - `src/js/ui/sections/render-qibla-section.js`
- Update the render flow so the Qibla section renderer mounts into:
  - `section#qibla-section`
- Render a static Qibla section UI consistent with the approved Mawquta design
- Include the key visual regions expected in the Qibla section:
  - section heading / intro area
  - contextual description
  - primary Qibla card or compass surface
  - directional/degree placeholder information
  - small explanatory/supporting note if needed
- Keep the output semantic, minimal, and future-friendly
- Ensure class names align with current CSS foundation naming direction
- Keep the Qibla implementation static and presentation-only

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** calculate the real Qibla angle
- Do **not** connect geolocation logic
- Do **not** connect Qibla services
- Do **not** rotate the compass dynamically
- Do **not** implement permission flow or fallback state logic
- Do **not** add real device orientation logic
- Do **not** implement interactive compass behavior
- Do **not** refactor services or state
- Do **not** implement Ramadan content in this task
- Do **not** introduce business logic or fake runtime behavior

This task must remain strictly focused on **static Qibla section UI**.

---

# 4) Required Files

## Create
- `src/js/ui/sections/render-qibla-section.js`

## Update
- `src/js/app.js` or the minimal render flow used after S1-T8

Only make additional file changes if absolutely necessary for clean mounting or class-name compatibility.

---

# 5) Architectural Intent
The rendering architecture after this task should conceptually look like this:

- `index.html` → document shell only
- `app.js` → bootstrap/orchestrator entry
- `render-app-shell.js` → renders page shell
- `render-header.js` → renders Header
- `render-prayer-section.js` → renders Prayer section
- `render-qibla-section.js` → renders Qibla section into `#qibla-section`
- future tasks → render Ramadan / Footer and later bind real Qibla logic

This preserves clean ownership:
- app shell owns structure
- section renderers own their own section markup
- future integration can bind into predictable Qibla DOM structure

---

# 6) Expected Qibla Renderer Responsibility

## `render-qibla-section.js`
This file should be responsible only for:
- rendering the static Qibla section markup
- mounting it into the Qibla section region
- exposing predictable internal hooks for future tasks if useful

It should **not**:
- contain business logic
- fetch data
- call services
- manage geolocation state
- manage compass/device events
- implement final interactive behavior

Keep it focused and shallow.

---

# 7) Recommended Section Structure
The final markup does **not** need to match this literally line-for-line, but it should follow this structure closely:

```html
<div class="qibla-section__inner container">
  <div class="qibla-section__intro">
    <div class="section-heading qibla-section__heading">
      <p class="section-heading__eyebrow">القبلة</p>
      <h2 class="section-heading__title">اعرف اتجاه القبلة بسهولة ووضوح</h2>
      <p class="section-heading__subtitle">
        واجهة هادئة ومهيأة لإظهار الاتجاه والدرجة عند ربطها لاحقًا بخدمات الموقع والحساب الفعلي.
      </p>
    </div>
  </div>

  <div class="qibla-section__body">
    <article class="card qibla-card" aria-label="Qibla direction summary">
      <div class="qibla-card__content">
        <p class="qibla-card__label">اتجاه القبلة</p>
        <h3 class="qibla-card__degree">137°</h3>
        <p class="qibla-card__note">هذه قيمة placeholder ثابتة وسيتم ربط الدرجة الفعلية لاحقًا.</p>
      </div>

      <div class="qibla-card__visual" aria-hidden="true">
        <div class="qibla-card__compass">
          <div class="qibla-card__compass-ring"></div>
          <div class="qibla-card__needle"></div>
          <div class="qibla-card__center-dot"></div>
        </div>
      </div>
    </article>
  </div>
</div>
```

## Notes
- The exact wording can be adjusted if the approved design already defines stronger copy
- The degree shown here is static placeholder content only
- Keep the section visually meaningful without pretending real device/location logic exists yet
- Avoid over-nesting
- Keep future rotation/data-binding hooks obvious

---

# 8) Design Direction Requirements
The Qibla section should visually align with the approved Mawquta page direction:
- Arabic-first
- RTL-first
- premium but calm
- clean card-led hierarchy
- strong readability
- visual clarity around the compass surface
- restrained, elegant presentation
- no gimmicky dashboard feel

This section should feel like a focused spiritual utility surface, not like a toy compass widget.

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
- degree placeholder
- short explanatory note
- static compass-like visual area

Do not overload this task with too many decorative or explanatory elements.

---

# 10) Markup Quality Rules

## Semantics
- use heading hierarchy correctly
- use `article` for the main Qibla card if appropriate
- informational text should remain grouped and readable
- links/buttons should only appear if truly necessary at this stage

## Accessibility
- use `aria-label` where useful
- decorative visuals should use `aria-hidden="true"`
- do not create fake controls pretending to be interactive
- keep text readable and meaningful

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
export function renderQiblaSection(rootElement) {
  // render static qibla section UI into rootElement
}
```

## Expected usage
- query `#qibla-section`
- if missing, exit safely
- call `renderQiblaSection(qiblaRoot)` after app shell, header, and prayer section mount

Keep the API obvious and minimal.

---

# 12) `app.js` / Mount Flow Expectations
At this stage, the render flow should become:
1. render app shell
2. render header
3. render Prayer section
4. query `#qibla-section`
5. render Qibla section
6. stop cleanly

Do **not** begin Ramadan rendering yet.
Do **not** begin live Qibla logic integration.

A good result is:
- app shell mounts
- header mounts
- Prayer section mounts
- Qibla section mounts
- no Ramadan or integration logic is introduced yet

---

# 13) Implementation Notes for Copilot / Agent
When implementing this task:
- prioritize structural clarity over feature behavior
- make the Qibla section visually meaningful even if still static
- avoid fake rotation or interactive compass behavior
- keep the compass visual simple and future-friendly
- prepare the renderer for future enhancement without coupling it to live location/device logic

The result should feel like the **next major product section** of the final page.

---

# 14) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 15) Definition of Done
S1-T9 is complete only when all of the following are true:

- [ ] `src/js/ui/sections/render-qibla-section.js` exists
- [ ] the Qibla section is rendered programmatically into `#qibla-section`
- [ ] the section includes intro/heading, a main Qibla card, and a static directional placeholder
- [ ] the content is static only
- [ ] `app.js` (or the current render flow) mounts the Qibla section cleanly after shell, header, and Prayer section rendering
- [ ] no business logic or service integration was added
- [ ] no geolocation, compass rotation, or device logic was introduced
- [ ] no Ramadan implementation was introduced
- [ ] the markup remains semantic, readable, and RTL-friendly
- [ ] the result aligns with the approved Mawquta design direction

---

# 16) Final Instruction
Implement **S1-T9 — Qibla Section Static UI** professionally and conservatively.

Build the Qibla section as the next visible major section in Mawquta.

Do not overbuild.
Do not drift into geolocation, compass rotation logic, or device integration.
Create a clean static Qibla section that prepares the project for the next UI tasks and later real Qibla binding.
