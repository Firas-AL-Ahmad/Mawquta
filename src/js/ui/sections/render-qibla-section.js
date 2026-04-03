import { renderQibla } from "../widgets/render-qibla.js";

const DEFAULT_QIBLA_VIEW_MODEL = {
  headingLabel: "اتجاه القبلة من موقعك الحالي",
  actionLabel: "اختيار مدينة",
  degreeText: "165°",
  note: "اعرف اتجاه القبلة بناءً على موقعك الحالي أو المدينة المحددة",
  needleRotation: 165,
};

function safeText(value, fallback) {
  return typeof value === "string" && value.trim().length > 0
    ? value.trim()
    : fallback;
}

function normalizeQiblaViewModel(viewModel) {
  const model = viewModel && typeof viewModel === "object" ? viewModel : {};

  return {
    headingLabel: safeText(
      model.headingLabel,
      DEFAULT_QIBLA_VIEW_MODEL.headingLabel,
    ),
    actionLabel: safeText(model.actionLabel, DEFAULT_QIBLA_VIEW_MODEL.actionLabel),
    degreeText: safeText(model.degreeText, DEFAULT_QIBLA_VIEW_MODEL.degreeText),
    note: safeText(model.note, DEFAULT_QIBLA_VIEW_MODEL.note),
    needleRotation:
      Number.isFinite(Number(model.needleRotation))
        ? Number(model.needleRotation)
        : DEFAULT_QIBLA_VIEW_MODEL.needleRotation,
  };
}

export function renderQiblaSection(rootElement, viewModel = DEFAULT_QIBLA_VIEW_MODEL) {
  if (!rootElement) {
    return null;
  }

  const qibla = normalizeQiblaViewModel(viewModel);

  rootElement.innerHTML = `
    <section class="qibla-sec" id="qibla" aria-label="اتجاه القبلة">
      <div class="container-xl">
        <div class="qibla-card">
          <div class="qibla-card__head">
            <button type="button" class="qibla-city-btn">${qibla.actionLabel}</button>

            <div class="qibla-card__heading">
              <h2 class="qibla-card__title">
                <span>${qibla.headingLabel}</span>
                <span class="qibla-card__title-icon" aria-hidden="true"></span>
              </h2>
              <p class="qibla-card__note">${qibla.note}</p>
            </div>

            <p class="qibla-card__degree" data-qibla-deg>${qibla.degreeText}</p>
          </div>

          ${renderQibla(qibla)}
        </div>
      </div>
    </section>

    <hr class="sec-divider" />
  `;

  return rootElement;
}
