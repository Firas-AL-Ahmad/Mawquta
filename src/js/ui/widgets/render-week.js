const PRAYER_WEEK_COLUMNS = [
  "اليوم",
  "التاريخ",
  "الفجر",
  "الشروق",
  "الظهر",
  "العصر",
  "المغرب",
  "العشاء",
];

const FALLBACK_ROW_MESSAGE = "بيانات المواقيت الأسبوعية غير متاحة حالياً.";

function getPrayerWeekTableHeaderMarkup() {
  return PRAYER_WEEK_COLUMNS.map(
    (columnName) => `<th scope="col">${columnName}</th>`,
  ).join("");
}

function getFallbackRowMarkup() {
  return `
    <tr class="prayer-week__row prayer-week__row--fallback">
      <td colspan="8">${FALLBACK_ROW_MESSAGE}</td>
    </tr>
  `;
}

function getPrayerWeekTableRowsMarkup(rows = []) {
  const safeRows = Array.isArray(rows)
    ? rows.filter((row) => row && typeof row === "object")
    : [];

  if (!safeRows.length) {
    return getFallbackRowMarkup();
  }

  return safeRows
    .map((rowData, rowIndex) => {
      const rowClass =
        rowIndex === 0
          ? "prayer-week__row prayer-week__row--featured"
          : "prayer-week__row";

      const cellsMarkup = [
        rowData.dayLabel,
        rowData.dateLabel,
        rowData.fajr,
        rowData.sunrise,
        rowData.dhuhr,
        rowData.asr,
        rowData.maghrib,
        rowData.isha,
      ]
        .map((cellValue) => `<td>${cellValue || "--:--"}</td>`)
        .join("");

      return `<tr class="${rowClass}">${cellsMarkup}</tr>`;
    })
    .join("");
}

export function renderPrayerWeek(rootElement, rows = []) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="prayer-week" aria-label="Weekly prayer times">
      <div class="table-shell prayer-week__table-shell">
        <table class="prayer-week__table">
          <thead>
            <tr>
              ${getPrayerWeekTableHeaderMarkup()}
            </tr>
          </thead>
          <tbody>
            ${getPrayerWeekTableRowsMarkup(rows)}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return rootElement;
}
