export function renderHeader(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="site-header__inner container">
      <div class="site-header__brand">
        <a href="#app-shell" class="brand-mark" aria-label="العودة إلى أعلى الصفحة">
          <span class="brand-mark__icon" aria-hidden="true"></span>
          <span class="brand-mark__text">مَوْقُوتًا</span>
        </a>
      </div>

      <nav class="site-header__nav" aria-label="Primary navigation">
        <a href="#prayer-section" class="site-header__link is-active">مواقيت الصلاة</a>
        <a href="#qibla-section" class="site-header__link">القبلة</a>
        <a href="#ramadan-section" class="site-header__link">رمضان</a>
      </nav>

      <div class="site-header__actions">
        <button type="button" class="btn btn--ghost site-header__location-trigger">
          <span class="site-header__location-label">اختر المدينة</span>
        </button>
      </div>
    </div>
  `;

  return rootElement;
}
