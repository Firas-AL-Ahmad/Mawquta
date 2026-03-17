const FALLBACK_MESSAGE = "مواقيت اليوم غير متاحة حالياً.";

export function renderPrayerCards(rootElement, prayers = [], options = {}) {
  if (!rootElement) {
    return null;
  }

  const { featuredKey = "" } = options;

  const safePrayers = Array.isArray(prayers)
    ? prayers.filter((prayer) => prayer && prayer.label)
    : [];

  if (!safePrayers.length) {
    rootElement.innerHTML = `
      <div class="prayer-cards" aria-label="Daily prayer times">
        <article class="card prayer-card prayer-card--fallback" aria-live="polite">
          <div class="prayer-card__content">
            <p class="prayer-card__name">${FALLBACK_MESSAGE}</p>
          </div>
        </article>
      </div>
    `;

    return rootElement;
  }

  const cardsMarkup = safePrayers
    .map(({ key, label, time }) => {
      const isFeatured = featuredKey && key === featuredKey;
      const featuredClass = isFeatured ? " prayer-card--featured" : "";
      const safeTime = time || "--:--";

      return `
        <article class="card prayer-card${featuredClass}">
          <div class="prayer-card__content">
            <p class="prayer-card__name">${label}</p>
            <p class="prayer-card__time">${safeTime}</p>
          </div>
        </article>
      `;
    })
    .join("");

  rootElement.innerHTML = `
    <div class="prayer-cards" aria-label="Daily prayer times">
      ${cardsMarkup}
    </div>
  `;

  return rootElement;
}
