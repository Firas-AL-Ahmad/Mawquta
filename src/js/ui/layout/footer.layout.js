import { FOOTER_ICON_PATHS } from "../components/footer/footer-icon-paths.constants.js";
import { renderFooterMainContent } from "../components/footer/footer-main-content.component.js";
import { renderFooterBottomBar } from "../components/footer/footer-bottom-bar.component.js";

export function renderFooter(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    ${renderFooterMainContent(FOOTER_ICON_PATHS)}
    ${renderFooterBottomBar()}
  `;

  return rootElement;
}

