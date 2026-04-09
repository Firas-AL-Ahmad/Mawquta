const STATIC_PRAYER_CARDS_MARKUP = `
  <article class="ps-card ps-card--fajr" role="listitem" aria-label="صلاة الفجر">
    <div class="ps-card__inner">
      <h3 class="ps-card__name">الفجر</h3>
      <div class="ps-card__time-wrap">
        <span class="ps-card__time">05:11 AM</span>
      </div>
    </div>
  </article>

  <article class="ps-card ps-card--dhuhr" role="listitem" aria-label="صلاة الظهر">
    <div class="ps-card__inner">
      <h3 class="ps-card__name">الظهر</h3>
      <div class="ps-card__time-wrap">
        <span class="ps-card__time">12:31 PM</span>
      </div>
    </div>
  </article>

  <article class="ps-card ps-card--asr ps-card--active" role="listitem" aria-label="صلاة العصر - الصلاة الحالية" aria-current="true">
    <div class="ps-card__inner">
      <h3 class="ps-card__name">العصر</h3>
      <div class="ps-card__time-wrap">
        <span class="ps-card__time">04:09 PM</span>
      </div>
    </div>
  </article>

  <article class="ps-card ps-card--maghrib" role="listitem" aria-label="صلاة المغرب">
    <div class="ps-card__inner">
      <h3 class="ps-card__name">المغرب</h3>
      <div class="ps-card__time-wrap">
        <span class="ps-card__time">06:57 PM</span>
      </div>
    </div>
  </article>

  <article class="ps-card ps-card--isha" role="listitem" aria-label="صلاة العشاء">
    <div class="ps-card__inner">
      <h3 class="ps-card__name">العشاء</h3>
      <div class="ps-card__time-wrap">
        <span class="ps-card__time">08:27 PM</span>
      </div>
    </div>
  </article>
`;

export function renderPrayerCards(prayers = [], activeKey = "asr") {
  void prayers;
  void activeKey;
  return STATIC_PRAYER_CARDS_MARKUP;
}