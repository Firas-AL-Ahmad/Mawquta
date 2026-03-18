import { renderPrayerCards } from "../widgets/render-prayers.js";
import { renderPrayerWeek } from "../widgets/render-week.js";

const FALLBACK_SECTION_DATA = {
  meta: {
    location: "الموقع غير متاح حالياً",
    date: "التاريخ غير متاح حالياً",
  },
  featured: {
    key: "",
    label: "المواقيت غير متاحة",
    time: "--:--",
    countdownText: "العد التنازلي غير متاح حالياً.",
  },
  dailyPrayers: [],
  weeklyRows: [],
};

export function renderPrayerSection(
  rootElement,
  sectionData = FALLBACK_SECTION_DATA,
) {
  if (!rootElement) {
    return null;
  }

  const metaLocation =
    sectionData?.meta?.location || FALLBACK_SECTION_DATA.meta.location;
  const metaDate = sectionData?.meta?.date || FALLBACK_SECTION_DATA.meta.date;

  const featuredLabel =
    sectionData?.featured?.label || FALLBACK_SECTION_DATA.featured.label;
  const featuredTime =
    sectionData?.featured?.time || FALLBACK_SECTION_DATA.featured.time;
  const featuredCountdownText =
    sectionData?.featured?.countdownText ||
    sectionData?.featured?.note ||
    FALLBACK_SECTION_DATA.featured.countdownText;

  rootElement.innerHTML = `
    <div class="prayer-section__inner container">
      <div class="prayer-section__intro">
        <div class="section-heading prayer-section__heading">
          <div class="prayer-section__heading-content">
            <p class="section-heading__eyebrow">مواقيت الصلاة</p>
            <h1 class="section-heading__title">ابقَ على صلة بصلاتك أينما كنت</h1>
            <p class="section-heading__subtitle">
              عرض واضح وهادئ لمواقيت اليوم بواجهة عربية عملية ومهيأة للربط بالبيانات الفعلية لاحقًا.
            </p>
          </div>
        </div>

        <div class="prayer-section__meta meta-row" aria-label="Prayer section context">
          <span class="prayer-section__location">${metaLocation}</span>
          <span class="prayer-section__divider" aria-hidden="true">•</span>
          <span class="prayer-section__date">${metaDate}</span>
        </div>
      </div>

      <div class="prayer-section__hero">
        <article class="card prayer-hero-card" aria-label="Featured prayer summary">
          <div class="prayer-hero-card__content">
            <p class="prayer-hero-card__label">الصلاة القادمة</p>
            <h2 class="prayer-hero-card__title" data-prayer-featured-label>${featuredLabel}</h2>
            <p class="prayer-hero-card__time" data-prayer-featured-time>${featuredTime}</p>
            <p class="prayer-hero-card__note" data-prayer-featured-countdown aria-live="polite">${featuredCountdownText}</p>
          </div>

          <div class="prayer-hero-card__visual" aria-hidden="true"></div>
        </article>
      </div>

      <div class="prayer-section__daily">
        <div class="prayer-cards-root"></div>
      </div>

      <div class="prayer-section__week">
        <div class="prayer-week-root"></div>
      </div>
    </div>
  `;

  const prayerCardsRoot = rootElement.querySelector(".prayer-cards-root");
  renderPrayerCards(prayerCardsRoot, sectionData?.dailyPrayers, {
    featuredKey: sectionData?.featured?.key,
  });

  const prayerWeekRoot = rootElement.querySelector(".prayer-week-root");
  renderPrayerWeek(prayerWeekRoot, sectionData?.weeklyRows);

  return rootElement;
}

export function updatePrayerSectionFeaturedState(
  rootElement,
  { featured = {}, dailyPrayers = [], shouldRefreshCards = false } = {},
) {
  if (!rootElement) {
    return null;
  }

  const featuredLabelElement = rootElement.querySelector(
    "[data-prayer-featured-label]",
  );
  const featuredTimeElement = rootElement.querySelector(
    "[data-prayer-featured-time]",
  );
  const featuredCountdownElement = rootElement.querySelector(
    "[data-prayer-featured-countdown]",
  );

  if (featuredLabelElement) {
    featuredLabelElement.textContent =
      featured?.label || FALLBACK_SECTION_DATA.featured.label;
  }

  if (featuredTimeElement) {
    featuredTimeElement.textContent =
      featured?.time || FALLBACK_SECTION_DATA.featured.time;
  }

  if (featuredCountdownElement) {
    featuredCountdownElement.textContent =
      featured?.countdownText || FALLBACK_SECTION_DATA.featured.countdownText;
  }

  if (shouldRefreshCards) {
    const prayerCardsRoot = rootElement.querySelector(".prayer-cards-root");
    renderPrayerCards(prayerCardsRoot, dailyPrayers, {
      featuredKey: featured?.key,
    });
  }

  return rootElement;
}
