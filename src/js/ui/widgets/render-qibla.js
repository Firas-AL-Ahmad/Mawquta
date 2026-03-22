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
    <div class="compass-wrap" aria-label="بوصلة القبلة">
      <div class="compass" role="img" aria-label="البوصلة تشير إلى اتجاه ${degreeText}">
        <div class="compass__ring" aria-hidden="true"></div>
        <span class="compass__label compass__label--n" aria-hidden="true">N</span>
        <span class="compass__label compass__label--s" aria-hidden="true">S</span>
        <span class="compass__label compass__label--e" aria-hidden="true">E</span>
        <span class="compass__label compass__label--w" aria-hidden="true">W</span>
        <div class="compass__deg" data-qibla-deg aria-hidden="true">${degreeText}</div>
        <div class="compass__needle" data-qibla-needle aria-hidden="true" style="transform:translateX(-50%) rotate(${degree}deg);"></div>
        <div class="compass__centre" aria-hidden="true" title="الكعبة المشرفة">🕋</div>
      </div>
    </div>
  `;
}
