function renderMobilePrayerItem(prayer, iconPath) {
  const activeClass = prayer.isActive ? " weekly-table-mobile-item--active" : "";

  return `<div class="weekly-table-mobile-item${activeClass}"><dt><span class="weekly-table-mobile-item-icon" aria-hidden="true"><img src="${iconPath}" alt="" loading="lazy" decoding="async" /></span>${prayer.label}</dt><dd>${prayer.time}</dd></div>`;
}

export function renderWeeklyPrayerMobileList({ mobileCard, iconPaths }) {
  return `
    <div class="weekly-table-mobile-list" aria-label="مواقيت الصلاة الأسبوعية - عرض الموبايل">
      <article class="weekly-table-mobile-card" aria-label="مواقيت ${mobileCard.day}">
        <div class="weekly-table-mobile-head">
          <div class="weekly-table-mobile-title-wrap">
            <h3 class="weekly-table-mobile-title"><span class="weekly-table-mobile-head-icon" aria-hidden="true"><img src="${iconPaths.day}" alt="" loading="lazy" decoding="async" /></span>${mobileCard.day}</h3>
            <span class="weekly-table-mobile-date"><span class="weekly-table-mobile-meta-icon" aria-hidden="true"><img src="${iconPaths.date}" alt="" loading="lazy" decoding="async" /></span>${mobileCard.date}</span>
          </div>
          <span class="weekly-table-mobile-pill">${mobileCard.badge}</span>
        </div>

        <dl class="weekly-table-mobile-grid">
          ${mobileCard.prayers
            .map((prayer) => renderMobilePrayerItem(prayer, iconPaths[prayer.key]))
            .join("\n")}
        </dl>
      </article>
    </div>
  `;
}

