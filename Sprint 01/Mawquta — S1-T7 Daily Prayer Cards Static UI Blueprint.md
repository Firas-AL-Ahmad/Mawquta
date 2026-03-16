---
tags:
  - mawquta
  - sprint-1
  - task
status: in-progress
task_id: S1-T7
title: Daily Prayer Cards Static UI
---

# S1-T7 — Daily Prayer Cards Static UI

## Purpose

This task extends the Prayer section by building the **daily prayer cards block** as a static, visual, programmatically rendered UI layer.

The goal is to implement the set of daily prayer cards inside the existing Prayer section, while keeping the task intentionally limited to:
- Static structure
- Static visual content
- Semantic markup
- CSS-compatible classes
- Realistic placeholder timings
- Future-ready structure for later data binding

> This task is about **daily prayer cards UI only**. It is **not** about live prayer data, countdown logic, next-prayer calculation, or weekly table integration.

---

## 1. Primary Objective

Render the **daily prayer cards block** into the Prayer section using a dedicated renderer or a clearly owned sub-rendering step within the Prayer section renderer.

At the end of this task, the project should have:
- Visible daily prayer cards under the top Prayer section intro/hero area
- A clean and readable card set for the main daily prayers
- Static placeholder times only
- A structure that can later be replaced or populated by real prayer data
- Markup that fits the approved Mawquta design direction

This task is the visual bridge between the top Prayer section shell and later real prayer-time integration.

---

## 2. In Scope

**Required work:**
- Extend the Prayer section rendering so the daily prayer cards appear inside `#prayer-section`
- Prefer one of the following clean approaches:
  - Create `src/js/ui/widgets/render-prayers.js` as a static cards renderer
  - Or add a clearly separated sub-rendering block inside `render-prayer-section.js`
- Render a static set of daily prayer cards for the main prayers
- Include realistic placeholder prayer names and times
- Use a clean repeated card structure
- Allow one card to appear visually emphasized if this supports the approved design direction
- Keep the output semantic, minimal, and future-friendly
- Ensure class names align with current CSS foundation naming direction
- Keep the implementation presentation-only

---

## 3. Out of Scope

Do **not** do any of the following in this task:
- Use real prayer API data
- Calculate next prayer
- Implement countdown logic
- Connect services or business logic
- Implement real selection state logic
- Introduce user interaction behavior
- Build the weekly prayer table
- Implement Qibla or Ramadan content
- Refactor services or state
- Overbuild the cards with feature logic disguised as static UI

> This task must remain strictly focused on **static daily prayer cards UI**.

---

## 4. Required Files

Two acceptable options — use whichever keeps responsibility clearer without over-fragmenting the codebase too early.

### Option A — Preferred

| Action | File |
|--------|------|
| Create | `src/js/ui/widgets/render-prayers.js` |
| Update | `src/js/ui/sections/render-prayer-section.js` |
| Update (if needed) | `src/js/app.js` |

### Option B — Acceptable

| Action | File |
|--------|------|
| Update | `src/js/ui/sections/render-prayer-section.js` |
| Update (if needed) | `src/js/app.js` |

---

## 5. Architectural Intent

Conceptual architecture after this task:

```
render-app-shell.js     → renders page shell
render-header.js        → renders Header
render-prayer-section.js → owns Prayer section composition
render-prayers.js       → renders daily prayer cards block (optional/preferred)
future tasks            → add weekly table / real timing / next-prayer / countdown / integration
```

Clean ownership:
- Section renderer owns section composition
- Prayer cards renderer owns repeated prayer-card markup if extracted
- Later logic can bind into a clear UI structure

---

## 6. Rendering Responsibility

### If using `render-prayers.js`

**Responsible for:**
- Rendering the static daily prayer cards block
- Returning or injecting clean markup for the prayer cards area
- Keeping repeated card markup isolated and easy to upgrade later

**Not responsible for:**
- Fetching data
- Calling services
- Calculating next prayer
- Managing timers
- Managing location or state

### If keeping logic inside `render-prayer-section.js`

Keep the daily cards block clearly separated and internally structured so it can be extracted later without confusion.

---

## 7. Recommended Card Set

Static placeholders for layout and visual composition:

| Prayer | Time |
|--------|------|
| الفجر | 04:37 |
| الشروق | 06:02 |
| الظهر | 12:18 |
| العصر | 15:47 |
| المغرب | 18:31 |
| العشاء | 19:56 |

> If the current design excludes sunrise as a main card, it may be omitted. Prefer alignment with the approved visual design over blindly including every possible row.

---

## 8. Recommended DOM Structure

The final markup does not need to match this literally, but should follow this structure closely:

```html
<div class="prayer-cards" aria-label="Daily prayer times">
  <article class="card prayer-card prayer-card--featured">
    <div class="prayer-card__content">
      <p class="prayer-card__name">الفجر</p>
      <p class="prayer-card__time">04:37</p>
    </div>
  </article>

  <article class="card prayer-card">
    <div class="prayer-card__content">
      <p class="prayer-card__name">الشروق</p>
      <p class="prayer-card__time">06:02</p>
    </div>
  </article>

  <article class="card prayer-card">
    <div class="prayer-card__content">
      <p class="prayer-card__name">الظهر</p>
      <p class="prayer-card__time">12:18</p>
    </div>
  </article>

  <article class="card prayer-card">
    <div class="prayer-card__content">
      <p class="prayer-card__name">العصر</p>
      <p class="prayer-card__time">15:47</p>
    </div>
  </article>

  <article class="card prayer-card">
    <div class="prayer-card__content">
      <p class="prayer-card__name">المغرب</p>
      <p class="prayer-card__time">18:31</p>
    </div>
  </article>

  <article class="card prayer-card">
    <div class="prayer-card__content">
      <p class="prayer-card__name">العشاء</p>
      <p class="prayer-card__time">19:56</p>
    </div>
  </article>
</div>
```

**Notes:**
- Use repeated consistent structure
- A featured/highlighted card is allowed if visually useful
- Avoid over-nesting
- Avoid fake interactivity
- Keep future data-binding replacement straightforward

---

## 9. Design Direction Requirements

The daily prayer cards should visually align with the approved Mawquta page direction:
- Arabic-first and RTL-first
- Calm and premium
- Clean card grid or row layout
- Strong readability
- Clear distinction between prayer name and time
- Subtle visual emphasis where helpful
- No clutter

> This block should feel like a refined daily utility surface — not a dashboard widget dump.

---

## 10. Content Direction

The content used in this task should be: static only, realistic, clean, restrained, and clearly safe as placeholder content.

- Do not add fake countdown text or fake dynamic status labels
- If a highlighted card is used, it must remain purely visual, not logical

---

## 11. Markup Quality Rules

### Semantics
- `<article>` is acceptable for each card
- Names and times should be clearly structured
- Repeated elements should stay visually and structurally consistent

### Accessibility
- Keep text readable
- Avoid fake button behavior
- Use `aria-label` on the cards container if useful
- Do not create interactive semantics unless actual interaction exists

### Maintainability
- Class names should be clear and future-friendly
- Repeated card generation should be easy to read
- Avoid deeply nested wrappers
- Avoid hard-to-upgrade markup structures

### Styling Compatibility
- Use primitives already aligned with current CSS foundation (`card`, etc.)
- Add future-friendly names: `prayer-cards`, `prayer-card`, `prayer-card__name`, `prayer-card__time`
- Do not assume final detailed CSS implementation already exists

---

## 12. Recommended API Shape

**If extracted to widget renderer:**

```js
export function renderPrayerCards(rootElement) {
  // render static daily prayer cards into rootElement
}
```

**If composed inside section renderer:**

```js
function getPrayerCardsMarkup() {
  // return static daily prayer cards markup
}
```

---

## 13. Mount Flow Expectations

At this stage, the render flow should remain:

1. Render app shell
2. Render header
3. Render Prayer section (includes top Prayer content + daily prayer cards)
4. Stop cleanly

> Do not begin Qibla or Ramadan rendering yet. Do not begin live timing integration.

---

## 14. Implementation Notes

When implementing this task:
- Prioritize clean repeated structure over clever abstraction
- Keep the output visually meaningful
- Do not overcomplicate the cards with pseudo-logic
- Make the cards easy to replace with real data later
- Keep the feature static, disciplined, and easy to extend

> The result should feel like the daily prayer surface of the product is beginning to take shape.

---

## 15. Workflow Note

- Development happens on the `dev` branch
- Task documents focus on execution scope only
- Repository workflow details are managed outside the task blueprint

---

## 16. Definition of Done

- [ ] Daily prayer cards are rendered inside `#prayer-section`
- [ ] Cards use static placeholder prayer names and times only
- [ ] Structure is semantic, readable, and RTL-friendly
- [ ] Card block is compatible with the current CSS foundation
- [ ] Implementation remains presentation-only
- [ ] No real prayer data or countdown logic was introduced
- [ ] No weekly table was introduced
- [ ] No Qibla/Ramadan implementation was introduced
- [ ] Result aligns with the approved Mawquta design direction

---

## 17. Final Instruction

Implement S1-T7 — Daily Prayer Cards Static UI professionally and conservatively.

Build the daily prayer cards as the next visible layer of the Prayer section in Mawquta.

- Do not overbuild
- Do not drift into live data, next-prayer logic, or weekly table implementation
- Create a clean static prayer cards block that prepares the project for later real data binding
