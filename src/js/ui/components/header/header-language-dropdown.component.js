function renderHeaderLanguageOption(option) {
  const selectedClass = option.isSelected ? " is-selected" : "";
  const ariaSelected = option.isSelected ? "true" : "false";

  return `
    <button
      type="button"
      class="hdr-lang__option${selectedClass}"
      role="option"
      aria-selected="${ariaSelected}"
      data-lang-option
      data-lang-value="${option.value}"
      data-lang-label="${option.label}"
      data-lang-code="${option.code}"
      data-lang-flag="${option.flagPath}"
    >
      <img
        class="hdr-lang__flag"
        src="${option.flagPath}"
        alt=""
        width="20"
        height="15"
        loading="lazy"
        decoding="async"
      />
      <span class="hdr-lang__option-label">${option.label}</span>
      <span class="hdr-lang__option-code">${option.code}</span>
    </button>
  `;
}

export function renderHeaderLanguageDropdown({
  currentLanguage,
  options,
  menuId = "headerLanguageMenu",
}) {
  return `
    <div class="hdr-lang" data-lang-dropdown>
      <button
        type="button"
        class="hdr-chip hdr-lang__trigger"
        aria-label="اختيار اللغة"
        aria-haspopup="listbox"
        aria-expanded="false"
        aria-controls="${menuId}"
        data-lang-trigger
      >
        <img
          class="hdr-lang__flag"
          src="${currentLanguage.flagPath}"
          alt=""
          width="20"
          height="15"
          loading="lazy"
          decoding="async"
          data-lang-flag
        />
        <span class="hdr-lang__label" data-lang-label>${currentLanguage.label}</span>
        <span class="hdr-lang__code" data-lang-code>${currentLanguage.code}</span>
        <span class="hdr-lang__chevron" aria-hidden="true"></span>
      </button>

      <div
        class="hdr-lang__menu"
        id="${menuId}"
        role="listbox"
        aria-label="قائمة اللغات"
        data-lang-menu
        hidden
      >
        ${options.map((option) => renderHeaderLanguageOption(option)).join("\n")}
      </div>
    </div>
  `;
}
