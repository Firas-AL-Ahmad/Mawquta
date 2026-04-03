function toNeedleRotation(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) {
    return 165;
  }

  return Math.max(0, Math.min(360, Math.round(number)));
}

export function renderQibla(viewModel = {}) {
  const degree = toNeedleRotation(viewModel.needleRotation ?? viewModel.direction ?? 165);
  const degreeText = viewModel.degreeText || `${degree}°`;

  return `
    <div class="qibla-visual" aria-label="بوصلة القبلة">
      <span class="qibla-visual__decor qibla-visual__decor--left" aria-hidden="true"></span>

      <div class="qibla-compass" role="img" aria-label="البوصلة تشير إلى اتجاه ${degreeText}">
        <span class="qibla-compass__label qibla-compass__label--n" aria-hidden="true">N</span>
        <span class="qibla-compass__label qibla-compass__label--s" aria-hidden="true">S</span>
        <span class="qibla-compass__label qibla-compass__label--e" aria-hidden="true">E</span>
        <span class="qibla-compass__label qibla-compass__label--w" aria-hidden="true">W</span>

        <div class="qibla-compass__ticks" aria-hidden="true">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <div
          class="qibla-compass__needle"
          data-qibla-needle
          aria-hidden="true"
          style="--needle-rotation:${degree}deg;"
        ></div>

        <div class="qibla-compass__kaaba" aria-hidden="true" title="الكعبة المشرفة">
          <span class="qibla-compass__kaaba-roof"></span>
          <span class="qibla-compass__kaaba-band"></span>
          <span class="qibla-compass__kaaba-body"></span>
          <span class="qibla-compass__kaaba-door"></span>
        </div>
      </div>

      <span class="qibla-visual__decor qibla-visual__decor--right" aria-hidden="true"></span>
    </div>
  `;
}
