import { renderPrayerWeek } from "../components/weekly-prayer/prayer-week-table.component.js";
import { renderSectionHeadWithCity } from "../components/section/section-head.component.js";
import { renderSectionDivider } from "../components/section/section-divider.component.js";

export function renderWeeklyPrayerSection(rootElement, viewModel = {}) {
  void viewModel;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="weekly-sec" id="weekly" aria-label="مواقيت الصلاة الأسبوعية">
      <div class="container-xl">
        ${renderSectionHeadWithCity({
          headClassName: "weekly-sec__head",
          cityWrapperClassName: "weekly-sec__city",
          eyebrowClassName: "weekly-sec__eyebrow",
          cityTitleClassName: "weekly-sec__name",
          cityDataAttribute: "data-weekly-city",
          cityName: "دمشق، سوريا",
          meta: {
            className: "sec-city__meta weekly-sec__meta sec-head__meta",
            text: "محدث اليوم",
          },
          badgeClassName: "weekly-sec__badge",
          badgeText: "الأسبوعية",
        })}

        ${renderPrayerWeek()}
      </div>
    </section>

    ${renderSectionDivider()}
  `;

  return rootElement;
}