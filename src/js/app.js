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
  };
}

function mapPrayerSectionData(overview, city, country) {
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

    return mapPrayerSectionData(prayerOverview, defaultCity, defaultCountry);
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
