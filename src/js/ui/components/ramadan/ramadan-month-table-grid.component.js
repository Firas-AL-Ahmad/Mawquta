function renderRamadanTableHeader(columns) {
  return columns
    .map((columnLabel) => `<th scope="col">${columnLabel}</th>`)
    .join("\n");
}

function renderRamadanTablePrayerCell(row, prayerKey) {
  const isActiveCell =
    Array.isArray(row.activePrayerKeys) && row.activePrayerKeys.includes(prayerKey);

  if (isActiveCell) {
    return `<td class="td--active"><span class="time-pill">${row[prayerKey]}</span></td>`;
  }

  return `<td>${row[prayerKey]}</td>`;
}

function renderRamadanTableRow(row) {
  const rowClass = row.isToday ? ' class="row--today"' : "";

  return `<tr${rowClass}>${renderRamadanTablePrayerCell(row, "isha")}${renderRamadanTablePrayerCell(row, "maghrib")}${renderRamadanTablePrayerCell(row, "asr")}${renderRamadanTablePrayerCell(row, "dhuhr")}${renderRamadanTablePrayerCell(row, "fajr")}<td class="td-date">${row.date}</td><td class="td-day">${row.day}</td><td class="td-num">${row.ramadanDayNumber}</td></tr>`;
}

export function renderRamadanMonthTableGrid({ columns, rows }) {
  return `
    <div class="ws-card">
      <div class="ws-card-top">
        <span class="ws-range"><span class="ws-range__text" data-rt-range>23 - 29 مارس 2026</span></span>
        <p class="rt-location-line"><span>مواقيت رمضان لمدينة:</span><strong data-rt-city>دمشق، سوريا</strong></p>
      </div>

      <div class="ws-wrap">
        <table class="ws-table" aria-label="جدول رمضان الثابت">
          <thead>
            <tr>
              ${renderRamadanTableHeader(columns)}
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => renderRamadanTableRow(row)).join("\n")}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
