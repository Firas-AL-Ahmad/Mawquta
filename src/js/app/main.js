/* =========================================================
   Static UI Bootstrap (UI-only phase)
========================================================= */

import { renderAppShell } from "../ui/layout/app-shell.layout.js";
import { renderHeader } from "../ui/layout/header.layout.js";
import { renderFooter } from "../ui/layout/footer.layout.js";
import { renderHeroSection } from "../ui/sections/hero.section.js";
import { renderDailyPrayerSection } from "../ui/sections/daily-prayer.section.js";
import { renderWeeklyPrayerSection } from "../ui/sections/weekly-prayer.section.js";
import { renderQiblaSection } from "../ui/sections/qibla.section.js";
import { renderRamadanSection } from "../ui/sections/ramadan.section.js";
import { bindNavInteractions } from "../ui/interactions/global/nav.interactions.js";
import { bindRamadanTabsInteractions } from "../ui/interactions/ramadan/ramadan-tabs.interactions.js";

function bootstrapApp() {
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

  renderHeader(appHeaderRoot);
  bindNavInteractions(appHeaderRoot);

  renderHeroSection(appHeroRoot);
  renderDailyPrayerSection(appDailyPrayerRoot);
  renderWeeklyPrayerSection(appWeeklyPrayerRoot);
  renderQiblaSection(appQiblaRoot);
  renderRamadanSection(appRamadanRoot);
  renderFooter(appFooterRoot);

  bindRamadanTabsInteractions(document);
}

bootstrapApp();