import { renderFooterBrand } from "./footer-brand.component.js";
import { renderFooterContactColumn } from "./footer-contact-column.component.js";
import { renderFooterLinksColumn } from "./footer-links-column.component.js";

const FOOTER_INFO_LINKS = [
  { href: "#", label: "عن مواقتا" },
  { href: "#", label: "الخصوصية" },
  { href: "#", label: "الشروط" },
  { href: "#", label: "الأسئلة الشائعة" },
];

const FOOTER_SITE_LINKS = [
  { href: "#hero-section", label: "الرئيسية" },
  { href: "#prayer-section", label: "الصلاة" },
  { href: "#qibla-section", label: "القبلة" },
  { href: "#ramadan-section", label: "رمضان" },
];

export function renderFooterMainContent(iconPaths) {
  return `
    <div class="footer-content container-xl">
      <div class="footer-main-grid">
        ${renderFooterBrand(iconPaths)}

        <div class="footer-main-col-group">
          ${renderFooterContactColumn(iconPaths)}

          ${renderFooterLinksColumn({
            modifierClass: "footer-main-col--info",
            heading: "المعلومات",
            links: FOOTER_INFO_LINKS,
          })}

          ${renderFooterLinksColumn({
            modifierClass: "footer-main-col--links",
            heading: "الموقع",
            links: FOOTER_SITE_LINKS,
          })}
        </div>
      </div>

      <p class="footer-legal-note">قد تختلف المواقيت المعروضة قليلًا حسب المدينة المختارة والجهة المحلية المعتمدة.</p>
    </div>
  `;
}
