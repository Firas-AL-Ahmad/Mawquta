import { FOOTER_ICON_PATHS } from "./components/footer-icon-paths.constants.js";
import { renderFooterMainContent } from "./components/footer-main-content.component.js";
import { renderFooterBottomBar } from "./components/footer-bottom-bar.component.js";

export function renderFooterSection(rootElement, sectionData = {}) {
  void sectionData;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    ${renderFooterMainContent(FOOTER_ICON_PATHS)}
    ${renderFooterBottomBar()}
  `;

  return rootElement;
}
