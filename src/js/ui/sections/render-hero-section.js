const DEFAULT_HERO_VIEW_MODEL = {
  locationLabel: "دمشق، سوريا",
  verseText:
    "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا",
  dayLabel: "الثلاثاء",
  hijriDateLabel: "6 رمضان 1448",
  gregorianDateLabel: "10 أيلول 2026",
  nextPrayerLabel: "العصر",
  nextPrayerTime: "15:42 PM",
  countdownLabel: "الوقت المتبقي",
  countdown: {
    hours: "01",
    minutes: "24",
    seconds: "45",
  },
  ctaText: "تحديد مدينة أخرى",
};

function safeText(value, fallback) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function safeCountdownPart(value, fallback) {
  if (value === null || value === undefined) {
    return fallback;
  }

  const normalized = String(value).trim();
  if (!normalized) {
    return fallback;
  }

  return normalized.padStart(2, "0");
}

function normalizeHeroViewModel(viewModel) {
  const model = viewModel && typeof viewModel === "object" ? viewModel : {};
  const countdownModel =
    model.countdown && typeof model.countdown === "object"
      ? model.countdown
      : {};

  return {
    locationLabel: safeText(
      model.locationLabel,
      DEFAULT_HERO_VIEW_MODEL.locationLabel,
    ),
    verseText: safeText(model.verseText, DEFAULT_HERO_VIEW_MODEL.verseText),
    dayLabel: safeText(model.dayLabel, DEFAULT_HERO_VIEW_MODEL.dayLabel),
    hijriDateLabel: safeText(
      model.hijriDateLabel,
      DEFAULT_HERO_VIEW_MODEL.hijriDateLabel,
    ),
    gregorianDateLabel: safeText(
      model.gregorianDateLabel,
      DEFAULT_HERO_VIEW_MODEL.gregorianDateLabel,
    ),
    nextPrayerLabel: safeText(
      model.nextPrayerLabel,
      DEFAULT_HERO_VIEW_MODEL.nextPrayerLabel,
    ),
    nextPrayerTime: safeText(
      model.nextPrayerTime,
      DEFAULT_HERO_VIEW_MODEL.nextPrayerTime,
    ),
    countdownLabel: safeText(
      model.countdownLabel,
      DEFAULT_HERO_VIEW_MODEL.countdownLabel,
    ),
    countdown: {
      hours: safeCountdownPart(
        countdownModel.hours,
        DEFAULT_HERO_VIEW_MODEL.countdown.hours,
      ),
      minutes: safeCountdownPart(
        countdownModel.minutes,
        DEFAULT_HERO_VIEW_MODEL.countdown.minutes,
      ),
      seconds: safeCountdownPart(
        countdownModel.seconds,
        DEFAULT_HERO_VIEW_MODEL.countdown.seconds,
      ),
    },
    ctaText: safeText(model.ctaText, DEFAULT_HERO_VIEW_MODEL.ctaText),
  };
}

export function renderHeroSection(rootElement, viewModel) {
  if (!rootElement) {
    return null;
  }

  const hero = normalizeHeroViewModel(viewModel);

  rootElement.innerHTML = `
    <div class="hero-section__inner container">
      <div class="row g-3 g-lg-4 align-items-stretch">
        <div class="col-12 col-lg-4">
          <div class="hero-section__right h-100">
            <div class="hero-section__top">
              <div class="hero-location-chip" aria-label="الموقع الحالي">
                <img
                  class="hero-location-chip__icon"
                  src="./assets/icons/Header/location-icon.svg"
                  alt=""
                  width="24"
                  height="24"
                  loading="lazy"
                  decoding="async"
                />
                <span class="hero-location-chip__text" data-hero-location>${hero.locationLabel}</span>
              </div>

              <p class="hero-verse" data-hero-verse>${hero.verseText}</p>
            </div>

            <article class="hero-date-card" aria-label="ملخص اليوم">
              <p class="hero-date-card__eyebrow">اليوم</p>
              <p class="hero-date-card__day" data-hero-day-label>${hero.dayLabel}</p>
              <p class="hero-date-card__row" data-hero-hijri-date>${hero.hijriDateLabel}</p>
              <p class="hero-date-card__row" data-hero-gregorian-date>${hero.gregorianDateLabel}</p>
            </article>

            <button type="button" class="hero-section__cta btn btn--primary" data-hero-change-city>
              ${hero.ctaText}
            </button>
          </div>
        </div>

        <div class="col-12 col-lg-8">
          <div class="hero-section__left h-100">
            <article class="hero-next-prayer-card h-100" aria-label="الصلاة القادمة">
              <div class="hero-next-prayer-card__surface" aria-hidden="true"></div>

              <div class="hero-next-prayer-card__header">
                <p class="hero-next-prayer-card__time" data-hero-next-prayer-time>${hero.nextPrayerTime}</p>

                <div class="hero-next-prayer-card__meta">
                  <span class="hero-next-prayer-card__pill">
                    <span class="hero-next-prayer-card__pill-dot" aria-hidden="true"></span>
                    <span class="hero-next-prayer-card__pill-text">الصلاة القادمة</span>
                  </span>

                  <h1 class="hero-next-prayer-card__title" data-hero-next-prayer-label>${hero.nextPrayerLabel}</h1>
                </div>
              </div>

              <section class="hero-countdown" aria-live="polite" aria-label="الوقت المتبقي للصلاة القادمة">
                <p class="hero-countdown__label">${hero.countdownLabel}</p>

                <div class="hero-countdown__grid" data-hero-countdown>
                  <div class="hero-countdown__item">
                    <span class="hero-countdown__value" data-hero-countdown-hours>${hero.countdown.hours}</span>
                    <span class="hero-countdown__unit">Hr</span>
                  </div>

                  <span class="hero-countdown__separator" aria-hidden="true">:</span>

                  <div class="hero-countdown__item">
                    <span class="hero-countdown__value" data-hero-countdown-minutes>${hero.countdown.minutes}</span>
                    <span class="hero-countdown__unit">Min</span>
                  </div>

                  <span class="hero-countdown__separator" aria-hidden="true">:</span>

                  <div class="hero-countdown__item">
                    <span class="hero-countdown__value" data-hero-countdown-seconds>${hero.countdown.seconds}</span>
                    <span class="hero-countdown__unit">Sec</span>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </div>
      </div>
    </div>
  `;

  return rootElement;
}
