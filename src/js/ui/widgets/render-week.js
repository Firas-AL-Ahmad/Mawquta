const DEFAULT_WEEK_RANGE = "مارس 23 – مارس 29، 2026";

const DEFAULT_WEEK_ROWS = [
  { day: "الاثنين", date: "23/03", fajr: "05:11", sunrise: "06:35", dhuhr: "12:31", asr: "16:09", maghrib: "18:57", isha: "20:27", today: true },
  { day: "الثلاثاء", date: "24/03", fajr: "05:10", sunrise: "06:34", dhuhr: "12:31", asr: "16:10", maghrib: "18:58", isha: "20:28" },
  { day: "الأربعاء", date: "25/03", fajr: "05:09", sunrise: "06:32", dhuhr: "12:30", asr: "16:10", maghrib: "18:59", isha: "20:29" },
  { day: "الخميس", date: "26/03", fajr: "05:08", sunrise: "06:31", dhuhr: "12:30", asr: "16:11", maghrib: "19:00", isha: "20:30" },
  { day: "الجمعة", date: "27/03", fajr: "05:06", sunrise: "06:30", dhuhr: "12:29", asr: "16:11", maghrib: "19:01", isha: "20:31" },
  { day: "السبت", date: "28/03", fajr: "05:05", sunrise: "06:28", dhuhr: "12:29", asr: "16:12", maghrib: "19:02", isha: "20:32" },
  { day: "الأحد", date: "29/03", fajr: "05:04", sunrise: "06:27", dhuhr: "12:28", asr: "16:12", maghrib: "19:03", isha: "20:33" },
];

function headerIcon(svgPath) {
  return `<span class="th-ic"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="${svgPath}" /></svg>`;
}

export function renderPrayerWeek(viewModel = {}) {
  const weekRange = viewModel.weekRange || DEFAULT_WEEK_RANGE;
  const rows = Array.isArray(viewModel.rows) && viewModel.rows.length ? viewModel.rows : DEFAULT_WEEK_ROWS;

  const rowMarkup = rows
    .map((row) => {
      const rowClass = row.today ? "row--today" : "";
      return `
        <tr class="${rowClass}">
          <td class="td-day">${row.day || "-"}</td>
          <td class="td-date">${row.date || "-"}</td>
          <td>${row.fajr || "--:--"}</td>
          <td>${row.sunrise || "--:--"}</td>
          <td>${row.dhuhr || "--:--"}</td>
          <td class="td--active"><span class="time-pill">${row.asr || "--:--"}</span></td>
          <td>${row.maghrib || "--:--"}</td>
          <td>${row.isha || "--:--"}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <p class="ws-sub">الصلاوات لسبع أيام قادمة</p>
    <div class="ws-card">
      <div class="ws-range">
        <span class="ws-range__icon" aria-hidden="true"></span>
        <span class="ws-range__text" data-weekly-range>${weekRange}</span>
      </div>
      <div class="ws-wrap">
        <table class="ws-table" aria-label="جدول مواقيت الصلاة الأسبوعي">
          <thead>
            <tr>
              <th>اليوم</th>
              <th>التاريخ</th>
              <th>${headerIcon("M12 3v18M3 12h18")}الفجر</span></th>
              <th>${headerIcon("M3 12h18M12 3v18")}الشروق</span></th>
              <th>${headerIcon("M12 3v18M3 12h18")}الظهر</span></th>
              <th>${headerIcon("M3 12h18M12 3v18")}العصر</span></th>
              <th>${headerIcon("M12 3v18M3 12h18")}المغرب</span></th>
              <th>${headerIcon("M3 12h18M12 3v18")}العشاء</span></th>
            </tr>
          </thead>
          <tbody>
            ${rowMarkup}
          </tbody>
        </table>
      </div>
    </div>
  `;
}
