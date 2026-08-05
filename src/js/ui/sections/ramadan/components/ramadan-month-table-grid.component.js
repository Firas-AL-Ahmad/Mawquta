import {
  isSchedulePrayerColumn,
  renderScheduleTableHeader,
  renderScheduleTableMobileList,
} from "../../../shared/primitives/schedule-table.primitives.js";

const RAMADAN_MOBILE_PRAYERS = [
  { key: "fajr", label: "الفجر" },
  { key: "dhuhr", label: "الظهر" },
  { key: "asr", label: "العصر" },
  { key: "maghrib", label: "المغرب" },
  { key: "isha", label: "العشاء" },
];

// Maps table column keys to the normalized Ramadan month-row fields so the
// display rows stay contract-aligned (weekday/gregorianDate/ramadanDay).
const ROW_FIELD_BY_COLUMN = {
  ramadanDayNumber: "ramadanDay",
  day: "weekday",
  date: "gregorianDate",
};

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
  const isPrayerCell = isSchedulePrayerColumn(columnKey);
  const isActivePrayerCell =
    isPrayerCell &&
    Array.isArray(row.activePrayerKeys) &&
    row.activePrayerKeys.includes(columnKey);

  if (isActivePrayerCell) {
    return `<td class="table-cell--active"><span class="table-time-pill">${row[columnKey]}</span></td>`;
  }

  const rowField = ROW_FIELD_BY_COLUMN[columnKey] ?? columnKey;
  const cellContent = row[rowField] ?? row[columnKey] ?? "";
  const cellClass = resolveRamadanCellClass(columnKey);

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

function renderRamadanMobileList(rows, iconPaths) {
  return renderScheduleTableMobileList({
    ariaLabel: "مواقيت رمضان - عرض الموبايل",
    cards: rows.map((row) => ({
      ariaLabel: `مواقيت ${row.weekday}`,
      title: row.weekday,
      date: row.gregorianDate,
      pillText: `رمضان ${row.ramadanDay}`,
      titleIconPath: iconPaths.day,
      dateIconPath: iconPaths.date,
      prayers: RAMADAN_MOBILE_PRAYERS.map((prayerConfig) => ({
        label: prayerConfig.label,
        time: row[prayerConfig.key],
        iconPath: iconPaths[prayerConfig.key],
        isActive:
          Array.isArray(row.activePrayerKeys) &&
          row.activePrayerKeys.includes(prayerConfig.key),
      })),
    })),
  });
}

export function renderRamadanMonthTableGrid({
  columns,
  rows,
  iconPaths,
  locationLabel = "—",
  rangeLabel = "—",
}) {
  return `
    <div class="schedule-table-card">
      <div class="schedule-table-card__top">
       <p class="ramadan-month-table-location-line"><span>مواقيت رمضان لمدينة:</span><strong data-rt-city>${locationLabel}</strong></p>
       <span class="schedule-table-range"><span class="schedule-table-range__text" data-rt-range>${rangeLabel}</span></span>
      </div>

      <div class="schedule-table-wrap">
        <table class="schedule-table" aria-label="جدول رمضان">
          <thead>
            <tr>
              ${renderScheduleTableHeader(columns, {
                leadingColumnKeys: ["ramadanDayNumber"],
              })}
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
