function toNeedleRotation(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return 165;
  }

  return Math.max(0, Math.min(360, Math.round(number)));
}

export function renderQibla(viewModel = {}) {
  const degree = toNeedleRotation(viewModel.needleRotation ?? viewModel.direction ?? 165);
  const degreeText =
    typeof viewModel.degreeText === "string" && viewModel.degreeText.trim().length > 0
      ? viewModel.degreeText.trim()
      : `${degree}°`;

  return `
    <div class="qibla-visual" data-qibla-visual aria-label="بوصلة القبلة">
      <span class="qibla-visual__decor qibla-visual__decor--left" aria-hidden="true"></span>

      <div
        class="qibla-compass qibla-compass--asset"
        role="img"
        aria-label="البوصلة تشير إلى اتجاه ${degreeText}"
      >
        <img
          class="qibla-compass__asset"
          src="./assets/icons/Qibla/qibla-compass.svg"
          aria-hidden="true"
          alt=""
          loading="lazy"
          decoding="async"
        />
      </div>

      <span class="qibla-visual__decor qibla-visual__decor--right" aria-hidden="true"></span>
    </div>
  `;
}
