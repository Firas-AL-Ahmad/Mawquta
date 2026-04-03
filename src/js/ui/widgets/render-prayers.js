const DEFAULT_PRAYERS = [
  { key: "fajr", name: "الفجر", time: "05:11 AM", tone: "fajr" },
  { key: "dhuhr", name: "الظهر", time: "12:31 PM", tone: "dhuhr" },
  { key: "asr", name: "العصر", time: "04:09 PM", tone: "asr" },
  { key: "maghrib", name: "المغرب", time: "06:57 PM", tone: "maghrib" },
  { key: "isha", name: "العشاء", time: "08:27 PM", tone: "isha" },
];

const TONE_BY_KEY = {
  fajr: "fajr",
  dhuhr: "dhuhr",
  asr: "asr",
  maghrib: "maghrib",
  isha: "isha",
};

const VALID_TONES = new Set(Object.values(TONE_BY_KEY));

function safeText(value, fallback) {
  return typeof value === "string" && value.trim() ? value.trim() : fallback;
}

function normalizePrayerTone(prayerTone, prayerKey) {
  const tone = safeText(prayerTone, "").toLowerCase();
  if (VALID_TONES.has(tone)) {
    return tone;
  }

  const normalizedKey = safeText(prayerKey, "fajr").toLowerCase();
  return TONE_BY_KEY[normalizedKey] ?? "fajr";
}

export function renderPrayerCards(prayers = DEFAULT_PRAYERS, activeKey = "asr") {
  const safePrayers =
    Array.isArray(prayers) && prayers.length ? prayers : DEFAULT_PRAYERS;

  return safePrayers
    .map((prayer) => {
      const key = safeText(prayer.key, "fajr").toLowerCase();
      const tone = normalizePrayerTone(prayer.tone, key);
      const name = safeText(prayer.name, "-");
      const time = safeText(prayer.time, "--:--");
      const isActive = key === String(activeKey || "").toLowerCase();
      const activeClass = isActive ? " ps-card--active" : "";
      const activeAttrs = isActive
        ? ' aria-label="صلاة ' + name + ' - الصلاة الحالية" aria-current="true"'
        : ' aria-label="صلاة ' + name + '"';

      return `
        <article class="ps-card ps-card--${tone}${activeClass}" role="listitem"${activeAttrs}>
          <div class="ps-card__inner">
            <h3 class="ps-card__name">${name}</h3>
            <div class="ps-card__time-wrap">
              <span class="ps-card__time">${time}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}
