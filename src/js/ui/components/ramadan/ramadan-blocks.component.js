import { renderRamadanCountdownCard } from "./ramadan-countdown-card.component.js";
import { renderRamadanMonthTableHead } from "./ramadan-month-table-head.component.js";
import { renderRamadanMonthTableGrid } from "./ramadan-month-table-grid.component.js";
import {
  MONTH_TABLE_ICON_PATHS,
  RAMADAN_MONTH_TABLE_COLUMNS,
  RAMADAN_MONTH_TABLE_ROWS,
} from "./ramadan-month-table.constants.js";

export function renderRamadanCountdown(viewModel = {}) {
  void viewModel;

  return renderRamadanCountdownCard();
}

export function renderRamadanMonthTable(viewModel = {}) {
  void viewModel;

  return `
    <section class="ramadan-table-sec" aria-label="جدول شهر رمضان">
      ${renderRamadanMonthTableHead(MONTH_TABLE_ICON_PATHS)}

      ${renderRamadanMonthTableGrid({
        columns: RAMADAN_MONTH_TABLE_COLUMNS,
        rows: RAMADAN_MONTH_TABLE_ROWS,
      })}

      <div class="rt-more-btn">
        <button type="button" class="btn-more btn-more--filled" data-rt-load-more>عرض المزيد</button>
      </div>
    </section>
  `;
}