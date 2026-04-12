import {
  renderRamadanCountdown,
  renderRamadanMonthTable,
} from "../components/ramadan/ramadan-blocks.component.js";
import { RAMADAN_SECTION_ICON_PATHS } from "../components/ramadan/ramadan-section-icon-paths.constants.js";
import { renderRamadanTopbar } from "../components/ramadan/ramadan-topbar.component.js";
import { renderSectionDivider } from "../components/section/section-divider.component.js";

export function renderRamadanSection(rootElement, data = {}) {
  void data;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="ramadan-section" id="ramadan" aria-label="قسم رمضان">
      <div class="container-xl">
        ${renderRamadanTopbar(RAMADAN_SECTION_ICON_PATHS)}

        ${renderRamadanCountdown()}
      </div>
    </section>

    ${renderSectionDivider()}

    <div class="container-xl">
      ${renderRamadanMonthTable()}
    </div>
  `;

  return rootElement;
}
