---
tags:
  - mawquta
  - sprint-1
  - task
status: in-progress
task_id: S1-T6
title: Top Prayer Section Static UI
---

# S1-T6 — Top Prayer Section Static UI

## Purpose

This task introduces the **first major content section implementation** for the Mawquta page by building the **top portion of the Prayer Times section** as a static, visual, programmatically rendered UI block.

The goal is to implement the upper part of the Prayer section inside the existing `#prayer-section` mount region created in S1-T4, while keeping the task intentionally limited to:
- Static structure
- Static visual content
- Semantic markup
- CSS-compatible classes
- Realistic layout scaffolding for future data binding

> This task is about **the top Prayer section UI only**. It is **not** about real prayer data, countdown logic, full prayer cards grid, weekly table, or service integration.

---

## 1. Primary Objective

Render the **top-level Prayer section shell and hero content** into the `#prayer-section` region using a dedicated renderer.

At the end of this task, the project should have a visible top Prayer section that:
- Matches the approved Mawquta design direction
- Is rendered from JS, not hardcoded in `index.html`
- Includes the main static top structure of the Prayer section
- Is compatible with the CSS foundation from S1-T3
- Fits cleanly into the app shell created in S1-T4
- Prepares the project for later prayer cards, countdown, and data integration tasks

This task is the visual bridge between page shell/header rendering and full prayer section implementation later.

---

## 2. In Scope

**Required work:**
- Create a dedicated renderer: `src/js/ui/sections/render-prayer-section.js`
- Update the render flow so the Prayer section renderer mounts into `section#prayer-section`
- Render a static Prayer section top UI consistent with the approved Mawquta design
- Include the key visual regions expected in the top Prayer section:
  - Section container and inner wrapper
  - Section heading / intro area
  - Location/day/date meta area
  - Primary featured prayer card area
  - Supporting descriptive/summary content if needed by layout
- Keep the output semantic, minimal, and future-friendly
- Ensure class names align with current CSS foundation naming direction
- Keep the Prayer section implementation static and presentation-only

---

## 3. Out of Scope

Do **not** do any of the following in this task:
- Render real prayer timings
- Implement countdown logic
- Connect prayer services
- Implement real city/location flow
- Build the full daily prayer cards grid unless structurally unavoidable
- Build the full weekly table
- Implement user interaction logic
- Add scroll logic
- Add business logic or state wiring
- Refactor services or state
- Implement Qibla or Ramadan content

> This task must remain strictly focused on **the static top Prayer section UI**.

---

## 4. Required Files

| Action | File |
|--------|------|
| Create | `src/js/ui/sections/render-prayer-section.js` |
| Update | `src/js/app.js` or the minimal render flow used after S1-T5 |

Only make additional file changes if absolutely necessary for clean mounting or class-name compatibility.

---

## 5. Architectural Intent

Conceptual rendering architecture after this task:

```
index.html                  → document shell only
app.js                      → bootstrap / orchestrator entry
render-app-shell.js         → renders page shell
render-header.js            → renders Header into #site-header
render-prayer-section.js    → renders top Prayer section into #prayer-section
future renderers            → progressively add deeper Prayer section blocks, then Qibla / Ramadan / Footer
```

Clean ownership:
- App shell owns structure
- Header renderer owns header markup
- Prayer renderer owns only Prayer section markup
- Future tasks expand section details incrementally

---

## 6. Rendering Responsibility

### `render-prayer-section.js`

**Responsible for:**
- Rendering the static top Prayer section markup
- Mounting it into the Prayer section region
- Exposing predictable internal hooks for future tasks if useful

**Not responsible for:**
- Business logic
- Fetching data
- Calling services
- Managing location state
- Managing countdown timers
- Rendering the full lower section implementation

---

## 7. Recommended Section Structure

The final markup does not need to match this literally, but should follow this structure closely:

```html
<div class="prayer-section__inner container">
  <div class="prayer-section__intro">
    <div class="section-heading prayer-section__heading">
      <p class="section-heading__eyebrow">مواقيت الصلاة</p>
      <h1 class="section-heading__title">ابقَ على صلة بصلاتك أينما كنت</h1>
      <p class="section-heading__subtitle">
        عرض واضح وهادئ لمواقيت اليوم مع واجهة عربية عملية ومهيأة للربط لاحقًا بالبيانات الحقيقية.
      </p>
    </div>

    <div class="prayer-section__meta meta-row" aria-label="Prayer section context">
      <span class="prayer-section__location">دمشق، سوريا</span>
      <span class="prayer-section__divider" aria-hidden="true">•</span>
      <span class="prayer-section__date">الجمعة، 15 رمضان 1447</span>
    </div>
  </div>

  <div class="prayer-section__hero">
    <article class="card prayer-hero-card" aria-label="Featured prayer summary">
      <div class="prayer-hero-card__content">
        <p class="prayer-hero-card__label">الصلاة القادمة</p>
        <h2 class="prayer-hero-card__title">الفجر</h2>
        <p class="prayer-hero-card__time">04:37</p>
        <p class="prayer-hero-card__note">سيتم ربط العدّاد والوقت الفعلي في مرحلة لاحقة.</p>
      </div>

      <div class="prayer-hero-card__visual" aria-hidden="true"></div>
    </article>
  </div>
</div>
```

**Notes:**
- Exact wording can be adjusted if the approved design already defines stronger copy
- Values shown here are static placeholders only
- Keep the section visually meaningful without pretending real data exists yet
- Avoid over-nesting
- Keep future sub-block ownership obvious

---

## 8. Design Direction Requirements

The top Prayer section should visually align with the approved Mawquta page direction:
- Arabic-first and RTL-first
- Premium but calm
- Clean card-led hierarchy
- Soft visual depth
- Strong readability
- Clear section introduction
- Clear emphasis on the featured prayer card

> This section should feel like the hero/introduction of the product's main utility — not a dashboard dump or a generic landing block.

---

## 9. Content Direction

The content used in this task should be: static only, realistic, restrained, and clearly placeholder in nature where needed.

**Recommended content blocks:**
- Section eyebrow/title/subtitle
- Location + date meta row
- Featured "next prayer" summary card
- Short note making it clear that dynamic behavior comes later if needed

Do not overload this task with too many content elements.

---

## 10. Markup Quality Rules

### Semantics
- Use heading hierarchy correctly
- Use `<article>` for the main featured summary card if appropriate
- Meta information should remain readable and grouped
- Links/buttons should only appear if truly needed at this stage

### Accessibility
- Use `aria-label` where useful
- Decorative visuals should use `aria-hidden="true"`
- Do not create fake controls pretending to be interactive
- Keep text readable and meaningful

### Maintainability
- Class names should be clear and future-friendly
- Avoid deeply nested wrappers
- Avoid ambiguous naming
- Keep the renderer small and readable

### Styling Compatibility
- Use class names that can be styled cleanly within the current CSS foundation
- Align with `section-heading`, `card`, `meta-row`, and similar primitive direction where useful
- Do not assume final detailed section CSS already exists

---

## 11. Recommended API Shape

**Suggested file export:**

```js
export function renderPrayerSection(rootElement) {
  // render static top prayer section UI into rootElement
}
```

**Expected usage:**
1. Query `#prayer-section`
2. If missing, exit safely
3. Call `renderPrayerSection(prayerRoot)` after app shell and header mount

---

## 12. Mount Flow Expectations

At this stage, the render flow should become:

1. Query `#app`
2. Render app shell
3. Query `#site-header`
4. Render Header
5. Query `#prayer-section`
6. Render top Prayer section
7. Stop cleanly

> A good result: app shell mounts → header mounts → top Prayer section mounts → no other section content rendered yet.

---

## 13. Implementation Notes

When implementing this task:
- Prioritize structural clarity over feature behavior
- Make the Prayer section visually meaningful even if still static
- Keep the top section elegant and restrained
- Avoid adding fake countdown behavior
- Avoid prematurely rendering full prayer cards/table structures unless minimally required for composition
- Prepare the renderer for future enhancement without coupling it to live data or services

> The result should feel like the first major product section of the final page.

---

## 14. Workflow Note

- Development happens on the `dev` branch
- Task documents focus on execution scope only
- Repository workflow details are managed outside the task blueprint

---

## 15. Definition of Done

- [ ] `src/js/ui/sections/render-prayer-section.js` exists
- [ ] Top Prayer section is rendered programmatically into `#prayer-section`
- [ ] Section includes intro/heading, meta information, and a featured prayer card area
- [ ] Content is static only
- [ ] `app.js` (or current render flow) mounts the Prayer section cleanly after shell and header rendering
- [ ] No business logic or service integration was added
- [ ] No countdown/live prayer timing logic was introduced
- [ ] No Qibla/Ramadan implementation was introduced
- [ ] Markup remains semantic, readable, and RTL-friendly
- [ ] Result aligns with the approved Mawquta design direction

---

## 16. Final Instruction

Implement S1-T6 — Top Prayer Section Static UI professionally and conservatively.

Build the top Prayer section as the first major visible utility block in Mawquta.

- Do not overbuild
- Do not drift into live data, countdown logic, or full lower-section implementation
- Create a clean static Prayer section that prepares the project for the next UI tasks
