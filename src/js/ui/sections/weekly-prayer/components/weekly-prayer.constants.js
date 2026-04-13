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

export const WEEKLY_TABLE_ROWS = [
  {
    day: "الاثنين",
    date: "23/03",
    fajr: "05:11",
    dhuhr: "12:31",
    asr: "16:09",
    maghrib: "18:57",
    isha: "20:27",
    isToday: true,
    activePrayer: "asr",
  },
  {
    day: "الثلاثاء",
    date: "24/03",
    fajr: "05:10",
    dhuhr: "12:31",
    asr: "16:10",
    maghrib: "18:58",
    isha: "20:28",
    isToday: false,
  },
];

export const WEEKLY_MOBILE_CARD = {
  day: "الاثنين",
  date: "23/03",
  badge: "اليوم",
  prayers: [
    { key: "fajr", label: "الفجر", time: "05:11" },
    { key: "dhuhr", label: "الظهر", time: "12:31" },
    { key: "asr", label: "العصر", time: "16:09", isActive: true },
    { key: "maghrib", label: "المغرب", time: "18:57" },
    { key: "isha", label: "العشاء", time: "20:27" },
  ],
};
