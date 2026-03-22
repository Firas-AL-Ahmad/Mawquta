const DEFAULT_PRAYERS = [
  { key: "fajr", name: "الفجر", time: "05:11 AM", tone: "fajr", icon: "moon" },
  { key: "dhuhr", name: "الظهر", time: "12:31 PM", tone: "dhuhr", icon: "sun" },
  { key: "asr", name: "العصر", time: "04:09 PM", tone: "asr", icon: "sun" },
  { key: "maghrib", name: "المغرب", time: "06:57 PM", tone: "maghrib", icon: "stars" },
  { key: "isha", name: "العشاء", time: "08:27 PM", tone: "isha", icon: "moon" },
];

function safeText(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

export function renderPrayerCards(prayers = DEFAULT_PRAYERS, activeKey = "asr") {
  const safePrayers = Array.isArray(prayers) && prayers.length ? prayers : DEFAULT_PRAYERS;

  return safePrayers
    .map((prayer) => {
      const tone = safeText(prayer.tone, "fajr");
      const icon = safeText(prayer.icon, "moon");
      const name = safeText(prayer.name, "-");
      const time = safeText(prayer.time, "--:--");
      const key = safeText(prayer.key, tone);
      const isActive = key.toLowerCase() === String(activeKey || "").toLowerCase();
      const activeClass = isActive ? " ps-card--active" : "";
      const activeAttrs = isActive
        ? ' aria-label="صلاة ' + name + ' — الصلاة القادمة" aria-current="true"'
        : ' aria-label="صلاة ' + name + '"';

      return `
        <article class="ps-card ps-card--${tone}${activeClass}" role="listitem"${activeAttrs}>
          <div class="ps-card__gloss" aria-hidden="true"></div>
          <div class="ps-card__top">
            <span class="ps-card__name">${name}</span>
            <span class="ps-card__icon"><span class="i-${icon}"></span></span>
          </div>
          <div class="ps-card__time-wrap">
            <span class="ps-card__time">${time}</span>
          </div>
        </article>
      `;
    })
    .join("");
}
