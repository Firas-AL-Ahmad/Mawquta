import {
  renderRamadanCountdown,
  renderRamadanMonthTable,
} from "../widgets/render-ramadan.js";

function buildDefaultRamadanMonthRows() {
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
}

const DEFAULT_RAMADAN_VIEW_MODEL = {
  monthLabel: "رمضان 2026",
  note: "الإثنين / 18:00 / 22 مارس 2026",
  today: {
    dayLabel: "اليوم 15",
    imsakText: "04:12",
    iftarText: "18:42",
    countdown: { hours: "02", minutes: "16", seconds: "44" },
    progress: 77,
  },
  monthTable: {
    title: "إمساكية شهر رمضان",
    monthName: "رمضان",
    gregorianYear: "2026م",
    hijriYear: "1448ه",
    city: "دمشق، سوريا",
    rangeText: "أكتوبر 23 - أكتوبر 29 , 2026",
    locationPrefix: "مواقيت الإمساك والإفطار حسب توقيت:",
    downloadLabel: "تنزيل",
    shareLabel: "مشاركة",
    showMoreLabel: "عرض الجدول كامل",
    rows: buildDefaultRamadanMonthRows(),
  },
};

const RAMADAN_TOPBAR_STATIC = {
  actionLabel: "اختيار المدينة",
  todayLabel: "اليوم 15",
  ramadanDay: "6",
  ramadanMonth: "رمضان",
  cityLabel: "المدينة:",
  cityValue: "دمشق، سوريا",
  blessingLabel: "رمضان كريم",
  monthHeading: "رمضان 2026",
  updatePrefix: "آخر تحديث:",
  updateValue: "الإثنين / 18:00 / 22 مارس 2026",
};

function getStringOrFallback(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function getObjectOrFallback(value, fallback) {
  return value && typeof value === "object" ? value : fallback;
}

function normalizeRamadanViewModel(viewModel) {
  const model = viewModel && typeof viewModel === "object" ? viewModel : {};

  return {
    monthLabel: getStringOrFallback(
      model.monthLabel,
      DEFAULT_RAMADAN_VIEW_MODEL.monthLabel,
    ),
    note: getStringOrFallback(model.note, DEFAULT_RAMADAN_VIEW_MODEL.note),
    today: getObjectOrFallback(model.today, DEFAULT_RAMADAN_VIEW_MODEL.today),
    monthTable: getObjectOrFallback(
      model.monthTable,
      DEFAULT_RAMADAN_VIEW_MODEL.monthTable,
    ),
  };
}

function renderRamadanTopbar(topbar) {
  return `
    <div class="ramadan-topbar sec-head sec-head--ramadan" aria-label="الترويسة العلوية لرمضان">
      <div class="ramadan-topbar__action-shell">
        <button
          type="button"
          class="ramadan-topbar__action sec-head__action"
          aria-label="${topbar.actionLabel}"
          data-bs-toggle="modal"
          data-bs-target="#qiblaCityModal"
        >
          ${topbar.actionLabel}
        </button>
      </div>

      <div class="ramadan-topbar__chip ramadan-topbar__chip--date">
        <div class="ramadan-topbar__chip-content">
          <span class="ramadan-topbar__chip-label-wrap">
            <span class="ramadan-topbar__chip-label">${topbar.todayLabel}</span>
            <span class="ramadan-topbar__icon ramadan-topbar__icon--calendar sec-head__icon" aria-hidden="true"></span>
          </span>
          <span class="ramadan-topbar__chip-value">${topbar.ramadanDay}</span>
          <span class="ramadan-topbar__chip-value">${topbar.ramadanMonth}</span>
        </div>
      </div>

      <div class="ramadan-topbar__chip ramadan-topbar__chip--city">
        <div class="ramadan-topbar__chip-content">
          <span class="ramadan-topbar__chip-label-wrap">
            <span class="ramadan-topbar__chip-label">${topbar.cityLabel}</span>
            <span class="ramadan-topbar__icon ramadan-topbar__icon--location sec-head__icon" aria-hidden="true"></span>
          </span>
          <span class="ramadan-topbar__chip-value">${topbar.cityValue}</span>
        </div>
      </div>

      <div class="ramadan-topbar__summary sec-head__main">
        <span class="ramadan-topbar__blessing sec-head__badge">
          <span class="ramadan-topbar__blessing-label">${topbar.blessingLabel}</span>
          <img
            class="ramadan-topbar__blessing-icon sec-head__icon"
            src="./assets/icons/Ramadan/moon&stars.svg"
            alt=""
            loading="lazy"
            decoding="async"
          />
        </span>

        <h2 class="ramadan-topbar__month sec-head__title" data-ramadan-month>
          ${topbar.monthHeading}
        </h2>

        <span class="ramadan-topbar__meta sec-head__meta">
          <span class="ramadan-topbar__meta-value">${topbar.updateValue}</span>
          <span class="ramadan-topbar__meta-prefix">${topbar.updatePrefix}</span>
        </span>
      </div>
    </div>
  `;
}

export function renderRamadanSection(
  rootElement,
  data = DEFAULT_RAMADAN_VIEW_MODEL,
) {
  if (!rootElement) {
    return null;
  }

  const normalizedViewModel = normalizeRamadanViewModel(data);
  const topbarModel = {
    ...RAMADAN_TOPBAR_STATIC,
    monthHeading: normalizedViewModel.monthLabel,
    updateValue: normalizedViewModel.note,
  };
  const monthTableModel = {
    ...normalizedViewModel.monthTable,
    city: getStringOrFallback(
      normalizedViewModel.monthTable?.city,
      RAMADAN_TOPBAR_STATIC.cityValue,
    ),
  };

  rootElement.innerHTML = `
    <section class="ramadan-sec" id="ramadan" aria-label="قسم رمضان">
      <div class="container-xl">
        ${renderRamadanTopbar(topbarModel)}

        ${renderRamadanCountdown(normalizedViewModel.today)}
      </div>
    </section>

    <hr class="sec-divider" />

    <div class="container-xl">
      ${renderRamadanMonthTable(monthTableModel)}
    </div>
  `;

  return rootElement;
}
