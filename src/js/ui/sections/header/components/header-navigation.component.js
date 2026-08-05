import { renderHeaderNavigationLinks } from "./header-navigation-links.component.js";
import { renderHeaderControls } from "./header-controls.component.js";

export function renderHeaderNavigation(iconPaths) {
  return `
    <nav class="site-header__nav" id="siteNav" role="navigation" aria-label="التنقل الرئيسي">
      ${renderHeaderNavigationLinks()}
      ${renderHeaderControls(iconPaths)}
    </nav>
  `;
}
