const DEFAULT_HEADER_NAV_LINKS = [
  {
    href: "#hero-section",
    label: "الرئيسية",
    isActive: true,
  },
  {
    href: "#prayer-section",
    label: "مواقيت الصلاة",
  },
  {
    href: "#qibla-section",
    label: "القبلة",
  },
  {
    href: "#ramadan-section",
    label: "رمضان",
  },
];

function renderSingleHeaderNavLink(linkItem) {
  const activeClass = linkItem.isActive ? " site-header__link--active" : "";

  return `<a href="${linkItem.href}" class="site-header__link${activeClass}">${linkItem.label}</a>`;
}

export function renderHeaderNavigationLinks(
  navLinks = DEFAULT_HEADER_NAV_LINKS,
) {
  return `
    <div class="site-header__links">
      ${navLinks.map((linkItem) => renderSingleHeaderNavLink(linkItem)).join("\n")}
    </div>
  `;
}
