import { renderSectionHeadChip } from "../section/section-head-chip.component.js";

function renderRamadanTableHeadChip(iconPaths) {
  const chipItems = ["1448هـ", "2026م", "رمضان"];
  const chipText = chipItems.join(" ");

  return renderSectionHeadChip({
    tagName: "span",
    rootClassName: "ramadan-table-head__chip",
    text: chipText,
    iconType: "image",
    iconSrc: iconPaths.ramadan,
    iconAlt: "",
  });
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
        ${renderRamadanTableHeadChip(iconPaths)}
        <h2 class="ramadan-table-title">جدول شهر رمضان</h2>
      </div>

      ${renderRamadanTableHeadActions(iconPaths)}
    </div>
  `;
}
