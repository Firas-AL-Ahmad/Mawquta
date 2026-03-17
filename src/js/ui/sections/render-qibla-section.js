export function renderQiblaSection(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="qibla-section__inner container">
      <div class="qibla-section__intro">
        <div class="section-heading qibla-section__heading">
          <div class="qibla-section__heading-content">
            <p class="section-heading__eyebrow">القبلة</p>
            <h2 class="section-heading__title">اعرف اتجاه القبلة بسهولة ووضوح</h2>
            <p class="section-heading__subtitle">
              واجهة هادئة ومهيأة لإظهار الاتجاه والدرجة عند ربطها لاحقًا بخدمات الموقع والحساب الفعلي.
            </p>
          </div>
        </div>
      </div>

      <div class="qibla-section__body">
        <article class="card qibla-card" aria-label="ملخص اتجاه القبلة">
          <div class="qibla-card__content">
            <p class="qibla-card__label">اتجاه القبلة</p>
            <h3 class="qibla-card__degree">137°</h3>
            <p class="qibla-card__note">
              قيمة ثابتة تجريبية في هذه المرحلة، وسيتم ربط الدرجة الفعلية لاحقًا.
            </p>
          </div>

          <div class="qibla-card__visual" aria-hidden="true">
            <div class="qibla-card__compass-surface">
              <div class="qibla-card__compass-ring"></div>
              <div class="qibla-card__direction-mark"></div>
              <div class="qibla-card__center-dot"></div>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;

  return rootElement;
}

