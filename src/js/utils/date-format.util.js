// src/js/utils/date-format.util.js
// Pure, browser-free helpers that turn a timezone dateKey and the shared
// AlAdhan monthly-calendar day payload into the Hero date-card labels
// (weekday / Hijri / Gregorian). The Daily contract consumes this util; the
// Hero never fetches or formats date data on its own.
//
// All produced labels use Latin digits (no Arabic-Indic) and no AM/PM. The
// Hijri label is payload-only (no independent conversion), the weekday and
// Gregorian labels are derived from the timezone dateKey with the payload's
// Arabic month name preferred over a fixed table.

export const ARABIC_WEEKDAYS = [
  "الأحد",
  "الاثنين",
  "الثلاثاء",
  "الأربعاء",
  "الخميس",
  "الجمعة",
  "السبت",
];

// Levantine Arabic Gregorian month names, used only when the day payload does
// not provide `gregorian.month.ar`.
export const ARABIC_GREGORIAN_MONTHS = [
  "كانون الثاني",
  "شباط",
  "آذار",
  "نيسان",
  "أيار",
  "حزيران",
  "تموز",
  "آب",
  "أيلول",
  "تشرين الأول",
  "تشرين الثاني",
  "كانون الأول",
];

export const NEUTRAL_PLACEHOLDER = "—";

const ARABIC_INDIC_DIGITS = "٠١٢٣٤٥٦٧٨٩";
const EASTERN_ARABIC_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

const ARABIC_DIACRITICS_PATTERN = /[\u064B-\u0652\u0670\u0640]/g;

const DATE_KEY_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Converts Arabic-Indic (٠-٩) and Eastern Arabic (۰-۹) digits to Latin.
 * Leaves already-Latin values untouched.
 */
export function toLatinDigits(value) {
  const str = String(value ?? "");
  let out = "";
  for (const char of str) {
    const indicIndex = ARABIC_INDIC_DIGITS.indexOf(char);
    const easternIndex = EASTERN_ARABIC_DIGITS.indexOf(char);
    if (indicIndex !== -1) {
      out += String(indicIndex);
    } else if (easternIndex !== -1) {
      out += String(easternIndex);
    } else {
      out += char;
    }
  }
  return out;
}

/**
 * Strips Arabic diacritics (harakat), tatweel and the superscript alef so a
 * payload month name like "رَمَضان" normalizes to "رمضان".
 */
export function stripArabicDiacritics(value) {
  return String(value ?? "").replace(ARABIC_DIACRITICS_PATTERN, "");
}

function parseDateKey(dateKey) {
  if (typeof dateKey !== "string" || !DATE_KEY_PATTERN.test(dateKey)) {
    return null;
  }
  const [year, month, day] = dateKey.split("-").map(Number);
  // Round-trip guard: JS Date silently rolls over impossible calendar dates
  // (e.g. "2026-13-40"), which must be rejected as invalid.
  const check = new Date(Date.UTC(year, month - 1, day));
  if (
    check.getUTCFullYear() !== year ||
    check.getUTCMonth() + 1 !== month ||
    check.getUTCDate() !== day
  ) {
    return null;
  }
  return { year, month, day };
}

/**
 * Normalizes a payload day/year to a plain integer string in Latin digits
 * ("06" -> "6", "٠٦" -> "6"). Falls back to the latinized string for
 * non-numeric input so a bad value never produces "NaN".
 */
function toNumberString(value) {
  const latin = toLatinDigits(value);
  const numeric = Number(latin);
  return Number.isFinite(numeric) ? String(numeric) : latin;
}

/**
 * Returns the Arabic weekday label ("الثلاثاء") for a "YYYY-MM-DD" key.
 * Weekday is a pure function of the calendar date, independent of any
 * timezone. Returns the neutral placeholder for invalid keys.
 */
export function weekdayLabelForDateKey(dateKey) {
  const parts = parseDateKey(dateKey);
  if (!parts) return NEUTRAL_PLACEHOLDER;
  const dow = new Date(Date.UTC(parts.year, parts.month - 1, parts.day)).getUTCDay();
  return ARABIC_WEEKDAYS[dow] ?? NEUTRAL_PLACEHOLDER;
}

function hasValue(value) {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Builds the Gregorian label ("10 أيلول 2026") from the payload's gregorian
 * sub-object. Day/year fall back to the timezone dateKey when absent; the
 * month name prefers `month.ar`, falling back to the fixed Levantine table.
 * Returns the neutral placeholder for an invalid dateKey.
 */
export function buildGregorianLabel(gregorian, dateKey) {
  const parts = parseDateKey(dateKey);
  if (!parts) return NEUTRAL_PLACEHOLDER;

  const monthName = hasValue(gregorian?.month?.ar)
    ? gregorian.month.ar.trim()
    : ARABIC_GREGORIAN_MONTHS[parts.month - 1] ?? NEUTRAL_PLACEHOLDER;

  return `${toNumberString(parts.day)} ${monthName} ${toNumberString(parts.year)}`;
}

/**
 * Builds the Hijri label ("6 رمضان 1448") exclusively from the payload's
 * hijri sub-object. Returns the neutral placeholder when the hijri data is
 * missing/incomplete (no independent conversion is ever performed).
 */
export function buildHijriLabel(hijri) {
  if (
    !hijri ||
    !hasValue(hijri.day) ||
    !hasValue(hijri.year) ||
    !hasValue(hijri.month?.ar)
  ) {
    return NEUTRAL_PLACEHOLDER;
  }

  const monthName = stripArabicDiacritics(hijri.month.ar).trim();
  if (!monthName) return NEUTRAL_PLACEHOLDER;

  return `${toNumberString(hijri.day)} ${monthName} ${toNumberString(hijri.year)}`;
}

/**
 * Builds the provider-independent dateInfo block carried by the Daily
 * contract and consumed by the Hero date card.
 *
 * Returns:
 * - dateKey: "YYYY-MM-DD" of the day in the location timezone
 * - timezone: IANA timezone of the location
 * - weekdayLabel: Arabic weekday ("الثلاثاء")
 * - hijriLabel: "6 رمضان 1448" (payload-only; "—" when unavailable)
 * - gregorianLabel: "10 أيلول 2026"
 * - updatedAt: ISO instant at which the data was produced
 *
 * Never touches the DOM and never issues a fetch.
 */
export function buildDateInfo({ dateKey, timeZone, dayData, updatedAt }) {
  const weekdayLabel = weekdayLabelForDateKey(dateKey);
  const gregorianLabel = buildGregorianLabel(dayData?.date?.gregorian, dateKey);
  const hijriLabel = buildHijriLabel(dayData?.date?.hijri);

  return {
    dateKey: typeof dateKey === "string" ? dateKey : NEUTRAL_PLACEHOLDER,
    timezone: typeof timeZone === "string" ? timeZone : NEUTRAL_PLACEHOLDER,
    weekdayLabel,
    hijriLabel,
    gregorianLabel,
    updatedAt: updatedAt instanceof Date
      ? updatedAt.toISOString()
      : typeof updatedAt === "string"
        ? updatedAt
        : NEUTRAL_PLACEHOLDER,
  };
}
