const WEEKLY_ICON_PATHS = {
  day: "assets/icons/shared/prayer/today.svg",
  date: "assets/icons/shared/prayer/date.svg",
  fajr: "assets/icons/shared/prayer/fajr.svg",
  dhuhr: "assets/icons/shared/prayer/dhuhr.svg",
  asr: "assets/icons/shared/prayer/asr.svg",
  maghrib: "assets/icons/shared/prayer/maghrib.svg",
  isha: "assets/icons/shared/prayer/isha.svg",
};

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

      <div class="ws-wrap">
        <table class="ws-table" aria-label="جدول مواقيت الصلاة الأسبوعي">
          <thead>
            <tr>
              <th scope="col"><span class="ws-th-label"><span class="th-ic" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.day}" alt="" loading="lazy" decoding="async" /></span><span>اليوم</span></span></th>
              <th scope="col"><span class="ws-th-label"><span class="th-ic" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.fajr}" alt="" loading="lazy" decoding="async" /></span><span>الفجر</span></span></th>
              <th scope="col"><span class="ws-th-label"><span class="th-ic" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.dhuhr}" alt="" loading="lazy" decoding="async" /></span><span>الظهر</span></span></th>
              <th scope="col"><span class="ws-th-label"><span class="th-ic" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.asr}" alt="" loading="lazy" decoding="async" /></span><span>العصر</span></span></th>
              <th scope="col"><span class="ws-th-label"><span class="th-ic" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.maghrib}" alt="" loading="lazy" decoding="async" /></span><span>المغرب</span></span></th>
              <th scope="col"><span class="ws-th-label"><span class="th-ic" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.isha}" alt="" loading="lazy" decoding="async" /></span><span>العشاء</span></span></th>
              <th scope="col"><span class="ws-th-label"><span class="th-ic" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.date}" alt="" loading="lazy" decoding="async" /></span><span>التاريخ</span></span></th>
            </tr>
          </thead>
          <tbody>
            <tr class="row--today">
              <td class="td-day">الاثنين</td>
              <td>05:11</td>
              <td>12:31</td>
              <td class="td--active"><span class="time-pill">16:09</span></td>
              <td>18:57</td>
              <td>20:27</td>
              <td class="td-date">23/03</td>
            </tr>
            <tr>
              <td class="td-day">الثلاثاء</td>
              <td>05:10</td>
              <td>12:31</td>
              <td>16:10</td>
              <td>18:58</td>
              <td>20:28</td>
              <td class="td-date">24/03</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="ws-mobile-list" aria-label="مواقيت الصلاة الأسبوعية - عرض الموبايل">
        <article class="ws-mobile-card" aria-label="مواقيت الاثنين">
          <div class="ws-mobile-head">
            <div class="ws-mobile-title-wrap">
              <h3 class="ws-mobile-title"><span class="ws-mobile-head-icon" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.day}" alt="" loading="lazy" decoding="async" /></span>الاثنين</h3>
              <span class="ws-mobile-date"><span class="ws-mobile-meta-icon" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.date}" alt="" loading="lazy" decoding="async" /></span>23/03</span>
            </div>
            <span class="ws-mobile-pill">اليوم</span>
          </div>
          <dl class="ws-mobile-grid">
            <div class="ws-mobile-item"><dt><span class="ws-mobile-item-icon" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.fajr}" alt="" loading="lazy" decoding="async" /></span>الفجر</dt><dd>05:11</dd></div>
            <div class="ws-mobile-item"><dt><span class="ws-mobile-item-icon" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.dhuhr}" alt="" loading="lazy" decoding="async" /></span>الظهر</dt><dd>12:31</dd></div>
            <div class="ws-mobile-item ws-mobile-item--active"><dt><span class="ws-mobile-item-icon" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.asr}" alt="" loading="lazy" decoding="async" /></span>العصر</dt><dd>16:09</dd></div>
            <div class="ws-mobile-item"><dt><span class="ws-mobile-item-icon" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.maghrib}" alt="" loading="lazy" decoding="async" /></span>المغرب</dt><dd>18:57</dd></div>
            <div class="ws-mobile-item"><dt><span class="ws-mobile-item-icon" aria-hidden="true"><img src="${WEEKLY_ICON_PATHS.isha}" alt="" loading="lazy" decoding="async" /></span>العشاء</dt><dd>20:27</dd></div>
          </dl>
        </article>
      </div>
    </div>
  `;
}