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
import { CONFIG } from "./config.js";

const PRAYER_LIVE_TICK_MS = 1000;
let prayerLiveIntervalId = null;

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

function mapPrayerSectionData(overview, city, country, weeklyRows = []) {
  const safePrayers = Array.isArray(overview?.prayers) ? overview.prayers : [];
  const nextPrayer = getNextPrayerFromPrayers(safePrayers, new Date());

  return {
    meta: {
      location:
        city && country ? `${city}، ${country}` : "الموقع غير متاح حالياً",
      date: formatTodayContextDate(),
    },
    featured: {
      ...mapFeaturedPrayer(nextPrayer),
    },
    dailyPrayers: safePrayers,
    weeklyRows,
  };
}

async function buildPrayerSectionData() {
  const fallbackData = createHonestFallbackPrayerSectionData();
  const defaultCity = CONFIG.DEFAULT_LOCATION?.city;
  const defaultCountry = CONFIG.DEFAULT_LOCATION?.country;

  if (!defaultCity || !defaultCountry) {
    return fallbackData;
  }

  try {
    const prayerOverview = await getTodayPrayerOverviewByCity(
      defaultCity,
      defaultCountry,
    );

    let weeklyRows = [];

    try {
      const currentWeekData = await getCurrentWeekByCity(
        defaultCity,
        defaultCountry,
      );
      weeklyRows = mapWeeklyRows(currentWeekData);
    } catch (error) {
      console.warn("[S2-T2] Failed to load weekly prayer runtime data:", error);
    }

    return mapPrayerSectionData(
      prayerOverview,
      defaultCity,
      defaultCountry,
      weeklyRows,
    );
  } catch (error) {
    console.warn("[S2-T1] Failed to load prayer section runtime data:", error);
    return fallbackData;
  }
}

async function bootstrapApp() {
  renderAppShell(appRoot);

  const headerRoot = document.getElementById("site-header");
  renderHeader(headerRoot);

  const prayerRoot = document.getElementById("prayer-section");
  const prayerSectionData = await buildPrayerSectionData();
  renderPrayerSection(prayerRoot, prayerSectionData);
  startPrayerLiveBinding(prayerRoot, prayerSectionData);

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
