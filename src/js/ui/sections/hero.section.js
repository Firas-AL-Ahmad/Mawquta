const DEFAULT_HERO_VIEW_MODEL = {
  locationLabel: "\u062F\u0645\u0634\u0642\u060C \u0633\u0648\u0631\u064A\u0627",
  verseText:
    "\u0625\u0646 \u0627\u0644\u0635\u0644\u0627\u0629 \u0643\u0627\u0646\u062A \u0639\u0644\u0649 \u0627\u0644\u0645\u0624\u0645\u0646\u064A\u0646 \u0643\u062A\u0627\u0628\u0627 \u0645\u0648\u0642\u0648\u062A\u0627",
  dayLabel: "\u0627\u0644\u062B\u0644\u0627\u062B\u0627\u0621",
  hijriDateLabel: "6 \u0631\u0645\u0636\u0627\u0646 1448",
  gregorianDateLabel: "10 \u0627\u064A\u0648\u0644 2026",
  nextPrayerLabel: "\u0627\u0644\u0639\u0635\u0631",
  nextPrayerTime: "15:42 PM",
  countdownLabel: "\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062A\u0628\u0642\u064A",
  countdown: {
    hours: "01",
    minutes: "24",
    seconds: "45",
  },
  ctaText:
    "\u062A\u062D\u062F\u064A\u062F \u0645\u062F\u064A\u0646\u0629 \u0623\u062E\u0631\u0649",
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

function setDateRow(rootElement, selector, dateLabel) {
  const dateRow = rootElement.querySelector(selector);
  if (!dateRow || typeof dateLabel !== "string") {
    return;
  }
  dateRow.innerHTML = buildDateRowMarkup(dateLabel);
}

export function renderHeroSection(rootElement, viewModel) {
  if (!rootElement) {
    return null;
  }

  const hero = normalizeHeroViewModel(viewModel);

  rootElement.innerHTML = `
    <section class="hero" id="hero" aria-label="\u0642\u0633\u0645 \u0627\u0644\u0628\u0637\u0644">
      <span class="hero__corner hero__corner--top-left" aria-hidden="true"></span>
      <span class="hero__corner hero__corner--top-right" aria-hidden="true"></span>
      <span class="hero__corner hero__corner--botom-left" aria-hidden="true"></span>
      <span class="hero__corner hero__corner--botom-right" aria-hidden="true"></span>
      <span class="hero__lantern" aria-hidden="true"></span>
      <span class="hero__center-pattern" aria-hidden="true"></span>
      <span class="hero__basmala" aria-hidden="true"></span>

      <div class="hero__inner">
        <div class="hero__layout">
          <div class="hero__pane hero__pane--card">
            <div class="hero-left">
              <article class="prayer-card" aria-label="\u0627\u0644\u0635\u0644\u0627\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629">
                <div class="prayer-card__gloss" aria-hidden="true"></div>

                <div class="pcard-header">
                  <p class="pcard-time" data-hero-next-prayer-time>${hero.nextPrayerTime}</p>

                  <div class="pcard-meta">
                    <span class="pcard-pill">
                      <span class="pcard-pill__dot" aria-hidden="true"></span>
                      <span class="pcard-pill__text">\u0627\u0644\u0635\u0644\u0627\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629</span>
                    </span>

                    <h1 class="pcard-name" data-hero-next-prayer-label>${hero.nextPrayerLabel}</h1>
                  </div>
                </div>

                <section class="countdown" aria-live="polite" aria-label="\u0627\u0644\u0648\u0642\u062A \u0627\u0644\u0645\u062A\u0628\u0642\u064A \u0644\u0644\u0635\u0644\u0627\u0629 \u0627\u0644\u0642\u0627\u062F\u0645\u0629">
                  <p class="countdown__label" data-hero-countdown-label>${hero.countdownLabel}</p>

                  <div class="countdown__grid" data-hero-countdown>
                    <div class="countdown__item">
                      <span class="countdown__val" data-hero-countdown-hours>${hero.countdown.hours}</span>
                      <span class="countdown__unit">Hr</span>
                    </div>

                    <span class="countdown__sep" aria-hidden="true">:</span>

                    <div class="countdown__item">
                      <span class="countdown__val" data-hero-countdown-minutes>${hero.countdown.minutes}</span>
                      <span class="countdown__unit">Min</span>
                    </div>

                    <span class="countdown__sep" aria-hidden="true">:</span>

                    <div class="countdown__item">
                      <span class="countdown__val" data-hero-countdown-seconds>${hero.countdown.seconds}</span>
                      <span class="countdown__unit">Sec</span>
                    </div>
                  </div>
                </section>
              </article>
            </div>
          </div>

          <div class="hero__pane hero__pane--content">
            <div class="hero-right">
              <div class="loc-chip" aria-label="\u0627\u0644\u0645\u0648\u0642\u0639 \u0627\u0644\u062D\u0627\u0644\u064A">
                <span class="loc-chip__icon" aria-hidden="true"></span>
                <span class="loc-chip__text" data-hero-location>${hero.locationLabel}</span>
              </div>

              <div class="hero-verse-wrap" aria-label="\u0622\u064A\u0629 \u0642\u0631\u0622\u0646\u064A\u0629">
                <span class="hero-verse__ornament hero-verse__ornament--right" aria-hidden="true"></span>
                <p class="hero-verse" data-hero-verse>${hero.verseText}</p>
                <span class="hero-verse__ornament hero-verse__ornament--left" aria-hidden="true"></span>
              </div>

              <article class="date-card" aria-label="\u0627\u0644\u062A\u0627\u0631\u064A\u062E">
                <div class="date-card__head">
                  <span class="date-card__head-label">\u0627\u0644\u064A\u0648\u0645</span>
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

  if (updates.locationLabel) {
    setTextContent(selectors.location, updates.locationLabel);
  }
  if (updates.verseText) {
    setTextContent(selectors.verse, updates.verseText);
  }
  if (updates.dayLabel) {
    setTextContent(selectors.dayLabel, updates.dayLabel);
  }
  if (updates.hijriDateLabel) {
    setDateRow(rootElement, selectors.hijriDate, updates.hijriDateLabel);
  }
  if (updates.gregorianDateLabel) {
    setDateRow(rootElement, selectors.gregorianDate, updates.gregorianDateLabel);
  }
  if (updates.nextPrayerLabel) {
    setTextContent(selectors.nextPrayerLabel, updates.nextPrayerLabel);
  }
  if (updates.nextPrayerTime) {
    setTextContent(selectors.nextPrayerTime, updates.nextPrayerTime);
  }
  if (updates.countdownLabel) {
    setTextContent(selectors.countdownLabel, updates.countdownLabel);
  }
  if (updates.ctaText) {
    setTextContent(selectors.ctaButton, updates.ctaText);
  }

  if (updates.countdown) {
    const { hours, minutes, seconds } = updates.countdown;
    if (hours !== undefined) {
      setTextContent(selectors.countdownHours, safeCountdownPart(hours, "00"));
    }
    if (minutes !== undefined) {
      setTextContent(
        selectors.countdownMinutes,
        safeCountdownPart(minutes, "00"),
      );
    }
    if (seconds !== undefined) {
      setTextContent(
        selectors.countdownSeconds,
        safeCountdownPart(seconds, "00"),
      );
    }
  }

  return rootElement;
}
