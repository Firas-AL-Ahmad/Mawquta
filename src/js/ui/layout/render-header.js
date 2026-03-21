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
  <div class="site-header__inner" data-node-id="2140:7784" dir="rtl">
    <div class="site-header__surface">
      <a href="#app-shell" class="site-header__brand" aria-label="${HEADER_BACK_TO_TOP_ARIA}" data-node-id="2140:7785">
        <img
          src="./assets/icons/Header/header-logo-Light.svg"
          alt=""
          aria-hidden="true"
          class="site-header__brand-logo"
          loading="lazy"
        />
      </a>

      <nav class="site-header__nav" aria-label="Primary navigation" data-node-id="2144:7810">
        <a href="#prayer-section" class="site-header__link site-header__link--active" aria-current="page" data-node-id="2144:7813">${HEADER_PRAYER_LABEL}</a>
        <a href="#qibla-section" class="site-header__link" data-node-id="2144:7812">${HEADER_QIBLA_LABEL}</a>
        <a href="#ramadan-section" class="site-header__link" data-node-id="2144:7811">${getRamadanNavLabel()}</a>
      </nav>

      <div class="site-header__controls" data-node-id="2144:7798">
        <div class="site-header__chip site-header__chip--icon-only" data-node-id="2284:10995" aria-hidden="true">
          <img src="./assets/icons/Header/header-moon-icon.svg" alt="" class="site-header__moon-icon" loading="lazy" />
        </div>

        <div class="site-header__language-picker">
          <button
            type="button"
            class="site-header__chip site-header__chip--language site-header__language-trigger"
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
          class="site-header__chip site-header__chip--location site-header__location-trigger"
          data-node-id="2284:11660"
        >
        <img src="./assets/icons/Header/location-icon.svg" alt="" class="site-header__location-icon" aria-hidden="true" loading="lazy" />
        <span class="site-header__location-label">${HEADER_LOCATION_FALLBACK_LABEL}</span>
        </button>
      </div>
    </div>
  </div>
`;

  return rootElement;
}
