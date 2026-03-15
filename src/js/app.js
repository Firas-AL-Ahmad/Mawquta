/* =========================================================
   S1-T4 App Bootstrap (Render App Shell)
========================================================= */

import { renderAppShell } from "./ui/layout/render-app-shell.js";

const appRoot = document.getElementById("app");

if (!appRoot) {
  console.warn(
    '[S1-T4] Missing #app mount root. Ensure src/index.html includes <div id="app"></div>.',
  );
} else {
  renderAppShell(appRoot);
}
