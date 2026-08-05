const QIBLA_ICON_PATHS = {
  decorLeft: "./assets/icons/sections/qibla/qibla-left-sujud.svg",
  compass: "./assets/icons/sections/qibla/qibla-compass.svg",
  decorRight: "./assets/icons/sections/qibla/qibla-right-tasbee.svg",
};

export function renderQiblaVisual() {
  return `
    <div class="qibla-visual" data-qibla-visual aria-label="اتجاه القبلة">
      <img
        class="qibla-visual__decor qibla-visual__decor--left"
        src="${QIBLA_ICON_PATHS.decorLeft}"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />

      <div class="qibla-compass" role="img" aria-label="اتجاه القبلة بزاوية 165°">
        <img
          class="qibla-compass__asset"
          src="${QIBLA_ICON_PATHS.compass}"
          aria-hidden="true"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>

      <img
        class="qibla-visual__decor qibla-visual__decor--right"
        src="${QIBLA_ICON_PATHS.decorRight}"
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </div>
  `;
}
