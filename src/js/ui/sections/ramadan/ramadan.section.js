import {
  renderRamadanCountdown,
  renderRamadanMonthTable,
} from "./components/ramadan-blocks.component.js";
import { RAMADAN_SECTION_ICON_PATHS } from "./components/ramadan-section-icon-paths.constants.js";
import { renderRamadanTopbar } from "./components/ramadan-topbar.component.js";
import { renderSectionDivider } from "../../shared/components/section/section-divider.component.js";

export function renderRamadanSection(rootElement, sectionData = {}) {
  void sectionData;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="ramadan-section" id="ramadan" aria-label="قسم رمضان">
      <div class="container-xl">
        ${renderRamadanTopbar(RAMADAN_SECTION_ICON_PATHS)}

        ${renderRamadanCountdown()}

        <div data-ramadan-data></div>
      </div>
    </section>

    ${renderSectionDivider()}

    <div class="container-xl">
      ${renderRamadanMonthTable()}
    </div>
  `;

  return rootElement;
}
