export function renderHeader(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="container-xl px-3 px-sm-4 px-lg-5">
      <div class="site-header__inner">
        <a href="#hero-section" class="site-header__brand" aria-label="مواقتا — الصفحة الرئيسية">
          <span class="site-header__brand-logo" aria-hidden="true">م</span>
          <span>مواقتا</span>
        </a>

        <button
          type="button"
          class="site-header__menu-toggle hdr-toggle ms-auto d-lg-none"
          aria-label="فتح أو إغلاق قائمة التنقل"
          aria-controls="site-header-panel"
          data-bs-toggle="collapse"
          data-bs-target="#site-header-panel"
          aria-expanded="false"
        >
          <span></span><span></span><span></span>
        </button>

        <div class="site-header__panel collapse navbar-collapse" id="site-header-panel">
          <div class="site-header__panel-layout w-100">
            <nav class="site-header__nav" aria-label="القائمة الرئيسية">
              <a href="#hero-section" class="site-header__link site-header__link--active">الرئيسية</a>
              <a href="#prayer-section" class="site-header__link">الصلاة</a>
              <a href="#qibla-section" class="site-header__link">القبلة</a>
              <a href="#ramadan-section" class="site-header__link">رمضان</a>
            </nav>

            <div class="site-header__controls d-none d-lg-flex">
              <button type="button" class="hdr-chip" aria-label="تغيير المدينة">
                <svg class="hdr-chip__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                دمشق، سوريا
              </button>
              <button type="button" class="hdr-chip" aria-label="تغيير اللغة">
                <svg class="hdr-chip__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                العربية
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  return rootElement;
}
