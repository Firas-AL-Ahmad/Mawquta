/* =========================================================
   S1-T4 App Bootstrap (Render App Shell)
========================================================= */

import { renderAppShell } from "./ui/layout/render-app-shell.js";
import { renderHeader } from "./ui/layout/render-header.js";
import { renderPrayerSection } from "./ui/sections/render-prayer-section.js";
import { renderQiblaSection } from "./ui/sections/render-qibla-section.js";
import { renderRamadanSection } from "./ui/sections/render-ramadan-section.js";

const appRoot = document.getElementById("app");

if (!appRoot) {
  console.warn(
    '[S1-T4] Missing #app mount root. Ensure src/index.html includes <div id="app"></div>.',
  );
} else {
  renderAppShell(appRoot);

  const headerRoot = document.getElementById("site-header");
  renderHeader(headerRoot);

  const prayerRoot = document.getElementById("prayer-section");
  renderPrayerSection(prayerRoot);

  const qiblaRoot = document.getElementById("qibla-section");
  renderQiblaSection(qiblaRoot);

  const ramadanRoot = document.getElementById("ramadan-section");
  renderRamadanSection(ramadanRoot);
}
