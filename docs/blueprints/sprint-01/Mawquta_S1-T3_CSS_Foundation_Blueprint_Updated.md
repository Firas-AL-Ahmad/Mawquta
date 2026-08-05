# 🎨 Mawquta — S1-T3 CSS Foundation Blueprint (Updated)

## Task ID
`S1-T3 — CSS Foundation Setup`

## Important Workflow Note
في هذه المرحلة من المشروع، التنفيذ العملي يتم على فرع التطوير الحالي:

`dev`

هذا هو الفرع المعتمد لتنفيذ التاسكات والتأكد من أن كل شيء يعمل بصورة سليمة قبل الدمج لاحقًا مع الفرع الأساسي.

بناءً على ذلك:
- لا حاجة لتكرار تعليمات GitHub workflow داخل هذا الملف
- لا حاجة لاقتراح branch names جديدة هنا
- لا حاجة لإضافة commit/PR instructions داخل التاسك نفسه
- المطلوب هنا هو **تنفيذ التاسك فقط** وفق النطاق المعتمد

---

## Purpose
This task establishes the **foundational CSS architecture** for the Mawquta UI implementation.

The goal is **not** to fully style all sections yet.
The goal is to create a clean, scalable, maintainable CSS base that supports the upcoming UI implementation tasks:
- `S1-T4 — render-app-shell.js`
- `S1-T5 — Header`
- `S1-T6+ — Prayer / Qibla / Ramadan / Footer sections`

This task must follow the approved project direction:
- Vanilla architecture only
- Clear separation of responsibilities
- CSS organized by purpose
- RTL-first support
- Design-token-based styling
- Best practices suitable for long-term maintenance

---

# 1) Primary Objective
Create and wire the **CSS foundation layer** for the project so the repository has a professional, scalable styling structure before any major UI rendering begins.

At the end of this task, the project should have:
- a clear CSS file structure
- `main.css` as the single stylesheet entry point
- foundational design tokens
- global base rules
- layout foundations
- reusable component foundations
- placeholder section styling structure
- small utility helpers

This task is about **foundation**, not full UI implementation.

---

# 2) In Scope

## Required work
- Create the CSS files below inside `src/css/`:
  - `themes.css`
  - `base.css`
  - `layout.css`
  - `components.css`
  - `sections.css`
  - `utilities.css`
  - `main.css`

- Ensure `main.css` becomes the **single public CSS entry point**.
- `main.css` should import the other CSS files in the correct order.
- Define core design tokens in `themes.css`.
- Add base/reset/global document rules in `base.css`.
- Add app/page/container/layout foundations in `layout.css`.
- Add reusable UI primitives in `components.css`.
- Add section-level placeholder rules in `sections.css`.
- Add minimal utility helpers in `utilities.css`.
- Keep the structure ready for the next tasks without overbuilding.

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** implement `render-app-shell.js`
- Do **not** build section markup
- Do **not** style the full Header in final detail
- Do **not** style the full Prayer section in final detail
- Do **not** style the full Qibla section in final detail
- Do **not** style the full Ramadan section in final detail
- Do **not** implement responsive polish beyond foundational readiness
- Do **not** add service integration
- Do **not** refactor business logic
- Do **not** change runtime behavior in `app.js` unless absolutely required for stylesheet loading
- Do **not** introduce Bootstrap, Tailwind, or any framework layer

This task must remain strictly a **CSS foundation setup** task.

---

# 4) Required CSS File Structure

```text
src/css/
├─ themes.css
├─ base.css
├─ layout.css
├─ components.css
├─ sections.css
├─ utilities.css
└─ main.css
```

---

# 5) Responsibility of Each File

## `themes.css`
Contains only design tokens and theme-level variables.

### Should include
- color variables
- semantic surface/text variables
- border colors
- accent variables
- typography variables
- spacing scale variables
- radius variables
- shadow variables
- transition variables
- z-index tokens only if clearly needed

### Should NOT include
- actual section styling
- full component styling
- page layout styling

### Example categories
- `--color-bg`
- `--color-surface`
- `--color-card`
- `--color-text`
- `--color-text-muted`
- `--color-primary`
- `--color-primary-soft`
- `--color-border`
- `--font-family-base`
- `--font-family-heading`
- `--space-1 ... --space-n`
- `--radius-sm/md/lg/xl`
- `--shadow-sm/md/lg`
- `--transition-fast/base`

Use semantic naming where possible, not random color-name variables only.

---

## `base.css`
Contains foundational global rules.

### Should include
- minimal reset / normalization
- `html`, `body`
- `box-sizing: border-box`
- image/media defaults
- anchor/button/input inheritance rules where useful
- body font-family
- body background and text color
- line-height defaults
- smoothing / text-rendering where appropriate
- RTL-friendly defaults
- focus-visible base behavior

### Should NOT include
- section-specific styles
- large visual component styles

---

## `layout.css`
Contains page-level structural rules.

### Should include
- app root sizing
- page width rules
- `.container` or equivalent max-width system
- section spacing system
- vertical rhythm between major page blocks
- common grid/flex wrappers for future sections
- shell/layout-level wrappers

### Should NOT include
- component cosmetics
- detailed card appearance
- section-specific decoration

---

## `components.css`
Contains reusable UI primitives.

### Should include foundation styles for reusable patterns such as
- buttons
- cards
- chips / pills / badges
- icon wrappers
- section titles / section headers
- meta rows
- table shells
- state blocks (`loading`, `empty`, `error`) as generic primitives

These should remain generic and reusable.
Do not overfit them to one section yet.

---

## `sections.css`
Contains section-level placeholders and top-level section hooks.

### Should include only foundational hooks for sections such as
- `.site-header`
- `.prayer-section`
- `.qibla-section`
- `.ramadan-section`
- `.site-footer`

This file may include:
- top-level spacing
- internal section padding
- section background intent
- lightweight section wrappers

### Should NOT include
- detailed final styling of every child element
- large nested selector trees
- fully polished section implementation

Keep this file intentionally lightweight for now.

---

## `utilities.css`
Contains only **small and minimal helper utilities**.

### Examples
- `.hidden`
- `.visually-hidden`
- `.text-center`
- `.text-muted`
- `.is-active`
- `.sr-only`
- small display/state helpers only if needed

### Important rule
Do **not** turn this into a utility-first framework clone.
Keep it small and disciplined.

---

## `main.css`
This is the only stylesheet referenced by `index.html`.

### It should:
- import all CSS foundation files
- define import order clearly
- contain little to no styling itself

### Recommended order
```css
@import './themes.css';
@import './base.css';
@import './layout.css';
@import './components.css';
@import './sections.css';
@import './utilities.css';
```

---

# 6) Design Direction Requirements
The CSS foundation must match the approved Mawquta design direction:
- Arabic-first
- RTL-first
- calm and premium Islamic/product feel
- clean card-based structure
- soft but readable contrast
- scalable single-page UI architecture

The foundation should be ready to support:
- decorative backgrounds/patterns
- icon containers
- large feature cards
- data tables
- section headers
- subtle shadows and layered surfaces

---

# 7) Best Practice Rules for Implementation

## Naming
- Use consistent naming
- Prefer semantic class naming
- Avoid unclear abbreviations
- Avoid deep selector chains
- Avoid styling by tag name alone unless it is truly global

## CSS Architecture
- Keep files role-based
- Keep responsibilities separated
- Keep tokens centralized
- Keep section styles shallow
- Keep reusable patterns generic

## Scalability
- Write CSS as if more sections and states will be added later
- Avoid hardcoding values repeatedly when a token should exist
- Avoid copy-paste styling when a component primitive should exist

## Maintainability
- Prefer readable structure over clever tricks
- Group rules logically
- Keep comments useful but minimal
- Do not overengineer theme switching unless already required

---

# 8) Implementation Notes for Copilot / Agent
When implementing this task:
- prioritize clean architecture over premature visual detail
- keep the styling layer future-friendly for section rendering tasks
- prepare the codebase for the next step, which is app-shell rendering
- do not add fake UI markup just to test styles
- if a test hook is needed, keep it minimal and temporary

The result should feel like a strong foundation ready for real UI implementation, not a rushed styling dump.

---

# 9) Definition of Done
S1-T3 is complete only when all of the following are true:

- [ ] `src/css/` contains all required foundation files
- [ ] `main.css` imports all foundation files in correct order
- [ ] `index.html` references only `./css/main.css`
- [ ] theme tokens are defined in `themes.css`
- [ ] base global rules exist in `base.css`
- [ ] layout foundations exist in `layout.css`
- [ ] reusable primitive foundations exist in `components.css`
- [ ] lightweight section hooks exist in `sections.css`
- [ ] minimal helpers exist in `utilities.css`
- [ ] no section has been fully implemented yet
- [ ] no renderer or integration work was introduced
- [ ] task scope remained isolated to CSS foundation only

---

# 10) Final Instruction
Implement **S1-T3 — CSS Foundation Setup** professionally and conservatively.

The output should create a strong CSS architecture for the Mawquta project that aligns with:
- the approved file structure
- the current project architecture
- the final UI direction
- repository clarity
- long-term maintainability

Do not overbuild.
Do not drift into section implementation.
Build the foundation cleanly so the next UI tasks can be implemented with confidence.
