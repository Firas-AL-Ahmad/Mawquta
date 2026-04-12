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
    <section class="ramadan-month-table-section" aria-label="جدول شهر رمضان">
      ${renderRamadanMonthTableHead(MONTH_TABLE_ICON_PATHS)}

      ${renderRamadanMonthTableGrid({
        columns: RAMADAN_MONTH_TABLE_COLUMNS,
        rows: RAMADAN_MONTH_TABLE_ROWS,
        iconPaths: MONTH_TABLE_ICON_PATHS,
      })}

      <div class="ramadan-month-table__more">
        <button type="button" class="section-more-button section-more-button--filled" data-rt-load-more>عرض المزيد</button>
      </div>
    </section>
  `;
}
