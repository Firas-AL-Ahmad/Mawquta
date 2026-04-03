export function renderHeader(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="container-xl">
      <div class="site-header__inner">
        <a href="#hero-section" class="site-header__brand" aria-label="مواقتا — الصفحة الرئيسية">
          <img
            class="site-header__brand-image"
            src="./assets/icons/Header/header-logo-Light.svg"
            alt="مواقتا"
            width="128"
            height="40"
            loading="eager"
            decoding="async"
          />
        </a>

        <button
          type="button"
          class="site-header__menu-toggle hdr-toggle ms-auto d-lg-none"
          id="navToggle"
          aria-label="فتح القائمة"
          aria-controls="siteNav"
          aria-expanded="false"
        >
          <span></span><span></span><span></span>
        </button>

        <nav class="site-header__nav" id="siteNav" role="navigation" aria-label="التنقل الرئيسي">
          <div class="site-header__links">
            <a href="#hero-section" class="site-header__link site-header__link--active">الرئيسية</a>
            <a href="#prayer-section" class="site-header__link">مواقيت الصلاة</a>
            <a href="#qibla-section" class="site-header__link">القبلة</a>
            <a href="#ramadan-section" class="site-header__link">رمضان</a>
          </div>

          <div class="site-header__controls">
            <button type="button" class="hdr-chip site-header__city" aria-label="تغيير المدينة">
              <svg
                class="hdr-chip__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                <circle cx="12" cy="9" r="2.5"/>
              </svg>
              <span class="hdr-chip__text">دمشق، سوريا</span>
            </button>

            <div class="hdr-lang" data-lang-dropdown>
              <button
                type="button"
                class="hdr-chip hdr-lang__trigger"
                aria-label="اختيار اللغة"
                aria-haspopup="listbox"
                aria-expanded="false"
                aria-controls="headerLanguageMenu"
                data-lang-trigger
              >
                <img
                  class="hdr-lang__flag"
                  src="./assets/icons/Header/flag-SY.svg"
                  alt=""
                  width="20"
                  height="15"
                  loading="lazy"
                  decoding="async"
                  data-lang-flag
                />
                <span class="hdr-lang__label" data-lang-label>العربية</span>
                <span class="hdr-lang__code" data-lang-code>SY</span>
                <span class="hdr-lang__chevron" aria-hidden="true"></span>
              </button>

              <div
                class="hdr-lang__menu"
                id="headerLanguageMenu"
                role="listbox"
                aria-label="قائمة اللغات"
                data-lang-menu
                hidden
              >
                <button
                  type="button"
                  class="hdr-lang__option is-selected"
                  role="option"
                  aria-selected="true"
                  data-lang-option
                  data-lang-value="ar"
                  data-lang-label="العربية"
                  data-lang-code="SY"
                  data-lang-flag="./assets/icons/Header/flag-SY.svg"
                >
                  <img
                    class="hdr-lang__flag"
                    src="./assets/icons/Header/flag-SY.svg"
                    alt=""
                    width="20"
                    height="15"
                    loading="lazy"
                    decoding="async"
                  />
                  <span class="hdr-lang__option-label">العربية</span>
                  <span class="hdr-lang__option-code">SY</span>
                </button>

                <button
                  type="button"
                  class="hdr-lang__option"
                  role="option"
                  aria-selected="false"
                  data-lang-option
                  data-lang-value="en"
                  data-lang-label="English"
                  data-lang-code="US"
                  data-lang-flag="./assets/icons/Header/flag-US.svg"
                >
                  <img
                    class="hdr-lang__flag"
                    src="./assets/icons/Header/flag-US.svg"
                    alt=""
                    width="20"
                    height="15"
                    loading="lazy"
                    decoding="async"
                  />
                  <span class="hdr-lang__option-label">English</span>
                  <span class="hdr-lang__option-code">US</span>
                </button>
              </div>
            </div>

            <button type="button" class="hdr-chip hdr-chip--icon" aria-label="تبديل السمة">
              <img
                class="hdr-chip__icon"
                src="./assets/icons/Header/header-moon-icon.svg"
                alt=""
                width="18"
                height="18"
                loading="lazy"
                decoding="async"
              />
            </button>
          </div>
        </nav>
      </div>
    </div>
  `;

  return rootElement;
}
