import { renderQibla } from "../components/qibla/qibla-visual.component.js";

export function renderQiblaSection(rootElement, viewModel = {}) {
  void viewModel;

  if (!rootElement) {
    return null;
  }

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
                <span>اتجاه القبلة من موقعك الحالي</span>
              </h2>
              <p class="qibla-card__note sec-head__meta">زاوية القبلة ثابتة في هذا العرض التجريبي.</p>
            </div>

            <p class="qibla-card__degree sec-head__aux" data-qibla-deg>165°</p>

            <button
              type="button"
              class="qibla-city-btn sec-head__action"
              data-bs-toggle="modal"
              data-bs-target="#${modalId}"
            >
              اختيار المدينة
            </button>
          </div>

          ${renderQibla()}
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
                سيتم تفعيل البحث عن المدن لاحقًا.
              </p>

              <div class="qibla-city-modal__fake-input" aria-hidden="true">
                أدخل اسم المدينة...
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