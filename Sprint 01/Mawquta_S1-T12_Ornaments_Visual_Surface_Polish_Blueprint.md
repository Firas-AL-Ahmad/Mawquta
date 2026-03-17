# ✨ Mawquta — S1-T12 Ornaments & Visual Surface Polish Blueprint

## Task ID
`S1-T12 — Ornaments & Visual Surface Polish`

## Purpose
This task introduces the **visual ornament and surface polish layer** for the Mawquta page after the major static UI sections have already been implemented.

The goal is to refine the page visually by adding or completing:
- background ornaments
- decorative surfaces
- subtle visual depth
- section-level decorative accents
- quiet premium polish aligned with the approved design

This task must remain intentionally limited to:
- decorative/static visual refinement
- non-interactive visual elements
- CSS-compatible ornament structure where needed
- restrained aesthetic polish

This task is about **visual surface polish only**.
It is **not** about data integration, layout restructuring, new UI sections, or behavior logic.

---

# 1) Primary Objective
Refine the static Mawquta page visually so it feels closer to the approved design language by completing the ornamental/background/polish layer.

At the end of this task, the project should have:
- decorative visual support where needed
- more refined page depth and layering
- cleaner section transitions
- ornamental/background treatment aligned with the product tone
- no change to business logic or UI ownership boundaries

This task is the visual bridge between:
- a fully rendered static page
- and the final static visual review before moving deeper into later phases

---

# 2) In Scope

## Required work
- Review the existing static page sections and identify missing decorative/polish elements that are part of the approved design direction
- Add restrained visual ornaments and surface polish where appropriate
- Focus on areas such as:
  - app-shell/page background treatment
  - section decorative accents
  - subtle decorative shapes/patterns
  - surface layering and quiet depth
  - card-related visual refinement if strictly decorative
- Keep all additions static and presentation-only
- Ensure changes stay compatible with the current CSS foundation and renderer structure
- Preserve readability and hierarchy while improving visual finish

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** add new sections
- Do **not** restructure major layout composition
- Do **not** change information architecture
- Do **not** add interactive behavior
- Do **not** add animation logic beyond trivial visual CSS if absolutely necessary
- Do **not** introduce data integration
- Do **not** refactor render flow architecture
- Do **not** modify services/state/business logic
- Do **not** use heavy visual effects that harm clarity
- Do **not** turn polish work into a full redesign pass

This task must remain strictly focused on **ornaments and visual surface polish**.

---

# 4) Likely Files Involved

## Update only as needed
- `src/css/sections.css`
- `src/css/components.css`
- `src/css/layout.css`
- `src/css/themes.css` only if a missing decorative token is truly needed
- relevant renderers only if a minimal decorative wrapper/element is necessary

## Important
Do not introduce broad renderer rewrites just to add decorative UI.
Markup changes should remain minimal and purposeful.

---

# 5) Architectural Intent
The architecture after this task should still look structurally the same:

- `render-app-shell.js` → owns page shell
- `render-header.js` → owns header
- `render-prayer-section.js` → owns Prayer section
- `render-qibla-section.js` → owns Qibla section
- `render-ramadan-section.js` → owns Ramadan section
- `render-footer.js` → owns Footer

This task should **not** blur ownership.
It only refines visual presentation.

---

# 6) Visual Direction
The page should feel:
- Arabic-first
- RTL-first
- calm
- premium
- readable
- spiritually oriented but not theatrical
- modern and restrained
- softly layered rather than noisy

The polish should help the page feel complete without becoming decorative clutter in a fancy costume.

---

# 7) Recommended Areas of Refinement

## App Shell / Page Background
Possible refinements:
- subtle background layer
- soft radial or geometric accents
- quiet top/bottom ornamental balance
- better depth behind major sections

## Header
Possible refinements:
- subtle divider/shadow/surface distinction
- restrained background polish
- small visual strengthening of brand/nav separation

## Prayer Section
Possible refinements:
- hero card visual depth
- subtle supporting background accents
- gentle differentiation between intro / cards / week block

## Qibla Section
Possible refinements:
- more refined card surface
- subtle visual support around compass area
- restrained spiritual/geomtric decorative cues if aligned with design

## Ramadan Section
Possible refinements:
- calm highlighted surface tone
- subtle decorative warmth
- clearer separation between summary content and surrounding space

## Footer
Possible refinements:
- calmer closing surface
- stronger section closure feeling
- restrained top divider or background treatment

---

# 8) Ornament Rules

## Decorative elements must be:
- static only
- visually restrained
- non-interactive
- semantically ignorable where appropriate
- compatible with accessibility and readability

## Decorative elements must NOT:
- compete with primary content
- reduce text contrast
- introduce fake functionality
- create visual noise
- imply data or logic

If decorative wrappers/elements are added in markup, they should use:
- clear naming
- `aria-hidden="true"` when purely decorative

---

# 9) Styling Quality Rules

## Readability first
- preserve content clarity
- preserve contrast
- preserve scannability

## Restraint first
- prefer subtle depth over loud ornament
- prefer fewer better accents over many weak ones

## Consistency first
- align with current token system
- align with current section naming direction
- avoid one-off decorative hacks unless absolutely justified

## Maintainability first
- keep decorative CSS grouped logically
- avoid deeply entangled selectors
- avoid random magic-number sprawl if a token or reusable pattern can be used

---

# 10) Markup Change Rules
If markup changes are necessary:
- keep them minimal
- add only what is needed for the approved visual polish
- avoid restructuring section internals
- avoid changing renderer responsibilities
- use `aria-hidden="true"` for purely decorative nodes

If CSS alone can achieve the effect cleanly, prefer CSS-only refinement.

---

# 11) Implementation Notes for Copilot / Agent
When implementing this task:
- start from the current static page as the base
- refine what already exists rather than inventing new UI
- add polish where the current page still feels visually flat
- preserve the clean section-by-section architecture already established
- avoid touching logic or future integration hooks
- keep the page elegant, not busy

The result should feel like the static page has been visually completed, not rebuilt.

---

# 12) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 13) Definition of Done
S1-T12 is complete only when all of the following are true:

- [ ] the page has received restrained decorative/background/surface polish
- [ ] the changes remain static and presentation-only
- [ ] no new sections or major structural changes were introduced
- [ ] no behavior, service, or business logic was added
- [ ] readability and contrast remain strong
- [ ] decorative additions feel aligned with the approved Mawquta design direction
- [ ] renderer ownership remains clean
- [ ] the page feels visually closer to the intended final static design

---

# 14) Final Instruction
Implement **S1-T12 — Ornaments & Visual Surface Polish** professionally and conservatively.

Use this task to complete the decorative and surface polish layer of the Mawquta static page.

Do not overbuild.
Do not redesign the page.
Do not introduce behavior or logic.
Refine the existing static UI so it feels visually complete and ready for final static review.
