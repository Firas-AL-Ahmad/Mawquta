import {
  getTimingsByCityAndCountry,
  getTimingsByCoords,
} from "../api/aladhan.api.js";
import {
  PRAYER_LABELS_AR,
  normalizeTime,
} from "../utils/prayer-format.util.js";
import {
  validateTimeZone,
  getDateKeyInTimeZone,
  addDaysToDateKey,
  buildOccursAt,
  computeRemainingSeconds,
} from "../utils/time.util.js";
import { CONFIG } from "../config/app.config.js";

const PRAYER_ORDER = ["Fajr", "Sunrise", "Dhuhr", "Asr", "Maghrib", "Isha"];

// Resolve "HH:MM" time string to the exact instant on `dateKey` in `timeZone`.
function timeToDateOnKey(hhmm, dateKey, timeZone) {
  return buildOccursAt({ dateKey, time: hhmm, timeZone });
}

// Get the next upcoming prayer from a list of prayers with times.
// `dateKey` and `timeZone` are used to build exact instants for the times.
function getNextPrayer(prayers, { now = new Date(), dateKey, timeZone } = {}) {
  if (!Array.isArray(prayers) || prayers.length === 0) {
    return null;
  }

  for (const p of prayers) {
    const dt = timeToDateOnKey(p.time, dateKey, timeZone);
    if (dt > now) {
      return {
        ...p,
        occursAt: dt.toISOString(),
        remainingSeconds: computeRemainingSeconds(dt, now),
      };
    }
  }

  // If none left today, next is tomorrow's Fajr (assumes first item is Fajr).
  const first = prayers[0];
  const tomorrowKey = addDaysToDateKey(dateKey, 1);
  const dtTomorrow = timeToDateOnKey(first.time, tomorrowKey, timeZone);

  return {
    ...first,
    occursAt: dtTomorrow.toISOString(),
    remainingSeconds: computeRemainingSeconds(dtTomorrow, now),
  };
}

function resolveOptions(options) {
  const { now = new Date(), timeZone = CONFIG.TZ_FALLBACK } = options ?? {};
  validateTimeZone(timeZone);
  return { now, timeZone, dateKey: getDateKeyInTimeZone(timeZone, now) };
}

// Recompute next prayer from an already available prayers array.
// Pure helper with no side effects.
export function getNextPrayerFromPrayers(prayers, now = new Date(), options) {
  if (!Array.isArray(prayers) || prayers.length === 0) {
    return null;
  }

  const { now: resolvedNow, dateKey, timeZone } = resolveOptions({
    now,
    ...(options ?? {}),
  });
  return getNextPrayer(prayers, {
    now: resolvedNow,
    dateKey,
    timeZone,
  });
}

// Build prayers array from timings object
function buildPrayersFromTimings(timings) {
  return PRAYER_ORDER.map((key) => ({
    key,
    label: PRAYER_LABELS_AR[key] ?? key,
    time: normalizeTime(timings[key]),
  }));
}

// Get today's prayer overview (prayers + next) by city and country
export async function getTodayPrayerOverviewByCity(city, country, options) {
  const timings = await getTimingsByCityAndCountry(city, country);

  const prayers = buildPrayersFromTimings(timings);
  const nextPrayer = getNextPrayer(prayers, resolveOptions(options));

  return {
    prayers,
    nextPrayer,
  };
}

// Get today's prayer overview (prayers + next) by latitude/longitude
export async function getTodayPrayerOverviewByCoords(
  latitude,
  longitude,
  options,
) {
  const timings = await getTimingsByCoords(latitude, longitude);

  const prayers = buildPrayersFromTimings(timings);
  const nextPrayer = getNextPrayer(prayers, resolveOptions(options));

  return {
    prayers,
    nextPrayer,
  };
}
