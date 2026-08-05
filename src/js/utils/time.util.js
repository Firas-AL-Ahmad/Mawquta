// src/js/utils/time.util.js
// Pure timezone-aware date/time helpers for the daily prayer runtime.
// Never relies on the browser's local timezone: every computation goes
// through Intl with an explicit timeZone. Kept free of browser/DOM/axios
// dependencies so it can be tested directly in Node.

function pad2(value) {
  return String(value).padStart(2, "0");
}

/**
 * Validates that a timeZone string is a usable IANA timezone.
 * Throws on missing or invalid values.
 */
export function validateTimeZone(timeZone) {
  if (typeof timeZone !== "string" || !timeZone.trim()) {
    throw new Error("time.util: timezone is required");
  }

  try {
    new Intl.DateTimeFormat("en-US", { timeZone }).format();
  } catch {
    throw new Error(`time.util: invalid timezone "${timeZone}"`);
  }

  return timeZone;
}

/**
 * Returns the fixed UTC offset (in minutes, positive east of UTC) of a given
 * timezone at a given instant. Computed by formatting the same instant in the
 * timezone and comparing the wall-clock parts with the UTC parts — robust and
 * independent of engine-specific timeZoneName formatting.
 */
export function getTimeZoneOffsetMinutes(timeZone, date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);

  const find = (type) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  const asUtc = Date.UTC(
    find("year"),
    find("month") - 1,
    find("day"),
    find("hour"),
    find("minute"),
    find("second"),
  );

  return Math.round((asUtc - date.getTime()) / 60000);
}

/**
 * Returns the wall-clock parts (year, month, day, hour, minute, second) of
 * `now` in the given timezone. Month is 1..12, hour is 0..23.
 */
export function getTimePartsInTimeZone(timeZone, now = new Date()) {
  validateTimeZone(timeZone);

  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const find = (type) => Number(parts.find((part) => part.type === type)?.value ?? 0);

  return {
    year: find("year"),
    month: find("month"),
    day: find("day"),
    hour: find("hour"),
    minute: find("minute"),
    second: find("second"),
  };
}

/**
 * Returns the "YYYY-MM-DD" key for `now` in the given timezone.
 */
export function getDateKeyInTimeZone(timeZone, now = new Date()) {
  const { year, month, day } = getTimePartsInTimeZone(timeZone, now);
  return formatDateKey(year, month, day);
}

/**
 * Formats a "YYYY-MM-DD" key from numeric parts.
 */
export function formatDateKey(year, month, day) {
  return `${pad2(year)}-${pad2(month)}-${pad2(day)}`;
}

/**
 * Adds a number of calendar days to a "YYYY-MM-DD" key and returns the new key.
 * Uses noon UTC as the arithmetic anchor to avoid timezone boundary issues.
 */
export function addDaysToDateKey(dateKey, days) {
  const [year, month, day] = String(dateKey ?? "").split("-").map(Number);
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    throw new Error(`time.util: invalid dateKey "${dateKey}"`);
  }

  const anchor = new Date(Date.UTC(year, month - 1, day + days, 12, 0, 0));
  return formatDateKey(
    anchor.getUTCFullYear(),
    anchor.getUTCMonth() + 1,
    anchor.getUTCDate(),
  );
}

/**
 * Builds the exact instant (Date) at which a prayer occurs: the given
 * "HH:MM" wall-clock time on the given "YYYY-MM-DD" date in the given timezone.
 */
export function buildOccursAt({ dateKey, time, timeZone }) {
  validateTimeZone(timeZone);

  const [year, month, day] = String(dateKey ?? "").split("-").map(Number);
  const [hh, mm] = String(time ?? "").split(":").map(Number);

  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day) ||
    !Number.isInteger(hh) ||
    !Number.isInteger(mm)
  ) {
    throw new Error(
      `time.util: invalid dateKey/time for occursAt (${dateKey} ${time})`,
    );
  }

  const guess = new Date(Date.UTC(year, month - 1, day, hh, mm, 0));
  const offsetMinutes = getTimeZoneOffsetMinutes(timeZone, guess);
  return new Date(guess.getTime() - offsetMinutes * 60000);
}

/**
 * Returns whole seconds remaining until `occursAt` from `now` (clamped to 0).
 * Accepts a Date or a parseable timestamp/ISO string.
 */
export function computeRemainingSeconds(occursAt, now = new Date()) {
  const target = occursAt instanceof Date ? occursAt.getTime() : new Date(occursAt).getTime();
  const current = now instanceof Date ? now.getTime() : new Date(now).getTime();
  return Math.max(0, Math.floor((target - current) / 1000));
}

/**
 * Splits a number of seconds into padded { hours, minutes, seconds } strings
 * suitable for the hero countdown display.
 */
export function formatRemaining(totalSeconds) {
  const safe = Math.max(0, Math.floor(totalSeconds));
  return {
    hours: pad2(Math.floor(safe / 3600)),
    minutes: pad2(Math.floor((safe % 3600) / 60)),
    seconds: pad2(safe % 60),
  };
}
