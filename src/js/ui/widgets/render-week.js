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

const PRAYER_WEEK_ROWS = [
  ["السبت", "14 رمضان", "04:37", "06:02", "12:18", "15:47", "18:31", "19:56"],
  ["الأحد", "15 رمضان", "04:36", "06:01", "12:18", "15:48", "18:32", "19:57"],
  ["الاثنين", "16 رمضان", "04:35", "06:00", "12:17", "15:48", "18:33", "19:58"],
  [
    "الثلاثاء",
    "17 رمضان",
    "04:34",
    "05:59",
    "12:17",
    "15:49",
    "18:34",
    "19:59",
  ],
  [
    "الأربعاء",
    "18 رمضان",
    "04:33",
    "05:58",
    "12:17",
    "15:49",
    "18:35",
    "20:00",
  ],
];

function getPrayerWeekTableHeaderMarkup() {
  return PRAYER_WEEK_COLUMNS.map(
    (columnName) => `<th scope="col">${columnName}</th>`,
  ).join("");
}

function getPrayerWeekTableRowsMarkup() {
  return PRAYER_WEEK_ROWS.map((rowData, rowIndex) => {
    const rowClass =
      rowIndex === 0
        ? "prayer-week__row prayer-week__row--featured"
        : "prayer-week__row";

    const cellsMarkup = rowData
      .map((cellValue) => `<td>${cellValue}</td>`)
      .join("");

    return `<tr class="${rowClass}">${cellsMarkup}</tr>`;
  }).join("");
}

export function renderPrayerWeek(rootElement) {
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
            ${getPrayerWeekTableRowsMarkup()}
          </tbody>
        </table>
      </div>
    </div>
  `;

  return rootElement;
}
