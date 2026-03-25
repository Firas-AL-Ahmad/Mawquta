const DEFAULT_HERO_VIEW_MODEL = {
  locationLabel: "دمشق، سوريا",
  verseText:
    "إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَوْقُوتًا",
  dayLabel: "الثلاثاء",
  hijriDateLabel: "6 رمضان 1448",
  gregorianDateLabel: "10 أيلول 2026",
  nextPrayerLabel: "العصر",
  nextPrayerTime: "04:09 PM",
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

function buildDateRowMarkup(dateLabel) {
  const normalized = safeText(dateLabel, "");
  if (!normalized) {
    return `<span class="date-card__row-r"><span class="date-card__row-num">--</span><span>--</span></span><span class="date-card__row-yr">----</span>`;
  }

  const parts = normalized.split(/\s+/).filter(Boolean);
  if (parts.length < 2) {
    return `<span class="date-card__row-r"><span class="date-card__row-num">${normalized}</span></span><span class="date-card__row-yr">----</span>`;
  }

  const maybeYear = parts.at(-1);
  const hasYear = /^\d{3,4}$/.test(maybeYear);
  const year = hasYear ? maybeYear : "----";
  const bodyParts = hasYear ? parts.slice(0, -1) : parts;
  const number = bodyParts[0] || "--";
  const month = bodyParts.slice(1).join(" ") || "--";

  return `<span class="date-card__row-r"><span class="date-card__row-num">${number}</span><span>${month}</span></span><span class="date-card__row-yr">${year}</span>`;
}

export function renderHeroSection(rootElement, viewModel) {
  if (!rootElement) {
    return null;
  }

  const hero = normalizeHeroViewModel(viewModel);

  rootElement.innerHTML = `
    <section class="hero" id="hero" aria-label="القسم الرئيسي">
      <span class="hero__basmala" aria-hidden="true">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</span>

      <div class="hero__inner container-xl">
        <div class="row g-3 g-lg-4 align-items-stretch">
          <div class="col-12 col-lg-6 d-flex col-hero-right order-2 order-lg-1">
            <div class="hero-right w-100">
              <div class="loc-chip" aria-label="الموقع الحالي">
                <span class="loc-chip__icon" aria-hidden="true"></span>
                <span class="loc-chip__text" data-hero-location>${hero.locationLabel}</span>
              </div>

              <p class="hero-verse" data-hero-verse>${hero.verseText}</p>

              <article class="date-card" aria-label="ملخص اليوم">
                <div class="date-card__head">
                  <span class="date-card__head-label">اليوم</span>
                  <span class="date-card__cal" aria-hidden="true"></span>
                </div>

                <p class="date-card__day" data-hero-day-label>${hero.dayLabel}</p>
                <div class="date-card__row" data-hero-hijri-date>${buildDateRowMarkup(hero.hijriDateLabel)}</div>
                <div class="date-card__row" data-hero-gregorian-date>${buildDateRowMarkup(hero.gregorianDateLabel)}</div>
              </article>

              <button type="button" class="hero-cta" data-hero-change-city>
                ${hero.ctaText}
              </button>
            </div>
          </div>

          <div class="col-12 col-lg-6 d-flex col-hero-left order-1 order-lg-2">
            <div class="hero-left w-100">
              <article class="prayer-card w-100" aria-label="الصلاة القادمة">
                <div class="prayer-card__gloss" aria-hidden="true"></div>

                <div class="pcard-header">
                  <p class="pcard-time" data-hero-next-prayer-time>${hero.nextPrayerTime}</p>

                  <div class="pcard-meta">
                    <span class="pcard-pill">
                      <span class="pcard-pill__dot" aria-hidden="true"></span>
                      <span class="pcard-pill__text">الصلاة القادمة</span>
                    </span>

                    <h1 class="pcard-name" data-hero-next-prayer-label>${hero.nextPrayerLabel}</h1>
                  </div>
                </div>

                <section class="countdown" aria-live="polite" aria-label="الوقت المتبقي للصلاة القادمة">
                  <p class="countdown__label" data-hero-countdown-label>${hero.countdownLabel}</p>

                  <div class="countdown__grid" data-hero-countdown>
                    <div class="countdown__item">
                      <span class="countdown__val" data-hero-countdown-hours>${hero.countdown.hours}</span>
                      <span class="countdown__unit">HR</span>
                    </div>

                    <span class="countdown__sep" aria-hidden="true">:</span>

                    <div class="countdown__item">
                      <span class="countdown__val" data-hero-countdown-minutes>${hero.countdown.minutes}</span>
                      <span class="countdown__unit">MIN</span>
                    </div>

                    <span class="countdown__sep" aria-hidden="true">:</span>

                    <div class="countdown__item">
                      <span class="countdown__val" data-hero-countdown-seconds>${hero.countdown.seconds}</span>
                      <span class="countdown__unit">SEC</span>
                    </div>
                  </div>
                </section>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr class="sec-divider" />
  `;

  return rootElement;
}

export function updateHeroSectionLiveState(rootElement, updates = {}) {
  if (!rootElement) return null;

  const selectors = {
    location: "[data-hero-location]",
    verse: "[data-hero-verse]",
    dayLabel: "[data-hero-day-label]",
    hijriDate: "[data-hero-hijri-date]",
    gregorianDate: "[data-hero-gregorian-date]",
    nextPrayerLabel: "[data-hero-next-prayer-label]",
    nextPrayerTime: "[data-hero-next-prayer-time]",
    countdownLabel: "[data-hero-countdown-label]",
    countdownHours: "[data-hero-countdown-hours]",
    countdownMinutes: "[data-hero-countdown-minutes]",
    countdownSeconds: "[data-hero-countdown-seconds]",
    ctaButton: "[data-hero-change-city]",
  };

  const setTextContent = (selector, value) => {
    const el = rootElement.querySelector(selector);
    if (el && typeof value === "string") {
      el.textContent = value;
    }
  };

  if (updates.locationLabel) setTextContent(selectors.location, updates.locationLabel);
  if (updates.verseText) setTextContent(selectors.verse, updates.verseText);
  if (updates.dayLabel) setTextContent(selectors.dayLabel, updates.dayLabel);
  if (updates.nextPrayerLabel) setTextContent(selectors.nextPrayerLabel, updates.nextPrayerLabel);
  if (updates.nextPrayerTime) setTextContent(selectors.nextPrayerTime, updates.nextPrayerTime);
  if (updates.countdownLabel) setTextContent(selectors.countdownLabel, updates.countdownLabel);
  if (updates.ctaText) setTextContent(selectors.ctaButton, updates.ctaText);

  if (updates.countdown) {
    const { hours, minutes, seconds } = updates.countdown;
    if (hours !== undefined) setTextContent(selectors.countdownHours, safeCountdownPart(hours, "00"));
    if (minutes !== undefined) setTextContent(selectors.countdownMinutes, safeCountdownPart(minutes, "00"));
    if (seconds !== undefined) setTextContent(selectors.countdownSeconds, safeCountdownPart(seconds, "00"));
  }

  return rootElement;
}
