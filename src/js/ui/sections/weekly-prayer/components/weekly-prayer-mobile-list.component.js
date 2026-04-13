import { renderScheduleTableMobileList } from "../../../shared/primitives/schedule-table.primitives.js";

export function renderWeeklyPrayerMobileList({ mobileCard, iconPaths }) {
  return renderScheduleTableMobileList({
    ariaLabel: "مواقيت الصلاة الأسبوعية - عرض الموبايل",
    cards: [
      {
        ariaLabel: `مواقيت ${mobileCard.day}`,
        title: mobileCard.day,
        date: mobileCard.date,
        pillText: mobileCard.badge,
        titleIconPath: iconPaths.day,
        dateIconPath: iconPaths.date,
        prayers: mobileCard.prayers.map((prayer) => ({
          label: prayer.label,
          time: prayer.time,
          iconPath: iconPaths[prayer.key],
          isActive: prayer.isActive === true,
        })),
      },
    ],
  });
}

