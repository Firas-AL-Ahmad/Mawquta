import { renderFooterSocialLinks } from "./footer-social-links.component.js";

export function renderFooterBrand(iconPaths) {
  return `
    <div class="footer-main-col footer-main-col--brand">
      <a href="#hero-section" class="footer-brand" aria-label="مواقتا">
        <img class="footer-brand__logo-img" src="${iconPaths.logo}" alt="شعار مواقتا" />
      </a>
      <p class="footer-desc">موقع بسيط يساعدك على متابعة مواقيت الصلاة، اتجاه القبلة، وإمساكية رمضان بشكل واضح وسهل الاستخدام.</p>
      ${renderFooterSocialLinks(iconPaths)}
    </div>
  `;
}
