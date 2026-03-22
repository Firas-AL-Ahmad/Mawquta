export function renderAppShell(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="app-shell page-shell" id="app-shell">
      <header class="site-header" id="site-header" data-mount="header"></header>

      <main class="main-content page-main" id="main-content">
        <section id="hero-section" data-mount="hero-section"></section>
        <section id="prayer-section" data-mount="prayer-section"></section>
        <section id="qibla-section" data-mount="qibla-section"></section>
        <section id="ramadan-section" data-mount="ramadan-section"></section>
      </main>

      <footer class="site-footer" id="site-footer" data-mount="footer"></footer>
    </div>
  `;

  return rootElement.querySelector("#app-shell");
}
