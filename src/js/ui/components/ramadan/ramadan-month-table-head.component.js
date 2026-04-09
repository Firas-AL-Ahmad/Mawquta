function renderRamadanTableHeadChip(iconPaths) {
  const chipItems = ["1448هـ", "2026م", "رمضان"];

  return `
    <span class="ramadan-table-head__chip" aria-label="شهر رمضان">
      ${chipItems
        .map(
          (chipItemText) =>
            `<span class="ramadan-table-head__chip-item">${chipItemText}</span>`,
        )
        .join("\n")}
      <img class="ramadan-table-head__chip-icon" src="${iconPaths.ramadan}" alt="" loading="lazy" decoding="async" />
    </span>
  `;
}

function renderRamadanTableHeadActions(iconPaths) {
  const actionButtons = [
    {
      label: "تحميل",
      iconPath: iconPaths.download,
    },
    {
      label: "مشاركة",
      iconPath: iconPaths.share,
    },
  ];

  return `
    <div class="ramadan-table-head__actions" aria-label="إجراءات الجدول">
      ${actionButtons
        .map(
          (actionButton) =>
            `<button type="button" class="ramadan-table-action"><span>${actionButton.label}</span><img src="${actionButton.iconPath}" alt="" loading="lazy" decoding="async" /></button>`,
        )
        .join("\n")}
    </div>
  `;
}

export function renderRamadanMonthTableHead(iconPaths) {
  return `
    <div class="ramadan-table-head">
      <div class="ramadan-table-head__content">
        <h2 class="ramadan-table-title">جدول شهر رمضان</h2>
        ${renderRamadanTableHeadChip(iconPaths)}
      </div>

      ${renderRamadanTableHeadActions(iconPaths)}
    </div>
  `;
}
