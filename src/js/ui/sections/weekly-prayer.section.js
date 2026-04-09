import { renderPrayerWeek } from "../components/weekly-prayer/prayer-week-table.component.js";

export function renderWeeklyPrayerSection(rootElement, viewModel = {}) {
  void viewModel;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="weekly-sec" id="weekly" aria-label="مواقيت الصلاة الأسبوعية">
      <div class="container-xl">
        <div class="sec-head weekly-sec__head">
          <div class="sec-city weekly-sec__city sec-head__main">
            <div class="sec-city__eyebrow weekly-sec__eyebrow">
              <span class="sec-city__eyebrow-icon sec-head__icon" aria-hidden="true"></span>
              <span>مواقيت الصلاة في</span>
            </div>
            <h2 class="sec-city__name weekly-sec__name sec-head__title" data-weekly-city>دمشق، سوريا</h2>
            <span class="sec-city__meta weekly-sec__meta sec-head__meta">محدث اليوم</span>
          </div>
          <span class="sec-badge weekly-sec__badge sec-head__badge">الأسبوعية</span>
        </div>

        ${renderPrayerWeek()}
      </div>
    </section>

    <hr class="sec-divider" />
  `;

  return rootElement;
}