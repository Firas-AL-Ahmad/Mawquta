export function renderQiblaCardHead(modalId) {
  return `
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
  `;
}
