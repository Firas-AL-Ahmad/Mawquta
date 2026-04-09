import { renderPrayerCards } from "../components/daily-prayer/prayer-cards.component.js";

export function renderDailyPrayerSection(rootElement, viewModel = {}) {
  void viewModel;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="daily-sec" id="daily" aria-label="مواقيت الصلاة اليومية">
      <div class="container-xl">
        <div class="sec-head daily-sec__head">
          <div class="sec-city daily-sec__city sec-head__main">
            <div class="sec-city__eyebrow daily-sec__eyebrow">
              <span class="sec-city__eyebrow-icon sec-head__icon" aria-hidden="true"></span>
              <span>مواقيت الصلاة في</span>
            </div>
            <h2 class="sec-city__name daily-sec__name sec-head__title" data-daily-city>دمشق، سوريا</h2>
            <span class="sec-city__meta daily-sec__meta sec-head__meta">
              <span class="daily-sec__meta-value">متبقي حتى صلاة العصر</span>
              <span class="daily-sec__meta-prefix">الحالة:</span>
            </span>
          </div>
          <span class="sec-badge daily-sec__badge sec-head__badge">اليومية</span>
        </div>

        <div class="ps-track" role="list" aria-label="بطاقات الصلوات اليومية">
          ${renderPrayerCards()}
        </div>
      </div>
    </section>

    <hr class="sec-divider" />
  `;

  return rootElement;
}