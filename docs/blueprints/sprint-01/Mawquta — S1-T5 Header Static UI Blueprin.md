---
tags:
  - mawquta
  - sprint-1
  - task
status: in-progress
task_id: S1-T5
title: Header Static UI
---

# S1-T5 — Header Static UI

## Purpose

This task introduces the **first actual section-level UI implementation** for the Mawquta page by building the **Header** as a static, visual, programmatically rendered UI block.

The goal is to implement the Header inside the existing `site-header` mount region created in S1-T4, while keeping the task intentionally limited to:
- Static structure
- Static visual content
- Semantic markup
- CSS-compatible classes
- Light UI readiness for future interactions

> This task is about **Header implementation only**. It is **not** about location flow, modal behavior, scroll logic, or data integration.

---

## 1. Primary Objective

Render the project Header into the `#site-header` region using a dedicated renderer.

At the end of this task, the project should have a visible Header that:
- Matches the approved design direction
- Is rendered from JS, not hardcoded in `index.html`
- Includes the core static header structure
- Is compatible with the CSS foundation from S1-T3
- Fits cleanly into the app shell created in S1-T4
- Prepares the page for future navigation and location actions

---

## 2. In Scope

**Required work:**
- Create a dedicated Header renderer: `src/js/ui/layout/render-header.js`
- Update the bootstrap/render flow so the Header renderer mounts into `header#site-header`
- Render a static Header UI consistent with the approved Mawquta design
- Include the key visual regions expected in the Header:
  - Brand/logo area
  - Navigation area
  - Top action area
- Keep the output semantic, minimal, and future-friendly
- Ensure class names align with current CSS foundation naming direction
- Keep the Header implementation static and presentation-only

---

## 3. Out of Scope

Do **not** do any of the following in this task:
- Implement actual city/location modal behavior
- Implement geolocation logic
- Connect location services
- Implement scroll spy or active-section tracking
- Implement mobile nav toggle behavior beyond static structure if needed
- Implement real navigation logic or smooth scrolling behavior
- Connect buttons to business logic
- Introduce data fetching
- Refactor services or state
- Build the Prayer section

> This task must remain strictly focused on **static Header UI implementation**.

---

## 4. Required Files

| Action | File |
|--------|------|
| Create | `src/js/ui/layout/render-header.js` |
| Update | `src/js/app.js` or the minimal render flow used after S1-T4 |
| Update (optional) | `src/js/ui/layout/render-app-shell.js` — only if needed for clean header mounting flow |

Do not make unrelated file changes.

---

## 5. Architectural Intent

Conceptual rendering architecture after this task:

```
index.html              → document shell only
app.js                  → bootstrap / orchestrator entry
render-app-shell.js     → renders page shell
render-header.js        → renders Header into #site-header
future renderers        → render Prayer / Qibla / Ramadan / Footer progressively
```

Clean ownership:
- App shell owns structure
- Header renderer owns header markup
- Future renderers own their own sections

---

## 6. Rendering Responsibility

### `render-header.js`

**Responsible for:**
- Rendering the static Header markup
- Mounting it into the Header region
- Exposing predictable internal hooks for future tasks if useful

**Not responsible for:**
- Business logic
- Fetching data
- Managing location state
- Controlling modals
- Integration with services
- Advanced interactions

---

## 7. Recommended Header Structure

The final markup does not need to match this literally, but should follow this structure closely:

```html
<div class="site-header__inner container">
  <div class="site-header__brand">
    <a href="#" class="brand-mark" aria-label="Mawquta home">
      <span class="brand-mark__icon" aria-hidden="true"></span>
      <span class="brand-mark__text">مَوْقُوتًا</span>
    </a>
  </div>

  <nav class="site-header__nav" aria-label="Primary navigation">
    <a href="#prayer-section" class="site-header__link is-active">مواقيت الصلاة</a>
    <a href="#qibla-section" class="site-header__link">القبلة</a>
    <a href="#ramadan-section" class="site-header__link">رمضان</a>
  </nav>

  <div class="site-header__actions">
    <button type="button" class="btn btn--ghost site-header__location-trigger">
      <span class="site-header__location-label">اختر المدينة</span>
    </button>
  </div>
</div>
```

**Notes:**
- Exact text/content can be adjusted to match the approved design if already defined visually
- Use semantic `<nav>` correctly
- Keep the structure lean
- Avoid over-nesting
- Keep future interaction hooks obvious

---

## 8. Design Direction Requirements

The Header should visually align with the approved Mawquta page direction:
- Arabic-first and RTL-first
- Premium but calm
- Readable and uncluttered
- Simple navigation hierarchy
- Clear brand presence
- Minimal action area

> The Header should feel like part of a refined single-page Islamic utility product — not a generic blog nav bar or a bloated dashboard control strip.

---

## 9. Markup Quality Rules

### Semantics
- Use `<nav>` for primary navigation
- Links should be actual anchors
- Brand area should be clearly identifiable
- Actions should use button semantics if non-navigational

### Accessibility
- Use `aria-label` where useful
- Do not create fake controls
- Decorative icons should use `aria-hidden="true"`
- Keep focusable elements meaningful

### Maintainability
- Class names should be clear and future-friendly
- Avoid deeply nested wrappers
- Avoid ambiguous naming
- Keep the renderer small and readable

### Styling Compatibility
- Use class names that can be styled cleanly within the current CSS foundation
- Do not assume final detailed header CSS already exists
- Prepare for later Header styling refinement without requiring markup rewrite

---

## 10. Recommended API Shape

**Suggested file export:**

```js
export function renderHeader(rootElement) {
  // render static header UI into rootElement
}
```

**Expected usage:**
1. Query `#site-header`
2. If missing, exit safely
3. Call `renderHeader(headerRoot)` after `renderAppShell()`

---

## 11. Mount Flow Expectations

At this stage, the render flow should become:

1. Query `#app`
2. Render app shell
3. Query `#site-header`
4. Render Header into it
5. Stop cleanly

> A good result: app shell mounts → header mounts → no other section content rendered yet.

---

## 12. Implementation Notes

When implementing this task:
- Prioritize structural clarity over feature behavior
- Make the Header visually meaningful even if still static
- Do not overload the markup with future-only complexity
- Avoid fake behavior just to "look complete"
- Prepare the renderer for future enhancement without prematurely coupling it to location flow or navigation state

> The result should feel like the first real visible UI block of the final page.

---

## 13. Workflow Note

- Development happens on the `dev` branch
- Task documents focus on execution scope only
- Repository workflow details are managed outside the task blueprint

---

## 14. Definition of Done

- [ ] `src/js/ui/layout/render-header.js` exists
- [ ] Header is rendered programmatically into `#site-header`
- [ ] Header includes brand, nav, and action regions
- [ ] Header is static only — no integration or behavior wiring
- [ ] `app.js` (or current render flow) mounts the Header cleanly after mounting the app shell
- [ ] No business logic or service integration was added
- [ ] No other section implementation was introduced
- [ ] Markup remains semantic, readable, and RTL-friendly
- [ ] Result aligns with the approved Mawquta design direction

---

## 15. Final Instruction

Implement S1-T5 — Header Static UI professionally and conservatively.

Build the Header as the first real visible section-level UI block in Mawquta.

- Do not overbuild
- Do not drift into location flow or advanced interactions
- Create a clean static Header that prepares the project for the next UI tasks
