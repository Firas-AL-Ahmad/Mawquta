export function renderFooter(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="site-footer__inner container">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <a href="#app-shell" class="site-footer__brand-link" aria-label="العودة إلى أعلى الصفحة">
            <span class="site-footer__brand-text">مَوْقُوتًا</span>
          </a>
          <p class="site-footer__summary">
            واجهة عربية هادئة لمتابعة مواقيت الصلاة، اتجاه القبلة، وملخص رمضان ضمن تجربة واضحة ومهيأة للتطوير لاحقًا.
          </p>
        </div>

        <nav class="site-footer__nav" aria-label="روابط أقسام الصفحة">
          <a href="#prayer-section" class="site-footer__link">مواقيت الصلاة</a>
          <a href="#qibla-section" class="site-footer__link">القبلة</a>
          <a href="#ramadan-section" class="site-footer__link">رمضان</a>
        </nav>

        <div class="site-footer__meta">
          <p class="site-footer__note">
            قد تختلف المواقيت ونتائج الحساب باختلاف المدينة وطريقة الحساب المعتمدة.
          </p>
          <a href="#" class="site-footer__external-link" aria-label="رابط GitHub (مرجع ثابت في هذه المرحلة)">
            GitHub
          </a>
        </div>
      </div>

      <div class="site-footer__bottom">
        <p class="site-footer__copyright">© Mawquta — Static UI Phase</p>
      </div>
    </div>
  `;

  return rootElement;
}
