import { renderPrayerWeek } from "../widgets/render-week.js";

const STATIC_WEEKLY_PRAYER_VIEW_MODEL = {
  eyebrowLabel: "مواقيت الصلاة في",
  locationLabel: "دمشق، سوريا",
  statusLabel: "آخر تحديث: عند تحميل الصفحة / الآن / وقت فعلي محفوظ",
  week: {
    weekRange: "مارس 23 – مارس 29، 2026",
  },
};

function safeText(value, fallback) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function normalizeWeeklyPrayerViewModel(viewModel) {
  const model = viewModel && typeof viewModel === "object" ? viewModel : {};

  return {
    eyebrowLabel: safeText(
      model.eyebrowLabel,
      STATIC_WEEKLY_PRAYER_VIEW_MODEL.eyebrowLabel,
    ),
    locationLabel: safeText(
      model.locationLabel,
      STATIC_WEEKLY_PRAYER_VIEW_MODEL.locationLabel,
    ),
    statusLabel: safeText(
      model.statusLabel,
      STATIC_WEEKLY_PRAYER_VIEW_MODEL.statusLabel,
    ),
    week:
      model.week && typeof model.week === "object"
        ? model.week
        : STATIC_WEEKLY_PRAYER_VIEW_MODEL.week,
  };
}

export function renderWeeklyPrayerSection(
  rootElement,
  viewModel = STATIC_WEEKLY_PRAYER_VIEW_MODEL,
) {
  if (!rootElement) {
    return null;
  }

  const model = normalizeWeeklyPrayerViewModel(viewModel);

  rootElement.innerHTML = `
    <section class="weekly-sec" id="weekly" aria-label="مواقيت الصلاة الأسبوعية">
      <div class="container-xl px-3 px-sm-4 px-lg-5">
        <div class="sec-head">
          <div class="sec-city">
            <div class="sec-city__eyebrow">
              <span class="sec-city__eyebrow-icon" aria-hidden="true"></span>
              <span>${model.eyebrowLabel}</span>
            </div>
            <h2 class="sec-city__name" data-weekly-city>${model.locationLabel}</h2>
            <span class="sec-city__meta">${model.statusLabel}</span>
          </div>
          <span class="sec-badge">الأسبوعية</span>
        </div>

        ${renderPrayerWeek(model.week)}
      </div>
    </section>

    <hr class="sec-divider" />
  `;

  return rootElement;
}
