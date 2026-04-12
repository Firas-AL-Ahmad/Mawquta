const PRAYER_COLUMN_KEYS = new Set(["fajr", "dhuhr", "asr", "maghrib", "isha"]);

const RAMADAN_MOBILE_PRAYERS = [
  { key: "fajr", label: "الفجر" },
  { key: "dhuhr", label: "الظهر" },
  { key: "asr", label: "العصر" },
  { key: "maghrib", label: "المغرب" },
  { key: "isha", label: "العشاء" },
];

function resolveTableHeaderClass(columnKey) {
  if (
    columnKey === "day" ||
    columnKey === "date" ||
    columnKey === "ramadanDayNumber"
  ) {
    return `table-head table-head--${columnKey}`;
  }

  if (PRAYER_COLUMN_KEYS.has(columnKey)) {
    return `table-head table-head--prayer table-head--${columnKey}`;
  }

  return `table-head table-head--${columnKey}`;
}

function renderRamadanTableHeaderCell(column) {
  const headerClass = resolveTableHeaderClass(column.key);

  return `<th scope="col" class="${headerClass}"><span class="schedule-table-head-label"><span class="schedule-table-head-icon" aria-hidden="true"><img src="${column.icon}" alt="" loading="lazy" decoding="async" /></span><span>${column.label}</span></span></th>`;
}

function renderRamadanTableHeader(columns) {
  return columns.map((column) => renderRamadanTableHeaderCell(column)).join("\n");
}

function resolveRamadanCellClass(columnKey) {
  if (columnKey === "day") {
    return "table-cell--day";
  }

  if (columnKey === "date") {
    return "table-cell--date";
  }

  if (columnKey === "ramadanDayNumber") {
    return "table-cell--number";
  }

  return "";
}

function renderRamadanTableCell(row, columnKey) {
  const isPrayerCell = PRAYER_COLUMN_KEYS.has(columnKey);
  const isActivePrayerCell =
    isPrayerCell &&
    Array.isArray(row.activePrayerKeys) &&
    row.activePrayerKeys.includes(columnKey);

  if (isActivePrayerCell) {
    return `<td class="table-cell--active"><span class="table-time-pill">${row[columnKey]}</span></td>`;
  }

  const cellClass = resolveRamadanCellClass(columnKey);
  const cellContent = row[columnKey] ?? "";

  if (cellClass) {
    return `<td class="${cellClass}">${cellContent}</td>`;
  }

  return `<td>${cellContent}</td>`;
}

function renderRamadanTableRow(row, columns) {
  const rowClass = row.isToday ? ' class="table-row--today"' : "";

  return `<tr${rowClass}>${columns
    .map((column) => renderRamadanTableCell(row, column.key))
    .join("")}</tr>`;
}

function renderRamadanMobilePrayerItem(row, prayerConfig, iconPaths) {
  const isActivePrayerCell =
    Array.isArray(row.activePrayerKeys) &&
    row.activePrayerKeys.includes(prayerConfig.key);
  const activeClass = isActivePrayerCell ? " weekly-table-mobile-item--active" : "";

  return `<div class="weekly-table-mobile-item${activeClass}"><dt><span class="weekly-table-mobile-item-icon" aria-hidden="true"><img src="${iconPaths[prayerConfig.key]}" alt="" loading="lazy" decoding="async" /></span>${prayerConfig.label}</dt><dd>${row[prayerConfig.key]}</dd></div>`;
}

function renderRamadanMobileCard(row, iconPaths) {
  return `
    <article class="weekly-table-mobile-card" aria-label="مواقيت ${row.day}">
      <div class="weekly-table-mobile-head">
        <div class="weekly-table-mobile-title-wrap">
          <h3 class="weekly-table-mobile-title"><span class="weekly-table-mobile-head-icon" aria-hidden="true"><img src="${iconPaths.day}" alt="" loading="lazy" decoding="async" /></span>${row.day}</h3>
          <span class="weekly-table-mobile-date"><span class="weekly-table-mobile-meta-icon" aria-hidden="true"><img src="${iconPaths.date}" alt="" loading="lazy" decoding="async" /></span>${row.date}</span>
        </div>
        <span class="weekly-table-mobile-pill">رمضان ${row.ramadanDayNumber}</span>
      </div>

      <dl class="weekly-table-mobile-grid">
        ${RAMADAN_MOBILE_PRAYERS.map((prayerConfig) =>
          renderRamadanMobilePrayerItem(row, prayerConfig, iconPaths),
        ).join("\n")}
      </dl>
    </article>
  `;
}

function renderRamadanMobileList(rows, iconPaths) {
  return `
    <div class="weekly-table-mobile-list" aria-label="مواقيت رمضان - عرض الموبايل">
      ${rows.map((row) => renderRamadanMobileCard(row, iconPaths)).join("\n")}
    </div>
  `;
}

export function renderRamadanMonthTableGrid({ columns, rows, iconPaths }) {
  return `
    <div class="schedule-table-card">
      <div class="schedule-table-card__top">
        <span class="schedule-table-range"><span class="schedule-table-range__text" data-rt-range>23 - 29 مارس 2026</span></span>
        <p class="ramadan-month-table-location-line"><span>مواقيت رمضان لمدينة:</span><strong data-rt-city>دمشق، سوريا</strong></p>
      </div>

      <div class="schedule-table-wrap">
        <table class="schedule-table" aria-label="جدول رمضان الثابت">
          <thead>
            <tr>
              ${renderRamadanTableHeader(columns)}
            </tr>
          </thead>
          <tbody>
            ${rows.map((row) => renderRamadanTableRow(row, columns)).join("\n")}
          </tbody>
        </table>
      </div>

      ${renderRamadanMobileList(rows, iconPaths)}
    </div>
  `;
}

