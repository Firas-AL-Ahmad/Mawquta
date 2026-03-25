import { renderPrayerCards } from "../widgets/render-prayers.js";

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
      icon: "moon",
    },
    {
      key: "dhuhr",
      name: "الظهر",
      time: "12:31 PM",
      tone: "dhuhr",
      icon: "sun",
    },
    { key: "asr", name: "العصر", time: "04:09 PM", tone: "asr", icon: "sun" },
    {
      key: "maghrib",
      name: "المغرب",
      time: "06:57 PM",
      tone: "maghrib",
      icon: "stars",
    },
    {
      key: "isha",
      name: "العشاء",
      time: "08:27 PM",
      tone: "isha",
      icon: "moon",
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

export function renderDailyPrayerSection(
  rootElement,
  viewModel = STATIC_DAILY_PRAYER_VIEW_MODEL,
) {
  if (!rootElement) {
    return null;
  }

  const model = normalizeDailyPrayerViewModel(viewModel);

  rootElement.innerHTML = `
    <section class="daily-sec" id="daily" aria-label="مواقيت الصلاة اليومية">
      <div class="container-xl">
        <div class="sec-head">
          <div class="sec-city">
            <div class="sec-city__eyebrow">
              <span class="sec-city__eyebrow-icon" aria-hidden="true"></span>
              <span>${model.eyebrowLabel}</span>
            </div>
            <h2 class="sec-city__name" data-daily-city>${model.locationLabel}</h2>
            <span class="sec-city__meta">${model.statusLabel}</span>
          </div>
          <span class="sec-badge">${model.badgeLabel}</span>
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
