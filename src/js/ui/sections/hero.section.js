export function renderHeroSection(rootElement, viewModel) {
  void viewModel;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="hero" id="hero" aria-label="قسم البطل">
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
              <article class="prayer-card" aria-label="الصلاة القادمة">
                <div class="prayer-card__gloss" aria-hidden="true"></div>

                <div class="pcard-header">
                  <p class="pcard-time" data-hero-next-prayer-time>15:42 PM</p>

                  <div class="pcard-meta">
                    <span class="pcard-pill">
                      <span class="pcard-pill__dot" aria-hidden="true"></span>
                      <span class="pcard-pill__text">الصلاة القادمة</span>
                    </span>

                    <h1 class="pcard-name" data-hero-next-prayer-label>العصر</h1>
                  </div>
                </div>

                <section class="countdown" aria-live="polite" aria-label="الوقت المتبقي للصلاة القادمة">
                  <p class="countdown__label" data-hero-countdown-label>الوقت المتبقي</p>

                  <div class="countdown__grid" data-hero-countdown>
                    <div class="countdown__item">
                      <span class="countdown__val" data-hero-countdown-hours>01</span>
                      <span class="countdown__unit">Hr</span>
                    </div>

                    <span class="countdown__sep" aria-hidden="true">:</span>

                    <div class="countdown__item">
                      <span class="countdown__val" data-hero-countdown-minutes>24</span>
                      <span class="countdown__unit">Min</span>
                    </div>

                    <span class="countdown__sep" aria-hidden="true">:</span>

                    <div class="countdown__item">
                      <span class="countdown__val" data-hero-countdown-seconds>45</span>
                      <span class="countdown__unit">Sec</span>
                    </div>
                  </div>
                </section>
              </article>
            </div>
          </div>

          <div class="hero__pane hero__pane--content">
            <div class="hero-right">
              <div class="loc-chip" aria-label="الموقع الحالي">
                <span class="loc-chip__icon" aria-hidden="true"></span>
                <span class="loc-chip__text" data-hero-location>دمشق، سوريا</span>
              </div>

              <div class="hero-verse-wrap" aria-label="آية قرآنية">
                <span class="hero-verse__ornament hero-verse__ornament--right" aria-hidden="true"></span>
                <p class="hero-verse" data-hero-verse>إن الصلاة كانت على المؤمنين كتابا موقوتا</p>
                <span class="hero-verse__ornament hero-verse__ornament--left" aria-hidden="true"></span>
              </div>

              <article class="date-card" aria-label="التاريخ">
                <div class="date-card__head">
                  <span class="date-card__head-label">اليوم</span>
                  <span class="date-card__cal" aria-hidden="true"></span>
                </div>

                <p class="date-card__day" data-hero-day-label>الثلاثاء</p>
                <div class="date-card__row" data-hero-hijri-date>
                  <span class="date-card__row-r"><span class="date-card__row-num">6</span><span>رمضان</span></span><span class="date-card__row-yr">1448</span>
                </div>
                <div class="date-card__row" data-hero-gregorian-date>
                  <span class="date-card__row-r"><span class="date-card__row-num">10</span><span>أيلول</span></span><span class="date-card__row-yr">2026</span>
                </div>
              </article>

              <button type="button" class="hero-cta" data-hero-change-city>
                تحديد مدينة أخرى
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
  void updates;

  if (!rootElement) {
    return null;
  }

  return rootElement;
}