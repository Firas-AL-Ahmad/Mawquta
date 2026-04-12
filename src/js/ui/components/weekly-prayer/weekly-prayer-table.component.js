function renderTableHeaderCell(column) {
  return `<th scope="col"><span class="schedule-table-head-label"><span class="schedule-table-head-icon" aria-hidden="true"><img src="${column.icon}" alt="" loading="lazy" decoding="async" /></span><span>${column.label}</span></span></th>`;
}

function renderDesktopPrayerCell(row, prayerKey) {
  if (row.activePrayer === prayerKey) {
    return `<td class="table-cell--active"><span class="table-time-pill">${row[prayerKey]}</span></td>`;
  }

  return `<td>${row[prayerKey]}</td>`;
}

function renderDesktopTableRow(row) {
  const todayClass = row.isToday ? ' class="table-row--today"' : "";

  return `
    <tr${todayClass}>
      <td class="table-cell--day">${row.day}</td>
      ${renderDesktopPrayerCell(row, "fajr")}
      ${renderDesktopPrayerCell(row, "dhuhr")}
      ${renderDesktopPrayerCell(row, "asr")}
      ${renderDesktopPrayerCell(row, "maghrib")}
      ${renderDesktopPrayerCell(row, "isha")}
      <td class="table-cell--date">${row.date}</td>
    </tr>
  `;
}

export function renderWeeklyPrayerTable({ columns, rows }) {
  return `
    <div class="schedule-table-wrap">
      <table class="schedule-table" aria-label="جدول مواقيت الصلاة الأسبوعي">
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

