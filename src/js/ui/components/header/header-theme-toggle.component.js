export function renderHeaderThemeToggle(themeIconPath) {
  return `
    <button type="button" class="header-chip header-chip--icon" aria-label="تبديل السمة">
      <img
        class="header-chip__icon"
        src="${themeIconPath}"
        alt=""
        width="18"
        height="18"
        loading="lazy"
        decoding="async"
      />
    </button>
  `;
}

