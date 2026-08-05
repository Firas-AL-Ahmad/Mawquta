export function renderQiblaCardHead(modalId) {
  return `
    <div class="qibla-card__head section-head">
      <div class="qibla-card__heading section-head__main">
        <h2 class="qibla-card__title section-head__title">
          <span class="qibla-card__title-icon section-head__icon" aria-hidden="true"></span>
          <span>اتجاه القبلة من موقعك الحالي</span>
        </h2>
        <p class="qibla-card__note section-head__meta">زاوية القبلة ثابتة في هذا العرض التجريبي.</p>
      </div>

      <p class="qibla-card__degree section-head__aux" data-qibla-deg>165°</p>

      <button
        type="button"
        class="qibla-city-btn section-head__action"
        data-bs-toggle="modal"
        data-bs-target="#${modalId}"
      >
        اختيار المدينة
      </button>
    </div>
  `;
}

