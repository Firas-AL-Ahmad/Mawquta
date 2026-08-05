# 📅 Mawquta — S1-T8 Weekly Prayer Table Static UI Blueprint

## Task ID
`S1-T8 — Weekly Prayer Table Static UI`

## Purpose
This task extends the Prayer section by building the **weekly prayer table block** as a static, visual, programmatically rendered UI layer.

The goal is to implement the weekly table inside the existing Prayer section, while keeping the task intentionally limited to:
- static structure
- static visual content
- semantic table markup
- CSS-compatible classes
- realistic placeholder rows
- future-ready structure for later data binding

This task is about **weekly prayer table UI only**.
It is **not** about live prayer data, active-day logic, date calculations, or service integration.

---

# 1) Primary Objective
Render the **weekly prayer table block** into the Prayer section using a dedicated renderer or a clearly owned sub-rendering step within the Prayer section renderer.

At the end of this task, the project should have:
- a visible weekly prayer table under the existing Prayer section content
- a clean and readable table for several days of prayer times
- static placeholder data only
- a structure that can later be replaced or populated by real prayer/week data
- markup that fits the approved Mawquta design direction

This task is the visual bridge between:
- the daily prayer cards block
- and later weekly prayer integration

---

# 2) In Scope

## Required work
- Extend the Prayer section rendering so the weekly prayer table appears inside `#prayer-section`
- Prefer one of the following clean approaches:
  - create `src/js/ui/widgets/render-week.js` as a static weekly table renderer
  - or add a clearly separated sub-rendering block inside `render-prayer-section.js`
- Render a static weekly table with multiple rows
- Include realistic placeholder day/date values and prayer-time columns
- Use semantic table markup
- Keep the output clean, readable, and future-friendly
- Ensure class names align with current CSS foundation naming direction
- Keep the implementation presentation-only

---

# 3) Out of Scope
Do **not** do any of the following in this task:
- Do **not** use real prayer API data
- Do **not** implement day selection logic
- Do **not** implement expandable/collapsible table behavior
- Do **not** calculate current day or highlight it using runtime logic
- Do **not** connect services or business logic
- Do **not** add countdown logic
- Do **not** implement Qibla or Ramadan content
- Do **not** refactor services or state
- Do **not** add fake interactions pretending the table is already live

This task must remain strictly focused on **static weekly prayer table UI**.

---

# 4) Required Files

## Preferred options
### Option A — Preferred if architecture remains cleaner
- Create or update:
  - `src/js/ui/widgets/render-week.js`
- Update:
  - `src/js/ui/sections/render-prayer-section.js`
  - `src/js/app.js` only if necessary

### Option B — Acceptable if simpler for current stage
- Update:
  - `src/js/ui/sections/render-prayer-section.js`
  - `src/js/app.js` only if necessary

Use whichever option keeps responsibility clearer without over-fragmenting the codebase too early.

---

# 5) Architectural Intent
The architecture after this task should conceptually look like this:

- `render-app-shell.js` → renders page shell
- `render-header.js` → renders Header
- `render-prayer-section.js` → owns Prayer section composition
- `render-prayers.js` → renders daily prayer cards block
- `render-week.js` (optional/preferred) → renders weekly prayer table block
- future tasks → add real timing / countdown / integration

This preserves clean ownership:
- section renderer owns section composition
- weekly table renderer owns repeated row/table markup if extracted
- later logic can bind into a clear UI structure

---

# 6) Expected Responsibility

## If using `render-week.js`
This file should be responsible only for:
- rendering the static weekly prayer table block
- returning or injecting clean markup for the weekly table area
- keeping repeated row markup isolated and easy to upgrade later

It should **not**:
- fetch data
- call services
- calculate active day
- manage timers
- manage location or state

## If keeping logic inside `render-prayer-section.js`
Keep the weekly table block clearly separated and internally structured so it can be extracted later without confusion.

---

# 7) Recommended Table Columns
The exact structure can follow the approved design, but a strong default column set is:

- اليوم
- التاريخ
- الفجر
- الشروق
- الظهر
- العصر
- المغرب
- العشاء

These are **static placeholders only** for layout and visual composition.

If the approved design omits one column or uses a slightly different sequence, prioritize the design direction.

---

# 8) Recommended Placeholder Rows
Use realistic static placeholder rows such as:

- السبت — 14 رمضان — 04:37 — 06:02 — 12:18 — 15:47 — 18:31 — 19:56
- الأحد — 15 رمضان — 04:36 — 06:01 — 12:18 — 15:48 — 18:32 — 19:57
- الاثنين — 16 رمضان — 04:35 — 06:00 — 12:17 — 15:48 — 18:33 — 19:58
- الثلاثاء — 17 رمضان — 04:34 — 05:59 — 12:17 — 15:49 — 18:34 — 19:59
- الأربعاء — 18 رمضان — 04:33 — 05:58 — 12:17 — 15:49 — 18:35 — 20:00

These values are **static placeholders only** and must not imply live data.

---

# 9) Recommended DOM Structure
The final markup does **not** need to match this literally line-for-line, but it should follow this structure closely:

```html
<div class="prayer-week" aria-label="Weekly prayer times">
  <div class="table-shell prayer-week__table-shell">
    <table class="prayer-week__table">
      <thead>
        <tr>
          <th scope="col">اليوم</th>
          <th scope="col">التاريخ</th>
          <th scope="col">الفجر</th>
          <th scope="col">الشروق</th>
          <th scope="col">الظهر</th>
          <th scope="col">العصر</th>
          <th scope="col">المغرب</th>
          <th scope="col">العشاء</th>
        </tr>
      </thead>

      <tbody>
        <tr class="prayer-week__row prayer-week__row--featured">
          <td>السبت</td>
          <td>14 رمضان</td>
          <td>04:37</td>
          <td>06:02</td>
          <td>12:18</td>
          <td>15:47</td>
          <td>18:31</td>
          <td>19:56</td>
        </tr>

        <tr class="prayer-week__row">
          <td>الأحد</td>
          <td>15 رمضان</td>
          <td>04:36</td>
          <td>06:01</td>
          <td>12:18</td>
          <td>15:48</td>
          <td>18:32</td>
          <td>19:57</td>
        </tr>

        <tr class="prayer-week__row">
          <td>الاثنين</td>
          <td>16 رمضان</td>
          <td>04:35</td>
          <td>06:00</td>
          <td>12:17</td>
          <td>15:48</td>
          <td>18:33</td>
          <td>19:58</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
```

## Notes
- Use semantic `table`, `thead`, `tbody`, and `th scope="col"`
- A visually featured row is allowed if it remains purely presentational
- Avoid fake sorting/filtering controls
- Keep future data-binding replacement straightforward

---

# 10) Design Direction Requirements
The weekly prayer table should visually align with the approved Mawquta page direction:
- Arabic-first
- RTL-first
- calm and premium
- clean tabular readability
- strong contrast between headers and body rows
- no clutter
- restrained visual emphasis
- easy scan across rows and columns

This block should feel like a refined weekly information surface, not like a spreadsheet dump.

---

# 11) Content Direction
The content used in this task should be:
- static only
- realistic
- clean and restrained
- clearly safe as placeholder content
- not misleadingly “live”

If a row is visually featured, it must remain purely visual, not logical.

---

# 12) Markup Quality Rules

## Semantics
- use real table semantics
- use `th scope="col"` for headers
- keep row and cell structure consistent
- keep the table readable in RTL context

## Accessibility
- keep text readable
- do not create fake button behavior
- use `aria-label` on the table wrapper if useful
- do not create interactive semantics unless actual interaction exists

## Maintainability
- class names should be clear and future-friendly
- repeated row generation should be easy to read
- avoid deeply nested wrappers
- avoid hard-to-upgrade markup structures

## Styling Compatibility
- use primitives already aligned with current CSS foundation (`table-shell`, etc.)
- add future-friendly names like:
  - `prayer-week`
  - `prayer-week__table`
  - `prayer-week__row`
  - `prayer-week__row--featured`
- do not assume final detailed CSS implementation already exists

---

# 13) Recommended API Shape
A simple and clean approach is recommended.

## If extracted to widget renderer
```js
export function renderPrayerWeek(rootElement) {
  // render static weekly prayer table into rootElement
}
```

## If composed inside section renderer
Keep the table-generation logic clearly isolated in a helper function such as:
```js
function getPrayerWeekMarkup() {
  // return static weekly prayer table markup
}
```

Choose the option that keeps the architecture clearer at the current stage.

---

# 14) `app.js` / Mount Flow Expectations
At this stage, the render flow should remain conceptually:

1. render app shell
2. render header
3. render Prayer section
4. Prayer section includes top Prayer content + daily prayer cards + weekly prayer table
5. stop cleanly

Do **not** begin Qibla or Ramadan rendering yet.
Do **not** begin live timing integration.

---

# 15) Implementation Notes for Copilot / Agent
When implementing this task:
- prioritize semantic table quality over clever abstraction
- keep the output visually meaningful
- do not overcomplicate the table with pseudo-logic
- make the table easy to replace with real data later
- keep the feature static, disciplined, and easy to extend

The result should feel like the **weekly prayer surface** of the product is beginning to take shape.

---

# 16) Workflow Note
Implementation for this task should follow the currently adopted project workflow:
- development happens on the `dev` branch
- task documents focus on execution scope only
- repository workflow details are managed outside the task blueprint

---

# 17) Definition of Done
S1-T8 is complete only when all of the following are true:

- [ ] weekly prayer table is rendered inside `#prayer-section`
- [ ] the table uses static placeholder rows and times only
- [ ] the table uses semantic table markup
- [ ] the structure is readable and RTL-friendly
- [ ] the table block is compatible with the current CSS foundation
- [ ] the implementation remains presentation-only
- [ ] no real prayer data or countdown logic was introduced
- [ ] no day-selection/runtime highlight logic was introduced
- [ ] no Qibla/Ramadan implementation was introduced
- [ ] the result aligns with the approved Mawquta design direction

---

# 18) Final Instruction
Implement **S1-T8 — Weekly Prayer Table Static UI** professionally and conservatively.

Build the weekly prayer table as the next visible layer of the Prayer section in Mawquta.

Do not overbuild.
Do not drift into live data, day logic, or section interactions.
Create a clean static weekly prayer table that prepares the project for later real data binding.
