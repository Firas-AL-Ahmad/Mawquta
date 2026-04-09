function renderMobilePrayerItem(prayer, iconPath) {
  const activeClass = prayer.isActive ? " ws-mobile-item--active" : "";

  return `<div class="ws-mobile-item${activeClass}"><dt><span class="ws-mobile-item-icon" aria-hidden="true"><img src="${iconPath}" alt="" loading="lazy" decoding="async" /></span>${prayer.label}</dt><dd>${prayer.time}</dd></div>`;
}

export function renderWeeklyPrayerMobileList({ mobileCard, iconPaths }) {
  return `
    <div class="ws-mobile-list" aria-label="مواقيت الصلاة الأسبوعية - عرض الموبايل">
      <article class="ws-mobile-card" aria-label="مواقيت ${mobileCard.day}">
        <div class="ws-mobile-head">
          <div class="ws-mobile-title-wrap">
            <h3 class="ws-mobile-title"><span class="ws-mobile-head-icon" aria-hidden="true"><img src="${iconPaths.day}" alt="" loading="lazy" decoding="async" /></span>${mobileCard.day}</h3>
            <span class="ws-mobile-date"><span class="ws-mobile-meta-icon" aria-hidden="true"><img src="${iconPaths.date}" alt="" loading="lazy" decoding="async" /></span>${mobileCard.date}</span>
          </div>
          <span class="ws-mobile-pill">${mobileCard.badge}</span>
        </div>

        <dl class="ws-mobile-grid">
          ${mobileCard.prayers
            .map((prayer) => renderMobilePrayerItem(prayer, iconPaths[prayer.key]))
            .join("\n")}
        </dl>
      </article>
    </div>
  `;
}
