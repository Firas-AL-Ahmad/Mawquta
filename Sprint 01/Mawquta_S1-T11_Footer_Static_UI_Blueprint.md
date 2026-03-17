# 🧾 Mawquta — S1-T11 Footer Static UI Blueprint

## Task ID
`S1-T11 — Footer Static UI`

## Purpose
This task introduces the **Footer UI implementation** for the Mawquta page by building the Footer as a static, visual, programmatically rendered UI block.

The goal is to implement the Footer inside the existing `#site-footer` mount region created in S1-T4, while keeping the task intentionally limited to:
- static structure
- static visual content
- semantic markup
- CSS-compatible classes
- realistic informational/footer content
- future-ready structure for later refinement if needed

This task is about **Footer UI only**.
It is **not** about analytics, dynamic links, social integrations, contact workflows, or any other runtime behavior.

---

# 1) Primary Objective
Render the **Footer** into the `#site-footer` region using a dedicated renderer.

At the end of this task, the project should have a visible Footer that:
- matches the approved Mawquta design direction
- is rendered from JS, not hardcoded in `index.html`
- includes the core static Footer structure
- is compatible with the CSS foundation from S1-T3
- fits cleanly into the app shell created in S1-T4
- helps close the page visually in a clean, restrained, useful way

This task is the visual bridge between:
- the main static page sections
- and a fully closed page-level static UI before final polish

---

# 2) In Scope

## Required work
- Create a dedicated renderer, preferably:
  - `src/js/ui/layout/render-footer.js`
- Update the render flow so the Footer renderer mounts into:
  - `footer#site-footer`
- Render a static Footer UI consistent with the approved Mawquta design
- Include the key visual regions expected in the Footer:
  - project/brand summary
  - compact internal navigation links
  - optional GitHub/contact reference if already aligned with project direction
  - short explanatory note about prayer times varying by city/method if appropriate
  - copyright or ownership line if suitable
- Keep the output semantic, minimal, and future-friendly
- Ensure class names align with current CSS foundation naming direction
- Keep the Footer implementation static and presentation-only

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** add analytics or tracking hooks
- Do **not** add real social integrations
- Do **not** add contact form logic
- Do **not** implement mail links that imply workflow logic beyond simple static anchors if used
- Do **not** connect dynamic route/state behavior
- Do **not** implement legal/privacy pages unless already part of the approved design
- Do **not** refactor services or state
- Do **not** add unrelated page sections or interactivity
- Do **not** turn the Footer into an oversized sitemap or dashboard-like block

This task must remain strictly focused on **static Footer UI**.

---

# 4) Required Files

## Create
- `src/js/ui/layout/render-footer.js`

## Update
- `src/js/app.js` or the minimal render flow used after S1-T10

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
- `render-ramadan-section.js` → renders Ramadan section
- `render-footer.js` → renders Footer into `#site-footer`

This preserves clean ownership:
- app shell owns structure
- section renderers own their own section markup
- footer renderer owns footer markup only

---

# 6) Expected Footer Renderer Responsibility

## `render-footer.js`
This file should be responsible only for:
- rendering the static Footer markup
- mounting it into the Footer region
- exposing predictable internal hooks for future tasks if useful

It should **not**:
- contain business logic
- fetch data
- call services
- manage navigation state
- manage analytics or tracking
- implement final interactive behavior

Keep it focused and shallow.

---

# 7) Recommended Section Structure
The final markup does **not** need to match this literally line-for-line, but it should follow this structure closely:

```html
<div class="site-footer__inner container">
  <div class="site-footer__top">
    <div class="site-footer__brand">
      <a href="#app-shell" class="site-footer__brand-link" aria-label="Mawquta home">
        <span class="site-footer__brand-text">مَوْقُوتًا</span>
      </a>
      <p class="site-footer__summary">
        واجهة عربية هادئة تساعد على متابعة مواقيت الصلاة، اتجاه القبلة، وملخص رمضان ضمن تجربة واضحة ومهيأة للربط لاحقًا بالبيانات الفعلية.
      </p>
    </div>

    <nav class="site-footer__nav" aria-label="Footer navigation">
      <a href="#prayer-section" class="site-footer__link">مواقيت الصلاة</a>
      <a href="#qibla-section" class="site-footer__link">القبلة</a>
      <a href="#ramadan-section" class="site-footer__link">رمضان</a>
    </nav>

    <div class="site-footer__meta">
      <p class="site-footer__note">
        قد تختلف المواقيت واتجاهات الحساب باختلاف المدينة وطريقة الحساب المعتمدة.
      </p>
      <a href="#" class="site-footer__external-link">GitHub</a>
    </div>
  </div>

  <div class="site-footer__bottom">
    <p class="site-footer__copyright">© Mawquta — Static UI Phase</p>
  </div>
</div>
```

## Notes
- The exact wording can be adjusted if the approved design already defines stronger copy
- Keep links intentional and restrained
- If `GitHub` link is included, it should remain clearly static/presentational if the final URL is not yet confirmed
- Avoid over-nesting
- Keep the footer balanced, not oversized

---

# 8) Design Direction Requirements
The Footer should visually align with the approved Mawquta page direction:
- Arabic-first
- RTL-first
- premium but calm
- clean and restrained
- readable and balanced
- useful without being crowded
- consistent with the overall page tone

The Footer should feel like a clean closing section for a polished product page, not like a bloated multi-column corporate site footer.

---

# 9) Content Direction
The content used in this task should be:
- static only
- realistic
- restrained
- useful
- not misleadingly “live”

### Recommended content blocks
- project name / brand
- brief summary sentence
- compact internal section links
- short note about city/method variation
- optional GitHub/static external reference
- simple bottom line / copyright

Do not overload this task with too many links or dense footer content.

---

# 10) Markup Quality Rules

## Semantics
- use `nav` for footer navigation if present
- keep anchors as real anchors
- keep informational text grouped and readable
- do not introduce fake button semantics where links are sufficient

## Accessibility
- use `aria-label` where useful
- keep links meaningful
- do not create fake controls
- keep text readable and structured

## Maintainability
- class names should be clear and future-friendly
- avoid deeply nested wrappers
- avoid ambiguous naming
- keep the renderer small and readable

## Styling Compatibility
- use class names that can be styled cleanly within the current CSS foundation
- align with current section/layout naming direction
- do not assume final detailed footer CSS already exists

---

# 11) Recommended API Shape
A simple and clean approach is recommended.

## Suggested file export
```js
export function renderFooter(rootElement) {
  // render static footer UI into rootElement
}
```

## Expected usage
- query `#site-footer`
- if missing, exit safely
- call `renderFooter(footerRoot)` after app shell, header, Prayer section, Qibla section, and Ramadan section mount

Keep the API obvious and minimal.

---

# 12) `app.js` / Mount Flow Expectations
At this stage, the render flow should become:
1. render app shell
2. render header
3. render Prayer section
4. render Qibla section
5. render Ramadan section
6. query `#site-footer`
7. render Footer
8. stop cleanly

Do **not** begin ornaments/final polish logic in this task.

A good result is:
- app shell mounts
- all main static sections mount
- footer mounts
- no extra behavior or integration logic is introduced yet

---

# 13) Implementation Notes for Copilot / Agent
When implementing this task:
- prioritize structural clarity over decorative complexity
- make the Footer visually meaningful even if still static
- keep the content brief and useful
- avoid fake external workflows
- prepare the renderer for later refinement without coupling it to runtime logic

The result should feel like the **closing section** of the static Mawquta page.

---

# 14) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 15) Definition of Done
S1-T11 is complete only when all of the following are true:

- [ ] `src/js/ui/layout/render-footer.js` exists
- [ ] the Footer is rendered programmatically into `#site-footer`
- [ ] the Footer includes brand/summary, compact links, and supporting note content
- [ ] the content is static only
- [ ] `app.js` (or the current render flow) mounts the Footer cleanly after the main static sections
- [ ] no business logic or service integration was added
- [ ] no analytics/tracking/social workflow logic was introduced
- [ ] the markup remains semantic, readable, and RTL-friendly
- [ ] the result aligns with the approved Mawquta design direction

---

# 16) Final Instruction
Implement **S1-T11 — Footer Static UI** professionally and conservatively.

Build the Footer as the final visible static page section in Mawquta for this phase.

Do not overbuild.
Do not drift into analytics, workflow logic, or oversized footer structure.
Create a clean static Footer that closes the page professionally and prepares the project for the final static polish tasks.
