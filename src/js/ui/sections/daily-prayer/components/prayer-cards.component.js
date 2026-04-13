const STATIC_PRAYER_CARDS = [
  {
    key: "fajr",
    label: "الفجر",
    time: "05:11 AM",
    ariaLabel: "صلاة الفجر",
  },
  {
    key: "dhuhr",
    label: "الظهر",
    time: "12:31 PM",
    ariaLabel: "صلاة الظهر",
  },
  {
    key: "asr",
    label: "العصر",
    time: "04:09 PM",
    ariaLabel: "صلاة العصر - الصلاة الحالية",
  },
  {
    key: "maghrib",
    label: "المغرب",
    time: "06:57 PM",
    ariaLabel: "صلاة المغرب",
  },
  {
    key: "isha",
    label: "العشاء",
    time: "08:27 PM",
    ariaLabel: "صلاة العشاء",
  },
];

function renderPrayerCard(prayer, activeKey) {
  const isActive = prayer.key === activeKey;
  const activeClass = isActive ? " daily-prayer-card--active" : "";
  const activeAttributes = isActive ? ' aria-current="true"' : "";

  return `
    <article class="daily-prayer-card daily-prayer-card--${prayer.key}${activeClass}" role="listitem" aria-label="${prayer.ariaLabel}"${activeAttributes}>
      <div class="daily-prayer-card__inner">
        <h3 class="daily-prayer-card__name">${prayer.label}</h3>
        <div class="daily-prayer-card__time-wrap">
          <span class="daily-prayer-card__time">${prayer.time}</span>
        </div>
      </div>
    </article>
  `;
}

export function renderDailyPrayerCards(activeKey = "asr") {
  return STATIC_PRAYER_CARDS.map((prayer) =>
    renderPrayerCard(prayer, activeKey),
  ).join("\n");
}
