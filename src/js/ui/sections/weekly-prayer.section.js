import { renderPrayerWeek } from "../components/weekly-prayer/prayer-week-table.component.js";
import { renderSectionHeadWithCity } from "../components/section/section-head.component.js";
import { renderSectionDivider } from "../components/section/section-divider.component.js";

export function renderWeeklyPrayerSection(rootElement, viewModel = {}) {
  void viewModel;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="weekly-prayer-section" id="weekly" aria-label="مواقيت الصلاة الأسبوعية">
      <div class="container-xl">
        ${renderSectionHeadWithCity({
          headClassName: "weekly-prayer-section__head",
          cityWrapperClassName: "weekly-prayer-section__city",
          eyebrowClassName: "weekly-prayer-section__eyebrow",
          cityTitleClassName: "weekly-prayer-section__name",
          cityDataAttribute: "data-weekly-city",
          cityName: "دمشق، سوريا",
          meta: {
            className: "section-city__meta weekly-prayer-section__meta section-head__meta",
            text: "محدث اليوم",
          },
          badgeClassName: "weekly-prayer-section__badge",
          badgeText: "الأسبوعية",
        })}

        ${renderPrayerWeek()}
      </div>
    </section>

    ${renderSectionDivider()}
  `;

  return rootElement;
}
