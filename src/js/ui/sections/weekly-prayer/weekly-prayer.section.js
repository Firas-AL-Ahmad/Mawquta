import { renderWeeklyPrayerSectionHead } from "./components/weekly-prayer-section-head.component.js";
import { renderSectionDivider } from "../../shared/components/section/section-divider.component.js";

function renderWeeklyPrayerLoadingState() {
  return '<div class="weekly-prayer-loading" role="status" aria-label="جارٍ تحميل مواقيت الصلاة الأسبوعية">جارٍ تحميل مواقيت الأسبوع…</div>';
}

export function renderWeeklyPrayerSection(rootElement, sectionData = {}) {
  const { cityName = "دمشق، سوريا", metaText = "جارٍ التحميل…" } =
    sectionData;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="weekly-prayer-section" id="weekly" aria-label="مواقيت الصلاة الأسبوعية">
      <div class="container-xl">
        ${renderWeeklyPrayerSectionHead({
          cityName,
          metaText,
        })}

        <div class="weekly-prayer-data" data-weekly-data>
          ${renderWeeklyPrayerLoadingState()}
        </div>
      </div>
    </section>

    ${renderSectionDivider()}
  `;

  return rootElement;
}
