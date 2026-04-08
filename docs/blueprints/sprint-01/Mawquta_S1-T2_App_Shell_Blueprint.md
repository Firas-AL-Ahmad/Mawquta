# Mawquta — Sprint 01 / Task 02
## App Shell Blueprint

### Goal
Convert `src/index.html` into a **minimal app entry point** that only owns:
- document metadata
- global stylesheet loading
- font loading
- a single application mount root
- the module entry script

This task exists to establish a clean page bootstrapping layer before rendering the approved UI sections.

---

## Why This Task Matters

The approved UI will be rendered through the new UI architecture:
- `ui/layout/`
- `ui/sections/`
- `ui/widgets/`
- `ui/components/`
- `ui/interactions/`

Therefore, `index.html` must **not** become a second rendering system.
It should remain a thin document shell, while the real UI is mounted by JavaScript.

This keeps the architecture consistent, testable, and easier to extend during later integration tasks.

---

## Scope of S1-T2

### In Scope
- Clean up `src/index.html`
- Keep only the document shell
- Add one root mount node for the application
- Ensure CSS entry file is loaded correctly
- Ensure `app.js` is loaded as an ES module
- Set Arabic/RTL document defaults
- Add clean metadata and accessible baseline attributes

### Out of Scope
- No section markup inside `index.html`
- No prayer cards markup
- No qibla markup
- No ramadan table markup
- No footer markup
- No modal markup
- No data fetching
- No integration with services yet

---

## Approved `index.html` Responsibility

`src/index.html` should only be responsible for:

1. Document semantics
2. SEO/basic metadata
3. Direction/language defaults
4. Loading CSS
5. Mounting the app root
6. Loading the JS entry module

It should **not** own the visible feature UI.

---

## Approved Minimal Structure

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mawquta — Prayer Times</title>
    <meta
      name="description"
      content="Mawquta provides prayer times, qibla direction, and Ramadan timing information in a clean Arabic-first interface."
    />

    <!-- Fonts -->
    <!-- Keep font loading here if the project uses external web fonts -->

    <!-- Styles -->
    <link rel="stylesheet" href="./css/main.css" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="./js/app.js"></script>
  </body>
</html>
```

---

## Required Implementation Rules

### 1) Root Mount Node
Use a **single** mount node:

```html
<div id="app"></div>
```

Do not create multiple page roots for top-level sections.
The layout renderer will own the full page composition later.

### 2) Language and Direction
The document must start with:

```html
<html lang="ar" dir="rtl">
```

This reflects the approved Arabic-first, RTL-first UI direction.

### 3) CSS Entry
Load only the CSS entry file from `index.html`:

```html
<link rel="stylesheet" href="./css/main.css" />
```

`main.css` should remain the central stylesheet entry point.
Other CSS files are imported through the agreed architecture.

### 4) Script Entry
Load the runtime through:

```html
<script type="module" src="./js/app.js"></script>
```

Do not inline scripts in `index.html`.
Do not add section-specific scripts here.

### 5) Head Cleanliness
Keep the `<head>` clean and intentional.
Only include:
- charset
- viewport
- title
- description
- favicon if available
- font links if approved
- CSS entry file

Avoid clutter and duplicate meta tags.

---

## What Must Be Removed from `index.html`

If any of the following already exists in `index.html`, remove it during this task:

- Header markup
- Navigation lists
- Prayer time cards
- Qibla section structure
- Ramadan section structure
- Footer structure
- City modal structure
- Hardcoded tables
- Inline styles
- Inline scripts
- Temporary section placeholders outside the app root

All visible UI must later come from renderers.

---

## Accessibility Baseline

The shell should include a clean accessibility baseline even before visible UI rendering begins.

### Recommended basics
- Use correct `lang` and `dir`
- Keep `title` meaningful
- Keep `meta description` relevant
- Avoid empty `body` without a mount node
- Avoid script placement that blocks rendering unnecessarily

### Optional but acceptable
If the project wants a no-JS fallback message later, it can be added carefully using `<noscript>`.
This is optional for S1-T2 and should remain minimal.

Example:

```html
<noscript>
  This application requires JavaScript to display interactive prayer timing features.
</noscript>
```

Only add it if the project wants explicit no-script communication.

---

## Suggested Final `index.html` Checklist

- [ ] `<!DOCTYPE html>` exists
- [ ] `<html lang="ar" dir="rtl">` is set
- [ ] charset meta exists
- [ ] viewport meta exists
- [ ] title is set
- [ ] description meta exists
- [ ] fonts are linked only if needed
- [ ] `./css/main.css` is loaded
- [ ] `<div id="app"></div>` exists
- [ ] `./js/app.js` is loaded as `type="module"`
- [ ] no feature markup remains in the file
- [ ] no inline script remains
- [ ] no inline style remains

---

## Expected Relationship with Later Tasks

### After S1-T2
The project will be ready for:
- `S1-T3` — CSS entry and stylesheet architecture wiring
- `S1-T4` — `render-app-shell.js`
- section-by-section UI rendering

### Important
This task must be completed before full section implementation starts.
Otherwise the project risks splitting UI responsibility between HTML and JS.

---

## GitHub Best Practices for This Task

This task should be executed using **clean repository workflow practices**.
The goal is not only to make the code work, but to keep the repository understandable, traceable, and safe for future feature work.

### Branch Strategy
Create a dedicated branch for the task.

Suggested branch naming:

```text
feature/s1-t2-app-shell
```

Alternative acceptable naming:

```text
feat/s1-t2-app-shell
```

Do not commit this work directly to `main` unless the repository is intentionally using trunk-only development and that rule is already established.

### Commit Scope
Keep commits **small and atomic**.
Do not mix unrelated changes.

Recommended commit sequence:

```text
chore: simplify index.html to app shell
chore: wire main.css and app.js entry points
```

Or, if done in one atomic change:

```text
feat: convert index.html into minimal app shell
```

### Commit Message Guidance
Use clear, conventional-style commit messages:
- `feat:` for new functional structure
- `chore:` for project housekeeping
- `refactor:` only if restructuring existing code without changing behavior

Avoid vague messages such as:
- `update file`
- `changes`
- `fix stuff`

### Pull Request Expectations
If the repository uses PRs, the PR should:
- focus only on S1-T2
- explain what was removed from `index.html`
- explain what remains in `index.html`
- confirm that section markup is intentionally deferred to renderers

Suggested PR title:

```text
S1-T2: Convert index.html into minimal app shell
```

### Review Checklist for GitHub
Before merge, verify:
- no unrelated files were changed
- no service files were touched unnecessarily
- no hidden UI markup remains in `index.html`
- paths to `main.css` and `app.js` are correct
- the app still boots without console errors caused by entry path issues

### Repository Hygiene
- Keep formatting consistent
- Preserve existing architecture decisions
- Do not rename files unless required by the task
- Do not introduce temporary hacks that later tasks must clean up
- If a migration note is useful, record it in the PR description or a temporary checklist issue

---

## Completion Criteria for S1-T2

Task S1-T2 is considered complete when:
1. `src/index.html` is reduced to a clean app shell
2. Only one application mount root remains
3. CSS is loaded through `main.css`
4. JS boots through `app.js` as a module
5. Arabic/RTL document defaults are correctly set
6. No visible feature section markup remains in `index.html`
7. The repository change is isolated and understandable in Git history

---

## Important Constraints

- Keep the vanilla architecture intact
- Do not render sections directly in `index.html`
- Do not integrate real data yet
- Do not refactor services in this task
- Do not reintroduce deprecated state patterns
- Keep changes limited to the purpose of the task

---

## Next Task After Completion

After S1-T2 is complete, move to:

### `S1-T3 — CSS Entry and Stylesheet Wiring`

That task will define how the new stylesheet architecture is connected and prepared for section implementation.
