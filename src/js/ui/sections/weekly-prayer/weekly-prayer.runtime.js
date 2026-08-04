// src/js/ui/sections/weekly-prayer/weekly-prayer.runtime.js
// Orchestrates live weekly prayer data: subscribes to the location service,
// fetches the current 7-day week through week.service.js, formats it with
// weekly-formatter.service.js and re-renders the weekly section data area.
//
// The runtime never requests geolocation itself and never issues Qibla,
// Ramadan or daily-timings requests. week.service functions are injected so
// this module stays Node-testable (aladhan.api.js requires window.axios).

import {
  buildWeeklySectionData,
  getTodayDateInTimeZone,
  getTodayDateKey,
} from "../../../services/weekly-formatter.service.js";
import { renderWeeklyPrayerTableCard } from "./components/prayer-week-table.component.js";

function defaultFormatLocation(location) {
  if (!location) return "الموقع غير محدد";

  if (location.city === "Damascus" && location.country === "Syria") {
    return "دمشق، سوريا";
  }

  return `${location.city}، ${location.country}`;
}

function renderWeeklyPrayerLoadingState() {
  return '<div class="weekly-prayer-loading" role="status" aria-label="جارٍ تحميل مواقيت الصلاة الأسبوعية">جارٍ تحميل مواقيت الأسبوع…</div>';
}

function renderWeeklyPrayerEmptyState() {
  return '<div class="weekly-prayer-empty" role="status">لا تتوفر بيانات مواقيت لهذا الأسبوع حالياً.</div>';
}

function renderWeeklyPrayerErrorState() {
  return `
    <div class="weekly-prayer-error" role="alert">
      <p class="weekly-prayer-error__message">تعذر تحميل مواقيت الصلاة الأسبوعية.</p>
      <button type="button" class="weekly-prayer-error__retry" data-weekly-retry>إعادة المحاولة</button>
    </div>
  `;
}

export function createWeeklyPrayerRuntime(options = {}) {
  const {
    rootElement,
    locationService,
    getCurrentWeekByCity,
    getCurrentWeekByCoords,
    formatLocation = defaultFormatLocation,
    now = () => new Date(),
  } = options;

  let sequence = 0;
  let loadKey = null;
  let attemptKey = null;
  let pendingKey = null;
  let unsubscribe = null;
  let retryBound = false;

  const state = {
    status: "idle",
    sectionData: null,
    location: null,
  };

  function getHeadElements() {
    return {
      cityElement: rootElement?.querySelector("[data-weekly-city]"),
      metaElement: rootElement?.querySelector(".weekly-prayer-section__meta"),
      dataElement: rootElement?.querySelector("[data-weekly-data]"),
    };
  }

  function getMetaText() {
    switch (state.status) {
      case "success":
        return "محدث اليوم";
      case "empty":
        return "لا توجد بيانات";
      case "error":
        return state.sectionData ? "تعذر التحديث" : "تعذر التحميل";
      case "loading":
      default:
        return state.sectionData ? "جارٍ التحديث…" : "جارٍ التحميل…";
    }
  }

  function applyState() {
    const { cityElement, metaElement, dataElement } = getHeadElements();
    if (!cityElement || !metaElement || !dataElement) return;

    cityElement.textContent = state.location
      ? formatLocation(state.location)
      : "دمشق، سوريا";
    metaElement.textContent = getMetaText();

    const hasData = Boolean(state.sectionData);

    if (state.status === "success" && state.sectionData) {
      dataElement.innerHTML = renderWeeklyPrayerTableCard({
        rangeText: state.sectionData.rangeText,
        rows: state.sectionData.rows,
        mobileCard: state.sectionData.mobileCard,
      });
      return;
    }

    if (hasData) {
      // Loading/error/empty while last-good data is present: keep the
      // existing table untouched and only surface the status in the head.
      return;
    }

    if (state.status === "empty") {
      dataElement.innerHTML = renderWeeklyPrayerEmptyState();
      return;
    }

    if (state.status === "error") {
      dataElement.innerHTML = renderWeeklyPrayerErrorState();
      return;
    }

    dataElement.innerHTML = renderWeeklyPrayerLoadingState();
  }

  function buildLoadKey(location) {
    const todayKey = getTodayDateKey(location.timezone, now());
    if (location.type === "coords") {
      return `coords:${location.latitude},${location.longitude}:${todayKey}`;
    }
    return `city:${location.city}|${location.country}:${todayKey}`;
  }

  async function load(location, { force = false } = {}) {
    const key = buildLoadKey(location);

    if (!force) {
      if (key === loadKey && state.sectionData) return;
      if (key === pendingKey) return;
      if (
        key === attemptKey &&
        (state.status === "error" || state.status === "empty")
      ) {
        return;
      }
    }

    const token = ++sequence;
    attemptKey = key;
    pendingKey = key;
    state.location = location;
    state.status = "loading";
    applyState();

    try {
      const weekAnchor = getTodayDateInTimeZone(location.timezone, now());

      const calendarDays =
        location.type === "coords"
          ? await getCurrentWeekByCoords(
              location.latitude,
              location.longitude,
              weekAnchor,
              false,
            )
          : await getCurrentWeekByCity(
              location.city,
              location.country,
              weekAnchor,
              false,
            );

      if (token !== sequence) return;

      if (!Array.isArray(calendarDays) || calendarDays.length === 0) {
        state.status = "empty";
        if (!state.sectionData) loadKey = null;
        applyState();
        return;
      }

      const sectionData = buildWeeklySectionData({
        calendarDays,
        timeZone: location.timezone,
        now: now(),
      });

      if (token !== sequence) return;

      state.status = "success";
      state.sectionData = sectionData;
      state.location = location;
      loadKey = key;
      applyState();
    } catch (error) {
      if (token !== sequence) return;

      state.status = "error";
      applyState();
    } finally {
      if (token === sequence) pendingKey = null;
    }
  }

  function onLocationState(locationState) {
    if (locationState?.phase !== "ready" || !locationState?.location) {
      if (!state.location) {
        state.status = "idle";
        applyState();
      }
      return;
    }

    const location = locationState.location;
    state.location = location;
    void load(location);
  }

  function bindRetry() {
    if (retryBound || !rootElement) return;
    retryBound = true;

    rootElement.addEventListener("click", (event) => {
      if (!event.target?.closest?.("[data-weekly-retry]")) return;
      if (state.location) void load(state.location, { force: true });
    });
  }

  function destroy() {
    sequence += 1;
    pendingKey = null;
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  }

  if (!rootElement || !locationService) {
    return Object.freeze({ destroy: () => {} });
  }

  bindRetry();
  unsubscribe = locationService.subscribe(onLocationState);

  return Object.freeze({ destroy });
}
