import { renderPrayerCards } from "../components/daily-prayer/prayer-cards.component.js";
import { renderSectionHeadWithCity } from "../components/section/section-head.component.js";
import { renderSectionDivider } from "../components/section/section-divider.component.js";

export function renderDailyPrayerSection(rootElement, viewModel = {}) {
  void viewModel;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="daily-sec" id="daily" aria-label="مواقيت الصلاة اليومية">
      <div class="container-xl">
        ${renderSectionHeadWithCity({
          headClassName: "daily-sec__head",
          cityWrapperClassName: "daily-sec__city",
          eyebrowClassName: "daily-sec__eyebrow",
          cityTitleClassName: "daily-sec__name",
          cityDataAttribute: "data-daily-city",
          cityName: "دمشق، سوريا",
          meta: {
            mode: "paired",
            className: "sec-city__meta daily-sec__meta sec-head__meta",
            valueClassName: "daily-sec__meta-value",
            valueText: "متبقي حتى صلاة العصر",
            prefixClassName: "daily-sec__meta-prefix",
            prefixText: "الحالة:",
          },
          badgeClassName: "daily-sec__badge",
          badgeText: "اليومية",
        })}

        <div class="ps-track" role="list" aria-label="بطاقات الصلوات اليومية">
          ${renderPrayerCards()}
        </div>
      </div>
    </section>

    ${renderSectionDivider()}
  `;

  return rootElement;
}