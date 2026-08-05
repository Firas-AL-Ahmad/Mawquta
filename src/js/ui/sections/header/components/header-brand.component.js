export function renderHeaderBrand(brandLogoPath) {
  return `
    <a href="#hero-section" class="site-header__brand" aria-label="مواقتا — الصفحة الرئيسية">
      <img
        class="site-header__brand-image"
        src="${brandLogoPath}"
        alt="مواقتا"
        width="128"
        height="40"
        loading="eager"
        decoding="async"
      />
    </a>
  `;
}
