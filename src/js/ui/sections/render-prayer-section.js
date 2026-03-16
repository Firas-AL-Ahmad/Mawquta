import { renderPrayerCards } from "../widgets/render-prayers.js";
import { renderPrayerWeek } from "../widgets/render-week.js";

export function renderPrayerSection(rootElement) {
  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <div class="prayer-section__inner container">
      <div class="prayer-section__intro">
        <div class="section-heading prayer-section__heading">
          <div class="prayer-section__heading-content">
            <p class="section-heading__eyebrow">مواقيت الصلاة</p>
            <h1 class="section-heading__title">ابقَ على صلة بصلاتك أينما كنت</h1>
            <p class="section-heading__subtitle">
              عرض واضح وهادئ لمواقيت اليوم بواجهة عربية عملية ومهيأة للربط بالبيانات الفعلية لاحقًا.
            </p>
          </div>
        </div>

        <div class="prayer-section__meta meta-row" aria-label="Prayer section context">
          <span class="prayer-section__location">دمشق، سوريا</span>
          <span class="prayer-section__divider" aria-hidden="true">•</span>
          <span class="prayer-section__date">الجمعة، 15 رمضان 1447</span>
        </div>
      </div>

      <div class="prayer-section__hero">
        <article class="card prayer-hero-card" aria-label="Featured prayer summary">
          <div class="prayer-hero-card__content">
            <p class="prayer-hero-card__label">الصلاة القادمة</p>
            <h2 class="prayer-hero-card__title">الفجر</h2>
            <p class="prayer-hero-card__time">04:37</p>
            <p class="prayer-hero-card__note">
              هذا عرض ثابت تجريبي، وسيتم ربط التوقيت الفعلي والعدّاد التنازلي في مرحلة لاحقة.
            </p>
          </div>

          <div class="prayer-hero-card__visual" aria-hidden="true"></div>
        </article>
      </div>

      <div class="prayer-section__daily">
        <div class="prayer-cards-root"></div>
      </div>

      <div class="prayer-section__week">
        <div class="prayer-week-root"></div>
      </div>
    </div>
  `;

  const prayerCardsRoot = rootElement.querySelector(".prayer-cards-root");
  renderPrayerCards(prayerCardsRoot);

  const prayerWeekRoot = rootElement.querySelector(".prayer-week-root");
  renderPrayerWeek(prayerWeekRoot);

  return rootElement;
}
