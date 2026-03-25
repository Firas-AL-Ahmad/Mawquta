import { renderQibla } from "../widgets/render-qibla.js";

const DEFAULT_QIBLA_VIEW_MODEL = {
  degreeText: "165°",
  note: "يتم حساب الاتجاه بناءً على الموقع الجغرافي الذي قمت بتحديده",
  needleRotation: 165,
};

function normalizeQiblaViewModel(viewModel) {
  const model = viewModel && typeof viewModel === "object" ? viewModel : {};

  return {
    degreeText:
      typeof model.degreeText === "string" && model.degreeText.trim()
        ? model.degreeText.trim()
        : DEFAULT_QIBLA_VIEW_MODEL.degreeText,
    note:
      typeof model.note === "string" && model.note.trim()
        ? model.note.trim()
        : DEFAULT_QIBLA_VIEW_MODEL.note,
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
            <div class="qibla-card__title">
              <span class="qibla-card__title-icon" aria-hidden="true"></span>
              <span>اتجاه القبلة من موقعك الحالي</span>
            </div>
            <p class="qibla-card__note">${qibla.note}</p>
            <span class="qibla-badge">شغّل القبلة</span>
          </div>

          ${renderQibla(qibla)}
        </div>
      </div>
    </section>

    <hr class="sec-divider" />
  `;

  return rootElement;
}
