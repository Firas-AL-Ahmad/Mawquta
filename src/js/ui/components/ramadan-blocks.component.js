const FIRST_SECTION_STATIC = {
  imsakLabel: "وقت الإمساك اليوم",
  iftarLabel: "وقت الإفطار اليوم",
  imsakTime: "07:30",
  iftarTime: "07:30",
  countdownLabel: "الوقت المتبقي للسحور",
  hours: "01",
  minutes: "24",
  seconds: "45",
  progress: 77,
  startTime: "07:30 PM",
  endTime: "07:30 PM",
};

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

const DEFAULT_MONTH_ROWS = (() => {
  const seedRows = [
    {
      ramadanDay: 1,
      dayName: "الخميس",
      date: "أكتوبر 23",
      fajr: "07:25 PM",
      dhuhr: "06:10 PM",
      asr: "03:50 PM",
      maghrib: "12:45 PM",
      isha: "05:42 AM",
      today: false,
    },
    {
      ramadanDay: 2,
      dayName: "07:23 PM",
      date: "أكتوبر 23",
      fajr: "07:23 PM",
      dhuhr: "06:08 PM",
      asr: "03:49 PM",
      maghrib: "12:45 PM",
      isha: "05:43 AM",
      today: false,
    },
    {
      ramadanDay: 3,
      dayName: "07:22 PM",
      date: "أكتوبر 23",
      fajr: "03:48 PM",
      dhuhr: "06:07 PM",
      asr: "06:07 PM",
      maghrib: "03:48 PM",
      isha: "05:44 AM",
      today: true,
      activeColumns: ["maghrib", "fajr"],
    },
    {
      ramadanDay: 4,
      dayName: "07:20 PM",
      date: "أكتوبر 23",
      fajr: "07:20 PM",
      dhuhr: "06:05 PM",
      asr: "03:47 PM",
      maghrib: "12:45 PM",
      isha: "05:45 AM",
      today: false,
    },
    {
      ramadanDay: 5,
      dayName: "07:19 PM",
      date: "أكتوبر 23",
      fajr: "07:19 PM",
      dhuhr: "06:04 PM",
      asr: "03:46 PM",
      maghrib: "12:45 PM",
      isha: "05:46 AM",
      today: false,
    },
    {
      ramadanDay: 6,
      dayName: "07:17 PM",
      date: "أكتوبر 23",
      fajr: "07:17 PM",
      dhuhr: "06:02 PM",
      asr: "03:45 PM",
      maghrib: "12:45 PM",
      isha: "05:47 AM",
      today: false,
    },
    {
      ramadanDay: 7,
      dayName: "07:16 PM",
      date: "أكتوبر 23",
      fajr: "07:16 PM",
      dhuhr: "06:01 PM",
      asr: "03:44 PM",
      maghrib: "12:45 PM",
      isha: "05:48 AM",
      today: false,
    },
  ];

  while (seedRows.length < 30) {
    seedRows.push({
      ...seedRows[6],
      today: false,
    });
  }

  return seedRows;
})();

const AR_WEEK_DAYS = [
  "الخميس",
  "الجمعة",
  "السبت",
  "الأحد",
  "الإثنين",
  "الثلاثاء",
  "الأربعاء",
];

function getStringOrFallback(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizeMonthRow(row, index) {
  const rowModel = row && typeof row === "object" ? row : {};
  const fallbackDay = AR_WEEK_DAYS[index % AR_WEEK_DAYS.length];
  const fallbackRamadanDay = String(index + 1);

  return {
    ramadanDay:
      typeof rowModel.ramadanDay === "number" ||
      typeof rowModel.ramadanDay === "string"
        ? String(rowModel.ramadanDay).trim() || fallbackRamadanDay
        : typeof rowModel.number === "number" || typeof rowModel.number === "string"
          ? String(rowModel.number).trim() || fallbackRamadanDay
          : fallbackRamadanDay,
    dayName: getStringOrFallback(rowModel.dayName, fallbackDay),
    date: getStringOrFallback(rowModel.date, "أكتوبر 23"),
    fajr: getStringOrFallback(
      rowModel.fajr,
      getStringOrFallback(rowModel.imsak, "--:--"),
    ),
    dhuhr: getStringOrFallback(rowModel.dhuhr, "--:--"),
    asr: getStringOrFallback(rowModel.asr, "--:--"),
    maghrib: getStringOrFallback(
      rowModel.maghrib,
      getStringOrFallback(rowModel.iftar, "--:--"),
    ),
    isha: getStringOrFallback(rowModel.isha, "--:--"),
    today: Boolean(rowModel.today),
    activeColumns: Array.isArray(rowModel.activeColumns)
      ? rowModel.activeColumns
      : [],
  };
}

function iconMarkup(iconPath, className = "th-ic") {
  return `<span class="${className}" aria-hidden="true"><img src="${iconPath}" alt="" loading="lazy" decoding="async" /></span>`;
}

function renderRamadanTableHeaderCell(label, iconPath) {
  return `<span class="ws-th-label">${iconMarkup(iconPath)}<span>${label}</span></span>`;
}

function renderRamadanTimeCell(value, columnKey, activeColumns) {
  const safeValue = getStringOrFallback(value, "--:--");
  if (!activeColumns.has(columnKey)) {
    return `<td>${safeValue}</td>`;
  }

  return `<td class="td--active"><span class="time-pill">${safeValue}</span></td>`;
}

export function renderRamadanCountdown(viewModel = {}) {
  void viewModel;
  const card = FIRST_SECTION_STATIC;

  return `
    <section class="ramadan-first" id="ramadanTodayCard" aria-label="بطاقة مواعيد رمضان اليومية">
      <div class="ramadan-first__shell">
        <div class="ramadan-first__times">
          <article class="ramadan-first-time ramadan-first-time--iftar">
            <div class="ramadan-first-time__inner">
              <span class="ramadan-first-time__label-wrap">
                <span class="ramadan-first-time__label">${card.iftarLabel}</span>
                <span class="ramadan-first-time__icon ramadan-first-time__icon--iftar" aria-hidden="true"></span>
              </span>
              <span class="ramadan-first-time__pill" data-ramadan-iftar>${card.iftarTime}</span>
            </div>
          </article>

          <article class="ramadan-first-time ramadan-first-time--imsak">
            <div class="ramadan-first-time__inner">
              <span class="ramadan-first-time__label-wrap">
                <span class="ramadan-first-time__label">${card.imsakLabel}</span>
                <span class="ramadan-first-time__icon ramadan-first-time__icon--imsak" aria-hidden="true"></span>
              </span>
              <span class="ramadan-first-time__pill" data-ramadan-imsak>${card.imsakTime}</span>
            </div>
          </article>
        </div>

        <div class="ramadan-first__countdown">
          <header class="ramadan-first__countdown-head">
            <h3 class="ramadan-first__countdown-title">${card.countdownLabel}</h3>
            <span class="ramadan-first__countdown-icon" aria-hidden="true"></span>
          </header>

          <div class="ramadan-first__timer" data-ramadan-countdown>
            <div class="ramadan-first__timer-part">
              <span class="ramadan-first__timer-value">${card.hours}</span>
              <span class="ramadan-first__timer-unit">Hr</span>
            </div>
            <span class="ramadan-first__timer-sep">:</span>
            <div class="ramadan-first__timer-part">
              <span class="ramadan-first__timer-value">${card.minutes}</span>
              <span class="ramadan-first__timer-unit">Min</span>
            </div>
            <span class="ramadan-first__timer-sep">:</span>
            <div class="ramadan-first__timer-part">
              <span class="ramadan-first__timer-value">${card.seconds}</span>
              <span class="ramadan-first__timer-unit">Sec</span>
            </div>
          </div>

          <div class="ramadan-first__progress" aria-label="نسبة الوقت المتبقي">
            <div class="ramadan-first__progress-row">
              <span class="ramadan-first__progress-edge ramadan-first__progress-edge--start">
                <span>${card.startTime}</span>
                <span class="ramadan-first__progress-icon ramadan-first__progress-icon--start" aria-hidden="true"></span>
              </span>
              <span class="ramadan-first__progress-value">${card.progress}%</span>
              <span class="ramadan-first__progress-edge ramadan-first__progress-edge--end">
                <span>${card.endTime}</span>
                <span class="ramadan-first__progress-icon ramadan-first__progress-icon--end" aria-hidden="true"></span>
              </span>
            </div>
            <div class="ramadan-first__progress-track">
              <span class="ramadan-first__progress-fill" style="width:${card.progress}%"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function renderRamadanMonthTable(viewModel = {}) {
  const rowsSource =
    Array.isArray(viewModel.rows) && viewModel.rows.length
      ? viewModel.rows
      : DEFAULT_MONTH_ROWS;

  const rows = rowsSource.map(normalizeMonthRow);
  const title = getStringOrFallback(viewModel.title, "إمساكية شهر رمضان");
  const monthName = getStringOrFallback(viewModel.monthName, "رمضان");
  const gregorianYear = getStringOrFallback(viewModel.gregorianYear, "2026م");
  const hijriYear = getStringOrFallback(viewModel.hijriYear, "1448ه");
  const city = getStringOrFallback(viewModel.city, "دمشق، سوريا");
  const rangeText = getStringOrFallback(
    viewModel.rangeText,
    "أكتوبر 23 - أكتوبر 29 , 2026",
  );
  const locationPrefix = getStringOrFallback(
    viewModel.locationPrefix,
    "مواقيت الإمساك والإفطار حسب توقيت:",
  );
  const downloadLabel = getStringOrFallback(viewModel.downloadLabel, "تنزيل");
  const shareLabel = getStringOrFallback(viewModel.shareLabel, "مشاركة");
  const showMoreLabel = getStringOrFallback(
    viewModel.showMoreLabel,
    "عرض الجدول كامل",
  );

  const headerMarkup = [
    { key: "isha", label: "العشاء", icon: MONTH_TABLE_ICON_PATHS.isha },
    { key: "maghrib", label: "المغرب", icon: MONTH_TABLE_ICON_PATHS.maghrib },
    { key: "asr", label: "العصر", icon: MONTH_TABLE_ICON_PATHS.asr },
    { key: "dhuhr", label: "الظهر", icon: MONTH_TABLE_ICON_PATHS.dhuhr },
    { key: "fajr", label: "الفجر", icon: MONTH_TABLE_ICON_PATHS.fajr },
    { key: "date", label: "التاريخ", icon: MONTH_TABLE_ICON_PATHS.date },
    { key: "day", label: "اليوم", icon: MONTH_TABLE_ICON_PATHS.day },
    { key: "ramadan", label: "رمضان", icon: MONTH_TABLE_ICON_PATHS.ramadan },
  ]
    .map((column) => `<th scope="col">${renderRamadanTableHeaderCell(column.label, column.icon)}</th>`)
    .join("");

  const rowMarkup = rows
    .map((row) => {
      const activeColumns = new Set(
        row.activeColumns.length
          ? row.activeColumns
          : row.today
            ? ["maghrib", "fajr"]
            : [],
      );
      const rowClassName = row.today ? "row--today" : "";

      return `
        <tr class="${rowClassName}">
          ${renderRamadanTimeCell(row.isha, "isha", activeColumns)}
          ${renderRamadanTimeCell(row.maghrib, "maghrib", activeColumns)}
          ${renderRamadanTimeCell(row.asr, "asr", activeColumns)}
          ${renderRamadanTimeCell(row.dhuhr, "dhuhr", activeColumns)}
          ${renderRamadanTimeCell(row.fajr, "fajr", activeColumns)}
          <td class="td-date">${row.date}</td>
          <td class="td-day">${row.dayName}</td>
          <td class="td-num">${row.ramadanDay}</td>
        </tr>
      `;
    })
    .join("");

  const mobileCardsMarkup = rows
    .map((row) => {
      const activeColumns = new Set(
        row.activeColumns.length
          ? row.activeColumns
          : row.today
            ? ["maghrib", "fajr"]
            : [],
      );
      const todayPill = row.today ? '<span class="ws-mobile-pill">اليوم</span>' : "";
      const prayerItemClass = (columnKey) =>
        activeColumns.has(columnKey)
          ? "ws-mobile-item ws-mobile-item--active"
          : "ws-mobile-item";

      return `
        <article class="ws-mobile-card" aria-label="إمساكية ${row.dayName || "-"}">
          <div class="ws-mobile-head">
            <div class="ws-mobile-title-wrap">
              <h3 class="ws-mobile-title">${iconMarkup(MONTH_TABLE_ICON_PATHS.day, "ws-mobile-head-icon")}رمضان ${row.ramadanDay || "-"} - ${row.dayName || "-"}</h3>
              <span class="ws-mobile-date">${iconMarkup(MONTH_TABLE_ICON_PATHS.date, "ws-mobile-meta-icon")}${row.date || "-"}</span>
            </div>
            ${todayPill}
          </div>

          <dl class="ws-mobile-grid">
            <div class="${prayerItemClass("fajr")}"><dt>${iconMarkup(MONTH_TABLE_ICON_PATHS.fajr, "ws-mobile-item-icon")}الفجر</dt><dd>${row.fajr || "--:--"}</dd></div>
            <div class="${prayerItemClass("dhuhr")}"><dt>${iconMarkup(MONTH_TABLE_ICON_PATHS.dhuhr, "ws-mobile-item-icon")}الظهر</dt><dd>${row.dhuhr || "--:--"}</dd></div>
            <div class="${prayerItemClass("asr")}"><dt>${iconMarkup(MONTH_TABLE_ICON_PATHS.asr, "ws-mobile-item-icon")}العصر</dt><dd>${row.asr || "--:--"}</dd></div>
            <div class="${prayerItemClass("maghrib")}"><dt>${iconMarkup(MONTH_TABLE_ICON_PATHS.maghrib, "ws-mobile-item-icon")}المغرب</dt><dd>${row.maghrib || "--:--"}</dd></div>
            <div class="${prayerItemClass("isha")}"><dt>${iconMarkup(MONTH_TABLE_ICON_PATHS.isha, "ws-mobile-item-icon")}العشاء</dt><dd>${row.isha || "--:--"}</dd></div>
          </dl>
        </article>
      `;
    })
    .join("");

  return `
    <section class="ramadan-table-sec" aria-label="إمساكية شهر رمضان كاملة">
      <div class="ramadan-table-head">
        <div class="ramadan-table-head__content">
          <h2 class="ramadan-table-title">${title}</h2>
          <span class="ramadan-table-head__chip" aria-label="تفاصيل الشهر">
            <span class="ramadan-table-head__chip-item">${hijriYear}</span>
            <span class="ramadan-table-head__chip-item">${gregorianYear}</span>
            <span class="ramadan-table-head__chip-item">${monthName}</span>
            <img
              class="ramadan-table-head__chip-icon"
              src="${MONTH_TABLE_ICON_PATHS.ramadan}"
              alt=""
              loading="lazy"
              decoding="async"
            />
          </span>
        </div>

        <div class="ramadan-table-head__actions" aria-label="إجراءات الإمساكية">
          <button type="button" class="ramadan-table-action">
            <span>${downloadLabel}</span>
            <img src="${MONTH_TABLE_ICON_PATHS.download}" alt="" loading="lazy" decoding="async" />
          </button>
          <button type="button" class="ramadan-table-action">
            <span>${shareLabel}</span>
            <img src="${MONTH_TABLE_ICON_PATHS.share}" alt="" loading="lazy" decoding="async" />
          </button>
        </div>
      </div>

      <div class="ws-card">
        <div class="ws-card-top">
          <span class="ws-range">
            <span class="ws-range__text" data-rt-range>${rangeText}</span>
          </span>

          <p class="rt-location-line">
            <span>${locationPrefix}</span>
            <strong data-rt-city>${city}</strong>
          </p>
        </div>

        <div class="ws-wrap">
          <table class="ws-table" aria-label="إمساكية شهر رمضان كاملة">
            <thead>
              <tr>${headerMarkup}</tr>
            </thead>
            <tbody>${rowMarkup}</tbody>
          </table>
        </div>

        <div class="ws-mobile-list" aria-label="إمساكية رمضان - عرض الهاتف">
          ${mobileCardsMarkup}
        </div>
      </div>

      <div class="rt-more-btn">
        <button type="button" class="btn-more btn-more--filled" data-rt-load-more>
          ${showMoreLabel}
        </button>
      </div>
    </section>
  `;
}

