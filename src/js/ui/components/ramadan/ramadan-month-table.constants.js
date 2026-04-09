export const MONTH_TABLE_ICON_PATHS = {
  isha: "assets/icons/shared/prayer/isha.svg",
  maghrib: "assets/icons/shared/prayer/maghrib.svg",
  asr: "assets/icons/shared/prayer/asr.svg",
  dhuhr: "assets/icons/shared/prayer/dhuhr.svg",
  fajr: "assets/icons/shared/prayer/fajr.svg",
  date: "assets/icons/shared/prayer/date.svg",
  day: "assets/icons/shared/prayer/today.svg",
  ramadan: "assets/icons/sections/ramadan/moon-and-stars.svg",
  download: "assets/icons/sections/ramadan/action-download.svg",
  share: "assets/icons/sections/ramadan/action-share.svg",
};

export const RAMADAN_MONTH_TABLE_COLUMNS = [
  "العشاء",
  "المغرب",
  "العصر",
  "الظهر",
  "الفجر",
  "التاريخ",
  "اليوم",
  "رمضان",
];

export const RAMADAN_MONTH_TABLE_ROWS = [
  {
    isha: "20:27",
    maghrib: "18:57",
    asr: "16:09",
    dhuhr: "12:31",
    fajr: "05:11",
    date: "23/03",
    day: "الاثنين",
    ramadanDayNumber: "1",
    isToday: false,
  },
  {
    isha: "20:29",
    maghrib: "18:59",
    asr: "16:10",
    dhuhr: "12:30",
    fajr: "05:09",
    date: "25/03",
    day: "الأربعاء",
    ramadanDayNumber: "3",
    isToday: true,
    activePrayerKeys: ["maghrib", "fajr"],
  },
];
