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
  isha: "assets/icons/Ramadan/MonthTable/header-isha.svg",
  maghrib: "assets/icons/Ramadan/MonthTable/header-maghrib.svg",
  asr: "assets/icons/Ramadan/MonthTable/header-asr.svg",
  dhuhr: "assets/icons/Ramadan/MonthTable/header-dhuhr.svg",
  fajr: "assets/icons/Ramadan/MonthTable/header-fajr.svg",
  date: "assets/icons/Ramadan/MonthTable/header-date.svg",
  day: "assets/icons/Ramadan/MonthTable/header-day.svg",
  ramadan: "assets/icons/Ramadan/moon&stars.svg",
  download: "assets/icons/Ramadan/MonthTable/action-download.svg",
  share: "assets/icons/Ramadan/MonthTable/action-share.svg",
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

function renderRamadanTableHeaderCell(label, iconPath) {
  return `
    <span class="rt-th-label">
      <span class="rt-th-icon" aria-hidden="true">
        <img src="${iconPath}" alt="" loading="lazy" decoding="async" />
      </span>
      <span>${label}</span>
    </span>
  `;
}

function renderRamadanTimeCell(value, columnKey, activeColumns) {
  const safeValue = getStringOrFallback(value, "--:--");
  if (!activeColumns.has(columnKey)) {
    return safeValue;
  }

  return `<span class="rt-time-pill">${safeValue}</span>`;
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
          <td>${renderRamadanTimeCell(row.isha, "isha", activeColumns)}</td>
          <td>${renderRamadanTimeCell(row.maghrib, "maghrib", activeColumns)}</td>
          <td>${renderRamadanTimeCell(row.asr, "asr", activeColumns)}</td>
          <td>${renderRamadanTimeCell(row.dhuhr, "dhuhr", activeColumns)}</td>
          <td>${renderRamadanTimeCell(row.fajr, "fajr", activeColumns)}</td>
          <td class="td-date">${row.date}</td>
          <td class="td-day">${row.dayName}</td>
          <td class="td-num">${row.ramadanDay}</td>
        </tr>
      `;
    })
    .join("");

  const mobileCardsMarkup = rows
    .map((row) => {
      const todayPill = row.today ? '<span class="rt-mobile-pill">اليوم</span>' : "";

      return `
        <article class="rt-mobile-card" aria-label="إمساكية ${row.dayName || "-"}">
          <div class="rt-mobile-head">
            <div>
              <h3 class="rt-mobile-title">رمضان ${row.ramadanDay || "-"} - ${row.dayName || "-"}</h3>
              <span class="rt-mobile-date">${row.date || "-"}</span>
            </div>
            ${todayPill}
          </div>

          <dl class="rt-mobile-grid">
            <div class="rt-mobile-item"><dt>الفجر</dt><dd>${row.fajr || "--:--"}</dd></div>
            <div class="rt-mobile-item rt-mobile-item--iftar"><dt>المغرب</dt><dd>${row.maghrib || "--:--"}</dd></div>
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

      <div class="rt-card">
        <div class="rt-card__meta">
          <span class="rt-range-chip">
            <span class="rt-range-chip__text" data-rt-range>${rangeText}</span>
          </span>

          <p class="rt-location-line">
            <span>${locationPrefix}</span>
            <strong data-rt-city>${city}</strong>
          </p>
        </div>

        <div class="rt-wrap">
          <table class="rt-table" aria-label="إمساكية شهر رمضان كاملة">
            <thead>
              <tr>${headerMarkup}</tr>
            </thead>
            <tbody>${rowMarkup}</tbody>
          </table>
        </div>

        <div class="rt-mobile-list" aria-label="إمساكية رمضان - عرض الهاتف">
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
