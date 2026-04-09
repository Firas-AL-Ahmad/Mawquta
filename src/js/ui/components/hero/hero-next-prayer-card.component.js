import { renderHeroCountdown } from "./hero-countdown.component.js";

export function renderHeroNextPrayerCard() {
  return `
    <article class="prayer-card" aria-label="الصلاة القادمة">
      <div class="prayer-card__gloss" aria-hidden="true"></div>

      <div class="pcard-header">
        <p class="pcard-time" data-hero-next-prayer-time>15:42 PM</p>

        <div class="pcard-meta">
          <span class="pcard-pill">
            <span class="pcard-pill__dot" aria-hidden="true"></span>
            <span class="pcard-pill__text">الصلاة القادمة</span>
          </span>

          <h1 class="pcard-name" data-hero-next-prayer-label>العصر</h1>
        </div>
      </div>

      ${renderHeroCountdown()}
    </article>
  `;
}
