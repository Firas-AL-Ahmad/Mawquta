/* =========================================================
   S1-T4 App Bootstrap (Render App Shell)
========================================================= */

import { renderAppShell } from "./ui/layout/render-app-shell.js";
import { renderHeader } from "./ui/layout/render-header.js";
import { renderFooter } from "./ui/layout/render-footer.js";
import {
  renderPrayerSection,
  updatePrayerSectionFeaturedState,
} from "./ui/sections/render-prayer-section.js";
import { renderQiblaSection } from "./ui/sections/render-qibla-section.js";
import { renderRamadanSection } from "./ui/sections/render-ramadan-section.js";
import {
  getNextPrayerFromPrayers,
  getTodayPrayerOverviewByCity,
} from "./services/prayer.service.js";
import { getCurrentWeekByCity } from "./services/week.service.js";
import { searchCitySuggestions } from "./services/location-search.service.js";
import { renderCitySuggestions } from "./ui/widgets/render-city-suggestions.js";
import { CONFIG } from "./config.js";

const PRAYER_LIVE_TICK_MS = 1000;
const LOCATION_PICKER_DEBOUNCE_MS = 300;
const LOCATION_TYPE_CITY = "city";
const HEADER_LOCATION_FALLBACK_LABEL = "اختر المدينة";
let prayerLiveIntervalId = null;
let prayerRefreshRequestId = 0;

let appHeaderRoot = null;
let appPrayerRoot = null;

function formatTodayContextDate() {
  try {
    return new Intl.DateTimeFormat("ar", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
  } catch {
    return new Date().toLocaleDateString();
  }
}

function createHonestFallbackPrayerSectionData() {
  return {
    meta: {
      location: "الموقع غير متاح حالياً",
      date: formatTodayContextDate(),
    },
    featured: {
      key: "",
      label: "المواقيت غير متاحة",
      time: "--:--",
      countdownText: "تعذر تحميل العد التنازلي حالياً.",
    },
    dailyPrayers: [],
    weeklyRows: [],
  };
}

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function toStrictCityLocation(locationLike) {
  if (!locationLike || locationLike.type !== LOCATION_TYPE_CITY) {
    return null;
  }

  const city = String(locationLike.city || "").trim();
  const country = String(locationLike.country || "").trim();

  if (!city || !country) {
    return null;
  }

  return {
    type: LOCATION_TYPE_CITY,
    city,
    country,
  };
}

function getDefaultCityLocation() {
  return toStrictCityLocation({
    type: LOCATION_TYPE_CITY,
    city: CONFIG.DEFAULT_LOCATION?.city,
    country: CONFIG.DEFAULT_LOCATION?.country,
  });
}

function getStoredLocation() {
  try {
    const storageKey = CONFIG.STORAGE_KEY;
    if (!isNonEmptyString(storageKey)) {
      return null;
    }

    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return null;
    }

    const parsed = JSON.parse(raw);
    return toStrictCityLocation(parsed);
  } catch {
    return null;
  }
}

function setStoredLocation(location) {
  try {
    const storageKey = CONFIG.STORAGE_KEY;
    if (!isNonEmptyString(storageKey)) {
      return;
    }

    const strictLocation = toStrictCityLocation(location);
    if (!strictLocation) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(strictLocation));
  } catch {
    // Intentionally silent: storage failure should not break page runtime.
  }
}

function resolveActivePrayerLocation({ selectedLocation } = {}) {
  const selected = toStrictCityLocation(selectedLocation);
  if (selected) {
    return selected;
  }

  const stored = getStoredLocation();
  if (stored) {
    return stored;
  }

  return getDefaultCityLocation();
}

function formatLocationLabel(location) {
  const strictLocation = toStrictCityLocation(location);
  if (!strictLocation) {
    return null;
  }

  return `${strictLocation.city}، ${strictLocation.country}`;
}

function syncHeaderLocationLabel(location) {
  if (!appHeaderRoot) {
    return;
  }

  const locationLabelElement = appHeaderRoot.querySelector(
    ".site-header__location-label",
  );

  if (!locationLabelElement) {
    return;
  }

  locationLabelElement.textContent =
    formatLocationLabel(location) || HEADER_LOCATION_FALLBACK_LABEL;
}

function pad2(value) {
  return String(value).padStart(2, "0");
}

function formatRemainingAsHms(remainingMs) {
  if (!Number.isFinite(remainingMs) || remainingMs < 0) {
    return null;
  }

  const totalSeconds = Math.floor(remainingMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${pad2(hours)}:${pad2(minutes)}:${pad2(seconds)}`;
}

function mapFeaturedPrayer(nextPrayer) {
  const countdownValue = formatRemainingAsHms(nextPrayer?.remainingMs);

  return {
    key: nextPrayer?.key || "",
    label: nextPrayer?.label || "المواقيت غير متاحة",
    time: nextPrayer?.time || "--:--",
    countdownText: countdownValue
      ? `الوقت المتبقي: ${countdownValue}`
      : "تعذر تحديد الوقت المتبقي حالياً.",
  };
}

function clearPrayerLiveInterval() {
  if (prayerLiveIntervalId) {
    clearInterval(prayerLiveIntervalId);
    prayerLiveIntervalId = null;
  }
}

function startPrayerLiveBinding(prayerRoot, prayerSectionData) {
  const prayers = Array.isArray(prayerSectionData?.dailyPrayers)
    ? prayerSectionData.dailyPrayers
    : [];

  if (!prayerRoot || prayers.length === 0) {
    return;
  }

  clearPrayerLiveInterval();

  let previousFeaturedKey = prayerSectionData?.featured?.key || "";

  const syncFeaturedState = () => {
    const nextPrayer = getNextPrayerFromPrayers(prayers, new Date());
    const featured = mapFeaturedPrayer(nextPrayer);
    const shouldRefreshCards = featured.key !== previousFeaturedKey;

    updatePrayerSectionFeaturedState(prayerRoot, {
      featured,
      dailyPrayers: prayers,
      shouldRefreshCards,
    });

    previousFeaturedKey = featured.key;
  };

  syncFeaturedState();
  prayerLiveIntervalId = setInterval(syncFeaturedState, PRAYER_LIVE_TICK_MS);
}

function normalizeTime(timeStr) {
  if (typeof timeStr !== "string") {
    return "--:--";
  }

  const match = /^(\d{1,2}):(\d{2})/.exec(timeStr.trim());
  if (!match) {
    return "--:--";
  }

  const hh = match[1].padStart(2, "0");
  const mm = match[2];
  return `${hh}:${mm}`;
}

function parseGregorianDate(gregorianDateString) {
  if (typeof gregorianDateString !== "string") {
    return null;
  }

  const parts = gregorianDateString.split("-");
  if (parts.length !== 3) {
    return null;
  }

  const [dayStr, monthStr, yearStr] = parts;
  const day = Number(dayStr);
  const month = Number(monthStr);
  const year = Number(yearStr);

  if (
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year)
  ) {
    return null;
  }

  const parsedDate = new Date(year, month - 1, day);
  if (Number.isNaN(parsedDate.getTime())) {
    return null;
  }

  return parsedDate;
}

function getDayLabel(weekDayEntry) {
  const parsedDate = parseGregorianDate(weekDayEntry?.date?.gregorian?.date);

  if (parsedDate) {
    try {
      return new Intl.DateTimeFormat("ar", { weekday: "long" }).format(
        parsedDate,
      );
    } catch {
      // fallback below
    }
  }

  return (
    weekDayEntry?.date?.gregorian?.weekday?.ar ||
    weekDayEntry?.date?.gregorian?.weekday?.en ||
    "غير متاح"
  );
}

function getDateLabel(weekDayEntry) {
  const hijriDay = weekDayEntry?.date?.hijri?.day;
  const hijriMonth =
    weekDayEntry?.date?.hijri?.month?.ar ||
    weekDayEntry?.date?.hijri?.month?.en;

  if (hijriDay && hijriMonth) {
    return `${hijriDay} ${hijriMonth}`;
  }

  const parsedDate = parseGregorianDate(weekDayEntry?.date?.gregorian?.date);
  if (parsedDate) {
    try {
      return new Intl.DateTimeFormat("ar", {
        day: "numeric",
        month: "long",
      }).format(parsedDate);
    } catch {
      // fallback below
    }
  }

  return weekDayEntry?.date?.gregorian?.date || "غير متاح";
}

function mapWeeklyRows(weekDays) {
  if (!Array.isArray(weekDays)) {
    return [];
  }

  return weekDays.map((weekDayEntry) => {
    const timings = weekDayEntry?.timings || {};

    return {
      dayLabel: getDayLabel(weekDayEntry),
      dateLabel: getDateLabel(weekDayEntry),
      fajr: normalizeTime(timings.Fajr),
      sunrise: normalizeTime(timings.Sunrise),
      dhuhr: normalizeTime(timings.Dhuhr),
      asr: normalizeTime(timings.Asr),
      maghrib: normalizeTime(timings.Maghrib),
      isha: normalizeTime(timings.Isha),
    };
  });
}

function mapPrayerSectionData(overview, activeLocation, weeklyRows = []) {
  const safePrayers = Array.isArray(overview?.prayers) ? overview.prayers : [];
  const nextPrayer = getNextPrayerFromPrayers(safePrayers, new Date());
  const metaLocationLabel = formatLocationLabel(activeLocation);

  return {
    meta: {
      location: metaLocationLabel || "الموقع غير متاح حالياً",
      date: formatTodayContextDate(),
    },
    featured: {
      ...mapFeaturedPrayer(nextPrayer),
    },
    dailyPrayers: safePrayers,
    weeklyRows,
  };
}

async function buildPrayerSectionData(activeLocation) {
  const fallbackData = createHonestFallbackPrayerSectionData();
  const strictLocation = toStrictCityLocation(activeLocation);

  if (!strictLocation) {
    return fallbackData;
  }

  try {
    const prayerOverview = await getTodayPrayerOverviewByCity(
      strictLocation.city,
      strictLocation.country,
    );

    let weeklyRows = [];

    try {
      const currentWeekData = await getCurrentWeekByCity(
        strictLocation.city,
        strictLocation.country,
      );
      weeklyRows = mapWeeklyRows(currentWeekData);
    } catch (error) {
      console.warn("[S2-T2] Failed to load weekly prayer runtime data:", error);
    }

    return mapPrayerSectionData(
      prayerOverview,
      strictLocation,
      weeklyRows,
    );
  } catch (error) {
    console.warn("[S2-T1] Failed to load prayer section runtime data:", error);
    return fallbackData;
  }
}

async function refreshPrayerSectionByLocation(location) {
  if (!appPrayerRoot) {
    return;
  }

  const activeLocation = resolveActivePrayerLocation({ selectedLocation: location });
  syncHeaderLocationLabel(activeLocation);

  clearPrayerLiveInterval();

  const requestId = ++prayerRefreshRequestId;
  const prayerSectionData = await buildPrayerSectionData(activeLocation);

  if (requestId !== prayerRefreshRequestId) {
    return;
  }

  renderPrayerSection(appPrayerRoot, prayerSectionData);
  startPrayerLiveBinding(appPrayerRoot, prayerSectionData);
}

async function selectCityLocationViaPromptFallback() {
  const query = window.prompt("اكتب اسم المدينة للبحث عنها:");
  if (!isNonEmptyString(query)) {
    return null;
  }

  try {
    const suggestions = await searchCitySuggestions(query.trim(), { maxRows: 8 });

    if (!Array.isArray(suggestions) || suggestions.length === 0) {
      window.alert("لم يتم العثور على نتائج مطابقة.");
      return null;
    }

    if (suggestions.length === 1) {
      return toStrictCityLocation({
        type: LOCATION_TYPE_CITY,
        city: suggestions[0]?.city,
        country: suggestions[0]?.country,
      });
    }

    const choicesText = suggestions
      .map((suggestion, index) => `${index + 1}) ${suggestion?.label || "مدينة غير معروفة"}`)
      .join("\n");

    const indexInput = window.prompt(
      `تم العثور على أكثر من مدينة. اختر الرقم المناسب:\n\n${choicesText}`,
    );

    const selectedIndex = Number(indexInput) - 1;
    const picked = suggestions[selectedIndex];

    return toStrictCityLocation({
      type: LOCATION_TYPE_CITY,
      city: picked?.city,
      country: picked?.country,
    });
  } catch (error) {
    console.warn("[S2-T4] Failed to search city suggestions:", error);
    return null;
  }
}

function createLocationPickerDialogElement() {
  const dialog = document.createElement("dialog");
  dialog.className = "card";
  dialog.style.width = "min(32rem, calc(100% - 2rem))";
  dialog.style.border = "none";
  dialog.style.padding = "0";

  dialog.innerHTML = `
    <form method="dialog" style="display:flex;flex-direction:column;gap:var(--space-4);padding:var(--space-5);">
      <div>
        <h3 style="margin:0 0 var(--space-2) 0;">اختيار المدينة</h3>
        <p style="margin:0;color:var(--color-text-muted);font-size:var(--Caption-fontSize);">
          اكتب 3 أحرف على الأقل ثم اختر النتيجة الصحيحة من القائمة.
        </p>
      </div>

      <input
        type="text"
        name="city-search"
        placeholder="مثال: Damascus"
        autocomplete="off"
        style="min-height:2.5rem;padding:0 var(--space-3);border:1px solid var(--color-border);border-radius:var(--radius-md);"
      />

      <p data-location-search-status style="margin:0;color:var(--color-text-muted);font-size:var(--Caption-fontSize);"></p>

      <div data-location-suggestions style="display:flex;flex-direction:column;gap:var(--space-2);max-height:14rem;overflow:auto;"></div>

      <div style="display:flex;justify-content:flex-end;">
        <button type="submit" value="cancel" class="btn btn--ghost">إغلاق</button>
      </div>
    </form>
  `;

  return dialog;
}

function selectCityLocationViaDialog() {
  if (typeof HTMLDialogElement === "undefined") {
    return selectCityLocationViaPromptFallback();
  }

  return new Promise((resolve) => {
    const dialog = createLocationPickerDialogElement();
    document.body.appendChild(dialog);

    const searchInput = dialog.querySelector("input[name='city-search']");
    const statusElement = dialog.querySelector("[data-location-search-status]");
    const suggestionsContainer = dialog.querySelector("[data-location-suggestions]");

    let debounceId = null;
    let searchToken = 0;
    let settled = false;

    const settle = (value) => {
      if (settled) {
        return;
      }

      settled = true;

      if (debounceId) {
        clearTimeout(debounceId);
      }

      dialog.remove();
      resolve(value);
    };

    dialog.addEventListener("close", () => settle(null));

    if (searchInput && statusElement && suggestionsContainer) {
      searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim();

        if (debounceId) {
          clearTimeout(debounceId);
        }

        if (query.length < 3) {
          searchToken += 1;
          statusElement.textContent = "";
          renderCitySuggestions(suggestionsContainer, []);
          return;
        }

        statusElement.textContent = "جاري البحث...";

        debounceId = setTimeout(async () => {
          const currentToken = ++searchToken;

          try {
            const suggestions = await searchCitySuggestions(query, { maxRows: 8 });

            if (currentToken !== searchToken) {
              return;
            }

            if (!Array.isArray(suggestions) || suggestions.length === 0) {
              statusElement.textContent = "لا توجد نتائج مطابقة.";
              renderCitySuggestions(suggestionsContainer, []);
              return;
            }

            statusElement.textContent = "اختر مدينتك من النتائج:";
            renderCitySuggestions(suggestionsContainer, suggestions, (picked) => {
              const selectedLocation = toStrictCityLocation({
                type: LOCATION_TYPE_CITY,
                city: picked?.city,
                country: picked?.country,
              });

              if (!selectedLocation) {
                return;
              }

              settle(selectedLocation);
              dialog.close();
            });
          } catch (error) {
            if (currentToken !== searchToken) {
              return;
            }

            statusElement.textContent = "تعذر تحميل نتائج المدن حالياً.";
            renderCitySuggestions(suggestionsContainer, []);
            console.warn("[S2-T4] City suggestions search failed:", error);
          }
        }, LOCATION_PICKER_DEBOUNCE_MS);
      });
    }

    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      dialog.setAttribute("open", "true");
    }

    searchInput?.focus();
  });
}

function bindHeaderLocationTrigger() {
  if (!appHeaderRoot) {
    return;
  }

  const locationTrigger = appHeaderRoot.querySelector(
    ".site-header__location-trigger",
  );

  if (!locationTrigger) {
    return;
  }

  locationTrigger.addEventListener("click", async () => {
    locationTrigger.disabled = true;

    try {
      const selectedLocation = await selectCityLocationViaDialog();
      const strictSelectedLocation = toStrictCityLocation(selectedLocation);

      if (!strictSelectedLocation) {
        return;
      }

      setStoredLocation(strictSelectedLocation);
      await refreshPrayerSectionByLocation(strictSelectedLocation);
    } finally {
      locationTrigger.disabled = false;
    }
  });
}

async function bootstrapApp() {
  renderAppShell(appRoot);

  appHeaderRoot = document.getElementById("site-header");
  renderHeader(appHeaderRoot);
  bindHeaderLocationTrigger();

  appPrayerRoot = document.getElementById("prayer-section");
  await refreshPrayerSectionByLocation();

  const qiblaRoot = document.getElementById("qibla-section");
  renderQiblaSection(qiblaRoot);

  const ramadanRoot = document.getElementById("ramadan-section");
  renderRamadanSection(ramadanRoot);

  const footerRoot = document.getElementById("site-footer");
  renderFooter(footerRoot);
}

const appRoot = document.getElementById("app");

if (!appRoot) {
  console.warn(
    '[S1-T4] Missing #app mount root. Ensure src/index.html includes <div id="app"></div>.',
  );
} else {
  bootstrapApp();
}
