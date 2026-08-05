const QIBLA_ICON_PATHS = {
  decorLeft: "./assets/icons/sections/qibla/qibla-left-sujud.svg",
  compass: "./assets/icons/sections/qibla/qibla-compass.svg",
  decorRight: "./assets/icons/sections/qibla/qibla-right-tasbee.svg",
};

const QIBLA_ARROW_SVG = `
  <svg
    width="28"
    height="44"
    viewBox="0 0 28 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M14 2L26 42L14 33L2 42L14 2Z"
      fill="#DD9730"
      stroke="#7A6D79"
      stroke-width="2"
      stroke-linejoin="round"
    />
  </svg>
`;

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

      <div class="qibla-compass" role="img" data-qibla-compass aria-label="اتجاه القبلة">
        <img
          class="qibla-compass__asset"
          src="${QIBLA_ICON_PATHS.compass}"
          aria-hidden="true"
          alt=""
          loading="lazy"
          decoding="async"
        />

        <span class="qibla-compass__arrow" data-qibla-arrow aria-hidden="true">
          ${QIBLA_ARROW_SVG}
        </span>
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
