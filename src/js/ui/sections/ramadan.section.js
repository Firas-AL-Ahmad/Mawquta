import {
  renderRamadanCountdown,
  renderRamadanMonthTable,
} from "../components/ramadan/ramadan-blocks.component.js";

const RAMADAN_SECTION_ICON_PATHS = {
  moonAndStars: "./assets/icons/sections/ramadan/moon-and-stars.svg",
};

export function renderRamadanSection(rootElement, data = {}) {
  void data;

  if (!rootElement) {
    return null;
  }

  rootElement.innerHTML = `
    <section class="ramadan-sec" id="ramadan" aria-label="قسم رمضان">
      <div class="container-xl">
        <div class="ramadan-topbar sec-head sec-head--ramadan" aria-label="بيانات رمضان">
          <div class="ramadan-topbar__action-shell">
            <button
              type="button"
              class="ramadan-topbar__action sec-head__action"
              aria-label="اختيار المدينة"
              data-bs-toggle="modal"
              data-bs-target="#qiblaCityModal"
            >
              اختيار المدينة
            </button>
          </div>

          <div class="ramadan-topbar__chip ramadan-topbar__chip--date">
            <div class="ramadan-topbar__chip-content">
              <span class="ramadan-topbar__chip-label-wrap">
                <span class="ramadan-topbar__chip-label">اليوم 15</span>
                <span class="ramadan-topbar__icon ramadan-topbar__icon--calendar sec-head__icon" aria-hidden="true"></span>
              </span>
              <span class="ramadan-topbar__chip-value">6</span>
              <span class="ramadan-topbar__chip-value">رمضان</span>
            </div>
          </div>

          <div class="ramadan-topbar__chip ramadan-topbar__chip--city">
            <div class="ramadan-topbar__chip-content">
              <span class="ramadan-topbar__chip-label-wrap">
                <span class="ramadan-topbar__chip-label">المدينة:</span>
                <span class="ramadan-topbar__icon ramadan-topbar__icon--location sec-head__icon" aria-hidden="true"></span>
              </span>
              <span class="ramadan-topbar__chip-value">دمشق، سوريا</span>
            </div>
          </div>

          <div class="ramadan-topbar__summary sec-head__main">
            <span class="ramadan-topbar__blessing sec-head__badge">
              <span class="ramadan-topbar__blessing-label">رمضان مبارك</span>
              <img class="ramadan-topbar__blessing-icon sec-head__icon" src="${RAMADAN_SECTION_ICON_PATHS.moonAndStars}" alt="" loading="lazy" decoding="async" />
            </span>

            <h2 class="ramadan-topbar__month sec-head__title" data-ramadan-month>رمضان 2026</h2>

            <span class="ramadan-topbar__meta sec-head__meta">
              <span class="ramadan-topbar__meta-value">الثلاثاء / 18:00 / 22 مارس 2026</span>
              <span class="ramadan-topbar__meta-prefix">آخر تحديث:</span>
            </span>
          </div>
        </div>

        ${renderRamadanCountdown()}
      </div>
    </section>

    <hr class="sec-divider" />

    <div class="container-xl">
      ${renderRamadanMonthTable()}
    </div>
  `;

  return rootElement;
}