export function renderHeaderMenuToggle() {
  return `
    <button
      type="button"
      class="site-header__menu-toggle header-menu-toggle ms-auto d-lg-none"
      id="navToggle"
      aria-label="فتح القائمة"
      aria-controls="siteNav"
      aria-expanded="false"
    >
      <span></span><span></span><span></span>
    </button>
  `;
}

