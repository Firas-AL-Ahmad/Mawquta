import { renderQibla } from "../components/qibla-visual.component.js";

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

export function renderQiblaSection(
  rootElement,
  viewModel = DEFAULT_QIBLA_VIEW_MODEL,
) {
  if (!rootElement) {
    return null;
  }

  const qibla = normalizeQiblaViewModel(viewModel);
  const modalId = "qiblaCityModal";
  const modalLabelId = "qiblaCityModalTitle";

  rootElement.innerHTML = `
    <section class="qibla-sec" id="qibla" aria-label="اتجاه القبلة">
      <div class="container-xl">
        <div class="qibla-card">
          <div class="qibla-card__head sec-head">
            <div class="qibla-card__heading sec-head__main">
              <h2 class="qibla-card__title sec-head__title">
              <span class="qibla-card__title-icon sec-head__icon" aria-hidden="true"></span>
              <span>${qibla.headingLabel}</span>
              </h2>
              <p class="qibla-card__note sec-head__meta">${qibla.note}</p>
            </div>

            <p class="qibla-card__degree sec-head__aux" data-qibla-deg>${qibla.degreeText}</p>

            <button
              type="button"
              class="qibla-city-btn sec-head__action"
              data-bs-toggle="modal"
              data-bs-target="#${modalId}"
            >
              ${qibla.actionLabel}
            </button>
          </div>

          ${renderQibla(qibla)}
        </div>
      </div>

      <div
        class="modal fade qibla-city-modal"
        id="${modalId}"
        tabindex="-1"
        aria-labelledby="${modalLabelId}"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-dialog-centered qibla-city-modal__dialog">
          <div class="modal-content qibla-city-modal__content">
            <div class="modal-header qibla-city-modal__header">
              <h3 class="modal-title qibla-city-modal__title" id="${modalLabelId}">
                اختيار المدينة
              </h3>
              <button
                type="button"
                class="qibla-city-modal__close"
                data-bs-dismiss="modal"
                aria-label="إغلاق"
              >
                إغلاق
              </button>
            </div>

            <div class="modal-body qibla-city-modal__body">
              <p class="qibla-city-modal__note">
                هذه نافذة شكلية حالياً وستُربط لاحقاً بميزة البحث واختيار المدينة.
              </p>

              <div class="qibla-city-modal__fake-input" aria-hidden="true">
                ابحث عن مدينة...
              </div>

              <button
                type="button"
                class="qibla-city-modal__confirm"
                data-bs-dismiss="modal"
              >
                تم
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <hr class="sec-divider" />
  `;

  return rootElement;
}


