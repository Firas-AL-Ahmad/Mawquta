/* =========================================================
   S1-T4 App Bootstrap (Render App Shell)
========================================================= */

import { renderAppShell } from "./ui/layout/render-app-shell.js";
import { renderHeader } from "./ui/layout/render-header.js";
import { renderFooter } from "./ui/layout/render-footer.js";
import { renderPrayerSection } from "./ui/sections/render-prayer-section.js";
import { renderQiblaSection } from "./ui/sections/render-qibla-section.js";
import { renderRamadanSection } from "./ui/sections/render-ramadan-section.js";
import { getTodayPrayerOverviewByCity } from "./services/prayer.service.js";
import { getCurrentWeekByCity } from "./services/week.service.js";
import { CONFIG } from "./config.js";

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
      label: "المواقيت غير متاحة",
      time: "--:--",
      note: "تعذر تحميل بيانات الصلاة حالياً. يرجى المحاولة لاحقاً.",
    },
    dailyPrayers: [],
    weeklyRows: [],
  };
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
  const nextPrayer = overview?.nextPrayer ?? null;

  return {
    meta: {
      location:
        city && country ? `${city}، ${country}` : "الموقع غير متاح حالياً",
      date: formatTodayContextDate(),
    },
    featured: {
      key: nextPrayer?.key,
      label: nextPrayer?.label || "المواقيت غير متاحة",
      time: nextPrayer?.time || "--:--",
      note: nextPrayer
        ? "تم عرض الصلاة القادمة وفق بيانات اليوم المتاحة."
        : "تعذر تحديد الصلاة القادمة حالياً.",
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
