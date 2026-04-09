const MONTH_TABLE_ICON_PATHS = {
  isha: "assets/icons/shared/prayer/isha.svg",
  maghrib: "assets/icons/shared/prayer/maghrib.svg",
  asr: "assets/icons/shared/prayer/asr.svg",
  dhuhr: "assets/icons/shared/prayer/dhuhr.svg",
  fajr: "assets/icons/shared/prayer/fajr.svg",
  date: "assets/icons/shared/prayer/date.svg",
  day: "assets/icons/shared/prayer/today.svg",
  ramadan: "assets/icons/sections/ramadan/moon-and-stars.svg",
  download: "assets/icons/sections/ramadan/action-download.svg",
  share: "assets/icons/sections/ramadan/action-share.svg",
};

export function renderRamadanCountdown(viewModel = {}) {
  void viewModel;

  return `
    <section class="ramadan-first" id="ramadanTodayCard" aria-label="بطاقة رمضان اليومية">
      <div class="ramadan-first__shell">
        <div class="ramadan-first__times">
          <article class="ramadan-first-time ramadan-first-time--iftar">
            <div class="ramadan-first-time__inner">
              <span class="ramadan-first-time__label-wrap">
                <span class="ramadan-first-time__label">وقت الإفطار اليوم</span>
                <span class="ramadan-first-time__icon ramadan-first-time__icon--iftar" aria-hidden="true"></span>
              </span>
              <span class="ramadan-first-time__pill" data-ramadan-iftar>18:42</span>
            </div>
          </article>

          <article class="ramadan-first-time ramadan-first-time--imsak">
            <div class="ramadan-first-time__inner">
              <span class="ramadan-first-time__label-wrap">
                <span class="ramadan-first-time__label">وقت الإمساك اليوم</span>
                <span class="ramadan-first-time__icon ramadan-first-time__icon--imsak" aria-hidden="true"></span>
              </span>
              <span class="ramadan-first-time__pill" data-ramadan-imsak>04:12</span>
            </div>
          </article>
        </div>

        <div class="ramadan-first__countdown">
          <header class="ramadan-first__countdown-head">
            <h3 class="ramadan-first__countdown-title">الوقت المتبقي للأذان</h3>
            <span class="ramadan-first__countdown-icon" aria-hidden="true"></span>
          </header>
          <div class="ramadan-first__timer" data-ramadan-countdown>
            <div class="ramadan-first__timer-part"><span class="ramadan-first__timer-value">02</span><span class="ramadan-first__timer-unit">Hr</span></div>
            <span class="ramadan-first__timer-sep">:</span>
            <div class="ramadan-first__timer-part"><span class="ramadan-first__timer-value">16</span><span class="ramadan-first__timer-unit">Min</span></div>
            <span class="ramadan-first__timer-sep">:</span>
            <div class="ramadan-first__timer-part"><span class="ramadan-first__timer-value">44</span><span class="ramadan-first__timer-unit">Sec</span></div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderRamadanMonthTable(viewModel = {}) {
  void viewModel;

  return `
    <section class="ramadan-table-sec" aria-label="جدول شهر رمضان">
      <div class="ramadan-table-head">
        <div class="ramadan-table-head__content">
          <h2 class="ramadan-table-title">جدول شهر رمضان</h2>
          <span class="ramadan-table-head__chip" aria-label="شهر رمضان">
            <span class="ramadan-table-head__chip-item">1448هـ</span>
            <span class="ramadan-table-head__chip-item">2026م</span>
            <span class="ramadan-table-head__chip-item">رمضان</span>
            <img class="ramadan-table-head__chip-icon" src="${MONTH_TABLE_ICON_PATHS.ramadan}" alt="" loading="lazy" decoding="async" />
          </span>
        </div>

        <div class="ramadan-table-head__actions" aria-label="إجراءات الجدول">
          <button type="button" class="ramadan-table-action"><span>تحميل</span><img src="${MONTH_TABLE_ICON_PATHS.download}" alt="" loading="lazy" decoding="async" /></button>
          <button type="button" class="ramadan-table-action"><span>مشاركة</span><img src="${MONTH_TABLE_ICON_PATHS.share}" alt="" loading="lazy" decoding="async" /></button>
        </div>
      </div>

      <div class="ws-card">
        <div class="ws-card-top">
          <span class="ws-range"><span class="ws-range__text" data-rt-range>23 - 29 مارس 2026</span></span>
          <p class="rt-location-line"><span>مواقيت رمضان لمدينة:</span><strong data-rt-city>دمشق، سوريا</strong></p>
        </div>

        <div class="ws-wrap">
          <table class="ws-table" aria-label="جدول رمضان الثابت">
            <thead>
              <tr>
                <th scope="col">العشاء</th>
                <th scope="col">المغرب</th>
                <th scope="col">العصر</th>
                <th scope="col">الظهر</th>
                <th scope="col">الفجر</th>
                <th scope="col">التاريخ</th>
                <th scope="col">اليوم</th>
                <th scope="col">رمضان</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>20:27</td><td>18:57</td><td>16:09</td><td>12:31</td><td>05:11</td><td class="td-date">23/03</td><td class="td-day">الاثنين</td><td class="td-num">1</td></tr>
              <tr class="row--today"><td>20:29</td><td class="td--active"><span class="time-pill">18:59</span></td><td>16:10</td><td>12:30</td><td class="td--active"><span class="time-pill">05:09</span></td><td class="td-date">25/03</td><td class="td-day">الأربعاء</td><td class="td-num">3</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="rt-more-btn">
        <button type="button" class="btn-more btn-more--filled" data-rt-load-more>عرض المزيد</button>
      </div>
    </section>
  `;
}