import { renderWeeklyPrayerTableCard } from "./components/prayer-week-table.component.js";
import { renderWeeklyPrayerSectionHead } from "./components/weekly-prayer-section-head.component.js";
import { renderSectionDivider } from "../../shared/components/section/section-divider.component.js";

export function renderWeeklyPrayerSection(rootElement, sectionData = {}) {
  void sectionData;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="weekly-prayer-section" id="weekly" aria-label="مواقيت الصلاة الأسبوعية">
      <div class="container-xl">
        ${renderWeeklyPrayerSectionHead({
          cityName: "دمشق، سوريا",
          metaText: "محدث اليوم",
        })}

        ${renderWeeklyPrayerTableCard()}
      </div>
    </section>

    ${renderSectionDivider()}
  `;

  return rootElement;
}
