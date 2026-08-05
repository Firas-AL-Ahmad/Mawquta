export const WEEKLY_ICON_PATHS = {
  day: "assets/icons/shared/prayer/today.svg",
  date: "assets/icons/shared/prayer/date.svg",
  fajr: "assets/icons/shared/prayer/fajr.svg",
  dhuhr: "assets/icons/shared/prayer/dhuhr.svg",
  asr: "assets/icons/shared/prayer/asr.svg",
  maghrib: "assets/icons/shared/prayer/maghrib.svg",
  isha: "assets/icons/shared/prayer/isha.svg",
};

export const WEEKLY_TABLE_COLUMNS = [
  { key: "day", label: "اليوم", icon: WEEKLY_ICON_PATHS.day },
  { key: "fajr", label: "الفجر", icon: WEEKLY_ICON_PATHS.fajr },
  { key: "dhuhr", label: "الظهر", icon: WEEKLY_ICON_PATHS.dhuhr },
  { key: "asr", label: "العصر", icon: WEEKLY_ICON_PATHS.asr },
  { key: "maghrib", label: "المغرب", icon: WEEKLY_ICON_PATHS.maghrib },
  { key: "isha", label: "العشاء", icon: WEEKLY_ICON_PATHS.isha },
  { key: "date", label: "التاريخ", icon: WEEKLY_ICON_PATHS.date },
];
