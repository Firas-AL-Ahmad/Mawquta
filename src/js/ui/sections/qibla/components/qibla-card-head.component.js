export function renderQiblaCardHead(
  modalId,
  {
    cityName = "دمشق، سوريا",
    statusLabel = "جارٍ الحساب…",
    displayDegrees = "--°",
  } = {},
) {
  return `
    <div class="qibla-card__head section-head">
      <div class="qibla-card__heading section-head__main">
        <h2 class="qibla-card__title section-head__title">
          <span class="qibla-card__title-icon section-head__icon" aria-hidden="true"></span>
          <span>اتجاه القبلة من موقعك الحالي</span>
        </h2>
        <p class="qibla-card__note section-head__meta" data-qibla-city>${cityName}</p>
        <p class="qibla-card__note section-head__meta" data-qibla-status>${statusLabel}</p>
      </div>

      <p class="qibla-card__degree section-head__aux" data-qibla-deg>${displayDegrees}</p>

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
