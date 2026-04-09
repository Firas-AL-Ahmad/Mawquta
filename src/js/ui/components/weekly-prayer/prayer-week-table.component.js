import {
  WEEKLY_ICON_PATHS,
  WEEKLY_MOBILE_CARD,
  WEEKLY_TABLE_COLUMNS,
  WEEKLY_TABLE_ROWS,
} from "./weekly-prayer.constants.js";
import { renderWeeklyPrayerTable } from "./weekly-prayer-table.component.js";
import { renderWeeklyPrayerMobileList } from "./weekly-prayer-mobile-list.component.js";

export function renderPrayerWeek(viewModel = {}) {
  void viewModel;

  return `
    <div class="ws-card">
      <div class="ws-card-top">
        <p class="ws-sub">الصلاة لسبعة أيام</p>
        <div class="ws-range" aria-label="نطاق الأسبوع">
          <span class="ws-range__icon" aria-hidden="true"></span>
          <span class="ws-range__text" data-weekly-range>23 - 29 مارس 2026</span>
        </div>
      </div>

      ${renderWeeklyPrayerTable({
        columns: WEEKLY_TABLE_COLUMNS,
        rows: WEEKLY_TABLE_ROWS,
      })}

      ${renderWeeklyPrayerMobileList({
        mobileCard: WEEKLY_MOBILE_CARD,
        iconPaths: WEEKLY_ICON_PATHS,
      })}
    </div>
  `;
}