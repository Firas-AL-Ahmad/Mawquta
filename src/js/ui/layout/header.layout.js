import { HEADER_ICON_PATHS } from "../components/header/header-icon-paths.constants.js";
import { renderHeaderBrand } from "../components/header/header-brand.component.js";
import { renderHeaderMenuToggle } from "../components/header/header-menu-toggle.component.js";
import { renderHeaderNavigation } from "../components/header/header-navigation.component.js";

export function renderHeader(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="container-xl">
      <div class="site-header__inner">
        ${renderHeaderBrand(HEADER_ICON_PATHS.brandLogo)}
        ${renderHeaderMenuToggle()}
        ${renderHeaderNavigation(HEADER_ICON_PATHS)}
      </div>
    </div>
  `;

  return rootElement;
}
