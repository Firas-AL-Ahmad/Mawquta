export function renderFooter(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="footer-content container-xl">
      <div class="footer-main-grid">
        <div class="footer-main-col footer-main-col--brand">
          <a href="#hero-section" class="footer-brand" aria-label="مواقتا">
            <img class="footer-brand__logo-img" src="./assets/icons/sections/footer/footer-logo.svg" alt="شعار مواقتا" />
          </a>
          <p class="footer-desc">موقع بسيط يساعدك على متابعة مواقيت الصلاة، اتجاه القبلة، وإمساكية رمضان بشكل واضح وسهل الاستخدام.</p>
          <div class="footer-social-inline" aria-label="وسائل التواصل الاجتماعي">
            <a class="footer-social-inline__item" href="#" aria-label="Instagram">
              <img src="./assets/icons/sections/footer/instagram.svg" alt="" aria-hidden="true" />
              <span>@firas_a7mad</span>
            </a>
            <a class="footer-social-inline__item" href="#" aria-label="LinkedIn">
              <img src="./assets/icons/sections/footer/linkedin.svg" alt="" aria-hidden="true" />
              <span>Firas AL-Ahmad</span>
            </a>
            <a class="footer-social-inline__item" href="#" aria-label="GitHub">
              <img src="./assets/icons/sections/footer/github.svg" alt="" aria-hidden="true" />
              <span>Firas AL-Ahmad</span>
            </a>
          </div>
        </div>

        <div class="footer-main-col-group">
          <div class="footer-main-col footer-main-col--contact">
            <p class="footer-heading">تواصل معنا</p>
            <ul class="footer-contact-list">
              <li>
                <a href="mailto:firas.al.ahmad.mail@gmail.com">
                  <img src="./assets/icons/sections/footer/mail-open.svg" alt="" aria-hidden="true" />
                  <span>firas.al.ahmad.mail@gmail.com</span>
                </a>
              </li>
              <li>
                <a href="tel:+963937302533">
                  <img src="./assets/icons/sections/footer/calling-02.svg" alt="" aria-hidden="true" />
                  <span>+963 937 302 533</span>
                </a>
              </li>
            </ul>
          </div>

          <div class="footer-main-col footer-main-col--info">
            <p class="footer-heading">المعلومات</p>
            <ul class="footer-links">
              <li><a href="#">عن مواقتا</a></li>
              <li><a href="#">الخصوصية</a></li>
              <li><a href="#">الشروط</a></li>
              <li><a href="#">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          <div class="footer-main-col footer-main-col--links">
            <p class="footer-heading">الموقع</p>
            <ul class="footer-links">
              <li><a href="#hero-section">الرئيسية</a></li>
              <li><a href="#prayer-section">الصلاة</a></li>
              <li><a href="#qibla-section">القبلة</a></li>
              <li><a href="#ramadan-section">رمضان</a></li>
            </ul>
          </div>
        </div>
      </div>
      <p class="footer-legal-note">قد تختلف المواقيت المعروضة قليلًا حسب المدينة المختارة والجهة المحلية المعتمدة.</p>

    </div>

    <div class="footer-bottom">
      <p>© 2026 Mawquta. جميع الحقوق محفوظة. تم التطوير بواسطة: فراس الأحمد.</p>
    </div>
  `;

  return rootElement;
}

