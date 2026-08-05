/* =========================================================
   Imports
========================================================= */
import {
  getMonthlyCalendarByCoords,
  getMonthlyCalendarByCity,
} from "../api/aladhan.api.js";

import {
  requireValue,
  requireLongitude,
  requireLatitude,
} from "../utils/validation.util.js";

import { getCache, setCache } from "../utils/cache.util.js";
import { CONFIG } from "../config/app.config.js";

/* =========================================================
   Constants
========================================================= */
const WEEK_LENGTH = 7;

/* =========================================================
   Cache Key Helpers
========================================================= */
/**
 * Builds a stable cache key for monthly calendar data.
 * - For coords, rounds lat/lon to reduce cache fragmentation.
 * - For city, uses "city|country".
 */
function buildCalendarCacheKey({
  type,
  city,
  country,
  latitude,
  longitude,
  year,
  month,
}) {
  if (type === "coords") {
    const lat = Number(latitude).toFixed(4);
    const lon = Number(longitude).toFixed(4);
    return `cal:coords:${lat},${lon}:${year}-${month}`;
  }

  return `cal:city:${city}|${country}:${year}-${month}`;
}

/* =========================================================
   Date Helpers
========================================================= */
/**
 * Extracts {year, month, day} from a Date object.
 * Month is 1..12 (not JS zero-based).
 */
function getDateParts(dateObj = new Date()) {
  return {
    year: dateObj.getFullYear(),
    month: dateObj.getMonth() + 1,
    day: dateObj.getDate(),
  };
}

/**
 * Returns the next month/year pair (month is 1..12).
 */
function getNextMonth(year, month) {
  if (month === 12) return { year: year + 1, month: 1 };
  return { year, month: month + 1 };
}

/**
 * Calculates the start index for "today" inside the monthly calendar array.
 * Monthly calendar arrays are 0-based where index 0 => day 1.
 */
function getStartIndexForDate(dateObj = new Date()) {
  const { day } = getDateParts(dateObj);
  return Math.max(0, day - 1);
}

/* =========================================================
   Week Slicing Helpers
========================================================= */
/**
 * Returns exactly 7 days by taking the remainder of the current month slice
 * and completing it with the start of the next month if needed.
 */
function sliceWeekFromTwoMonths(
  currentMonthDays,
  nextMonthDays,
  dateObj = new Date(),
) {
  const startIdx = getStartIndexForDate(dateObj);
  const fromCurrent = currentMonthDays.slice(startIdx);

  if (fromCurrent.length >= WEEK_LENGTH) {
    return fromCurrent.slice(0, WEEK_LENGTH);
  }

  const remaining = WEEK_LENGTH - fromCurrent.length;
  const fromNext = nextMonthDays.slice(0, remaining);

  return fromCurrent.concat(fromNext);
}

/**
 * Checks if the current month alone can satisfy a 7-day slice
 * starting from today's index.
 */
function canSliceFullWeekFromCurrentMonth(
  currentMonthDays,
  dateObj = new Date(),
) {
  const startIdx = getStartIndexForDate(dateObj);
  return currentMonthDays.length - startIdx >= WEEK_LENGTH;
}

/**
 * Slices 7 days from current month only.
 */
function sliceWeekFromCurrentMonthOnly(currentMonthDays, dateObj = new Date()) {
  const startIdx = getStartIndexForDate(dateObj);
  return currentMonthDays.slice(startIdx, startIdx + WEEK_LENGTH);
}

/* =========================================================
   Calendar Fetch Helpers (with Cache)
========================================================= */
/**
 * In-flight request dedupe so concurrent consumers (Daily and Weekly) that
 * request the same location+month never fire a duplicate network request.
 * Shared by the calendar cache key; entries are removed once the fetch
 * settles, whichever way it settles.
 */
const inflightCalendarRequests = new Map();

/**
 * Returns the in-flight promise for `cacheKey` when present (unless cache
 * bypass is requested), otherwise runs `fetcher`, records it and returns it.
 */
function dedupeFetch(cacheKey, fetcher, bypassCache) {
  if (!bypassCache && inflightCalendarRequests.has(cacheKey)) {
    return inflightCalendarRequests.get(cacheKey);
  }

  const request = fetcher().finally(() => {
    inflightCalendarRequests.delete(cacheKey);
  });
  inflightCalendarRequests.set(cacheKey, request);
  return request;
}

/**
 * Fetches a monthly calendar by city/country with optional cache bypass.
 */
async function fetchMonthlyCalendarByCity({
  city,
  country,
  year,
  month,
  bypassCache,
}) {
  const cacheKey = buildCalendarCacheKey({
    type: "city",
    city,
    country,
    year,
    month,
  });

  const calendarDays = bypassCache ? null : getCache(cacheKey);
  if (calendarDays) return calendarDays;

  return dedupeFetch(
    cacheKey,
    async () => {
      const days = await getMonthlyCalendarByCity(city, country, month, year);
      setCache(cacheKey, days, CONFIG.CALENDAR_CACHE_TTL_MS);
      return days;
    },
    bypassCache,
  );
}

/**
 * Fetches a monthly calendar by coords with optional cache bypass.
 */
async function fetchMonthlyCalendarByCoords({
  latitude,
  longitude,
  year,
  month,
  bypassCache,
}) {
  const cacheKey = buildCalendarCacheKey({
    type: "coords",
    latitude,
    longitude,
    year,
    month,
  });

  const calendarDays = bypassCache ? null : getCache(cacheKey);
  if (calendarDays) return calendarDays;

  return dedupeFetch(
    cacheKey,
    async () => {
      const days = await getMonthlyCalendarByCoords(
        latitude,
        longitude,
        month,
        year,
      );
      setCache(cacheKey, days, CONFIG.CALENDAR_CACHE_TTL_MS);
      return days;
    },
    bypassCache,
  );
}

/* =========================================================
   Public API
========================================================= */
/**
 * Returns the current week (7 days) for a given city/country.
 * If the week reaches the end of the month, it automatically pulls remaining days
 * from the next month to keep week length fixed at 7.
 */
export async function getCurrentWeekByCity(
  city,
  country,
  dateObj = new Date(),
  bypassCache = true,
) {
  requireValue(city, "city");
  requireValue(country, "country");

  const { year, month } = getDateParts(dateObj);

  const currentMonthDays = await fetchMonthlyCalendarByCity({
    city,
    country,
    year,
    month,
    bypassCache,
  });

  if (canSliceFullWeekFromCurrentMonth(currentMonthDays, dateObj)) {
    return sliceWeekFromCurrentMonthOnly(currentMonthDays, dateObj);
  }

  const { year: nextYear, month: nextMonth } = getNextMonth(year, month);

  const nextMonthDays = await fetchMonthlyCalendarByCity({
    city,
    country,
    year: nextYear,
    month: nextMonth,
    bypassCache,
  });

  return sliceWeekFromTwoMonths(currentMonthDays, nextMonthDays, dateObj);
}

/**
 * Returns the current week (7 days) for a given latitude/longitude.
 * If the week reaches the end of the month, it automatically pulls remaining days
 * from the next month to keep week length fixed at 7.
 */
export async function getCurrentWeekByCoords(
  latitude,
  longitude,
  dateObj = new Date(),
  bypassCache = true,
) {
  requireLatitude(latitude);
  requireLongitude(longitude);

  const { year, month } = getDateParts(dateObj);

  const currentMonthDays = await fetchMonthlyCalendarByCoords({
    latitude,
    longitude,
    year,
    month,
    bypassCache,
  });

  if (canSliceFullWeekFromCurrentMonth(currentMonthDays, dateObj)) {
    return sliceWeekFromCurrentMonthOnly(currentMonthDays, dateObj);
  }

  const { year: nextYear, month: nextMonth } = getNextMonth(year, month);

  const nextMonthDays = await fetchMonthlyCalendarByCoords({
    latitude,
    longitude,
    year: nextYear,
    month: nextMonth,
    bypassCache,
  });

  return sliceWeekFromTwoMonths(currentMonthDays, nextMonthDays, dateObj);
}

/**
 * Returns the single calendar day object for a given date by city/country.
 * Reuses the same monthly calendar cache as getCurrentWeekByCity so no
 * duplicate request is fired when the month is already available.
 */
export async function getTodayByCity(
  city,
  country,
  dateObj = new Date(),
  bypassCache = false,
) {
  requireValue(city, "city");
  requireValue(country, "country");

  const { year, month, day } = getDateParts(dateObj);

  const monthDays = await fetchMonthlyCalendarByCity({
    city,
    country,
    year,
    month,
    bypassCache,
  });

  return getDayFromMonthDays(monthDays, year, month, day);
}

/**
 * Returns the single calendar day object for a given date by coords.
 * Reuses the same monthly calendar cache as getCurrentWeekByCoords so no
 * duplicate request is fired when the month is already available.
 */
export async function getTodayByCoords(
  latitude,
  longitude,
  dateObj = new Date(),
  bypassCache = false,
) {
  requireLatitude(latitude);
  requireLongitude(longitude);

  const { year, month, day } = getDateParts(dateObj);

  const monthDays = await fetchMonthlyCalendarByCoords({
    latitude,
    longitude,
    year,
    month,
    bypassCache,
  });

  return getDayFromMonthDays(monthDays, year, month, day);
}

/**
 * Returns the full monthly calendar array (day 1..N) for a given city/country.
 * Reuses the exact same monthly `cal:*` cache and in-flight dedupe as the week
 * and today getters, so a consumer (e.g. the Ramadan month table) never issues
 * a parallel provider request when the month is already being fetched.
 */
export async function getMonthCalendarByCity(
  city,
  country,
  dateObj = new Date(),
  bypassCache = false,
) {
  requireValue(city, "city");
  requireValue(country, "country");

  const { year, month } = getDateParts(dateObj);

  return fetchMonthlyCalendarByCity({
    city,
    country,
    year,
    month,
    bypassCache,
  });
}

/**
 * Returns the full monthly calendar array (day 1..N) for a given
 * latitude/longitude. Reuses the exact same monthly `cal:*` cache and in-flight
 * dedupe as the week and today getters.
 */
export async function getMonthCalendarByCoords(
  latitude,
  longitude,
  dateObj = new Date(),
  bypassCache = false,
) {
  requireLatitude(latitude);
  requireLongitude(longitude);

  const { year, month } = getDateParts(dateObj);

  return fetchMonthlyCalendarByCoords({
    latitude,
    longitude,
    year,
    month,
    bypassCache,
  });
}

/**
 * Extracts a single day object from a monthly calendar array (0-based index
 * where index 0 => day 1). Throws when the requested day is missing so callers
 * can fall back to a direct daily endpoint.
 */
function getDayFromMonthDays(monthDays, year, month, day) {
  const dayIndex = Math.max(0, day - 1);
  const dayObject = monthDays?.[dayIndex];

  if (!dayObject) {
    throw new Error(
      `week.service: no calendar day found for ${year}-${month}-${day}`,
    );
  }

  return dayObject;
}

