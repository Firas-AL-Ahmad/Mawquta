function renderTableHeaderCell(column) {
  return `<th scope="col"><span class="ws-th-label"><span class="th-ic" aria-hidden="true"><img src="${column.icon}" alt="" loading="lazy" decoding="async" /></span><span>${column.label}</span></span></th>`;
}

function renderDesktopPrayerCell(row, prayerKey) {
  if (row.activePrayer === prayerKey) {
    return `<td class="td--active"><span class="time-pill">${row[prayerKey]}</span></td>`;
  }

  return `<td>${row[prayerKey]}</td>`;
}

function renderDesktopTableRow(row) {
  const todayClass = row.isToday ? ' class="row--today"' : "";

  return `
    <tr${todayClass}>
      <td class="td-day">${row.day}</td>
      ${renderDesktopPrayerCell(row, "fajr")}
      ${renderDesktopPrayerCell(row, "dhuhr")}
      ${renderDesktopPrayerCell(row, "asr")}
      ${renderDesktopPrayerCell(row, "maghrib")}
      ${renderDesktopPrayerCell(row, "isha")}
      <td class="td-date">${row.date}</td>
    </tr>
  `;
}

export function renderWeeklyPrayerTable({ columns, rows }) {
  return `
    <div class="ws-wrap">
      <table class="ws-table" aria-label="جدول مواقيت الصلاة الأسبوعي">
        <thead>
          <tr>
            ${columns.map((column) => renderTableHeaderCell(column)).join("\n")}
          </tr>
        </thead>
        <tbody>
          ${rows.map((row) => renderDesktopTableRow(row)).join("\n")}
        </tbody>
      </table>
    </div>
  `;
}
