import { renderDailyPrayerCards } from "./components/prayer-cards.component.js";
import { renderDailyPrayerSectionHead } from "./components/daily-prayer-section-head.component.js";
import { renderSectionDivider } from "../../shared/components/section/section-divider.component.js";

export function renderDailyPrayerSection(rootElement, sectionData = {}) {
  void sectionData;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="daily-prayer-section" id="daily" aria-label="مواقيت الصلاة اليومية">
      <div class="container-xl">
        ${renderDailyPrayerSectionHead({
          cityName: "دمشق، سوريا",
          statusLabel: "متبقي حتى صلاة العصر",
        })}

        <div class="daily-prayer-cards-track" role="list" aria-label="بطاقات الصلوات اليومية">
          ${renderDailyPrayerCards()}
        </div>
      </div>
    </section>

    ${renderSectionDivider()}
  `;

  return rootElement;
}
