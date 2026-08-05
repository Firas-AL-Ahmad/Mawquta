/* =========================================================
   Static UI Bootstrap (UI-only phase)
========================================================= */

import { renderAppShell } from "../ui/layout/app-shell.layout.js";
import { renderHeaderSection } from "../ui/sections/header/header.section.js";
import { renderFooterSection } from "../ui/sections/footer/footer.section.js";
import { renderHeroSection } from "../ui/sections/hero/hero.section.js";
import { renderDailyPrayerSection } from "../ui/sections/daily-prayer/daily-prayer.section.js";
import { renderWeeklyPrayerSection } from "../ui/sections/weekly-prayer/weekly-prayer.section.js";
import { createWeeklyPrayerRuntime } from "../ui/sections/weekly-prayer/weekly-prayer.runtime.js";
import { createDailyPrayerRuntime } from "../ui/sections/daily-prayer/daily-prayer.runtime.js";
import { renderQiblaSection } from "../ui/sections/qibla/qibla.section.js";
import { renderRamadanSection } from "../ui/sections/ramadan/ramadan.section.js";
import { bindHeaderNavInteractions } from "../ui/sections/header/interactions/nav.interactions.js";
import { bindRamadanTabsInteractions } from "../ui/sections/ramadan/interactions/ramadan-tabs.interactions.js";
import { createLocationService } from "../services/location.service.js";
import { createDailyPrayerService } from "../services/daily-prayer.service.js";
import {
  getCurrentWeekByCity,
  getCurrentWeekByCoords,
  getTodayByCity,
  getTodayByCoords,
} from "../services/week.service.js";
import {
  getTimingsByCityAndCountry,
  getTimingsByCoords,
} from "../api/aladhan.api.js";
import { bindLocationPickerInteractions } from "../ui/sections/qibla/interactions/location-picker.interactions.js";

const locationService = createLocationService();

const dailyPrayerService = createDailyPrayerService({
  getTodayByCity,
  getTodayByCoords,
  getTimingsByCityAndCountry,
  getTimingsByCoords,
});

// Retained for tests and cleanup (destroy()).
let dailyPrayerRuntime = null;

function bootstrapApp() {
  locationService.initialize();

  const appRoot = document.getElementById("app");
  if (!appRoot) {
    console.warn(
      '[Runtime] Missing #app mount root. Ensure src/index.html includes <div id="app"></div>.',
    );
    return;
  }

  renderAppShell(appRoot);

  const appHeaderRoot = document.getElementById("site-header");
  const appHeroRoot = document.getElementById("hero-section");
  const appDailyPrayerRoot = document.getElementById("prayer-section");
  const appWeeklyPrayerRoot = document.getElementById("weekly-prayer-section");
  const appQiblaRoot = document.getElementById("qibla-section");
  const appRamadanRoot = document.getElementById("ramadan-section");
  const appFooterRoot = document.getElementById("site-footer");

  renderHeaderSection(appHeaderRoot);
  bindHeaderNavInteractions(appHeaderRoot);

  renderHeroSection(appHeroRoot);
  renderDailyPrayerSection(appDailyPrayerRoot);
  renderWeeklyPrayerSection(appWeeklyPrayerRoot);
  renderQiblaSection(appQiblaRoot);
  renderRamadanSection(appRamadanRoot);
  renderFooterSection(appFooterRoot);

  createWeeklyPrayerRuntime({
    rootElement: appWeeklyPrayerRoot,
    locationService,
    getCurrentWeekByCity,
    getCurrentWeekByCoords,
  });

  dailyPrayerRuntime = createDailyPrayerRuntime({
    rootElement: appDailyPrayerRoot,
    heroRootElement: appHeroRoot,
    locationService,
    dailyService: dailyPrayerService,
  });

  bindRamadanTabsInteractions(document);
  bindLocationPickerInteractions(document, locationService);
}

bootstrapApp();
