const FALLBACK_MESSAGES = {
  loading: "جاري تحميل مواقيت اليوم...",
  unavailable: "مواقيت اليوم غير متاحة حالياً.",
};

function resolvePrayerCardsState(state) {
  return state === "loading" ? "loading" : "unavailable";
}

export function renderPrayerCards(rootElement, prayers = [], options = {}) {
  if (!rootElement) {
    return null;
  }

  const { featuredKey = "", state = "ready" } = options;
  const resolvedState = resolvePrayerCardsState(state);

  const safePrayers = Array.isArray(prayers)
    ? prayers.filter((prayer) => prayer && prayer.label)
    : [];

  if (!safePrayers.length) {
    const fallbackMessage = FALLBACK_MESSAGES[resolvedState];

    rootElement.innerHTML = `
      <div class="prayer-cards" aria-label="Daily prayer times">
        <article class="card prayer-card prayer-card--fallback prayer-card--${resolvedState}" aria-live="polite">
          <div class="prayer-card__content">
            <p class="prayer-card__name">${fallbackMessage}</p>
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
