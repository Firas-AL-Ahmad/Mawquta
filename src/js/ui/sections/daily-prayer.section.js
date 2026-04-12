import { renderPrayerCards } from "../components/daily-prayer/prayer-cards.component.js";
import { renderSectionHeadWithCity } from "../components/section/section-head.component.js";
import { renderSectionDivider } from "../components/section/section-divider.component.js";

export function renderDailyPrayerSection(rootElement, viewModel = {}) {
  void viewModel;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="daily-prayer-section" id="daily" aria-label="مواقيت الصلاة اليومية">
      <div class="container-xl">
        ${renderSectionHeadWithCity({
          headClassName: "daily-prayer-section__head",
          cityWrapperClassName: "daily-prayer-section__city",
          eyebrowClassName: "daily-prayer-section__eyebrow",
          cityTitleClassName: "daily-prayer-section__name",
          cityDataAttribute: "data-daily-city",
          cityName: "دمشق، سوريا",
          meta: {
            mode: "paired",
            className: "section-city__meta daily-prayer-section__meta section-head__meta",
            valueClassName: "daily-prayer-section__meta-value",
            valueText: "متبقي حتى صلاة العصر",
            prefixClassName: "daily-prayer-section__meta-prefix",
            prefixText: "الحالة:",
          },
          badgeClassName: "daily-prayer-section__badge",
          badgeText: "اليومية",
        })}

        <div class="daily-prayer-cards-track" role="list" aria-label="بطاقات الصلوات اليومية">
          ${renderPrayerCards()}
        </div>
      </div>
    </section>

    ${renderSectionDivider()}
  `;

  return rootElement;
}
