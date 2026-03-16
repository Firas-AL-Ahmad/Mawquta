const DAILY_PRAYER_CARDS = [
  { name: "الفجر", time: "04:37", featured: true },
  { name: "الشروق", time: "06:02" },
  { name: "الظهر", time: "12:18" },
  { name: "العصر", time: "15:47" },
  { name: "المغرب", time: "18:31" },
  { name: "العشاء", time: "19:56" },
];

export function renderPrayerCards(rootElement) {
  if (!rootElement) {
    return null;
  }

  const cardsMarkup = DAILY_PRAYER_CARDS.map(({ name, time, featured }) => {
    const featuredClass = featured ? " prayer-card--featured" : "";

    return `
      <article class="card prayer-card${featuredClass}">
        <div class="prayer-card__content">
          <p class="prayer-card__name">${name}</p>
          <p class="prayer-card__time">${time}</p>
        </div>
      </article>
    `;
  }).join("");

  rootElement.innerHTML = `
    <div class="prayer-cards" aria-label="Daily prayer times">
      ${cardsMarkup}
    </div>
  `;

  return rootElement;
}
