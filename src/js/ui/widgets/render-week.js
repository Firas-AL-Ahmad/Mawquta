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

const FALLBACK_ROW_MESSAGES = {
  loading: "جاري تحميل بيانات المواقيت الأسبوعية...",
  unavailable: "بيانات المواقيت الأسبوعية غير متاحة حالياً.",
};

function resolvePrayerWeekState(state) {
  return state === "loading" ? "loading" : "unavailable";
}

function getPrayerWeekTableHeaderMarkup() {
  return PRAYER_WEEK_COLUMNS.map(
    (columnName) => `<th scope="col">${columnName}</th>`,
  ).join("");
}

function getFallbackRowMarkup(state = "unavailable") {
  const fallbackState = resolvePrayerWeekState(state);

  return `
    <tr class="prayer-week__row prayer-week__row--fallback prayer-week__row--${fallbackState}">
      <td colspan="8">${FALLBACK_ROW_MESSAGES[fallbackState]}</td>
    </tr>
  `;
}

function getPrayerWeekTableRowsMarkup(rows = [], state = "ready") {
  const safeRows = Array.isArray(rows)
    ? rows.filter((row) => row && typeof row === "object")
    : [];

  if (!safeRows.length) {
    return getFallbackRowMarkup(state);
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

export function renderPrayerWeek(rootElement, rows = [], options = {}) {
  if (!rootElement) {
    return null;
  }

  const state = options?.state || "ready";

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
            ${getPrayerWeekTableRowsMarkup(rows, state)}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return rootElement;
}
