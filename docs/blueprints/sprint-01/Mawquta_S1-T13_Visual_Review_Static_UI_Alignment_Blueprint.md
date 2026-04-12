# 🔍 Mawquta — S1-T13 Visual Review & Static UI Alignment Blueprint

## Task ID
`S1-T13 — Visual Review & Static UI Alignment`

## Purpose
This task introduces the **final visual audit and alignment pass** for Sprint 01 after the full static page has already been implemented.

The goal is to review the current static UI holistically and correct any remaining visual inconsistencies so the Mawquta page feels:
- cohesive
- intentional
- visually aligned
- ready to close Sprint 01 professionally

This task must remain intentionally limited to:
- visual review
- static UI alignment
- small presentation-level adjustments
- hierarchy/spacing/consistency refinement
- readiness confirmation for closing the static UI sprint

This task is about **review and alignment**, not new feature implementation.

---

# 1) Primary Objective
Perform a final visual and structural review of the current static Mawquta page and apply any small alignment fixes needed so Sprint 01 can be considered visually complete.

At the end of this task, the project should have:
- stronger visual consistency across all sections
- improved spacing and hierarchy alignment
- consistent surface/ornament balance
- cleaner static UI readiness for later integration phases
- no drift into feature work or architecture changes

This task is the final visual bridge between:
- static UI implementation
- and future functional/data-binding phases

---

# 2) In Scope

## Required work
- Review the page as a whole from top to bottom
- Compare all implemented static sections against the approved Mawquta direction
- Identify and fix small issues such as:
  - inconsistent spacing
  - inconsistent heading rhythm
  - uneven section breathing room
  - card balance inconsistencies
  - ornament/surface imbalance
  - weak visual transitions between sections
  - mismatched text scale usage
  - minor alignment problems in RTL layout
  - weak footer closure or overly strong footer emphasis
- Keep all fixes small, disciplined, and presentation-only
- Preserve the current architecture and renderer ownership
- Keep the page ready for later integration without markup churn unless necessary

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** add new sections
- Do **not** introduce new product features
- Do **not** add interactions or behavior
- Do **not** start data integration
- Do **not** refactor services/state/business logic
- Do **not** redesign the page from scratch
- Do **not** perform major layout restructuring
- Do **not** expand section content substantially
- Do **not** turn review work into an uncontrolled polish spiral

This task must remain strictly focused on **final static visual review and alignment**.

---

# 4) Likely Files Involved

## Update only as needed
- `src/css/sections.css`
- `src/css/components.css`
- `src/css/layout.css`
- `src/css/base.css` only if a very small global alignment fix is needed
- renderer files only if a very small semantic/markup cleanup is truly required

## Important
Prefer CSS-side alignment first.
Avoid renderer changes unless a markup issue is genuinely blocking clean visual consistency.

---

# 5) Architectural Intent
The architecture after this task should remain the same:

- `render-app-shell.js` → owns page shell
- `render-header.js` → owns header
- `render-prayer-section.js` → owns Prayer section
- `render-qibla-section.js` → owns Qibla section
- `render-ramadan-section.js` → owns Ramadan section
- `render-footer.js` → owns Footer

This task should **not** blur ownership.
It only validates and refines the final static presentation.

---

# 6) Review Areas

## Global Page Rhythm
Review:
- section spacing consistency
- top-to-bottom breathing rhythm
- relationship between large sections and the surrounding shell
- overall sense of vertical pacing

## Header
Review:
- visual weight vs page content
- spacing of brand/nav/action regions
- balance between header surface and first section

## Prayer Section
Review:
- intro → hero → daily cards → weekly table flow
- balance between cards and table
- visual hierarchy of the featured prayer card
- whether the section still feels calm and readable

## Qibla Section
Review:
- spacing around the compass card
- relationship between intro text and card
- visual weight of the compass area vs surrounding content

## Ramadan Section
Review:
- summary card emphasis
- calmness of warm accent treatment
- readability of the Ramadan info surface

## Footer
Review:
- closure quality
- visual restraint
- spacing and density
- whether it feels like a polished end to the page instead of an afterthought

## Ornament Layer
Review:
- whether decorative treatments support the design rather than compete with it
- whether gradients/glows are balanced
- whether any area feels too flat or too noisy

---

# 7) Visual Quality Rules

## Consistency first
- consistent spacing
- consistent heading rhythm
- consistent card treatment
- consistent surface language

## Readability first
- preserve strong contrast
- preserve text clarity
- preserve scanability in RTL layout

## Restraint first
- prefer small precise fixes
- avoid adding visual complexity just because a section feels “empty”

## Professional closure first
- the result should look ready for handoff into later integration work
- not like an unfinished mock sitting on top of a good architecture

---

# 8) Allowed Fix Types
Examples of acceptable fixes in this task:
- adjust section padding/margins
- rebalance card spacing
- refine heading spacing
- tighten or relax footer density
- reduce or soften an overly strong decorative treatment
- improve table/card spacing harmony
- fix a weak divider/surface transition
- improve consistent text sizing or line-height in a narrow area
- small semantic markup cleanup if absolutely necessary

Examples of unacceptable fixes:
- adding new content blocks
- introducing new feature affordances
- redesigning whole sections
- adding interaction logic
- changing product scope

---

# 9) Review Method Expectation
The review should be performed as a **structured visual audit**, not random tweaking.

A good implementation flow is:
1. inspect the page top-to-bottom
2. identify concrete visual inconsistencies
3. apply only small targeted fixes
4. re-check the full page holistically
5. stop once the page feels aligned and Sprint-01-ready

Avoid endless “one more small tweak” behavior.

---

# 10) Implementation Notes for Copilot / Agent
When implementing this task:
- treat the page as already built
- behave like a final visual reviewer, not a feature implementer
- preserve all architecture boundaries
- prefer the smallest fix that solves the issue
- keep the page calm, premium, and cohesive
- stop once the page is clearly aligned enough to close the static sprint

The result should feel like a **final static UI alignment pass**, not a new design phase.

---

# 11) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 12) Definition of Done
S1-T13 is complete only when all of the following are true:

- [ ] the full static page has been visually reviewed top-to-bottom
- [ ] small alignment fixes have been applied where needed
- [ ] section spacing and hierarchy feel consistent
- [ ] the ornament/surface layer feels balanced
- [ ] readability and contrast remain strong
- [ ] no new features or logic were introduced
- [ ] architecture ownership remains unchanged
- [ ] the page feels visually ready to close Sprint 01

---

# 13) Final Instruction
Implement **S1-T13 — Visual Review & Static UI Alignment** professionally and conservatively.

Use this task to perform the final visual audit and small refinement pass needed to close Sprint 01 cleanly.

Do not overbuild.
Do not redesign the page.
Do not introduce behavior or logic.
Refine only what is needed so the static Mawquta page feels cohesive, polished, and ready for the next phase.
