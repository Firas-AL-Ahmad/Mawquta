export function renderQiblaCityModal({ modalId, modalLabelId }) {
  return `
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
  `;
}
