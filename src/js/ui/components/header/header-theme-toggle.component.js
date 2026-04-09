export function renderHeaderThemeToggle(themeIconPath) {
  return `
    <button type="button" class="hdr-chip hdr-chip--icon" aria-label="تبديل السمة">
      <img
        class="hdr-chip__icon"
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
