const HEADER_LANGUAGE_LABEL_AR = "\u0627\u0644\u0639\u0631\u0628\u064A\u0629";
const HEADER_LANGUAGE_LABEL_EN = "English";
const HEADER_LOCATION_FALLBACK_LABEL =
  "\u062F\u0645\u0634\u0642\u060C \u0633\u0648\u0631\u064A\u0627";
const HEADER_PRAYER_LABEL =
  "\u0645\u0648\u0627\u0642\u064A\u062A \u0627\u0644\u0635\u0644\u0627\u0629";
const HEADER_QIBLA_LABEL = "\u0627\u0644\u0642\u0628\u0644\u0629";
const HEADER_RAMADAN_LABEL = "\u0631\u0645\u0636\u0627\u0646";
const HEADER_BACK_TO_TOP_ARIA =
  "\u0627\u0644\u0639\u0648\u062F\u0629 \u0625\u0644\u0649 \u0623\u0639\u0644\u0649 \u0627\u0644\u0635\u0641\u062D\u0629";
const HEADER_MENU_TOGGLE_ARIA =
  "\u0641\u062A\u062D \u0623\u0648 \u0625\u063A\u0644\u0627\u0642 \u0642\u0627\u0626\u0645\u0629 \u0627\u0644\u062A\u0646\u0642\u0644";

function getRamadanNavLabel() {
  const year = new Date().getFullYear();
  if (!Number.isInteger(year) || year < 1000) {
    return HEADER_RAMADAN_LABEL;
  }

  return `${HEADER_RAMADAN_LABEL} ${year}`;
}

export function renderHeader(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
  <div class="site-header__inner" data-node-id="2140:7784">
    <nav class="site-header__surface navbar navbar-expand-lg" aria-label="Primary navigation">
      <div class="container-fluid site-header__container" data-node-id="2140:7785">
        <a
          href="#app-shell"
          class="site-header__brand navbar-brand me-lg-3"
          aria-label="${HEADER_BACK_TO_TOP_ARIA}"
        >
          <img
            src="./assets/icons/Header/header-logo-Light.svg"
            alt=""
            aria-hidden="true"
            class="site-header__brand-logo"
            loading="lazy"
          />
        </a>

        <button
          type="button"
          class="site-header__menu-toggle navbar-toggler ms-auto d-lg-none"
          aria-label="${HEADER_MENU_TOGGLE_ARIA}"
          aria-controls="site-header-panel"
          data-bs-toggle="collapse"
          data-bs-target="#site-header-panel"
          aria-expanded="false"
        >
          <img
            src="./assets/icons/Header/Hamburger-icon.svg"
            alt=""
            aria-hidden="true"
            class="site-header__menu-toggle-icon"
            loading="lazy"
          />
        </button>

        <div
          class="site-header__panel collapse navbar-collapse mt-3 mt-lg-0"
          id="site-header-panel"
        >
          <div class="site-header__panel-layout">
            <div class="site-header__column site-header__column--nav">
              <ul
                class="site-header__nav navbar-nav flex-column flex-lg-row align-items-stretch align-items-lg-center justify-content-lg-center gap-2 gap-lg-3 mb-0"
                data-node-id="2144:7810"
              >
                <li class="nav-item">
                  <a href="#prayer-section" class="site-header__link nav-link site-header__link--active" aria-current="page" data-node-id="2144:7813">${HEADER_PRAYER_LABEL}</a>
                </li>
                <li class="nav-item">
                  <a href="#qibla-section" class="site-header__link nav-link" data-node-id="2144:7812">${HEADER_QIBLA_LABEL}</a>
                </li>
                <li class="nav-item">
                  <a href="#ramadan-section" class="site-header__link nav-link" data-node-id="2144:7811">${getRamadanNavLabel()}</a>
                </li>
              </ul>
            </div>

            <div class="site-header__column site-header__column--controls">
              <div
                class="site-header__controls d-flex flex-column flex-sm-row flex-sm-wrap flex-lg-nowrap justify-content-start justify-content-lg-end align-items-stretch align-items-lg-center gap-2 gap-lg-3"
                data-node-id="2144:7798"
              >
                <div class="site-header__chip site-header__chip--icon-only" data-node-id="2284:10995" aria-hidden="true">
                  <img src="./assets/icons/Header/header-moon-icon.svg" alt="" class="site-header__moon-icon" loading="lazy" />
                </div>

                <div class="site-header__language-picker">
                  <button
                    type="button"
                    class="site-header__chip site-header__chip--trigger site-header__chip--language site-header__language-trigger"
                    data-node-id="2284:11659"
                    aria-haspopup="menu"
                    aria-controls="site-header-language-menu"
                    aria-expanded="false"
                  >
                    <span class="site-header__language-icon-wrap" aria-hidden="true">
                      <img src="./assets/icons/Header/arrow-Icon.svg" alt="" class="site-header__language-icon" loading="lazy" />
                    </span>
                    <span class="site-header__language-label">${HEADER_LANGUAGE_LABEL_AR}</span>
                    <img src="./assets/icons/Header/flag-SY.svg" alt="" class="site-header__flag" aria-hidden="true" loading="lazy" />
                  </button>

                  <div id="site-header-language-menu" class="site-header__language-menu" role="menu" hidden>
                    <button
                      type="button"
                      class="site-header__language-option is-selected"
                      role="menuitemradio"
                      aria-checked="true"
                      data-language="ar"
                    >
                      <img src="./assets/icons/Header/flag-SY.svg" alt="" class="site-header__language-option-flag" aria-hidden="true" loading="lazy" />
                      <span class="site-header__language-option-label">${HEADER_LANGUAGE_LABEL_AR}</span>
                    </button>
                    <button
                      type="button"
                      class="site-header__language-option"
                      role="menuitemradio"
                      aria-checked="false"
                      data-language="en"
                    >
                      <img src="./assets/icons/Header/flag-US.svg" alt="" class="site-header__language-option-flag" aria-hidden="true" loading="lazy" />
                      <span class="site-header__language-option-label">${HEADER_LANGUAGE_LABEL_EN}</span>
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  class="site-header__chip site-header__chip--trigger site-header__chip--location site-header__location-trigger"
                  data-node-id="2284:11660"
                >
                  <img src="./assets/icons/Header/location-icon.svg" alt="" class="site-header__location-icon" aria-hidden="true" loading="lazy" />
                  <span class="site-header__location-label">${HEADER_LOCATION_FALLBACK_LABEL}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
`;

  return rootElement;
}
