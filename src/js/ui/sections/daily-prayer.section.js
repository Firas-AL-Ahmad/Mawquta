import { renderPrayerCards } from "../components/prayer-cards.component.js";

const STATIC_DAILY_PRAYER_VIEW_MODEL = {
  badgeLabel: "اليومية",
  eyebrowLabel: "مواقيت الصلاة في",
  locationLabel: "دمشق، سوريا",
  statusLabel: "آخر تحديث: عند تحميل الصفحة / الآن / وقت فعلي محفوظ",
  activeKey: "asr",
  prayers: [
    {
      key: "fajr",
      name: "الفجر",
      time: "05:11 AM",
      tone: "fajr",
    },
    {
      key: "dhuhr",
      name: "الظهر",
      time: "12:31 PM",
      tone: "dhuhr",
    },
    { key: "asr", name: "العصر", time: "04:09 PM", tone: "asr" },
    {
      key: "maghrib",
      name: "المغرب",
      time: "06:57 PM",
      tone: "maghrib",
    },
    {
      key: "isha",
      name: "العشاء",
      time: "08:27 PM",
      tone: "isha",
    },
  ],
};

function safeText(value, fallback) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function normalizeDailyPrayerViewModel(viewModel) {
  const model = viewModel && typeof viewModel === "object" ? viewModel : {};

  return {
    badgeLabel: safeText(
      model.badgeLabel,
      STATIC_DAILY_PRAYER_VIEW_MODEL.badgeLabel,
    ),
    eyebrowLabel: safeText(
      model.eyebrowLabel,
      STATIC_DAILY_PRAYER_VIEW_MODEL.eyebrowLabel,
    ),
    locationLabel: safeText(
      model.locationLabel,
      STATIC_DAILY_PRAYER_VIEW_MODEL.locationLabel,
    ),
    statusLabel: safeText(
      model.statusLabel,
      STATIC_DAILY_PRAYER_VIEW_MODEL.statusLabel,
    ),
    activeKey: safeText(
      model.activeKey,
      STATIC_DAILY_PRAYER_VIEW_MODEL.activeKey,
    ),
    prayers:
      Array.isArray(model.prayers) && model.prayers.length
        ? model.prayers
        : STATIC_DAILY_PRAYER_VIEW_MODEL.prayers,
  };
}

function parseStatusLabel(statusLabel) {
  const raw = safeText(statusLabel, STATIC_DAILY_PRAYER_VIEW_MODEL.statusLabel);
  const separatorIndex = raw.indexOf(":");

  if (separatorIndex === -1) {
    return {
      prefix: "آخر تحديث:",
      value: raw,
    };
  }

  const prefix = safeText(raw.slice(0, separatorIndex), "آخر تحديث");
  const value = safeText(raw.slice(separatorIndex + 1), raw);

  return {
    prefix: `${prefix}:`,
    value,
  };
}

export function renderDailyPrayerSection(
  rootElement,
  viewModel = STATIC_DAILY_PRAYER_VIEW_MODEL,
) {
  if (!rootElement) {
    return null;
  }

  const model = normalizeDailyPrayerViewModel(viewModel);
  const status = parseStatusLabel(model.statusLabel);

  rootElement.innerHTML = `
    <section class="daily-sec" id="daily" aria-label="مواقيت الصلاة اليومية">
      <div class="container-xl">
        <div class="sec-head daily-sec__head">
          <div class="sec-city daily-sec__city sec-head__main">
            <div class="sec-city__eyebrow daily-sec__eyebrow">
              <span class="sec-city__eyebrow-icon sec-head__icon" aria-hidden="true"></span>
              <span>${model.eyebrowLabel}</span>
            </div>
            <h2 class="sec-city__name daily-sec__name sec-head__title" data-daily-city>${model.locationLabel}</h2>
            <span class="sec-city__meta daily-sec__meta sec-head__meta">
              <span class="daily-sec__meta-value">${status.value}</span>
              <span class="daily-sec__meta-prefix">${status.prefix}</span>
            </span>
          </div>
          <span class="sec-badge daily-sec__badge sec-head__badge">${model.badgeLabel}</span>
        </div>

        <div class="ps-track" role="list" aria-label="أوقات الصلوات اليومية">
          ${renderPrayerCards(model.prayers, model.activeKey)}
        </div>
      </div>
    </section>

    <hr class="sec-divider" />
  `;

  return rootElement;
}


