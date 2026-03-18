const DEFAULT_QIBLA_VIEW_MODEL = {
  degreeText: "غير متاح",
  note: "تعذر تحديد اتجاه القبلة حالياً لهذه المدينة.",
  needleRotation: null,
};

function normalizeQiblaViewModel(viewModel) {
  const fallback = { ...DEFAULT_QIBLA_VIEW_MODEL };

  if (!viewModel || typeof viewModel !== "object") {
    return fallback;
  }

  const degreeText =
    typeof viewModel.degreeText === "string" &&
    viewModel.degreeText.trim().length > 0
      ? viewModel.degreeText.trim()
      : fallback.degreeText;

  const note =
    typeof viewModel.note === "string" && viewModel.note.trim().length > 0
      ? viewModel.note.trim()
      : fallback.note;

  const rotation = Number(viewModel.needleRotation);
  const needleRotation = Number.isFinite(rotation) ? rotation : null;

  return {
    degreeText,
    note,
    needleRotation,
  };
}

export function renderQiblaSection(rootElement, viewModel) {
  if (!rootElement) {
    return null;
  }

  const qibla = normalizeQiblaViewModel(viewModel);
  const directionStyle =
    qibla.needleRotation === null
      ? ""
      : ` style="transform: rotate(${qibla.needleRotation}deg);"`;

  rootElement.innerHTML = `
    <div class="qibla-section__inner container">
      <div class="qibla-section__intro">
        <div class="section-heading qibla-section__heading">
          <div class="qibla-section__heading-content">
            <p class="section-heading__eyebrow">القبلة</p>
            <h2 class="section-heading__title">اعرف اتجاه القبلة بسهولة ووضوح</h2>
            <p class="section-heading__subtitle">
              يتم عرض اتجاه القبلة بناءً على بيانات الموقع المتاحة حالياً.
            </p>
          </div>
        </div>
      </div>

      <div class="qibla-section__body">
        <article class="card qibla-card" aria-label="ملخص اتجاه القبلة">
          <div class="qibla-card__content">
            <p class="qibla-card__label">اتجاه القبلة</p>
            <h3 class="qibla-card__degree">${qibla.degreeText}</h3>
            <p class="qibla-card__note">${qibla.note}</p>
          </div>

          <div class="qibla-card__visual" aria-hidden="true">
            <div class="qibla-card__compass-surface">
              <div class="qibla-card__compass-ring"></div>
              <div class="qibla-card__direction-mark"${directionStyle}></div>
              <div class="qibla-card__center-dot"></div>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;

  return rootElement;
}
