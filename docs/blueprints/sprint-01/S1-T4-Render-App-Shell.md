---
tags:
  - mawquta
  - sprint-1
  - task
status: in-progress
task_id: S1-T4
title: Render App Shell
---

# S1-T4 — Render App Shell

## Purpose

This task introduces the **first real UI rendering step** after the file-structure setup, minimal app shell setup, and CSS foundation setup.

The goal is to render the **top-level application shell programmatically** into `#app`, using a dedicated renderer, while keeping the implementation intentionally shallow and architecture-safe.

This task must:
- Move the project out of temporary shell-only bootstrap mode
- Establish the page-level DOM structure for the Mawquta UI
- Define clear mount points for upcoming section renderers
- Keep the implementation lightweight and foundation-oriented
- Avoid premature section detail rendering or integration work

> This task is about **page skeleton rendering**, not full section implementation.

---

## 1. Primary Objective

Create `render-app-shell.js` and use it to render the **top-level page structure** into `#app`.

At the end of this task, the project should:
- No longer rely only on an empty `#app`
- Render a stable page wrapper structure from JS
- Expose clear semantic mount regions for: header, prayer section, qibla section, ramadan section, footer
- Preserve a clean handoff point for the next tasks

This task is the architectural bridge between static shell-only bootstrapping and actual section-by-section UI implementation.

---

## 2. In Scope

**Required work:**
- Create `src/js/ui/layout/render-app-shell.js`
- Make `src/js/app.js` use `renderAppShell()` instead of remaining in shell-only no-op mode
- Render the top-level page structure into `#app`
- Create semantic wrappers and mount points for the main page regions
- Keep the output aligned with the approved page direction:
  - Site header region
  - Main content region
  - Prayer section region
  - Qibla section region
  - Ramadan section region
  - Site footer region
- Keep the rendered shell compatible with the CSS foundation already created in S1-T3
- Ensure markup is RTL-friendly and semantically structured
- Keep the implementation minimal, readable, and future-ready

---

## 3. Out of Scope

Do **not** do any of the following in this task:
- Fully implement header content
- Build final navigation UI
- Implement prayer cards
- Implement countdown markup in detail
- Implement qibla widget details
- Implement Ramadan table/details
- Render real business data
- Connect services or integration logic
- Refactor services or state management
- Create detailed section child markup beyond what is needed for shell scaffolding
- Introduce placeholder UI complexity that belongs to later tasks

> This task must remain strictly at the **app shell renderer level**.

---

## 4. Required Files

| Action | File |
|--------|------|
| Create | `src/js/ui/layout/render-app-shell.js` |
| Update | `src/js/app.js` |

No other files should require major modification unless absolutely necessary for this task.

---

## 5. Architectural Intent

Conceptual rendering flow after this task:

```
index.html              → document shell only
app.js                  → bootstrap / orchestrator entry
render-app-shell.js     → renders page-level structure
upcoming renderers      → fill each region in later tasks
```

Rendering order:
1. Mount app shell
2. Later mount layout/sections progressively
3. Later wire integration logic

---

## 6. Rendering Responsibility

### `render-app-shell.js`

**Responsible for:**
- Producing the top-level page wrapper markup
- Inserting it into `#app`
- Exposing stable semantic regions for future rendering steps

**Not responsible for:**
- Business logic
- Fetching data
- Calling services
- Managing location logic
- Rendering final section internals

---

## 7. Recommended DOM Structure

The final markup does not need to match this literally, but should follow this structure closely:

```html
<div class="app-shell" id="app-shell">
  <div class="app-shell__bg" aria-hidden="true"></div>

  <div class="app-shell__page">
    <header class="site-header" id="site-header" data-mount="header"></header>

    <main class="main-content" id="main-content">
      <section class="prayer-section" id="prayer-section" data-mount="prayer-section"></section>
      <section class="qibla-section" id="qibla-section" data-mount="qibla-section"></section>
      <section class="ramadan-section" id="ramadan-section" data-mount="ramadan-section"></section>
    </main>

    <footer class="site-footer" id="site-footer" data-mount="footer"></footer>
  </div>
</div>
```

**Notes:**
- Use semantic tags where appropriate
- Keep IDs predictable and stable
- `data-mount` markers are recommended for later section renderers
- Avoid over-nesting
- Keep the shell clean

---

## 8. `app.js` Expectations

`src/js/app.js` should be updated so that:
- It still checks for `#app`
- It imports and calls `renderAppShell()`
- It exits safely if mount root is missing
- It no longer stays in pure shell-only no-op mode
- It includes only minimal bootstrap responsibility for this stage

> For S1-T4, it is enough to: boot → mount the shell → stop there cleanly.

---

## 9. Markup Quality Rules

### Semantics
- `<header>` for header region
- `<main>` for page content
- `<section>` for main content areas
- `<footer>` for footer region

### Accessibility
- Use semantic structure correctly
- Decorative wrapper/background elements should use `aria-hidden="true"`
- Do not create fake interactive elements in this task

### Maintainability
- Class names should be clear and future-friendly
- IDs should not be ambiguous
- Avoid unnecessary wrappers
- Keep the markup shallow and legible

### Styling Compatibility
- Class names should align with the CSS foundation created in S1-T3
- Top-level section hooks should match the intended styling structure

---

## 10. Recommended API Shape

**Suggested file export:**

```js
export function renderAppShell(rootElement) {
  // render top-level shell into rootElement
}
```

**Expected usage in `app.js`:**
1. Query `#app`
2. If missing, exit safely
3. Call `renderAppShell(appRoot)`

Keep the API small and obvious.

---

## 11. Implementation Notes

When implementing this task:
- Prioritize architecture clarity over visual complexity
- Render only what is necessary to establish the shell
- Avoid adding detailed mock content inside sections unless absolutely needed for structural visibility
- Keep future section ownership clear
- Do not mix responsibilities across files

> The output should feel like a stable rendering foundation for the page, not like a partial implementation of all sections.

---

## 12. Workflow Note

- Development happens on the `dev` branch
- Task documents focus on execution scope only
- Repository workflow details are managed outside the task blueprint

---

## 13. Definition of Done

- [ ] `src/js/ui/layout/render-app-shell.js` exists
- [ ] `renderAppShell()` renders the page-level shell into `#app`
- [ ] `src/js/app.js` calls `renderAppShell()` cleanly
- [ ] Temporary shell-only bootstrap mode has been replaced appropriately
- [ ] App shell contains semantic regions for header, main, prayer, qibla, ramadan, and footer
- [ ] No detailed section implementation was introduced
- [ ] No business/integration/service logic was added
- [ ] Implementation remains aligned with the CSS foundation from S1-T3
- [ ] Page renders without relying on old hardcoded DOM from pre-S1-T2 structure

---

## 14. Final Instruction

Implement S1-T4 professionally and conservatively.

Build the first real page-level renderer for Mawquta so that the project moves from empty shell mode into a structured JS-rendered UI foundation.

- Do not overbuild
- Do not drift into section implementation
- Create only the structural app shell needed so the next UI tasks can proceed cleanly
