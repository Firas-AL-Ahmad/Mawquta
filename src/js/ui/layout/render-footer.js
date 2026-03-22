export function renderFooter(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="container-xl px-3 px-sm-4 px-lg-5">
      <div class="row g-4">
        <div class="col-12 col-md-4">
          <a href="#hero-section" class="footer-brand" aria-label="مواقتا">
            <span class="footer-brand__logo" aria-hidden="true">م</span>
            <span class="footer-brand__name">مواقتا</span>
          </a>
          <p class="footer-desc">موقع متخصص لمواقيت الصلاة والأذان والقبلة لجميع مدن العالم. نوفر بيانات دقيقة معتمدة على أفضل طرق الحساب الفلكي.</p>
        </div>

        <div class="col-6 col-md-2 offset-md-1">
          <p class="footer-heading">الموقع</p>
          <ul class="footer-links">
            <li><a href="#hero-section">الرئيسية</a></li>
            <li><a href="#prayer-section">الصلاة</a></li>
            <li><a href="#qibla-section">القبلة</a></li>
            <li><a href="#ramadan-section">رمضان</a></li>
          </ul>
        </div>

        <div class="col-6 col-md-2">
          <p class="footer-heading">المعلومات</p>
          <ul class="footer-links">
            <li><a href="#">عن مواقتا</a></li>
            <li><a href="#">الخصوصية</a></li>
            <li><a href="#">الشروط</a></li>
            <li><a href="#">الأسئلة الشائعة</a></li>
          </ul>
        </div>

        <div class="col-12 col-md-3">
          <p class="footer-heading">تواصل معنا</p>
          <div class="footer-contact">
            <p>البريد: info@mawquta.app</p>
            <p>دمشق، سوريا</p>
          </div>
        </div>
      </div>

      <div class="footer-divider"></div>

      <div class="footer-bottom">
        <p>© 2026 مواقتا — جميع الحقوق محفوظة</p>
        <div class="footer-social" aria-label="وسائل التواصل الاجتماعي">
          <a href="#" aria-label="تويتر">X</a>
          <a href="#" aria-label="فيسبوك">f</a>
          <a href="#" aria-label="إنستغرام">in</a>
        </div>
      </div>
    </div>
  `;

  return rootElement;
}
