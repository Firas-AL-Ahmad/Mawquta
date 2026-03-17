export function renderRamadanSection(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="ramadan-section__inner container">
      <div class="ramadan-section__intro">
        <div class="section-heading ramadan-section__heading">
          <p class="section-heading__eyebrow">رمضان</p>
          <h2 class="section-heading__title">ملخص هادئ وواضح لمعلومات رمضان</h2>
          <p class="section-heading__subtitle">
            واجهة مهيأة لعرض اليوم الرمضاني، وقت الإمساك، ووقت الإفطار عند ربطها لاحقًا بالبيانات الفعلية.
          </p>
        </div>
      </div>

      <div class="ramadan-section__body">
        <article class="card ramadan-card" aria-label="ملخص رمضان">
          <div class="ramadan-card__content">
            <p class="ramadan-card__label">اليوم الرمضاني</p>
            <h3 class="ramadan-card__day">اليوم 15</h3>
            <p class="ramadan-card__note">
              قيم ثابتة Placeholder في هذه المرحلة، وسيتم ربط البيانات الفعلية لاحقًا دون أي منطق زمني مباشر هنا.
            </p>
          </div>

          <div class="ramadan-card__meta">
            <div class="ramadan-card__meta-item">
              <span class="ramadan-card__meta-label">الإمساك</span>
              <span class="ramadan-card__meta-value">04:12</span>
            </div>

            <div class="ramadan-card__meta-item">
              <span class="ramadan-card__meta-label">الإفطار</span>
              <span class="ramadan-card__meta-value">18:31</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  `;

  return rootElement;
}
