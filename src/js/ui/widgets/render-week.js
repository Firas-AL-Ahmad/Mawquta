const DEFAULT_WEEK_RANGE = "مارس 23 – مارس 29، 2026";

const DEFAULT_WEEK_ROWS = [
  {
    day: "الاثنين",
    date: "23/03",
    fajr: "05:11",
    sunrise: "06:35",
    dhuhr: "12:31",
    asr: "16:09",
    maghrib: "18:57",
    isha: "20:27",
    today: true,
  },
  {
    day: "الثلاثاء",
    date: "24/03",
    fajr: "05:10",
    sunrise: "06:34",
    dhuhr: "12:31",
    asr: "16:10",
    maghrib: "18:58",
    isha: "20:28",
  },
  {
    day: "الأربعاء",
    date: "25/03",
    fajr: "05:09",
    sunrise: "06:32",
    dhuhr: "12:30",
    asr: "16:10",
    maghrib: "18:59",
    isha: "20:29",
  },
  {
    day: "الخميس",
    date: "26/03",
    fajr: "05:08",
    sunrise: "06:31",
    dhuhr: "12:30",
    asr: "16:11",
    maghrib: "19:00",
    isha: "20:30",
  },
  {
    day: "الجمعة",
    date: "27/03",
    fajr: "05:06",
    sunrise: "06:30",
    dhuhr: "12:29",
    asr: "16:11",
    maghrib: "19:01",
    isha: "20:31",
  },
  {
    day: "السبت",
    date: "28/03",
    fajr: "05:05",
    sunrise: "06:28",
    dhuhr: "12:29",
    asr: "16:12",
    maghrib: "19:02",
    isha: "20:32",
  },
  {
    day: "الأحد",
    date: "29/03",
    fajr: "05:04",
    sunrise: "06:27",
    dhuhr: "12:28",
    asr: "16:12",
    maghrib: "19:03",
    isha: "20:33",
  },
];

const WEEKLY_ICON_PATHS = {
  day: "assets/icons/Weekly-Prayer/today.svg",
  date: "assets/icons/Weekly-Prayer/date.svg",
  fajr: "assets/icons/Weekly-Prayer/fajr.svg",
  dhuhr: "assets/icons/Weekly-Prayer/dhuhr.svg",
  asr: "assets/icons/Weekly-Prayer/asr.svg",
  maghrib: "assets/icons/Weekly-Prayer/maghrib.svg",
  isha: "assets/icons/Weekly-Prayer/isha.svg",
};

function iconMarkup(iconPath, className = "th-ic") {
  return `<span class="${className}" aria-hidden="true"><img src="${iconPath}" alt="" loading="lazy" decoding="async" /></span>`;
}

function headerLabel(label, iconKey) {
  return `<span class="ws-th-label">${iconMarkup(WEEKLY_ICON_PATHS[iconKey])}<span>${label}</span></span>`;
}

export function renderPrayerWeek(viewModel = {}) {
  const weekRange = viewModel.weekRange || DEFAULT_WEEK_RANGE;
  const rows =
    Array.isArray(viewModel.rows) && viewModel.rows.length
      ? viewModel.rows
      : DEFAULT_WEEK_ROWS;

  const rowMarkup = rows
    .map((row) => {
      const rowClass = row.today ? "row--today" : "";
      return `
        <tr class="${rowClass}">
          <td class="td-day">${row.day || "-"}</td>
          <td>${row.fajr || "--:--"}</td>
          <td>${row.dhuhr || "--:--"}</td>
          <td class="td--active"><span class="time-pill">${row.asr || "--:--"}</span></td>
          <td>${row.maghrib || "--:--"}</td>
          <td>${row.isha || "--:--"}</td>
          <td class="td-date">${row.date || "-"}</td>
        </tr>
      `;
    })
    .join("");

  const mobileCardsMarkup = rows
    .map((row) => {
      const todayPill = row.today
        ? '<span class="ws-mobile-pill">اليوم</span>'
        : "";

      return `
        <article class="ws-mobile-card" aria-label="مواقيت ${row.day || "-"}">
          <div class="ws-mobile-head">
            <div class="ws-mobile-title-wrap">
              <h3 class="ws-mobile-title">${iconMarkup(WEEKLY_ICON_PATHS.day, "ws-mobile-head-icon")}${row.day || "-"}</h3>
              <span class="ws-mobile-date">${iconMarkup(WEEKLY_ICON_PATHS.date, "ws-mobile-meta-icon")}${row.date || "-"}</span>
            </div>
            ${todayPill}
          </div>

          <dl class="ws-mobile-grid">
            <div class="ws-mobile-item"><dt>${iconMarkup(WEEKLY_ICON_PATHS.fajr, "ws-mobile-item-icon")}الفجر</dt><dd>${row.fajr || "--:--"}</dd></div>
            <div class="ws-mobile-item"><dt>${iconMarkup(WEEKLY_ICON_PATHS.dhuhr, "ws-mobile-item-icon")}الظهر</dt><dd>${row.dhuhr || "--:--"}</dd></div>
            <div class="ws-mobile-item ws-mobile-item--active"><dt>${iconMarkup(WEEKLY_ICON_PATHS.asr, "ws-mobile-item-icon")}العصر</dt><dd>${row.asr || "--:--"}</dd></div>
            <div class="ws-mobile-item"><dt>${iconMarkup(WEEKLY_ICON_PATHS.maghrib, "ws-mobile-item-icon")}المغرب</dt><dd>${row.maghrib || "--:--"}</dd></div>
            <div class="ws-mobile-item"><dt>${iconMarkup(WEEKLY_ICON_PATHS.isha, "ws-mobile-item-icon")}العشاء</dt><dd>${row.isha || "--:--"}</dd></div>
          </dl>
        </article>
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
              <th>${headerLabel("اليوم", "day")}</th>
              <th>${headerLabel("الفجر", "fajr")}</th>
              <th>${headerLabel("الظهر", "dhuhr")}</th>
              <th>${headerLabel("العصر", "asr")}</th>
              <th>${headerLabel("المغرب", "maghrib")}</th>
              <th>${headerLabel("العشاء", "isha")}</th>
              <th>${headerLabel("التاريخ", "date")}</th>
            </tr>
          </thead>
          <tbody>
            ${rowMarkup}
          </tbody>
        </table>
      </div>

      <div class="ws-mobile-list" aria-label="مواقيت الصلاة الأسبوعية - عرض الجوال">
        ${mobileCardsMarkup}
      </div>
    </div>
  `;
}
