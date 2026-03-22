/* =========================================================
   Static UI Bootstrap (UI-only phase)
========================================================= */

import { renderAppShell } from "./ui/layout/render-app-shell.js";
import { renderHeader } from "./ui/layout/render-header.js";
import { renderFooter } from "./ui/layout/render-footer.js";
import { renderHeroSection } from "./ui/sections/render-hero-section.js";
import { renderPrayerSection } from "./ui/sections/render-prayer-section.js";
import { renderQiblaSection } from "./ui/sections/render-qibla-section.js";
import { renderRamadanSection } from "./ui/sections/render-ramadan-section.js";
import { bindNavInteractions } from "./ui/interactions/nav.interactions.js";

function bindRamadanTabs(rootElement = document) {
  const tabButtons = rootElement.querySelectorAll("[data-ramadan-tab]");
  if (!tabButtons.length) {
    return;
  }

  tabButtons.forEach((buttonElement) => {
    buttonElement.addEventListener("click", () => {
      tabButtons.forEach((node) => {
        node.classList.remove("r-tab--active");
        node.setAttribute("aria-selected", "false");
      });

      buttonElement.classList.add("r-tab--active");
      buttonElement.setAttribute("aria-selected", "true");
    });
  });
}

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
  const appPrayerRoot = document.getElementById("prayer-section");
  const appQiblaRoot = document.getElementById("qibla-section");
  const appRamadanRoot = document.getElementById("ramadan-section");
  const appFooterRoot = document.getElementById("site-footer");

  renderHeader(appHeaderRoot);
  bindNavInteractions(appHeaderRoot);

  renderHeroSection(appHeroRoot);
  renderPrayerSection(appPrayerRoot);
  renderQiblaSection(appQiblaRoot);
  renderRamadanSection(appRamadanRoot);
  renderFooter(appFooterRoot);

  bindRamadanTabs(document);
}

bootstrapApp();
