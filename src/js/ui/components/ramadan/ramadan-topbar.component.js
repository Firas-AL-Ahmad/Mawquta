function renderRamadanTopbarAction() {
  return `
    <div class="ramadan-topbar__action-shell">
      <button
        type="button"
        class="ramadan-topbar__action sec-head__action"
        aria-label="اختيار المدينة"
        data-bs-toggle="modal"
        data-bs-target="#qiblaCityModal"
      >
        اختيار المدينة
      </button>
    </div>
  `;
}

function renderRamadanTopbarChip(chipConfig) {
  return `
    <div class="ramadan-topbar__chip ${chipConfig.chipClassName}">
      <div class="ramadan-topbar__chip-content">
        <span class="ramadan-topbar__chip-label-wrap">
          <span class="ramadan-topbar__chip-label">${chipConfig.label}</span>
          <span class="ramadan-topbar__icon ${chipConfig.iconClassName} sec-head__icon" aria-hidden="true"></span>
        </span>
        ${chipConfig.values
          .map(
            (valueText) =>
              `<span class="ramadan-topbar__chip-value">${valueText}</span>`,
          )
          .join("\n")}
      </div>
    </div>
  `;
}

function renderRamadanTopbarSummary(moonAndStarsPath) {
  return `
    <div class="ramadan-topbar__summary sec-head__main">
      <span class="ramadan-topbar__blessing sec-head__badge">
        <span class="ramadan-topbar__blessing-label">رمضان مبارك</span>
        <img class="ramadan-topbar__blessing-icon sec-head__icon" src="${moonAndStarsPath}" alt="" loading="lazy" decoding="async" />
      </span>

      <h2 class="ramadan-topbar__month sec-head__title" data-ramadan-month>رمضان 2026</h2>

      <span class="ramadan-topbar__meta sec-head__meta">
        <span class="ramadan-topbar__meta-value">الثلاثاء / 18:00 / 22 مارس 2026</span>
        <span class="ramadan-topbar__meta-prefix">آخر تحديث:</span>
      </span>
    </div>
  `;
}

export function renderRamadanTopbar(iconPaths) {
  const topbarChips = [
    {
      chipClassName: "ramadan-topbar__chip--date",
      label: "اليوم 15",
      iconClassName: "ramadan-topbar__icon--calendar",
      values: ["6", "رمضان"],
    },
    {
      chipClassName: "ramadan-topbar__chip--city",
      label: "المدينة:",
      iconClassName: "ramadan-topbar__icon--location",
      values: ["دمشق، سوريا"],
    },
  ];

  return `
    <div class="ramadan-topbar sec-head sec-head--ramadan" aria-label="بيانات رمضان">
      ${renderRamadanTopbarAction()}
      ${topbarChips.map((chipConfig) => renderRamadanTopbarChip(chipConfig)).join("\n")}
      ${renderRamadanTopbarSummary(iconPaths.moonAndStars)}
    </div>
  `;
}
