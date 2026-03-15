/* =========================================================
   S1-T2 Temporary App Bootstrap (Shell-Only Mode)
========================================================= */

const appRoot = document.getElementById("app");

if (!appRoot) {
  throw new Error(
    '[S1-T2] Missing #app mount root. Ensure src/index.html includes <div id="app"></div>.',
  );
}

// TODO(S1-T4): Replace this temporary shell-only bootstrap with full page composition
// using ui/layout/render-app-shell.js and section renderers.
console.info(
  "[S1-T2] Shell-only mode active. Full UI rendering is deferred to S1-T4.",
);
